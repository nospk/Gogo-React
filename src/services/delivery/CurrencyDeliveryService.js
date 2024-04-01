import {
    DELIVERY_CHANGESTATUS_CURRENCY,
    DELIVERY_COUNT,
    DELIVERY_CURRENCY,
    DELIVERY_CURRENCYCOUNT,
    DELIVERY_STATUS
} from "../APIURL";

export const findAll = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const requestParams = new URLSearchParams(params)
    const responses = await fetch(DELIVERY_CURRENCY+"?"+requestParams.toString(),{method:"GET",headers:header})
    return await responses.json();
}
export const updateCurrency = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(DELIVERY_CURRENCY,{method:"PUT",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
export const changeStatus = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(DELIVERY_CHANGESTATUS_CURRENCY,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
export const deliveryCurrencyCount =  async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(DELIVERY_CURRENCYCOUNT+"?type=currency",{method:"GET",headers:header})
    return await responses.json();
}
