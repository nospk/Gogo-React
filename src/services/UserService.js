import {ROLE_FINDALL, USER_CREATE, USER_EXPORT_USER, USER_FINDALL, USER_FINDONE} from "./APIURL";



const findAll = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(params?USER_FINDALL+"?"+new URLSearchParams(params):USER_FINDALL,{method:"GET",headers:header});
    return await response.json();
}
const findOne = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(USER_FINDONE+"?id="+id,{method:"GET",headers:header});
    return await response.json();
}
const exportUsers = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(USER_EXPORT_USER,{method:"GET",headers:header});
    return await response.json();
}
const create = async (params)=>{
    const dataRequest = {
        id:params.id,
        username:params.username,
        email:params.email,
        phoneNumber:params.phonenumber,
        password:params.password,
        confirmPassword:params.password,
        roleCode:params.roles[0].code
    }
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = await fetch(USER_CREATE,{method:"POST",headers:header,body:JSON.stringify(dataRequest)});
    return await response.json();
}
const deleteById = async ()=>{

}
const changeRole = async ()=>{

}
const findAllRole = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(ROLE_FINDALL,{method:"GET",headers:header});
    return await response.json();
}
const createRole = async ()=>{

}
const deleteRole = async ()=>{

}
export default {
    exportUsers:exportUsers,
    findAll:findAll,
    findOne:findOne,
    create:create,
    deleteById:deleteById,
    changeRole:changeRole,
    findAllRole:findAllRole,
    createRole:createRole,
    deleteRole:deleteRole,
}