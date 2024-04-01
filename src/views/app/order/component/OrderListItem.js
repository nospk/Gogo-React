import React, {useState} from "react";
import {Card, CardBody, Badge, CustomInput, Col, Row, Button} from "reactstrap";
import * as moment from "moment";
import NumberFormat from "react-number-format";
import {PRINT} from "../../../../services/APIURL";
import GHNService, {tracking} from "../../../../services/GHNService";
import {NotificationManager} from "../../../../components/common/react-notifications";
import OrderService, {getStatus} from "../../../../services/OrderService";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import Switch from "rc-switch";
const OrderListItem = ({item, handleCheckChange,changeStatus, isSelected, onClick,history,dispatch,openTrackingOrder,trackingData,openTrackingGHN,ghnData,reload}) => {
    const [dataTemp,setDataTemp] = useState(null);
    const [enableEdit,setEnableEdit] = useState(false);
    const getColor = (status) => {
        switch (status) {
            case "pendding":
                return {background: "#d2ef1d", color: "#d608ec"}
            case "cancel":
                return {background: "red", color: "#000"}
            case "processing":
                return {background: "#a15cea", color: "#ffffff"}
            case "failed":
                return {background: "#ff0000", color: "#000"}
            case "shipping":
                return {background: "#e8aa2b", color: "#000"}
            case "awaitingadditionaldelivery":
                return {background: "#d2ef1d", color: "#000"}
            case "partiallypaid":
                return {background: "#0e3ee5", color: "#ffffff"}
            case "paid":
                return {background: "#0da225", color: "#000"}
            case "refunded":
                return {background: "#f50bbb", color: "#ffffff"}
            case "success":
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
    const getStatusName = (status)=>{
        switch (status){
            case "pendding": return "Chờ thanh toán";
            case "cancel": return "Hủy đơn hàng";
            case "success": return "Đã hoàn thành";
            case "processing": return "Đang xử lý";
            case "failed": return "Thất bại";
            case "shipping": return "Đang vận chuyển";
            case "awaitingadditionaldelivery": return "Phát Bổ Sung";
            case "partiallypaid": return "Thanh toán một phần";
            case "paid": return "Đã thanh toán";
            case "refunded": return "Đã hoàn lại tiền";
            default: return status;
        }
    }
    const gotoDetail = (id)=>{
        window.open('/admin/order/create/'+id, '_blank').focus()
    }
    const print = (id)=>{
        const requestData = PRINT+"?id="+id
        window.open(requestData, '_blank').focus()
    }
    const createOrderGHN = (id)=>{
        window.open( '/admin/ghn/list/'+id, '_blank').focus()

    }
    const tracking = (id)=>{
        GHNService.tracking(id).then((results)=>{
            if (results.success){
                window.open(results.data,"_blank").focus();
            }else {
                NotificationManager.error("Chưa tạo đơn hàng GHN", "Thông báo", 3000, null, null, '');
            }
        })
    }
    const quickEdit = ()=>{
        if (enableEdit){
            dispatch(dataTemp);
        }else {
            setDataTemp({...item});
        }
        setEnableEdit(!enableEdit);
    }
    const onChangeValue = (value,field)=>{
        switch (field){
            case 'cost': item.cost = parseInt(value.value); break;
            case 'incurredCost': item.incurredCost = parseInt(value.value); break;
            case 'paid': item.paid = parseInt(value.value); break;
            case 'ship': item.ship = parseInt(value.value); break;
            case 'note': item.note = value; break;
            case 'adminNote': item.adminNote = value; break;
        }
        updateData();
    }
    const updateData = ()=>{
        const orderAmount = item.productAmount+item.ship;
        const profit = item.productAmount-item.cost-item.incurredCost;
        const cod = orderAmount-item.paid;
        const profitMargin = parseFloat(profit/item.productAmount).toFixed(2);
        dispatch({...item,profit:profit,profitMargin:profitMargin,cod:cod,orderAmount:orderAmount});

    }
    const update = ()=>{
        OrderService.update(item).then((results)=>{
            if (results.success){
                NotificationManager.success("Cập nhật thành công","Thông báo",2000)
                setEnableEdit(false);
            }
        })

    }
    const onCopy = (text)=>{
        NotificationManager.success("Copy thành công", "Thông báo", 3000, null, null, '');
    }
    const getTracking =()=>{
        const filter = trackingData.filter((itemTracking)=>itemTracking.orderId===item.id);
        return filter;
    }
    const getColorTracking = (status,received)=>{
        if (received){
            return "bg-success text-white" ;
        }
        switch (status){
            case "SIGN": return "bg-info text-white" ;
            case "DELIVERING": return "bg-warning text-black" ;
            case "TRANSPORT": return "bg-primary text-black" ;
            case "delivering": return "bg-primary text-black" ;
            case "delivered": return "bg-success text-white" ;
            case "returned": return "bg-success text-white" ;
            case "damage": return "bg-danger text-white" ;
            case "lost": return "bg-danger text-white" ;
            case "delivery_fail": return "bg-danger text-white" ;
            default:return " text-black border";
        }
    }
    const getStatusNameGHN = (status)=>{
        switch (status){
            case "delivering": return "Đang vận chuyển" ;
            case "delivered": return "Đã giao hàng " ;
            case "returned": return "Đã hoàn thành" ;
            case "damage": return "Hỏng hàng" ;
            case "lost": return "Mất hàng" ;
            case "delivery_fail": return "Giao hàng thất bại" ;
            default:return "Đã tạo";
        }
    }
    const gotoDetailtTracking = (orderCode)=>{
        window.open("https://trade.1688.com/order/new_step_order_detail.htm?orderId="+orderCode, '_blank').focus()
    }
    const getTrackingGHN =()=>{
        const filter = ghnData.filter((itemTracking)=>itemTracking.orderId===item.id);
        return filter;
    }
    const gotoDetailtTrackingGHN = (orderCode)=>{
        window.open("https://donhang.ghn.vn/?order_code="+orderCode, '_blank').focus()
    }
    const onChangeValueSwitch = (value, field, index) => {
        item.tracking[index].received = value;
        OrderService.updateTracking(item.tracking).then((results)=>{
            reload()
            NotificationManager.success("Cập nhật thành công","Thông báo",2000)
        })
    }
    const renderTracking = ()=>{
        return getTracking().map((itemTracking,index)=>{
            //console.log(itemTracking)
            return(
                <div key={index} style={{cursor:"pointer"}} className={"p-2 shadow-sm h-full rounded-sm font-weight-bold "+getColorTracking(itemTracking.statusZh,itemTracking.received)}>
                    <p className="mb-0 text-center " onClick={()=>{gotoDetailtTracking(itemTracking.orderCode)}}>{itemTracking.name}</p>
                    {itemTracking.receiptDate? <p className="mb-0 text-center ">{moment(itemTracking.receiptDate).format("DD/MM/YYYY").toString()}</p>:''}
                    <p>{itemTracking.landingCode}</p>
                    <div></div>
                    <Switch
                                        className="custom-switch custom-switch-secondary mx-auto"
                                        checked={itemTracking.received}
                                        onChange={switchCheckedSecondary => {
                                            onChangeValueSwitch(switchCheckedSecondary, 'received', index)
                                        }}
                                    />
                </div>
            )
        })
    }
    const renderTrackingGHN = ()=>{
        return getTrackingGHN().map((itemTracking,index)=>{
            return(
                <div key={index} onClick={()=>{gotoDetailtTrackingGHN(itemTracking.orderCodeGhn)}} style={{cursor:"pointer"}}
                     className={"p-2 shadow-sm rounded-sm font-weight-bold "+getColorTracking(itemTracking.status)}>
                    <div className="d-flex" style={{gap:10}}>
                        <span className="mb-0 text-center ">{itemTracking.productName}</span>
                        <span className="mb-0 text-center ">
                            <NumberFormat value={itemTracking.cod?itemTracking.cod:0}
                                          displayType={'text'}
                                          prefix={'COD:'}
                                          thousandSeparator={true}/>
                        </span>
                    </div>
                    <div className="d-flex" style={{gap:10}}>
                        <p className="mb-0 text-center ">{getStatusNameGHN(itemTracking.status)}</p>
                        <span className="mb-0 text-center ">Ngày:{moment(itemTracking).format("DD/MM/YYYY")}</span>
                    </div>

                </div>
            )
        })
    }
    const handlerOption = (target)=>{
        changeStatus(item.id,target.target.value,item)
    }
    const renderOptions = (group)=>{

        const options = getStatus();
        let filter = options.filter((option)=>option.group===group)
        const statusOption = group==="delivery"?item.status:item.cashflowStatus;
        if (!statusOption){
            filter = [{title:"Chưa có dữ liệu", action:"noaction",}].concat(filter);
        }
        return (
            <select value={statusOption?statusOption:""}
                    onChange={handlerOption}
                    style={{ fontSize:16,padding: 10,borderRadius: 10,textAlign: "center",fontWeight:'bold', ...getColor(statusOption)}}>
                {filter.map((option,index)=>{
                    return(
                        <option key={index} style={{padding:10,marginTop:10,height:10}}
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
                        <Row >
                            <Col xs={9} sm={9} xl={9} md={9}>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 " style={{fontSize: 16}}>Ngày tạo:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{fontSize: 16,color:'#1811e2'}}>{getDateTime(item.createDate)}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} xl={8}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={3} sm={3} md={3} xl={3}><p className="mb-0 " style={{fontSize: 16}}>Ký lục:</p></Col>
                                            <Col xs={9} sm={9} md={9} xl={9}>
                                                {
                                                    enableEdit?<textarea className="w-100" value={item.adminNote} onChange={(e)=>{onChangeValue(e.target.value,'adminNote')}}/>: <p className="mb-0 mr-2" style={{fontSize: 16}}>{item.adminNote}</p>
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 " style={{fontSize: 16}}>Khách hàng:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                               <div className="d-flex align-items-center">
                                                   <p className="mb-0 mr-2"
                                                      style={{fontSize: 16}}>{item.fullName}</p>
                                                    <CopyToClipboard text={item.phoneNumber} onCopy={()=>onCopy()}>
                                                        <div className="glyph-icon iconsminds-file-copy" style={{cursor:"pointer"}}></div>
                                                    </CopyToClipboard>

                                               </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} xl={8}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={3} sm={3} md={3} xl={3}><p className="mb-0 " style={{fontSize: 16}}>Ghi chú:</p></Col>
                                            <Col xs={9} sm={9} md={9} xl={9}>
                                                <div className="d-flex align-items-center">
                                                    {
                                                        enableEdit?<textarea className="w-100" value={item.note} onChange={(e)=>{onChangeValue(e.target.value,'note')}}/>: <p className="mb-0 mr-2" style={{fontSize: 16}}>{item.note}</p>
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Mã đơn hàng:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0"
                                                   style={{fontSize: 16}}>#{item.orderCode?item.orderCode:item.id}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}></Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4 text-right">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Giá vốn:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <NumberFormat value={item.cost ? item.cost : 0}  onValueChange={(e)=>onChangeValue(e,'cost')}
                                                              displayType={enableEdit?'input':'text'} thousandSeparator={true} suffix={"đ"}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Tiền hàng:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{fontSize: 16}}>
                                                    <NumberFormat value={item.productAmount ? item.productAmount : 0}
                                                                  displayType={'text'} thousandSeparator={true} suffix={"đ"}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}></Col>
                                    <Col xs={4} sm={4} md={4} xl={4} >
                                        <Row className="font-weight-bold mt-2 mb-4 text-right" >
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Chi phí khác:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <NumberFormat  value={item.incurredCost ? item.incurredCost : 0} onValueChange={(e)=>onChangeValue(e,'incurredCost')}
                                                              displayType={enableEdit?'input':'text'} thousandSeparator={true} suffix={"đ"}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>

                                        <Row className="font-weight-bold mt-2 mb-4">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Phí vận chuyển:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0"
                                                   style={{fontSize: 16}}>
                                                    <NumberFormat value={item.ship ? item.ship : 0} onValueChange={(e)=>onChangeValue(e,'ship')}
                                                                  displayType={enableEdit?'input':'text'} thousandSeparator={true} suffix={"đ"}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4 text-center">
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Đã thanh toán:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <NumberFormat value={item.paid ? item.paid : 0} onValueChange={(e)=>onChangeValue(e,'paid')}
                                                              displayType={enableEdit?'input':'text'} thousandSeparator={true} suffix={"đ"}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4 text-right d-flex justify-content-end">
                                            <span style={{color:"#e75b00"}}>-----------------------------</span>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2" style={{ color: "#e75b00"}}>
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Tổng hóa đơn:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p style={{fontSize: 16, fontWeight: "bold"}}>
                                                    <NumberFormat value={item.orderAmount ? item.orderAmount : 0}
                                                                  displayType={'text'} thousandSeparator={true} suffix={"đ"}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4 text-center" style={{ color: "#e75b00"}}>
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>COD:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{fontSize: 16, fontWeight: "bold"}}>
                                                    <NumberFormat value={item.cod ? item.cod : 0}
                                                                  displayType={'text'} thousandSeparator={true} suffix={"đ"}/>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 mb-4 text-right" style={{ color: "#e75b00"}}>
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Lợi nhuận:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p className="mb-0" style={{fontSize: 16, fontWeight: "bold"}}>
                                                    <NumberFormat value={item.profit ? item.profit : 0}
                                                                  displayType={'text'} thousandSeparator={true} suffix={"đ"}/>
                                                </p>

                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <p className="mb-0 font-weight-bold">Địa chỉ:{item.fullAddress}</p>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>

                                    </Col>
                                    <Col xs={4} sm={4} md={4} xl={4}>
                                        <Row className="font-weight-bold mt-2 text-right" style={{color:"#a09d9d"}}>
                                            <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Tỉ suất:</p></Col>
                                            <Col xs={7} sm={7} md={7} xl={7}>
                                                <p style={{fontSize: 16, fontWeight: "bold"}}>
                                                    {item.profitMargin*100}%
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3} sm={3} xl={3} md={3} className="d-flex justify-content-end">

                                <div>
                                    <div>
                                        {item.lazadaOrder?<span style={{
                                            fontWeight: "bold",
                                            border: "1px solid",
                                            textAlign: "center",
                                            borderRadius: 10,
                                            background: "#e74949",
                                            color: "white",
                                            padding: 10,
                                            display:"block"
                                        }}>Lazada</span>:""}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-column" style={{gap:10}}>
                                            {renderOptions("delivery")}
                                            {item.status==="success" || item.status==="cancel"?"":renderOptions("cashflow")}
                                        </div>
                                        <CustomInput
                                            className="itemCheck mb-0 ml-3"
                                            type="checkbox"
                                            id={`${item.id}`}
                                            checked={isSelected}
                                            onClick={() => {
                                                handleCheckChange(item)
                                            }}
                                            onChange={() => {

                                            }}
                                        />
                                    </div>
                                    <div className="d-flex flex-column mt-2">

                                        <Button className="mt-2" outline color={"info"} onClick={()=>openTrackingGHN(item.id,item.fullName)}>Tạo đơn GHN</Button>
                                        <Button className="mt-2" outline color={"secondary"} onClick={()=>tracking(item.id)}>Tra cứu</Button>
                                        <Button className="mt-2" outline color={"primary"} onClick={()=>{gotoDetail(item.id)}}>Xem hóa đơn</Button>
                                        <Button className="mt-2" outline color={"warning"} onClick={()=>{print(item.id)}}>In đơn hàng</Button>
                                        <Button className="mt-2" outline color={enableEdit?"danger":"warning"} onClick={()=>{quickEdit()}}>{enableEdit?'Hủy sửa':'Sửa nhanh'}</Button>
                                        {enableEdit?<Button className="mt-2" outline color={"success"} onClick={()=>{update()}}>Cập nhật</Button>:''}
                                        <Button className="mt-2" outline color={"info"} onClick={()=>openTrackingOrder(item.id,item.fullName)}>Theo dõi DHTQ</Button>

                                    </div>
                                </div>
                            </Col>


                        </Row>
                        {
                            getTracking().length>0?
                                <div className="d-flex mt-3 flex-wrap align-items-stretch align-items-center" style={{gap:10}}>
                                    <span className="font-weight-bold text-uppercase">TQ</span>
                                    {renderTracking()}
                                </div>:''
                        }
                        {
                            getTrackingGHN().length>0?
                                <div className="d-flex mt-3 flex-wrap align-items-stretch align-items-center" style={{gap:10}}>
                                    <span className="font-weight-bold text-uppercase">GHN</span>
                                    {renderTrackingGHN()}
                                </div>:''
                        }


                    </CardBody>

                </div>

            </Card>
        </Col>
    );
};
export default React.memo(OrderListItem);
