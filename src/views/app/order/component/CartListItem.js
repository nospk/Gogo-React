import React, {useEffect, useState} from "react";
import {Button,Card,Col,Row} from "reactstrap";
import NumberFormat from "react-number-format";
import OrderService from "../../../../services/OrderService";
import moment from "moment";
const CartListItem = ({item,history})=>{
    const [enable,setEnable] = useState(false);
    const [note,setNote] = useState(item.note);
    useEffect(()=>{
        setNote(item.note)
    },[item.note])
    const gotoDetail = ()=>{
        // const location = {pathname: '/admin/order/cart-detail/'+item.id};
        // history.push(location)
        window.open('/admin/order/cart-detail/'+item.id, '_blank').focus()
    }
    const quickEditToggle = ()=>{
        if (enable){
            updateEdit();
        }
        setEnable(!enable);

    }
    const updateEdit = ()=>{
        OrderService.updateCartNote(item.id,note).then((results)=>{

        })
    }
    return(
        <div>
            <Card className="card d-flex mb-3 p-3">
                <Row>
                    <Col xs={10} sm={10} xl={10} md={10}>
                        <Row>
                            <Col xs={4} sm={4} md={4} xl={4}>
                                <Row className="font-weight-bold mt-2 mb-4">
                                    <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 " style={{fontSize: 16}}>Khách hàng:</p></Col>
                                    <Col xs={7} sm={7} md={7} xl={7}>
                                        <p className="mb-0" style={{fontSize: 16,color:'#1811e2'}}>{item.name}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} sm={4} md={4} xl={4}>
                                <Row className="font-weight-bold mt-2 mb-4">
                                    <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0 " style={{fontSize: 16}}>SDT:</p></Col>
                                    <Col xs={7} sm={7} md={7} xl={7}>
                                        <p className="mb-0" style={{fontSize: 16,color:'#1811e2'}}>{item.phone?item.phone:"Chưa có sdt"}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} sm={4} md={4} xl={4}>
                                <Row className="font-weight-bold mt-2 mb-4">
                                    <Col xs={3} sm={3} md={3} xl={3}><p className="mb-0 " style={{fontSize: 16}}>Ghi chú:</p></Col>
                                    <Col xs={9} sm={9} md={9} xl={9}>
                                        <div className="d-flex align-items-center">
                                            {enable?<textarea value={note?note:''} onChange={(e)=>{
                                                setNote(e.target.value)
                                            }}></textarea>:<span>{note}</span>}
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
                                           style={{fontSize: 16}}>#{item.id}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} sm={4} md={4} xl={4}></Col>
                            <Col xs={4} sm={4} md={4} xl={4}>
                                <Row className="font-weight-bold mt-2 mb-4 text-right">
                                    <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Giá vốn:</p></Col>
                                    <Col xs={7} sm={7} md={7} xl={7}>
                                        <NumberFormat value={item.cost ? item.cost : 0}  onValueChange={(e)=>{}}
                                                      displayType={'text'} thousandSeparator={true} suffix={"đ"}/>
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
                                            <NumberFormat value={item.amount ? item.amount : 0}
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
                                        <NumberFormat  value={0} onValueChange={(e)=>{}}
                                                       displayType={'text'} thousandSeparator={true} suffix={"đ"}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} sm={4} md={4} xl={4}>
                                <Row className="font-weight-bold mt-2" style={{ color: "#e75b00"}}>
                                    <Col xs={4} sm={4} md={5} xl={5}><p className="mb-0" style={{fontSize: 16}}>Tổng giỏ hàng:</p></Col>
                                    <Col xs={7} sm={7} md={7} xl={7}>
                                        <p style={{fontSize: 16, fontWeight: "bold"}}>
                                            <NumberFormat value={item.amount ? item.amount : 0}
                                                          displayType={'text'} thousandSeparator={true} suffix={"đ"}/>
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} sm={4} md={4} xl={4}>
                                <Row className="font-weight-bold mt-2 mb-4 text-right d-flex justify-content-end">
                                    <span style={{color:"#e75b00"}}>-----------------------------</span>
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
                                {item.address && item.address.map((address,addressIndex)=>{
                                    return(
                                        <div key={addressIndex} xs={4} sm={4} md={4} xl={4}>
                                            <p className="mb-0 font-weight-bold">Địa chỉ {addressIndex+1}:{address}</p>
                                        </div>
                                    )
                                })}
                            </Col>
                            <Col xs={8} sm={8} md={8} xl={8}>
                                <Row className="font-weight-bold">
                                    <Col xs={6} sm={6} md={6} xl={6}>
                                        <span>Ngày tạo:</span>
                                        <span className="ml-3">{item.createDate?moment(item.createDate).format("DD-MM-YYYY"):'Chưa có ngày tạo'}</span>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} xl={6}>
                                        <span>Ngày cập nhật:</span>
                                        <span className="ml-3">{item.modifiedDate?moment(item.modifiedDate).format("DD-MM-YYYY"):'Chưa có ngày cập nhật'}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                    <Col xs={2} sm={2} xl={2} md={2} className="d-flex justify-content-end">
                        <div>
                            <div className="d-flex flex-column mt-2">
                                <Button className="mt-2" outline color={"primary"} onClick={()=>gotoDetail()}>Xem giỏ hàng</Button>
                                <Button className="mt-2" outline color={!enable?"warning":"danger"} onClick={()=>{quickEditToggle()}}>{!enable?'Sửa nhanh':'Cập nhật'}</Button>
                            </div>
                        </div>
                    </Col>
                </Row>


            </Card>
        </div>
    )
}
export default CartListItem;
