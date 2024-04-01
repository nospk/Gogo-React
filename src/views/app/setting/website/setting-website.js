import React, {Component} from "react";
import {toggleModal as toggleImagePicker} from "../../../../redux/image/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {Button, Col, Input, Label, Row} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import imageNotFound from "../../../../assets/img/no-image.jpg"
import ImagePicker from "../../../../components/imagepicker/ImagePicker";
import {DOMAIN} from "../../../../services/APIURL";
import SettingService from "../../../../services/SettingService";

const EVENTS = {
    PICKER_ICON16: "PICKER_ICON16",
    PICKER_ICON32: "PICKER_ICON32",
    PICKER_ICON48: "PICKER_ICON48",
    PICKER_LOGO: "PICKER_LOGO",
    BANNER_FOOTER: "BANNER_FOOTER",
    BACKGROUND_SLIDE: "BACKGROUND_SLIDE",
}

class SettingWebsite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: "",
                phoneNumber: "",
                address: "",
                logo: "",
                facebook: "",
                zalo: "",
                email: "",
                icon16: "",
                icon32: "",
                icon48: "",
                description: '',
                anounceDelivery: '',
                anounceConfirmDelivery:''
            },
            event: ""
        }

    }

    componentDidMount() {
        SettingService.getWebsite().then((results) => {
            if (results.data) {
                this.setState({
                    data: results.data
                })
            }
        })
    }

    callbackPicker(items) {
        switch (this.state.event) {
            case EVENTS.PICKER_LOGO:
                this.setState((prevState) => ({data: {...prevState.data, logo: items[0].path}}));
                break;
            case EVENTS.PICKER_ICON16:
                this.setState((prevState) => ({data: {...prevState.data, icon16: items[0].path}}));
                break;
            case EVENTS.PICKER_ICON32:
                this.setState((prevState) => ({data: {...prevState.data, icon32: items[0].path}}));
                break;
            case EVENTS.PICKER_ICON48:
                this.setState((prevState) => ({data: {...prevState.data, icon48: items[0].path}}));
                break;
            case EVENTS.BANNER_FOOTER:
                this.setState((prevState) => ({data: {...prevState.data, bannerFooter: items[0].path}}));
                break;
            case EVENTS.BACKGROUND_SLIDE:
                this.setState((prevState) => ({data: {...prevState.data, backgroundSlide: items[0].path}}));
                break;
        }

    }

    openPicker(event) {
        this.setState({
            event: event
        })
        this.props.toggleImagePicker();
    }

    submit() {
        SettingService.updateWebsite(this.state.data).then((results) => {
            window.location.reload();
        })
    }

    render() {
        const {
            logo,
            title,
            phoneNumber,
            address,
            facebook,
            zalo,
            email,
            icon16,
            icon32,
            icon48,
            bannerFooter,
            description,
            slogan,
            backgroundSlide,
            linkAIOS,
            linkANDROID,
            anounceDelivery,
            anounceConfirmDelivery,
        } = this.state.data;
        return (
            <div>
                <div className="d-flex justify-content-end">
                    <Button color="secondary" onClick={this.submit.bind(this)}>
                        Cập nhật
                    </Button>
                </div>
                <Row>
                    <Col sm={12} xs={12} md={6} xl={6}>
                        <div>
                            <Label className="mt-2">
                                <IntlMessages id="setting.website.form.name"/>
                            </Label>
                            <Input type="text"
                                   name="title"
                                   value={title ? title : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState((prevState) => ({
                                           data: {...prevState.data, title: value}
                                       }))
                                   })}/>
                        </div>
                        <div>
                            <Label className="mt-2">
                                <IntlMessages id="setting.website.form.phoneNumber"/>
                            </Label>
                            <Input type="text"
                                   name="phoneNumber"
                                   value={phoneNumber ? phoneNumber : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState((prevState) => ({
                                           data: {...prevState.data, phoneNumber: value}
                                       }))
                                   })}/>
                        </div>
                        <div>
                            <Label className="mt-2">
                                <IntlMessages id="setting.website.form.address"/>
                            </Label>
                            <Input type="text"
                                   name="address"
                                   value={address ? address : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState((prevState) => ({
                                           data: {...prevState.data, address: value}
                                       }))
                                   })}/>
                        </div>
                        <div>
                            <Label className="mt-2">
                                <IntlMessages id="setting.website.form.email"/>
                            </Label>
                            <Input type="text"
                                   name="title"
                                   value={email ? email : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState((prevState) => ({
                                           data: {...prevState.data, email: value}
                                       }))
                                   })}/>
                        </div>
                        <div>
                            <Label className="mt-2 w-100">Mô tả cho toàn trang</Label>
                            <textarea type="text"
                                      className="w-100"
                                      name="description"
                                      style={{minHeight:150}}
                                      value={description ? description : ""}
                                      onChange={(event => {
                                          const value = event.target.value;
                                          this.setState((prevState) => ({
                                              data: {...prevState.data, description: value}
                                          }))
                                      })}/>
                        </div>
                        <div>
                            <Label className="mt-2">
                                <IntlMessages id="setting.website.form.logo"/>
                            </Label>
                            <div className="d-flex justify-content-center">
                                <img onClick={() => this.openPicker(EVENTS.PICKER_LOGO)}
                                     className="w-50"
                                     style={{cursor: "pointer"}}
                                     src={logo ? DOMAIN + logo : imageNotFound}/>
                            </div>
                            <div className="d-flex justify-content-between">
                                <img onClick={() => this.openPicker(EVENTS.PICKER_ICON16)}
                                     className="w-25 m-2"
                                     style={{cursor: "pointer"}}
                                     src={icon16 ? DOMAIN + icon16 : imageNotFound}/>
                                <img onClick={() => this.openPicker(EVENTS.PICKER_ICON32)}
                                     className="w-25 m-2"
                                     style={{cursor: "pointer"}}
                                     src={icon32 ? DOMAIN + icon32 : imageNotFound}/>
                                <img onClick={() => this.openPicker(EVENTS.PICKER_ICON48)}
                                     className="w-25 m-2"
                                     style={{cursor: "pointer"}}
                                     src={icon48 ? DOMAIN + icon48 : imageNotFound}/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} xs={12} md={6} xl={6}>
                        <div>
                            <Label className="mt-2">
                                Slogan
                            </Label>
                            <Input type="text"
                                   name="title"
                                   value={slogan ? slogan : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState((prevState) => ({
                                           data: {...prevState.data, slogan: value}
                                       }))
                                   })}/>
                        </div>
                        <div>
                            <Label className="mt-2">
                                Thông báo xác nhận vận chuyển
                            </Label>
                            <textarea type="text" className="w-100"
                                   value={anounceConfirmDelivery ? anounceConfirmDelivery : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState((prevState) => ({
                                           data: {...prevState.data, anounceConfirmDelivery: value}
                                       }))
                                   })}/>
                        </div>
                        <div>
                            <Label className="mt-2">
                                Thông báo  vận chuyển
                            </Label>
                            <textarea type="text" className="w-100"
                                      value={anounceDelivery ? anounceDelivery : ""}
                                      onChange={(event => {
                                          const value = event.target.value;
                                          this.setState((prevState) => ({
                                              data: {...prevState.data, anounceDelivery: value}
                                          }))
                                      })}/>
                        </div>
                        <div>
                            <Label className="mt-2">
                                Link IOS
                            </Label>
                            <Input type="text"
                                   name="title"
                                   value={linkAIOS ? linkAIOS : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState((prevState) => ({
                                           data: {...prevState.data, linkAIOS: value}
                                       }))
                                   })}/>
                        </div>
                        <div>
                            <Label className="mt-2">
                                Link Android
                            </Label>
                            <Input type="text"
                                   name="title"
                                   value={linkANDROID ? linkANDROID : ""}
                                   onChange={(event => {
                                       const value = event.target.value;
                                       this.setState((prevState) => ({
                                           data: {...prevState.data, linkANDROID: value}
                                       }))
                                   })}/>
                        </div>
                        <div className="">
                            <p>Hình nền slide</p>
                            <img onClick={() => this.openPicker(EVENTS.BACKGROUND_SLIDE)}
                                 className="w-50"
                                 style={{cursor: "pointer"}}
                                 src={backgroundSlide ? DOMAIN + backgroundSlide : imageNotFound}/>
                        </div>
                        <div className="">
                            <p>Banner footer</p>
                            <img onClick={() => this.openPicker(EVENTS.BANNER_FOOTER)}
                                 className="w-50"
                                 style={{cursor: "pointer"}}
                                 src={bannerFooter ? DOMAIN + bannerFooter : imageNotFound}/>
                        </div>
                    </Col>
                </Row>
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
    )(SettingWebsite)
);
