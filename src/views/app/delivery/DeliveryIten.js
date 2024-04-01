import React, {useState} from "react";
import {Card, CardBody, Badge, CustomInput, Col, Row, Button} from "reactstrap";
import * as moment from "moment";
import NumberFormat from "react-number-format";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import {addStatus, updateDelivery} from "../../../services/delivery/DeliveryService";

const DeliveryItem = ({item, changeStatus, dispatch}) => {
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
            case 'cost':setDataTemp({...dataTemp,cost: parseInt(value.value)});break;
            case 'amount':setDataTemp({...dataTemp,amount: parseInt(value.value)});break;
            case 'paid':setDataTemp({...dataTemp,paid: parseInt(value.value)});break;
            case 'fee':setDataTemp({...dataTemp,fee: parseInt(value.value)}) ;break;
            case 'zhId':setDataTemp({...dataTemp,zhId: value});break;
            case 'viId':setDataTemp({...dataTemp,viId: value});break;
            case 'weight':setDataTemp({...dataTemp,weight: value.value});break;
            case 'volume':setDataTemp({...dataTemp,volume: value.value});break;
        }


    }
    const update = () => {
        updateDelivery(dataTemp).then((results)=>{
            setEnableEdit(!enableEdit);
        })
    }
    const onCopy = (text) => {
        NotificationManager.success("Copy thành công", "Thông báo", 3000, null, null, '');
    }

    const handlerOption = (e) => {
        const note = prompt("Vui lòng điền nội dung xác nhận trạng thái", "");
        addStatus({id:item.id,status:e.target.value,note:note}).then((results)=>{
            setDataTemp({...dataTemp,statusList:[...dataTemp.statusList,results.data]})
        })
    }
    const getStatus = () => {
        const statusList = [
            {title: "Đang xử lý", action: "PROCESSING"},
            {title: "Đang đóng gói", action: "PACKING"},
            {title: "Đang vận chuyển", action: "SHIPPING"},
            {title: "Chờ thông quan", action: "AWAITCROSSEDBORDER"},
            {title: "Đã thông quan", action: "CROSSEDBORDER"},
            {title: "Vận chuyển nội địa", action: "INLANDSHIPPING"},
            {title: "Đã hoàn thành", action: "SUCCESS"},
        ]
        return statusList
    }
    const renderOptions = (group) => {
        const options = getStatus();
        const status = dataTemp.statusList[dataTemp.statusList.length-1];
        return (
            <select value={status?status.status:""}
                    onChange={handlerOption}
                    style={{
                        fontSize: 16,
                        padding: 10,
                        borderRadius: 10,
                        textAlign: "center",
                        fontWeight: 'bold',
                        ...getColor(status.status)
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
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Mã TQ:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                {enableEdit?<input className="rounded text-center" value={dataTemp.zhId?dataTemp.zhId:""} onChange={(e) => onChangeValue(e.target.value, 'zhId')}  />:<p>{dataTemp.zhId}</p>}

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Mã VN:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                {enableEdit?<input type="text" className="rounded text-center" onChange={(e) => onChangeValue(e.target.value, 'viId')} value={dataTemp.viId ? dataTemp.viId : ""} />:<p>{dataTemp.viId}</p>}

                                                <p className="mb-0"
                                                   style={{fontSize: 16}}>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 "
                                                                                style={{fontSize: 16}}>Khách hàng:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 mr-2"
                                                       style={{fontSize: 16}}>{item.fullName}</p>
                                                    <CopyToClipboard text={item.phoneNumber} onCopy={() => onCopy()}>
                                                        <div className="glyph-icon iconsminds-file-copy"
                                                             style={{cursor: "pointer"}}></div>
                                                    </CopyToClipboard>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Mã đơn hàng:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0"
                                                   style={{fontSize: 16}}>#{item.id ? item.id : item.id}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}></Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4 text-right">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Giá vốn:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <NumberFormat className="rounded text-center" value={dataTemp.cost ? dataTemp.cost : 0}
                                                              onValueChange={(e) => onChangeValue(e, 'cost')}
                                                              displayType={enableEdit ? 'input' : 'text'}
                                                              thousandSeparator={true} suffix={"đ"}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Tiền hàng:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{fontSize: 16}}>
                                                    <NumberFormat className="rounded text-center"
                                                                  value={dataTemp.amount ? dataTemp.amount : 0}
                                                                  onValueChange={(e) => onChangeValue(e, 'amount')}
                                                                  displayType={enableEdit ? 'input' : 'text'}
                                                                  thousandSeparator={true}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Khối lượng:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0"
                                                   style={{fontSize: 16}}>
                                                    <NumberFormat className="rounded text-center"
                                                                  value={dataTemp.weight ? dataTemp.weight : 0}
                                                                  onValueChange={(e) => onChangeValue(e, 'weight')}
                                                                  displayType={enableEdit ? 'input' : 'text'}
                                                                  thousandSeparator={true} suffix={"kg"}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Thể tích:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0"
                                                   style={{fontSize: 16}}>
                                                    <NumberFormat className="rounded text-center"
                                                                  value={dataTemp.volume ? dataTemp.volume : 0}
                                                                  onValueChange={(e) => onChangeValue(e, 'volume')}
                                                                  displayType={enableEdit ? 'input' : 'text'}
                                                                  thousandSeparator={true} suffix={"m"}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Phí vận
                                                chuyển:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0"
                                                   style={{fontSize: 16}}>
                                                    <NumberFormat className="rounded text-center"
                                                                  value={dataTemp.fee ? dataTemp.fee : 0}
                                                                  onValueChange={(e) => onChangeValue(e, 'fee')}
                                                                  displayType={enableEdit ? 'input' : 'text'}
                                                                  thousandSeparator={true} suffix={"đ"}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4 text-center">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Đã thanh
                                                toán:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <NumberFormat className="rounded text-center"
                                                              value={dataTemp.paid ? dataTemp.paid : 0}
                                                              onValueChange={(e) => onChangeValue(e, 'paid')}
                                                              displayType={enableEdit ? 'input' : 'text'}
                                                              thousandSeparator={true} suffix={"đ"}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row
                                            className="font-weight-bold mt-2 mb-4 text-right d-flex justify-content-end">
                                            <span style={{color: "#e75b00"}}>-----------------------------</span>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2" style={{color: "#e75b00"}}>
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Tổng hóa đơn:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p style={{fontSize: 16, fontWeight: "bold"}}>
                                                    <NumberFormat value={dataTemp.amount ? dataTemp.amount+(dataTemp.fee?dataTemp.fee:0) : 0}
                                                                  displayType={'text'} thousandSeparator={true}
                                                                  suffix={"đ"}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4 text-right"
                                             style={{color: "#e75b00"}}>
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0"
                                                                                style={{fontSize: 16}}>Lợi nhuận:</p>
                                            </Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{fontSize: 16, fontWeight: "bold"}}>
                                                    <NumberFormat value={(dataTemp.amount ? dataTemp.amount+(dataTemp.fee?dataTemp.fee:0) : 0)-(dataTemp.cost?dataTemp.cost:0)}
                                                                  displayType={'text'} thousandSeparator={true}
                                                                  suffix={"đ"}/>
                                                </p>

                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <p className="mb-0 font-weight-bold">Địa chỉ:{item.address}</p>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>

                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3} sm={3} xl={3} md={3} className="d-flex justify-content-end flex-column align-items-end">
                                <div>
                                    {renderOptions("")}
                                </div>
                                <div>
                                    <div className="d-flex flex-column mt-2">
                                        <Button className="mt-2" outline color={"info"}
                                                onClick={() => console.log("asdasd")}>Tạo đơn GHN</Button>
                                        <Button className="mt-2" outline color={"secondary"}
                                                onClick={() => console.log("asdasd")}>Tra cứu</Button>
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
export default React.memo(DeliveryItem);
