import React, {useEffect, useState} from "react";
import {getOrder} from "../../../services/delivery/OrderDeliveryService";
import DeliveryOrderItem from "./DeliveryOrderItem";
const FormOrder = ()=>{
    const [list,setList] = useState([]);
    useEffect(()=>{
        getOrder({page:0,pageSize:20}).then((results)=>{
            console.log(results);
            setList(results.data.content)
        })
    },[])
    return(
        <div>
            {list.map((item)=>{
                return(
                    <DeliveryOrderItem key={item.id} item={item}/>
                )
            })}
        </div>
    )
}
export default FormOrder;
