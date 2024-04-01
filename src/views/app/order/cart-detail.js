import React, {useEffect, useState} from "react";
import OrderService from "../../../services/OrderService";
import {Col, Row} from "reactstrap";
import validator from "validator/es";
import {DOMAIN} from "../../../services/APIURL";
import NumberFormat from "react-number-format";
import CartListItem from "./component/CartListItem";
const CartDetail = ({match,history})=>{
    const [data,setData] = useState([]);
    const [summary,setSummary] = useState({});
    useEffect(()=>{
       OrderService.cartDetail(match.params.id).then((resutls)=>{
           setData(resutls.data);
           setSummary(resutls.summary);
       })
    },[])
    return(
        <div className="position-relative">
            <CartListItem item={summary} history={history}/>
            {data.categories && data.categories.map((category,catindex)=>{
                    return(
                        <div className="bg-white p-3" key={catindex}>
                            <div>
                                <span className="font-weight-bold ">{category.name}</span>

                            </div>
                            <div>
                                {category.products && category.products.map((product,productIndex)=>{
                                    return(
                                        <Row key={productIndex} className="mb-3 border p-3">
                                            <Col xl={9} sm={9} md={9}>
                                                <Row>
                                                    <Col xl={2} md={2} sm={2}>
                                                        <div>
                                                            <img className="w-100" src={validator.isURL(product.thumbnail)?product.thumbnail:DOMAIN+product.thumbnail}/>
                                                        </div>
                                                    </Col>
                                                    <Col xl={10} md={10} sm={10} xs={10}>
                                                        <span className="font-weight-bold">{product.name}</span>
                                                        <div>
                                                            <Row className="font-weight-bold mt-3">
                                                                <Col xl={4} md={4} sm={4} xs={4}><span>Tên biến thể</span></Col>
                                                                {/*<Col xl={4} md={4} sm={4} xs={4}><span>Giá</span></Col>*/}
                                                                <Col xl={4} md={4} sm={4} xs={4}><span>Số lượng</span></Col>
                                                            </Row>
                                                            {product.variants && product.variants.map((variant,variantIndex)=>{
                                                                return(
                                                                    <Row className="mt-3" key={variantIndex}>
                                                                        <Col xl={4} md={4} sm={4} xs={4}><span>{variant.name}</span></Col>
                                                                        {/*<Col xl={4} md={4} sm={4} xs={4}><span>{variant.price}</span></Col>*/}
                                                                        <Col xl={4} md={4} sm={4} xs={4}><span>{variant.quantity}</span></Col>
                                                                    </Row>
                                                                )
                                                            })}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} xl={3}>
                                                <div>
                                                    <span className="font-weight-bold">Tổng tiền:</span>
                                                    <NumberFormat className="font-weight-bold ml-3" style={{color:"#e20e0e"}} value={product.amount ? product.amount: 0} displayType={'text'} thousandSeparator={true} suffix={"đ"}/>

                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                })}

                            </div>
                        </div>
                    )
                })}

        </div>


    )
}
export default CartDetail;