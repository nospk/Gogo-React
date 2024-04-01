import {
    CATEGORY_CREATE, IMAGE_ZIP_UPLOAD,
    PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_DELETE_BY_CATEGORY,
    PRODUCT_FINDALL,
    PRODUCT_FINDBYID,
    PRODUCT_FINDFORPICKER, PRODUCT_GENERATE_IMAGE_ZIP, PRODUCT_IMPORT_EXCEL, PRODUCT_UPDATETOPFLAG
} from "./APIURL";


const create = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(PRODUCT_CREATE,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const findAll = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    if (params===null){
        return  fetch(PRODUCT_FINDALL,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    }else {
        return  fetch(PRODUCT_FINDALL+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    }

}
const findById = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = fetch(PRODUCT_FINDBYID+"?id="+params,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const findForProductPicker = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = await fetch(params?PRODUCT_FINDFORPICKER+"?"+new URLSearchParams(params).toString():PRODUCT_FINDFORPICKER,{method:"GET",headers:header});
    return await response.json();

}
const deleteByCat = async (categoryId)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = fetch(PRODUCT_DELETE_BY_CATEGORY+"?categoryId="+categoryId,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const deleteById = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = fetch(PRODUCT_DELETE+"?id="+params,{method:"DELETE",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const importExcel = async (data,callbackProcess)=>{
    let request = new XMLHttpRequest();
    request.open('POST', PRODUCT_IMPORT_EXCEL);
    request.setRequestHeader("Authorization", localStorage.getItem("user_id"));
    request.upload.addEventListener('progress', function(e) {
        callbackProcess(e.loaded ,e.total)
    });
    request.send(data);
    return {}
}
const generateImageZip = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    let response = null
    if (id){
        const requestParams = new URLSearchParams({categoryId:id})
        response = fetch(PRODUCT_GENERATE_IMAGE_ZIP+"?"+requestParams.toString(),{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    }else {
        response = fetch(PRODUCT_GENERATE_IMAGE_ZIP,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);

    }
    return response;
}
const updateFlag = async ({id,flag})=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = fetch(PRODUCT_UPDATETOPFLAG+"?id="+id+"&flag="+flag,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
export default {
    create:create,
    findAll:findAll,
    findById:findById,
    deleteById:deleteById,
    findForProductPicker:findForProductPicker,
    importExcel:importExcel,
    generateImageZip:generateImageZip,
    deleteByCat:deleteByCat,
    updateFlag:updateFlag,
}
