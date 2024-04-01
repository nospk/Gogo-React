import React, {Component} from "react";
import {injectIntl} from "react-intl";
import {
    Button,
    Card,
    CardBody,
    CardHeader, Col, Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import ImagePicker from "../../../../components/imagepicker/ImagePicker";
import SettingService from "../../../../services/SettingService";
import imgNotFount from '../../../../assets/img/no-image.jpg'
import {toggleModal as toggleImagePicker} from "../../../../redux/image/actions";
import {connect} from "react-redux";
import {DOMAIN} from "../../../../services/APIURL";
class SettingSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            slide:{},
            slides:[]
        }
    }
    componentDidMount() {
        SettingService.findAllSlideHome().then((results)=>{
           this.setState({
               slides:results.data
           })
        })
    }


    callbackPicker(items) {
        this.setState((prevState)=>({slide:{...prevState.slide,thumbnail:items[0].path}}))
    }

    add() {
        this.setState({
            slide:{}
        })
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        })
    }

    submit() {
        SettingService.updateSlideHome(this.state.slide).then((results)=>{
            window.location.reload()
        })
    }
    onClickItem(item){
        this.setState({
            slide:item
        })
        this.toggleModal();
    }
    remove(id){
        SettingService.deleteSlideHome(id).then((results)=>{
            window.location.reload();
        })
    }
    renderItem(){
        return this.state.slides.map((item)=>{
            const {id,title,description,price,href,thumbnail} = item;
            return(
                <Col className="text-center position-relative"
                     key={id}
                     style={{cursor:"pointer"}}
                     xs={6} sm={6} md={3} xl={3}>
                    <img  onClick={()=>this.onClickItem(item)}
                          className="w-100" src={thumbnail?DOMAIN+thumbnail:imgNotFount}/>
                    <span className="d-block">{title}</span>
                    <span className="d-block">{description}</span>
                    <span className="d-block">{price}</span>
                    <span className="d-block">{href}</span>
                    <div onClick={() => {this.remove(id)}} className="glyph-icon simple-icon-close position-absolute" style={{cursor: "pointer", fontSize: "20px",top:0,right:0,zIndex:100}}></div>
                </Col>
            );
        });
    }
    renderModal() {
        const {id,title,description,price,href,thumbnail} = this.state.slide;
        return (
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggleModal.bind(this)}
                wrapClassName="modal-right"
            >
                <ModalHeader toggle={this.toggleModal.bind(this)}>
                    <IntlMessages id="menu.setting.slide.create"/>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs={12} sm={12} md={12} xl={12}>
                            <Label className="mt-2" for="title">
                                <IntlMessages id="menu.setting.slide.form.title"/>
                            </Label>
                            <Input
                                type="text" name="title" value={title?title:""}
                                onChange={(text)=>{
                                    const value = text.target.value;
                                    this.setState((prevState)=> ({slide:{...prevState.slide,title:value}}))
                                }}
                            />
                        </Col>
                        <Col xs={12} sm={12} md={12} xl={12}>
                            <Label className="mt-2" for="description">
                                <IntlMessages id="menu.setting.slide.form.description"/>
                            </Label>
                            <Input
                                type="text" name="description" value={description?description:""}
                                onChange={(text)=>{
                                    const value = text.target.value;
                                    this.setState((prevState)=> ({slide:{...prevState.slide,description:value}}))
                                }}
                            />
                        </Col>
                        <Col xs={12} sm={12} md={12} xl={12}>
                            <Label className="mt-2" for="price">
                                <IntlMessages id="menu.setting.slide.form.price"/>
                            </Label>
                            <Input
                                type="text" name="price" value={price?price:""}
                                onChange={(text)=>{
                                    const value = text.target.value;
                                    this.setState((prevState)=> ({slide:{...prevState.slide,price:value}}))
                                }}
                            />
                        </Col>
                        <Col xs={12} sm={12} md={12} xl={12}>
                            <Label className="mt-2" for="categoryName">
                                <IntlMessages id="menu.setting.slide.form.href"/>
                            </Label>
                            <Input
                                type="text" name="href" value={href?href:""}
                                onChange={(text)=>{
                                    const value = text.target.value;
                                    this.setState((prevState)=> ({slide:{...prevState.slide,href:value}}))
                                }}
                            />
                        </Col>
                        <Col className="pt-3" xs={12} sm={12} md={12} xl={12} onClick={()=>this.props.toggleImagePicker()}>
                            <img className="w-100" src={thumbnail?DOMAIN+thumbnail:imgNotFount}/>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submit.bind(this)}>
                        Do Something
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggleModal.bind(this)}>
                        <IntlMessages id="cancel"/>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader className="pt-3 d-flex justify-content-between align-items-center">
                        <IntlMessages id="menu.setting.slide"/>
                        <div onClick={() => {
                            this.add()
                        }} className="glyph-icon simple-icon-plus" style={{cursor: "pointer", fontSize: "20px"}}></div>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {this.renderItem()}
                        </Row>
                    </CardBody>
                </Card>
                {this.renderModal()}
                <ImagePicker callback={this.callbackPicker.bind(this)}/>
            </div>
        )
    }

}

const mapStateToProps = ({}) => {
    return {}
};
const mapActionsToProps = {toggleImagePicker};
export default injectIntl(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(SettingSlide)
);
