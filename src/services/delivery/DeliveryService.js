import {DELIVERY, DELIVERY_ADD_STATUS, DELIVERY_COUNT, DELIVERY_ORDER, DELIVERY_STATUS} from "../APIURL";

export const getDeliveries = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const requestParams = new URLSearchParams(params)
    const responses = await fetch(DELIVERY+"?"+requestParams.toString(),{method:"GET",headers:header})
    return await responses.json();
}
export const updateDelivery = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(DELIVERY,{method:"PUT",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
export const addStatus = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(DELIVERY_STATUS,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
export const deliveryCount =  async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(DELIVERY_COUNT+"?type=delivery",{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
