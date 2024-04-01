import React, {useEffect, useState} from "react";
import {getDeliveries} from "../../../services/delivery/DeliveryService";
import DeliveryItem from "./DeliveryIten";
const FormDelivery = ()=>{
    const [list,setList] = useState([]);
    useEffect(()=>{
        getDeliveries({page:0,pageSize:20}).then((results)=>{
            setList(results.data.content)
        })
    },[])
    return(
        <div>
            {list.map((item)=>{
                return(
                    <DeliveryItem key={item.id} item={item}/>
                )
            })}
        </div>
    )
}
export default FormDelivery;
