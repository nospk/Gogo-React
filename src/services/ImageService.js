import {EXTENSION_EXCEL, IMAGE_DELETE, IMAGE_FINDALL, IMAGE_UPLOAD, IMAGE_ZIP_UPDATE, IMAGE_ZIP_UPLOAD} from "./APIURL";
const findAll = (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const paramsRequest = new URLSearchParams(params);
    if (params!=null){
        return fetch(IMAGE_FINDALL+"?"+paramsRequest.toString(),{headers:header, method:"GET"}).then(data =>data.json()).catch(data=>data)
    }else {
        return fetch(IMAGE_FINDALL,{headers:header, method:"GET"}).then(data =>data.json()).catch(data=>data)
    }
}
const upload = (data)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    return fetch(IMAGE_UPLOAD,{headers:header, method:"POST", body:data}).then(data =>data.json()).catch(data=>data)
}
const uploadZip = async (data,callbackProcess)=>{
    let request = new XMLHttpRequest();
    request.open('POST', IMAGE_ZIP_UPLOAD);
    request.setRequestHeader("Authorization", localStorage.getItem("user_id"));
    request.upload.addEventListener('progress', function(e) {
        callbackProcess(e.loaded ,e.total)
    });
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callbackProcess(1,1,true)
        }
    };
    request.send(data);
    return {}
}
const updateImages = async (data,callbackProcess)=>{
    let request = new XMLHttpRequest();
    request.open('POST', IMAGE_ZIP_UPDATE);
    request.setRequestHeader("Authorization", localStorage.getItem("user_id"));
    request.upload.addEventListener('progress', function(e) {
        callbackProcess(e.loaded ,e.total)
    });
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callbackProcess(1,1,true)
        }
    };
    request.send(data);
    return {}
}
const deleteById = (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    return fetch(IMAGE_DELETE+"?id="+id,{headers:header,method:"DELETE"}).then(data=>data.json()).catch(data=>data);
}

export default {
    findAll:findAll,
    upload:upload,
    uploadZip:uploadZip,
    deleteById:deleteById,
    updateImages:updateImages
}