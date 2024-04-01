import {
    GHN_CANCEL,
    GHN_FEE, GHN_FINDALLBYORDERID,
    GHN_LIST,
    GHN_ORDER,
    GHN_PICK_SHIFT,
    GHN_PRINT,
    GHN_SERVICE,
    GHN_SETTING,
    GHN_SHOP, GHN_TRACKING
} from "./APIURL";

export const getData = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_SETTING,{method:"GET",headers:header});
    return await responses.json()
}
export const update = async (data)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const responses = await fetch(GHN_SETTING,{method:"POST",headers:header,body:JSON.stringify(data)});
    return await responses.json()
}
export const createOrder = async (token,data)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const responses = await fetch(GHN_ORDER+"?token="+token,{method:"POST",headers:header,body:JSON.stringify(data)});
    return await responses.json()
}
export const getShopByToken = async (token)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_SHOP+"?token="+token,{method:"GET",headers:header});
    return await responses.json()
}
export const getDataOrder = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_ORDER+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header});
    return await responses.json()
}
export const getPickShift = async (token)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_PICK_SHIFT+"?token="+token,{method:"GET",headers:header});
    return await responses.json()
}
export const getFee = async (token,data)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const responses = await fetch(GHN_FEE+"?token="+token,{method:"POST",headers:header,body:JSON.stringify(data)});
    return await responses.json()
}
export const getService = async (token,to_district)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_SERVICE+"?"+new URLSearchParams({token:token,to_district:to_district}).toString(),{method:"GET",headers:header});
    return await responses.json()
}
export const getList = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_LIST,{method:"GET",headers:header});
    return await responses.json()
}
export const print = async (order_code)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_PRINT+"?order_code="+order_code,{method:"GET",headers:header});
    return await responses.json()
}
export const cancel = async (order_code)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_CANCEL+"?order_code="+order_code,{method:"GET",headers:header});
    return await responses.json()
}
export const tracking = async (orderId)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_TRACKING+"?orderId="+orderId,{method:"GET",headers:header});
    return await responses.json()
}
export const findAllByOrderId = async (orderId)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(GHN_FINDALLBYORDERID+"?orderId="+orderId,{method:"GET",headers:header});
    return await responses.json()
}
export default {
    findAllByOrderId:findAllByOrderId,
    getData:getData,
    update:update,
    getShopByToken:getShopByToken,
    getDataOrder:getDataOrder,
    getPickShift:getPickShift,
    getFee:getFee,
    getService:getService,
    createOrder:createOrder,
    getList:getList,
    print:print,
    cancel:cancel,
    tracking:tracking
}
