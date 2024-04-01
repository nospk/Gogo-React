import {ADDRESS_GETDICTRICTS, ADDRESS_GETPROVINCES, ADDRESS_GETWARDS} from "./APIURL";


const getProvinces = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(ADDRESS_GETPROVINCES,{method:"GET",headers:header})
    const data = await responses.json();
    return data;
}
const getDictricts = async (provinceId)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(ADDRESS_GETDICTRICTS+"?provinceId="+provinceId,{method:"GET",headers:header})
    const data = await responses.json();
    return data;
}

const getWards = async (dictrictId)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(ADDRESS_GETWARDS+"?dictrictId="+dictrictId,{method:"GET",headers:header})
    const data = await responses.json();
    return data;
}
const create = async ()=>{

}
const deleteById = async ()=>{

}
export default {
    getProvinces:getProvinces,
    getDictricts:getDictricts,
    getWards:getWards,
    create:create,
    deleteById:deleteById
}
