import {
    ORDER_FINDALL,
    ORDER_FINDBYID,
    ORDER_GETMETHODANDSTATUS,
    ORDER_CREATE,
    ORDER_ACTION,
    ORDER_QUICKVIEW_UPDATE,
    ORDER_COUNT_BY_STATUS,
    ORDER_STATICTIS_PRODUCT,
    CART_LIST,
    CART_DETAIL,
    ORDER_TRACKING,
    ORDER_EXCHANGE_RATE_TRACKING, ORDER_STATICTIS_TRACKING, ORDER_SPLIT
} from "./APIURL";
import {ORDER_CHANGE_STATUS} from "../redux/actions";

const findAll = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = fetch(ORDER_FINDALL+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    //console.log(response)
    return response;
}
const findById = async (param)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(ORDER_FINDBYID+"?id="+param,{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
const create = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = await fetch(ORDER_CREATE,{method:"POST",headers:header,body:JSON.stringify(params)});
    return await response.json();
}
const changeStatus = async (params)=>{

}
const changeStatusIds = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_ACTION,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}

const merge = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_ACTION,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}

const deleteById = async (params)=>{

}
const deleteByIds = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_ACTION,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
const getMethodsAndStatusList = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(ORDER_GETMETHODANDSTATUS,{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
const addToTrash = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_ACTION,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
const update = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_QUICKVIEW_UPDATE,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
const countByStatus = async(params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_COUNT_BY_STATUS+"?status="+params,{method:"POST",headers:header});
    const data = await response.json()
    return data;
}
const statictisProduct = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_STATICTIS_PRODUCT,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
const actions = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_ACTION,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
const cartList = async (params)=>{
    const requestParams = new URLSearchParams(params);

    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(CART_LIST+"?"+requestParams.toString(),{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
const cartDetail = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(CART_DETAIL+"?id="+id,{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
const updateCartNote = async (id,note)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(CART_DETAIL+"?id="+id+"&note="+note,{method:"POST",headers:header});
    const data = await response.json()
    return data;
}
const getTracking = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(ORDER_TRACKING+"?orderId="+id,{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
const updateTracking = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_TRACKING,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
const deleteTracking = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(ORDER_TRACKING+"?trackId="+id,{method:"DELETE",headers:header});
    const data = await response.json()
    return data;
}
const getExchangeRateTracking = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(ORDER_EXCHANGE_RATE_TRACKING,{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
const updateExchangeRateTracking = async (value)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(ORDER_EXCHANGE_RATE_TRACKING+"?value="+value,{method:"POST",headers:header});
    const data = await response.json()
    return data;
}
const statictisTracking = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(ORDER_STATICTIS_TRACKING,{method:"GET",headers:header});
    const data = await response.json()
    return data;
}
const split = async (params) => {
    const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
    const response = await fetch(ORDER_SPLIT,{method:"POST",headers:header,body:JSON.stringify(params)});
    const data = await response.json()
    return data;
}
export const getStatus = ()=>{
    const statusList = [
        {title:"Hủy đơn hàng", action:"cancel",group:"delivery"},
        {title:"Đã hoàn thành", action:"success",group:"delivery"},
        {title:"Đang xử lý", action:"processing",group:"delivery"},
        {title:"Đang vận chuyển", action:"shipping",group:"delivery"},
        {title:"Chờ Phát Bổ Sung", action:"awaitingadditionaldelivery",group:"delivery"},
        {title:"Đã chốt đơn", action:"purchased",group:"delivery"},
        {title:"Đợi hàng về", action:"waitingreceived",group:"delivery"},
        {title:"Đã phát hết", action:"deliveredall",group:"delivery"},
        {title:"Khách đã nhận", action:"customerreceived",group:"delivery"},
        {title:"Chờ thanh toán", action:"pendding",group:"cashflow"},
        {title:"Đã thanh một phầm", action:"partiallypaid",group:"cashflow"},
        {title:"Đã thanh toán", action:"paid",group:"cashflow"},
    ]
    return statusList
}
export default {
    statictisTracking:statictisTracking,
    getExchangeRateTracking:getExchangeRateTracking,
    updateExchangeRateTracking:updateExchangeRateTracking,
    getTracking:getTracking,
    updateTracking:updateTracking,
    deleteTracking:deleteTracking,
    updateCartNote:updateCartNote,
    cartList:cartList,
    cartDetail:cartDetail,
    findAll:findAll,
    findById:findById,
    create:create,
    changeStatus:changeStatus,
    deleteById:deleteById,
    changeStatusIds:changeStatusIds,
    merge:merge,
    deleteByIds:deleteByIds,
    addToTrash:addToTrash,
    getMethodsAndStatusList:getMethodsAndStatusList,
    update:update,
    countByStatus:countByStatus,
    statictisProduct:statictisProduct,
    actions:actions,
    split: split,
}
