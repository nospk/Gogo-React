import React, {Component} from "react";
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage'
import 'grapesjs-preset-newsletter'
import 'grapesjs-plugin-ckeditor'
import '@ckeditor/ckeditor5-react'
import {Col, Row} from "reactstrap";
import {toggleModal as toggleImagePicker} from "../../../redux/image/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import ImagePicker from "../../../components/imagepicker/ImagePicker";
import imgNotFound from '../../../assets/img/no-image.jpg'
import validator from "validator/es";
import {DOMAIN} from "../../../services/APIURL";
import PageService from "../../../services/PageService";
import {addAll} from '../../../components/grapse/grapse-plugin'
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {GrapesjsConfig} from "../../../components/grapse/grapesjsconfig";
const EVENTS = {
    THUMBNAIL: "THUMBNAIL",
    ADD_IMAGE_GRAPESJS: "ADD_IMAGE_GRAPESJS"
}

class PostDetailtView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: "",
            post: {},
            editorRunning: false,
            eventPicker: "",
            types:[
                {label:'Trang', value:'page'},
                {label:'Bài viết', value:'post'},
                {label:'Bài viết sản phẩm', value:'simpleproduct'}
            ]
        }

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        this.openModal();
    }

    componentDidMount() {
        if (this.props.history.location.state) {
            const {id} = this.props.history.location.state;
            PageService.findOne(id).then((results) => {
                if (results.success) {
                    this.setState({
                        post: results.data,
                        editor: grapesjs.init({
                            container: '#pagecontent',
                            components: results.data.content,
                            style: results.data.css,
                            styleManager : {},
                            storageManager: {
                                storeCss: false,         // Enable/Disable storing of rules as CSS string
                                storeHtml: false,        // Enable/Disable storing of components as HTML string
                                storeStyles: false,
                            },
                            plugins: ["gjs-preset-newsletter",addAll],
                            pluginsOpts: GrapesjsConfig,
                            canvas: {
                                styles: [DOMAIN+'/resources/scss/theme.css',DOMAIN+'/resources/scss/grapesjs.css',DOMAIN+'/resources/vendor/animate.css/animate.min.css'],
                            }
                        })
                    })
                }
            })
        } else {
            this.setState({
                editor: grapesjs.init({
                    container: '#pagecontent',
                    components: '<span>123123</span>',
                    style: this.state.post.css,
                    plugins: ["gjs-preset-newsletter",addAll],
                    storageManager: {
                        storeCss: false,         // Enable/Disable storing of rules as CSS string
                        storeHtml: false,        // Enable/Disable storing of components as HTML string
                        storeStyles: false,
                    },
                    pluginsOpts: GrapesjsConfig,
                    canvas: {
                        styles: [DOMAIN+'/resources/scss/theme.css',DOMAIN+'/resources/scss/grapesjs.css',DOMAIN+'/resources/vendor/animate.css/animate.min.css'],
                    }
                })
            })
        }

    }

    openModal() {
        if (this.state.editor) {
            if (!this.state.editorRunning) {
                const editor = this.state.editor;
                editor.setComponents(this.state.post.content);
                editor.setStyle(this.state.post.css);
                this.setState({
                    editorRunning: true
                })


            }

        }

    }
    submit() {
        PageService.save({
            ...this.state.post,
            content: this.state.editor.getHtml(),
            css: this.state.editor.getCss()
        }).then((results) => {
            window.location.reload();
        })
    }
    togglePicker(event) {
        this.setState({
            eventPicker: event
        })
        this.props.toggleImagePicker();
    }
    callBackPicker(data) {
        switch (this.state.eventPicker) {
            case EVENTS.THUMBNAIL:
                this.setState({
                    post: {...this.state.post, image: data[0].path}
                })
                break
            case EVENTS.ADD_IMAGE_GRAPESJS:
                this.state.editor.editor.getSelected().set('src', DOMAIN + data[0].path)
                break
        }

    }
    inputSelected(data) {
        this.setState(prevState => ({
            post: {...prevState.post, type: data.value},
        }))
    }
    getInputSelected(parent){
        const data = this.state.types.filter((item)=>item.value===parent);
        return data[0]
    }
    render() {

        const {post} = this.state;
        return (
            <div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success" onClick={() => this.submit()}>Cập nhật</button>
                </div>
                <Row className="pb-2">
                    <Col xs={12} sm={12} md={8} xl={8}>
                        <div>
                            <label>Tên trang</label>
                            <input className="form-control"
                                   value={post.name ? post.name : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState({post: {...this.state.post, name: value}})
                                   })}
                                   placeholder={"Tên trang"}/>
                        </div>
                        <div>
                            <label>Mô tả trang</label>
                            <textarea className="form-control"
                                      onChange={(event => {
                                          const value = event.target.value;
                                          this.setState({post: {...this.state.post, description: value}})
                                      })}
                                      value={post.description ? post.description : ""}
                                      placeholder={"Mô tả trang"}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} xl={4}>
                        <div className="d-flex justify-content-center">
                            <img onClick={() => this.togglePicker(EVENTS.THUMBNAIL)} width={200}
                                 src={post.image ? (validator.isURL(post.image) ? post.image : DOMAIN + post.image) : imgNotFound}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} xl={4}>
                        <label>
                            Chọn định dạng
                        </label>
                        <Select
                            components={{Input: CustomSelectInput}}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={this.getInputSelected(post.type)}
                            onChange={this.inputSelected.bind(this)}
                            options={this.state.types}
                        />
                    </Col>
                </Row>
                <div id="pagecontent"></div>
                <ImagePicker callback={this.callBackPicker.bind(this)}/>
            </div>
        )
    }

}

const mapStateToProps = ({}) => {

    return {}
};
const mapActionsToProps = {toggleImagePicker,};
export default injectIntl(
    connect(mapStateToProps, mapActionsToProps)(PostDetailtView)
)


