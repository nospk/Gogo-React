import {LOG, LOG_DELETE} from "./APIURL";

const findAll = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const responses  = await fetch(LOG+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header})
    return await responses.json();
}
const deleteByIds = async (ids)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const responses  = await fetch(LOG_DELETE,{method:"DELETE",headers:header,body:JSON.stringify(ids)})
    return await responses.json();
}
export default {
    findAll:findAll,
    deleteByIds:deleteByIds
}