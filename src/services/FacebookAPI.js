import {
    FACEBOOK_CANCEL,
    FACEBOOK_COUNT_UPLOADED,
    FACEBOOK_CREATE_POST,
    FACEBOOK_DELETE_POST,
    FACEBOOK_FINDALL
} from "./APIURL";

const GETPAGEACCESSTOKEN = "https://graph.facebook.com/1298371137286618/accounts";
const VERSION = "";
const getPageAccessToken = async (params)=>{
    const responses = await fetch("https://graph.facebook.com/"+params.id+"/accounts?access_token="+params.accessToken);
    return await responses.json();
}
const createPost = async (categoryId)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(FACEBOOK_CREATE_POST+"?catId="+categoryId,{method:"GET",headers:header});
    return await responses.json();
}
const deletePost = async (categoryId)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(FACEBOOK_DELETE_POST+"?catId="+categoryId,{method:"GET",headers:header});
    return await responses.json();
}
const findAllUploaded = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(FACEBOOK_FINDALL+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header});
    return await responses.json();
}
const countUploaded = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(FACEBOOK_COUNT_UPLOADED+"?catId="+params,{method:"GET",headers:header});
    return await responses.json();
}
const cancel = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(FACEBOOK_CANCEL,{method:"GET",headers:header});
    return await responses.json();
}
export default {
    getPageAccessToken:getPageAccessToken,
    createPost:createPost,
    deletePost:deletePost,
    findAllUploaded:findAllUploaded,
    countUploaded:countUploaded,
    cancel:cancel,



}