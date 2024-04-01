import React, {useEffect, useState} from "react";
import {findAll} from "../../../services/delivery/CurrencyDeliveryService";
import DeliveryCurrency from "./DeliveryCurrency";
const FormCurrencyConversion = ()=>{
    const [list,setList] = useState([]);
    useEffect(()=>{
        findAll({page:0,pageSize:20}).then((results)=>{
            console.log(results);
            setList(results.data.content)
        })
    },[])

    return(
        <div>
            {list.map((item,index)=>{
                return(
                    <DeliveryCurrency key={index} item={item}/>
                )
            })}
        </div>
    )
}
export default FormCurrencyConversion;
