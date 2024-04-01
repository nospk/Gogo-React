import {DICTIONARY_BASE, DICTIONARY_EXCEL, EXTENSION_EXCEL} from "./APIURL";

export const findAll = async (page,pageSize,search) => {
    const request = {}
    if (page) request.page=page;
    if (pageSize) request.pageSize = pageSize;
    if (search) request.zhWord = search;
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(DICTIONARY_BASE+"?"+new URLSearchParams(request).toString(),{method:"GET",headers:header})
    return await responses.json();
}
export const findByZhWord = async (zhWord) => {
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(DICTIONARY_BASE+"?zhWord="+zhWord,{method:"GET",headers:header})
    return await responses.json();
}
export const createAndupdate = async (id,zhWord,viWord) => {
    const requestParams = {zhWord:zhWord, viWord:viWord}
    if (id)requestParams.id = id;
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(DICTIONARY_BASE+"?"+new URLSearchParams(requestParams).toString(),{method:"POST",headers:header})
    return await responses.json();
}
export const deleteById = async (id) => {
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(DICTIONARY_BASE+"?id="+id,{method:"DELETE",headers:header})
    return await responses.json();
}
const uploadExcel = async (data,callbackProcess)=>{
    let request = new XMLHttpRequest();
    request.open('POST', DICTIONARY_EXCEL);
    request.setRequestHeader("Authorization", localStorage.getItem("user_id"));
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callbackProcess(1,1,true)
        }
    };
    request.upload.addEventListener('progress', function(e) {
        callbackProcess(e.loaded ,e.total)
    });
    request.send(data);

}
export default {
    findAll:findAll,
    findByZhWord:findByZhWord,
    createAndupdate:createAndupdate,
    deleteById:deleteById,
    uploadExcel:uploadExcel
}
