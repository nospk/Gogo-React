import {DELIVERY_ADD_STATUS, DELIVERY_COUNT, DELIVERY_ORDER, DELIVERY_STATUS, ORDER_TRACKING} from "../APIURL";

export const getOrder = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const requestParams = new URLSearchParams(params)
    const responses = await fetch(DELIVERY_ORDER+"?"+requestParams.toString(),{method:"GET",headers:header})
    return await responses.json();
}
export const updateOrder = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(DELIVERY_ORDER,{method:"PUT",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
export const addStatus = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(DELIVERY_ADD_STATUS,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
export const deliveryOrderCount =  async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(DELIVERY_COUNT+"?type=order",{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
