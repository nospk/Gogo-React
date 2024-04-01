import {PAGE_DELETE, PAGE_FINDALL, PAGE_FINDONE} from "./APIURL";


const {PAGE_SAVE} = require("./APIURL");

const save = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = await fetch(PAGE_SAVE,{method:"POST",headers:header,body:JSON.stringify(params)});
    return await response.json();
}
const findAll = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response =  await fetch(PAGE_FINDALL+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header});
    return await response.json();
}
const findOne = async (param)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response =  await fetch(PAGE_FINDONE+"?id="+param,{method:"GET",headers:header});
    return await response.json();
}
const deleteById = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response =  await fetch(PAGE_DELETE+"?id="+id,{method:"DELETE",headers:header});
    return await response.json();
}
export default {
    save:save,
    findAll:findAll,
    findOne:findOne,
    deleteById:deleteById

}