import React, {useState} from "react";
import {Card, CardBody, Badge, CustomInput, Col, Row, Button} from "reactstrap";
import * as moment from "moment";
import NumberFormat from "react-number-format";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import {addStatus, updateOrder} from "../../../services/delivery/OrderDeliveryService";
import {updateCurrency} from "../../../services/delivery/CurrencyDeliveryService";

const DeliveryCurrency = ({item, dispatch}) => {
    const [dataTemp, setDataTemp] = useState(item);
    const [enableEdit, setEnableEdit] = useState(false);

    const getColor = (status) => {
        switch (status) {
            case "INLANDSHIPPING":
                return {background: "#d2ef1d", color: "#d608ec"}
            case "PROCESSING":
                return {background: "#a15cea", color: "#ffffff"}
            case "failed":
                return {background: "#ff0000", color: "#000"}
            case "SHIPPING":
                return {background: "#e8aa2b", color: "#000"}
            case "awaitingadditionaldelivery":
                return {background: "#d2ef1d", color: "#000"}
            case "AWAITCROSSEDBORDER":
                return {background: "#0e3ee5", color: "#ffffff"}
            case "CROSSEDBORDER":
                return {background: "#0da225", color: "#000"}
            case "PACKING":
                return {background: "#f50bbb", color: "#ffffff"}
            case "SUCCESS":
                return {background: "#04f13f", color: "#000"}
        }
        return ""
    }
    const getDateTime = (time) => {
        const now = new Date();
        const driff = now.getTime() - time;
        const second = parseInt(driff / 1000);
        const minute = parseInt(driff / (60 * 1000));
        const hour = parseInt(driff / (60 * 60 * 1000));
        const day = parseInt(driff / (24 * 60 * 60 * 1000));
        if (day <= 0) {
            if (hour <= 0) {
                if (minute <= 0) {
                    return "Phút trước"
                } else {
                    return minute + " Phút trước";
                }
            } else {
                return hour + " Giờ trước";
            }
        } else {
            return moment(item.createDate).format("DD/MM/YYYY")
        }
    }

    const quickEdit = () => {
        if (enableEdit) {
            setDataTemp(item)
        } else {
            setDataTemp(item);
        }
        setEnableEdit(!enableEdit);
    }
    const onChangeValue = (value, field) => {
        switch (field) {
            case 'amount':setDataTemp({...dataTemp,amount: parseInt(value.value)});break;
        }


    }
    const update = () => {
        updateCurrency(dataTemp).then((results)=>{
            setEnableEdit(!enableEdit);
        })

    }
    const onCopy = (text) => {
        NotificationManager.success("Copy thành công", "Thông báo", 3000, null, null, '');
    }

    const handlerOption = (e) => {
        const dataUpdate = {...dataTemp};
        dataUpdate.status = e.target.value
        updateCurrency(dataUpdate).then((results)=>{
            setDataTemp(dataUpdate);
        })
    }
    const getStatus = () => {
        const statusList = [
            {title: "Đang xử lý", action: "PROCESSING"},
            {title: "Chờ thanh toán", action: "WAITFORPAYMENT"},
            {title: "Đã hoàn thành", action: "SUCCESS"},
        ]
        return statusList
    }
    const renderOptions = () => {
        const options = getStatus();

        return (
            <select value={dataTemp.status?dataTemp.status:""}
                    onChange={handlerOption}
                    style={{
                        fontSize: 16,
                        padding: 10,
                        borderRadius: 10,
                        textAlign: "center",
                        fontWeight: 'bold',
                    }}>
                {options.map((option, index) => {
                    return (
                        <option key={index} style={{padding: 10, marginTop: 10, height: 10}}
                                value={option.action}>{option.title}</option>
                    )
                })}
            </select>
        )

    }
    return (
        <Col xs={12}>
            <Card className="card d-flex mb-3">
                <div className="min-width-zero">
                    <CardBody>
                        <Row>
                            <Col xs={9} sm={9} xl={9} md={9}>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 "
                                                                                style={{fontSize: 16}}>Ngày tạo:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{
                                                    fontSize: 16,
                                                    color: '#1811e2'
                                                }}>{getDateTime(item.createDate)}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 "
                                                                                style={{fontSize: 16}}>Tên khách hàng:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{
                                                    fontSize: 16,
                                                    color: '#1811e2'
                                                }}>{item.fullName}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 "
                                                                                style={{fontSize: 16}}>Số điện thoại:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{
                                                    fontSize: 16,
                                                    color: '#1811e2'
                                                }}>{item.phoneNumber}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 "
                                                                                style={{fontSize: 16}}>Số tiền:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <NumberFormat className="rounded text-center"
                                                              style={{ fontSize: 16, color: '#1811e2'}}
                                                              value={dataTemp.amount ? dataTemp.amount : 0}
                                                              onValueChange={(e) => onChangeValue(e, 'amount')}
                                                              displayType={enableEdit ? 'input' : 'text'}
                                                              thousandSeparator={true} suffix={"đ"}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3} sm={3} xl={3} md={3} className="d-flex justify-content-end flex-column align-items-end">
                                <div>
                                    {renderOptions()}
                                </div>
                                <div>
                                    <div className="d-flex flex-column mt-2">
                                        <Button className="mt-2" outline color={enableEdit ? "danger" : "warning"}
                                                onClick={() => {
                                                    quickEdit()
                                                }}>{enableEdit ? 'Hủy sửa' : 'Sửa nhanh'}</Button>
                                        {enableEdit ?
                                            <Button className="mt-2" outline color={"success"} onClick={() => {
                                                update()
                                            }}>Cập nhật</Button> : ''}

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>

                </div>

            </Card>
        </Col>
    );
};
export default React.memo(DeliveryCurrency);
