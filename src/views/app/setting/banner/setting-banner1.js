import React, {Component} from "react";
import {injectIntl} from "react-intl";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import ImagePicker from "../../../../components/imagepicker/ImagePicker";

import imgNotFound from "../../../../assets/img/no-image.jpg";
import {DOMAIN} from "../../../../services/APIURL";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {toggleModal as toggleImagePicker} from "../../../../redux/image/actions";
import {connect} from "react-redux";
import SettingService from "../../../../services/SettingService";

class SettingBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            banner: {},
            banners: []
        }
    }

    componentDidMount() {
        SettingService.findAllBanner().then((results) => {
            this.setState({
                banners: results.data
            })
        });

    }

    callbackPicker(items) {
        this.setState((prev) => ({banner: {...prev.banner, thumbnail: items[0].path}}))
    }

    add() {
        this.setState({
            banner: {},
        })
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        })
    }

    submit() {
        SettingService.updateBanner(this.state.banner).then((results) => {
            window.location.reload();
        })

    }

    edit(item) {
        this.setState({
            banner: item
        })
        this.toggleModal();
    }

    remove(id) {
        SettingService.deleteBanner(id).then((results) => {
            window.location.reload();
        })

    }

    renderItem() {
        return this.state.banners.map((item) => {
            const {id, thumbnail, content, href} = item;
            return (
                <Col className="position-relative" key={id} xs={6} sm={6} md={3} xl={3}>
                    <img onClick={() => this.edit(item)} className="w-100"
                         src={thumbnail ? DOMAIN + thumbnail : imgNotFound}/>
                    <div dangerouslySetInnerHTML={{__html: content}}></div>
                    <div onClick={() => {
                        this.remove(id)
                    }} className="glyph-icon simple-icon-close position-absolute"
                         style={{cursor: "pointer", fontSize: "20px", top: 0, right: 0, zIndex: 100}}></div>

                </Col>
            )
        })
    }

    renderModal() {
        const {id, thumbnail, content, href} = this.state.banner;
        return (
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggleModal.bind(this)}
                wrapClassName="modal-right"
            >
                <ModalHeader toggle={this.toggleModal.bind(this)}>
                    <IntlMessages id="menu.setting.banner.create"/>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs={12} sm={12} md={12} xl={12}>
                            <Label>
                                <span>Đường dẫn</span>
                            </Label>
                            <Input value={href}
                                   onChange={(e) => {
                                       const value = e.target.value;
                                       this.setState((prevState) => ({banner: {...prevState.banner, href: value}}))
                                   }}
                                   placeholder={"Đường dẫn"}/>
                        </Col>
                        <Col xs={12} sm={12} md={12} xl={12}>
                            <Label>
                                <span>Nội dung</span>
                            </Label>
                            <CKEditor
                                onReady={editor => {
                                    editor.ui.getEditableElement().parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.getEditableElement()
                                    );
                                }}
                                onChange={(event, editor) => {
                                    const value = editor.getData();
                                    this.setState((prevState) => ({banner: {...prevState.banner, content: value}}))
                                }}
                                editor={DecoupledEditor}
                                data={content ? content : ""}
                            />
                        </Col>
                        <Col onClick={() => this.props.toggleImagePicker()}
                             className="mt-3"
                             xs={12} sm={12} md={12} xl={12}>
                            <img className="w-100" src={thumbnail ? DOMAIN + thumbnail : imgNotFound}/>
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
                        <IntlMessages id="menu.setting.banner2"/>
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
    )(SettingBanner)
);

