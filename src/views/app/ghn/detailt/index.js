import React from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import AddressService from "../../../../services/AddressService";
import GHNService from "../../../../services/GHNService";
import NumberFormat from "react-number-format";
import {NotificationManager} from "../../../../components/common/react-notifications";

class GHNDetailt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinces: [],
            wards: [],
            dictricts: [],
            data: {},
            token: "",
            pickshift: [],
            setting: [],
            services: [],
            fee: 0,
            insurance_fee: 0,
            modal: {
                show: false,
                order_code: ''
            },
            loadding:false,
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        GHNService.getDataOrder(this.props.type === 'create' ? {orderId: id} : {ghnOrder: id}).then(results => {
            const pickShift = !results.data.pick_shift ? [results.pickshift[0].id] : results.data.pick_shift
            this.setState({
                data: {...results.data, pick_shift: pickShift},
                provinces: results.provinces.map((item) => ({label: item.name, value: item.id})),
                dictricts: results.dictricts.map((item) => ({label: item.name, value: item.id})),
                wards: results.wards.map((item) => ({label: item.name, value: item.id})),
                token: results.token,
                setting: results.setting.tokens.map((item) => ({
                    label: item.name,
                    value: item.token,
                    shopId: item.shopId
                })),
                services: results.services,
                fee: results.data.fee ? results.data.fee : 0,
                insurance_fee: results.data.insurance_fee ? results.data.insurance_fee : 0,
                pickshift: results.pickshift.map((item) => ({label: item.title, value: item.id})),
                loadding:true,
            });
            this.state.services = results.services;
            this.state.token = results.token;
            this.getFee();
        })
    }

    getPickShift() {
        GHNService.getPickShift(this.state.token).then((results) => {
            const dataPickShift = results.data.map((item) => {
                return {
                    label: item.title,
                    value: item.id
                }
            });
            this.setState({
                pickshift: dataPickShift
            })
        })
    }

    getValuePickShift(id) {
        const filter = this.state.pickshift.filter((item) => item.value === id);
        return filter[0];
    }

    setValuePickShift(value) {
        this.setState({
            data: {...this.state.data, pick_shift: [value]}
        })
    }

    getAccount(token) {
        const filter = this.state.setting.filter((item) => item.value === token);
        return filter[0];
    }

    setAccount(item) {
        this.setState({
            data: {...this.state.data, shopId: item.shopId},
            token: item.value
        });
        this.state.token = item.value
        this.getServices();
    }

    onChangeInputSelectProvince(data) {
        AddressService.getDictricts(data.value).then((results) => {
            this.setState({
                data: {...this.state.data, to_province: data.value},
                dictricts: results.data.length > 0 ? results.data.map((item => ({
                    value: item.id,
                    label: item.name
                }))) : [],
                wards: []
            })
        })
    }

    onChangeInputSelectDictrict(data) {
        AddressService.getWards(data.value).then((results) => {
            this.setState({
                data: {...this.state.data, to_district_id: data.value},
                wards: results.data.length > 0 ? results.data.map((item => ({value: item.id, label: item.name}))) : [],
            })
            this.getServices();
        })
    }

    onChangeInputSelectWard(data) {
        this.setState({
            data: {...this.state.data, to_ward_code: data.value},
        })
        this.getServices();
    }

    getInputSelectProvince(province) {
        const provinceFilter = this.state.provinces.filter((item) => item.value === province);
        return provinceFilter;
    }

    getInputSelectDictrict(dictrict) {
        const dictrictFilter = this.state.dictricts.filter((item) => item.value === dictrict + "");
        return dictrictFilter;
    }

    getInputSelectWard(ward) {
        const wardFilter = this.state.wards.filter((item) => item.value === ward);
        return wardFilter;
    }

    onChangeInput(value, field) {
        switch (field) {
            case "to_name":
                this.setState({data: {...this.state.data, to_name: value}});
                break
            case "to_phone":
                this.setState({data: {...this.state.data, to_phone: value}});
                break
            case "to_address":
                this.setState({data: {...this.state.data, to_address: value}});
                break
            case "weight":
                this.setState({data: {...this.state.data, weight: value}});
                this.state.data.weight = value;
                this.getFee();
                break
            case "length":
                this.setState({data: {...this.state.data, length: value}});
                this.state.data.length = value;
                this.getFee();
                break
            case "width":
                this.setState({data: {...this.state.data, width: value}});
                this.state.data.width = value;
                this.getFee();
                break
            case "height":
                this.setState({data: {...this.state.data, height: value}});
                this.state.data.height = value;
                this.getFee();
                break
            case "cod_amount":
                this.setState({data: {...this.state.data, cod_amount: value}});
                break
            case "insurance_value":
                this.setState({data: {...this.state.data, insurance_value: value}});
                this.updateTotalFee(value);
                break
            case "client_order_code":
                this.setState({data: {...this.state.data, client_order_code: value}});
                break
            case "note":
                this.setState({data: {...this.state.data, note: value}});
                break
        }
    }

    onChangeInputItem(index, value, field) {
        const items = this.state.data.items.map((item, indexData) => {
            if (index === indexData) {
                switch (field) {
                    case "name":
                        item.name = value;
                        break;
                    case "code":
                        item.code = value;
                        break;
                    case "quantity":
                        item.quantity = value;
                        break;
                }
            }
            return item;
        });
        this.setState({
            data: {...this.state.data, items: items}
        });
    }

    removeItem(index) {
        const items = this.state.data.items.filter((item, indexData) => index !== indexData)
        this.setState({
            data: {...this.state.data, items: items}
        });
    }

    addItem() {
        const newItems = [...this.state.data.items, {
            name: "",
            code: "",
            quantity: ""
        }]
        this.setState({
            data: {...this.state.data, items: newItems}
        });
    }

    submit() {
        GHNService.createOrder(this.state.token, this.state.data).then(results => {
            if (results.data.code !== 200) {

                NotificationManager.error(results.data.message, "Thông báo", 3000, null, null, '');
            } else {
                if (results.data.type) {
                    NotificationManager.success(results.data.message, "Thông báo", 3000, null, null, '');
                } else {
                    window.location.href = '/admin/ghn/detailt/' + results.data.data.order_code
                }

            }
        })
    }

    cancel() {
        this.setState({
            modal: {
                show: true,
                order_code: this.state.data.order_code
            }
        })
    }

    submitCancel() {
        GHNService.cancel(this.state.modal.order_code).then((results) => {
            NotificationManager.success("Hủy đơn hàng thành công", "Thông báo", 3000, null, null, '');
            this.setState({
                modal: false
            })
            const location = {pathname: '/admin/ghn/list/'+this.state.data.orderId}
            this.props.history.push(location)
        })
    }

    getFee() {
        const {to_ward_code, to_district_id, weight, length, width, height} = this.state.data;
        this.state.services.forEach(item => {
            GHNService.getFee(this.state.token, {
                to_district_id: to_district_id,
                to_ward_code: to_ward_code,
                height: height,
                length: length,
                weight: weight,
                width: width,
                coupon: null,
                service_id: item.service_id,
                service_type_id: item.service_type_id
            }).then(results => {
                const newService = this.state.services.map((service) => {
                    if (item.service_id === service.service_id) {
                        service.fee = results.data
                    }
                    return service;
                });
                this.setState({
                    services: newService
                })
            })

        })


    }

    paymentTypeOptions() {
        return [
            {
                label: "Cửa hàng trả phí",
                value: 1
            },
            {
                label: "Khách hàng trả phí",
                value: 2
            }
        ]
    }

    getValuePaymentType(value) {
        const filter = this.paymentTypeOptions().filter((item) => item.value === value);
        return filter[0];
    }

    setValuePaymentType(value) {
        this.setState({data: {...this.state.data, payment_type_id: value}});
    }

    deliveryNoteOptions() {
        return [
            {
                label: "Cho thử hàng",
                value: "CHOTHUHANG"
            },
            {
                label: "Cho khách xem hàng",
                value: "CHOXEMHANGKHONGTHU"
            },
            {
                label: "Không cho khách xem hàng",
                value: "KHONGCHOXEMHANG"
            }
        ]
    }

    getDeliveryNote(value) {
        const filter = this.deliveryNoteOptions().filter((item) => item.value === value);
        return filter[0];
    }

    setDeliveryNote(value) {
        this.setState({data: {...this.state.data, required_note: value}});
    }

    updateTotalFee(value) {
        let insurance_fee = 0;
        if (value > 3000000) {
            insurance_fee = ((value * 0.5) / 100)
        }
        this.setState({
            insurance_fee: insurance_fee
        })
    }

    selectService(service) {
        let fee = service.fee.total;
        let insurance_fee = 0;
        if (this.state.data.insurance_value > 3000000) {
            insurance_fee = ((this.state.data.insurance_value * 0.5) / 100)
        }
        this.setState({
            data: {...this.state.data, service_id: service.service_id, service_type_id: service.service_type_id},
            fee: fee,
            insurance_fee: insurance_fee
        })
    }

    getServices() {
        GHNService.getService(this.state.token, this.state.data.to_district_id).then(results => {
            this.setState({services: results.data});
            this.state.services = results.data;
            this.getFee();
        })
    }

    refreshAccount() {
        this.getPickShift();
        this.getFee();
    }

    renderItems() {
        if (this.state.data.items) {
            return this.state.data.items.map((item, index) => {
                return (
                    <Colxx key={index} md={12} xl={12} className="p-3 border-bottom">
                        <div className="d-flex justify-content-between">
                            <span className="font-weight-bold">Sản phẩm {index + 1}</span>
                            <span className="font-weight-bold"
                                  style={{cursor: "pointer", color: "#d94409"}}
                                  onClick={() => this.removeItem(index)}>Xóa</span>
                        </div>
                        <div className="row">
                            <Col md={6} xl={6}>
                                <Label className="mt-2" for="providerName">
                                    Tên sản phẩm
                                </Label>
                                <Input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => this.onChangeInputItem(index, e.target.value, "name")}
                                    placeholder={'Tên sản phẩm'}
                                />
                            </Col>
                            <Col md={3} xl={3}>
                                <Label className="mt-2" for="providerName">
                                    Mã sản phẩm
                                </Label>
                                <Input
                                    type="text"
                                    value={item.code}
                                    onChange={(e) => this.onChangeInputItem(index, e.target.value, "code")}
                                    placeholder={'Mã sản phẩm'}
                                />
                            </Col>
                            <Col md={3} xl={3}>
                                <Label className="mt-2" for="providerName">
                                    Số lượng
                                </Label>
                                <Input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) => this.onChangeInputItem(index, e.target.value, "quantity")}
                                    placeholder={'Số lượng'}
                                />
                            </Col>
                        </div>
                    </Colxx>
                )
            })
        } else {
            return ""
        }
    }

    renderServices() {
        const styleSelected = {border: "1px solid #d55706"}
        const {service_id, service_type_id} = this.state.data;
        return this.state.services.map((service, index) => {
            const {fee} = service;
            return (
                <div key={index} className="col-3 p-3 m-2" style={{
                    cursor: "pointer",
                    borderRadius: 10, ...(service_id === service.service_id ? styleSelected : {})
                }} onClick={() => this.selectService(service)}>
                    <p className="mb-0 font-weight-bold p-1">{service.short_name}</p>
                    <p className="mb-0 font-weight-bold p-1" style={{fontSize: "2em", color: "#d55706"}}>
                        <NumberFormat value={fee ? fee.total : 0} displayType={'text'} thousandSeparator={true}
                                      suffix={"đ"}/>
                    </p>
                    {/*<p className="mb-0 font-weight-bold p-1">Dự kiến 15/7/2021</p>*/}
                </div>
            )
        })
    }

    print() {
        GHNService.print(this.state.data.order_code).then((results) => {
            const myWindow = window.open("", "_blank");
            myWindow.document.write(results.data);

        })
    }

    renderCancel() {
        const {show} = this.state.modal;
        return (
            <Modal className="shadow-none"
                   centered={true}
                   size="md"
                   toggle={() => {
                       this.setState({
                           modal: {...this.state.modal, show: !show}
                       })
                   }}
                   isOpen={show}>
                <ModalHeader>
                    <span>Bạn có muốn hủy đơn hàng</span>
                </ModalHeader>
                <ModalFooter>
                    <Button outline color="info" onClick={this.submitCancel.bind(this)}>
                        Xác nhận
                    </Button>
                </ModalFooter>
            </Modal>
        );

    }

    render() {
        const {
            payment_type_id,
            note,
            required_note,
            return_phone,
            return_address,
            return_district_id,
            return_ward_code,
            client_order_code,
            to_name,
            to_phone,
            to_address,
            to_province,
            to_ward_code,
            to_district_id,
            cod_amount,
            content,
            weight,
            length,
            width,
            height,
            pick_station_id,
            deliver_station_id,
            insurance_value,
            service_id,
            service_type_id,
            order_value,
            coupon,
            items,
            pick_shift
        } = this.state.data;
        if (this.state.loadding){
            return (
                <div>
                    <Row className="bg-white p-3">
                        <Col md={9} xl={9} style={{height: 700, overflowY: "auto"}}>
                            <Row className="border-bottom pt-2 pb-5">
                                <Col xs={12} sm={12} md={12} xl={12} className="d-flex align-items-center">
                                    <div>
                                        <span className="h-100 mr-1" style={{border: '2px solid rgb(241 91 12'}}></span>
                                        <span className="font-weight-bold" style={{fontSize: 18}}>Bên gửi</span>
                                    </div>
                                    <Select
                                        components={{Input: CustomSelectInput}}
                                        className="react-select border-radius ml-5 w-25"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        options={this.state.setting}
                                        disable={this.props.type !== 'create'}
                                        value={this.getAccount(this.state.token)}
                                        onChange={(e) => this.setAccount(e)}
                                    />
                                </Col>
                                <Col md={6} xl={6}>

                                </Col>
                                <Colxx md={6} xl={6}>
                                    <label>
                                        Chọn ca lấy hàng
                                    </label>
                                    <Select
                                        components={{Input: CustomSelectInput}}
                                        className="react-select border-radius"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        options={this.state.pickshift}
                                        value={this.getValuePickShift(pick_shift ? pick_shift[0] : 0)}
                                        onChange={(e) => this.setValuePickShift(e.value)}
                                    />
                                </Colxx>
                            </Row>
                            <Row className="border-bottom pt-2 pb-5">
                                <Col xs={12} sm={12} md={12} xl={12} className="d-flex align-items-center">
                                    <span className="h-100 mr-1" style={{border: '2px solid rgb(241 91 12'}}></span>
                                    <span className="font-weight-bold" style={{fontSize: 18}}>Bên Nhận</span>
                                </Col>
                                <Col md={6} xl={6} className="p-0">
                                    <Colxx className="mb-2">
                                        <Label className="mt-2" for="providerName">
                                            Số điện thoại
                                        </Label>
                                        <Input
                                            type="text"
                                            style={{borderRadius: 10}}
                                            value={to_phone ? to_phone : ""}
                                            onChange={(e) => this.onChangeInput(e.target.value, "to_phone")}
                                            placeholder={'Số điện thoại'}
                                        />
                                    </Colxx>
                                    <Colxx className="mb-2">
                                        <Label className="mt-2" for="providerName">
                                            Họ và tên
                                        </Label>
                                        <Input
                                            type="text"
                                            style={{borderRadius: 10}}
                                            value={to_name ? to_name : ""}
                                            onChange={(e) => this.onChangeInput(e.target.value, "to_name")}
                                            placeholder={'Họ và tên '}
                                        />
                                    </Colxx>
                                </Col>
                                <Col md={6} xl={6} className="row">
                                    <Col sm="12" md={6} xl={6}>
                                        <label>
                                            <IntlMessages id="order.address.province"/>
                                        </label>
                                        <Select
                                            components={{Input: CustomSelectInput}}
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder={"Chọn thành phố"}
                                            name="form-field-name"
                                            onChange={this.onChangeInputSelectProvince.bind(this)}
                                            value={this.getInputSelectProvince(to_province ? to_province : '')}
                                            options={this.state.provinces}
                                        />
                                    </Col>
                                    <Col sm="12" md={6} xl={6}>
                                        <label>
                                            <IntlMessages id="order.address.dictrict"/>
                                        </label>
                                        <Select
                                            components={{Input: CustomSelectInput}}
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder={"Chọn quận huyện"}
                                            name="form-field-name"
                                            onChange={this.onChangeInputSelectDictrict.bind(this)}
                                            value={this.getInputSelectDictrict(to_district_id ? to_district_id : '')}
                                            options={this.state.dictricts}
                                        />
                                    </Col>
                                    <Col sm="12" md={6} xl={6}>
                                        <label>
                                            <IntlMessages id="order.address.ward"/>
                                        </label>
                                        <Select
                                            components={{Input: CustomSelectInput}}
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder={"Chọn xã phường"}
                                            name="form-field-name"
                                            onChange={this.onChangeInputSelectWard.bind(this)}
                                            value={this.getInputSelectWard(to_ward_code ? to_ward_code : '')}
                                            options={this.state.wards}
                                        />
                                    </Col>
                                    <Colxx md={12} xl={12}>
                                        <Label className="mt-2" for="providerName">
                                            Địa chỉ
                                        </Label>
                                        <Input
                                            type="text"
                                            value={to_address ? to_address : ""}
                                            onChange={(e) => this.onChangeInput(e.target.value, "to_address")}
                                            placeholder={'Địa chỉ'}
                                        />
                                    </Colxx>
                                </Col>
                            </Row>
                            <Row className="border-bottom pt-2 pb-5">
                                <Col xs={12} sm={12} md={12} xl={12} className="d-flex align-items-center">
                                    <span className="h-100 mr-1" style={{border: '2px solid rgb(241 91 12'}}></span>
                                    <div className="d-flex justify-content-between w-100">
                                        <span className="font-weight-bold" style={{fontSize: 18}}>Hàng hóa - sản phẩm</span>
                                        <span className="glyph-icon simple-icon-plus font-weight-bold"
                                              style={{fontSize: 20}} onClick={() => this.addItem()}></span>
                                    </div>

                                </Col>
                                <Col xs={12} sm={12} md={12} xl={12} className="row">
                                    {this.renderItems()}
                                    <Colxx md={6} xl={6}>
                                        <Label className="mt-2" for="providerName">
                                            Tổng khối lượng
                                        </Label>
                                        <Input
                                            type="text"
                                            style={{borderRadius: 10}}
                                            value={weight ? weight : "0"}
                                            onChange={(e) => this.onChangeInput(e.target.value, "weight")}
                                            placeholder={'Tổng khối lượng'}
                                        />
                                    </Colxx>
                                    <Colxx md={6} xl={6} className="row">
                                        <Colxx md={4} xl={4}>
                                            <Label className="mt-2" for="providerName">
                                                Chiều dài
                                            </Label>
                                            <Input
                                                type="text"
                                                style={{borderRadius: 10}}
                                                value={width ? width : ""}
                                                onChange={(e) => this.onChangeInput(e.target.value, "width")}
                                                placeholder={'Chiều dài'}
                                            />
                                        </Colxx>
                                        <Colxx md={4} xl={4}>
                                            <Label className="mt-2" for="providerName">
                                                Chiều rộng
                                            </Label>
                                            <Input
                                                type="text"
                                                style={{borderRadius: 10}}
                                                value={length ? length : ""}
                                                onChange={(e) => this.onChangeInput(e.target.value, "length")}
                                                placeholder={'Chiều rộng'}
                                            />
                                        </Colxx>
                                        <Colxx md={4} xl={4}>
                                            <Label className="mt-2" for="providerName">
                                                Chiều cao
                                            </Label>
                                            <Input
                                                type="text"
                                                style={{borderRadius: 10}}
                                                value={height ? height : ""}
                                                onChange={(e) => this.onChangeInput(e.target.value, "height")}
                                                placeholder={'Chiều cao'}
                                            />
                                        </Colxx>
                                    </Colxx>
                                    <Colxx md={6} xl={6}>
                                        <Label className="mt-2" for="providerName">
                                            Tổng tiền thu hộ
                                        </Label>
                                        <Input
                                            type="text"
                                            style={{borderRadius: 10}}
                                            value={cod_amount ? cod_amount : ""}
                                            onChange={(e) => this.onChangeInput(e.target.value, "cod_amount")}
                                            placeholder={'Tổng tiền thu hộ'}
                                        />
                                    </Colxx>
                                    <Colxx md={6} xl={6}>
                                        <Label className="mt-2" for="providerName">
                                            Giá trị hàng hóa
                                        </Label>
                                        <Input
                                            type="text"
                                            style={{borderRadius: 10}}
                                            value={insurance_value ? insurance_value : ""}
                                            onChange={(e) => this.onChangeInput(e.target.value, "insurance_value")}
                                            placeholder={'Giá trị hàng hóa'}
                                        />
                                    </Colxx>
                                </Col>
                            </Row>
                            <Row className="border-bottom pt-2 pb-5">
                                <Col xs={12} sm={12} md={12} xl={12} className="d-flex align-items-center">
                                    <span className="h-100 mr-1" style={{border: '2px solid rgb(241 91 12'}}></span>
                                    <span className="font-weight-bold"
                                          style={{fontSize: 18}}>Gói cước - cho khối lượng</span>
                                </Col>
                                <Col xs={12} sm={12} md={12} xl={12} className="row">
                                    {this.renderServices()}
                                </Col>
                            </Row>
                            <Row className="border-bottom pt-2 pb-5">
                                <Col xs={12} sm={12} md={12} xl={12} className="d-flex align-items-center">
                                    <span className="h-100 mr-1" style={{border: '2px solid rgb(241 91 12'}}></span>
                                    <span className="font-weight-bold" style={{fontSize: 18}}>Lưu ý - Ghi chú</span>
                                </Col>
                                <Col xs={12} sm={12} md={6} xl={6} className="row pt-2">
                                    <Colxx md={12} xl={12}>
                                        <label>
                                            Lưu ý giao hàng
                                        </label>
                                        <Select
                                            components={{Input: CustomSelectInput}}
                                            className="react-select border-radius"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            options={this.deliveryNoteOptions()}
                                            value={this.getDeliveryNote(required_note ? required_note : "")}
                                            onChange={(e) => this.setDeliveryNote(e.value)}
                                        />
                                    </Colxx>
                                    <Colxx md={12} xl={12}>
                                        <Label className="mt-2" for="providerName">
                                            Mã đơn hàng
                                        </Label>
                                        <Input
                                            type="text"
                                            value={client_order_code ? client_order_code : ""}
                                            onChange={(e) => this.onChangeInput(e.target.value, "client_order_code")}
                                            style={{borderRadius: 10}}
                                            placeholder={'Mã đơn hàng'}
                                        />
                                    </Colxx>
                                </Col>
                                <Col xs={12} sm={12} md={6} xl={6} className="row pt-2">
                                    <span>Ghi chú đơn hàng</span>
                                    <textarea className="w-100"
                                              placeholder={'Ghi chú đơn hàng'}
                                              value={note ? note : ""}
                                              onChange={(e) => this.onChangeInput(e.target.value, "note")}
                                              style={{borderRadius: 10}}></textarea>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3} xl={3} className="border-left "
                             style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="row justify-content-between align-items-end">
                                    <Colxx md={6} xl={6}>
                                        <Label className="mt-2" for="providerName">
                                            Mã khuyến mãi
                                        </Label>
                                        <Input
                                            type="text"
                                            style={{borderRadius: 10}}
                                            placeholder={'Mã khuyến mãi'}
                                        />
                                    </Colxx>
                                    <Colxx md={6} xl={6}>
                                        <button className="btn btn-secondary-gradient" style={{color: "white"}}>Áp dụng
                                        </button>
                                    </Colxx>
                                </div>
                            </div>
                            <div>
                                <Colxx className="p-0">
                                    <label>
                                        Tùy chọn thanh toán
                                    </label>
                                    <Select
                                        components={{Input: CustomSelectInput}}
                                        className="react-select border-radius"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={this.getValuePaymentType(payment_type_id ? payment_type_id : 1)}
                                        onChange={(e) => this.setValuePaymentType(e.value)}
                                        options={this.paymentTypeOptions()}
                                    />
                                </Colxx>
                                <div>
                                    <p className="mb-0 text-right font-weight-bold mt-1 mb-1"
                                       style={{color: "#00467f"}}>Tổng phí</p>
                                    <p className="mb-0 text-right font-weight-bold mt-1 mb-1"
                                       style={{color: "#00467f", fontSize: "2.2em"}}>
                                        <NumberFormat value={this.state.fee + this.state.insurance_fee} displayType={'text'}
                                                      thousandSeparator={true} suffix={"đ"}/>
                                    </p>
                                    {
                                        this.state.insurance_fee && this.state.insurance_fee > 0 ?
                                            <p className="mb-0 text-right font-weight-bold mt-1 mb-1"
                                               style={{color: "rgba(252,8,50,0.86)"}}>
                                                Thêm 0.5% phí bảo hiểm:
                                                <NumberFormat value={this.state.insurance_fee} displayType={'text'}
                                                              thousandSeparator={true} suffix={"đ"}/>
                                            </p>
                                            : ''
                                    }
                                    <p className="mb-0 text-right font-weight-bold mt-1 mb-1"
                                       style={{color: "#f26522"}}>Chưa tính tiền thu hộ</p>
                                </div>
                                <div className="d-flex justify-content-end">
                                    {
                                        this.props.type === 'create' ? '' :
                                            (
                                                <div>
                                                    <button className="btn btn-info ml-2 mr-2"
                                                            onClick={() => this.print()}>In đơn hàng
                                                    </button>
                                                    <button className="btn btn-danger ml-2 mr-2"
                                                            onClick={() => this.cancel()}>Hủy
                                                    </button>
                                                </div>
                                            )
                                    }
                                    <button className="btn btn-success"
                                            onClick={() => this.submit()}>{this.props.type === 'create' ? 'Tạo đơn' : 'Cập nhật'}</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {this.renderCancel()}
                </div>

            )
        }else {
            return <div>Loadding...</div>
        }

    }
}

const mapStateToProps = ({orderRedux}) => {
    return {}
};
export default injectIntl(
    connect(
        mapStateToProps,
        {}
    )(GHNDetailt)
);
