import {PARTNER_DELETE, PARTNER_FINDALL, PARTNER_SAVE} from "./APIURL";

const findAll = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response =  await fetch(PARTNER_FINDALL,{method:"GET",headers:header});
    return await response.json();

}
const save = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = await fetch(PARTNER_SAVE,{method:"POST",headers:header,body:JSON.stringify(params)});
    return await response.json();
}
const deleteById = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response =  await fetch(PARTNER_DELETE+"?id="+id,{method:"DELETE",headers:header});
    return await response.json();
}
export default {
    findAll:findAll,
    save:save,
    deleteById:deleteById

}