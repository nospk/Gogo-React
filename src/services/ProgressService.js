import {FIND_PROGRESS} from "./APIURL";

const getProgress = async (code)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response =  await fetch(FIND_PROGRESS+"?code="+code,{method:"GET",headers:header});
    return await response.json();
}
export default {
    getProgress:getProgress
}