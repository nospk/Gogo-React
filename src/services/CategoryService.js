import {
    CATEGORY_CATEGORY_SHOPEE,
    CATEGORY_CREATE,
    CATEGORY_DELETE,
    CATEGORY_FINDALL,
    CATEGORY_FINDALL_CURRENTHOST,
    CATEGORY_GENERATE_IMAGE,
    CATEGORY_GENERATE_IMAGES, CATEGORY_GENERATE_LAZADA_TEMPLATE,
    CATEGORY_GENERATE_SHOPEE_TEMPLATE,
    CATEGORY_PRICE_QUOTE,
    CATEGORY_UPDATE_HOST,
    IMAGE_DELETE, IMAGE_ZIP_UPDATE
} from "./APIURL";


const findAll = async (params)=>{
    let paramRequest ='';
    if (params){
        paramRequest= new URLSearchParams(params.params);
    }
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = fetch(paramRequest?CATEGORY_FINDALL+'?'+paramRequest.toString():CATEGORY_FINDALL,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const findAllByCurrentHost = async (params)=>{
    let paramRequest ='';
    if (params){
        paramRequest= new URLSearchParams(params.params);
    }
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = fetch(paramRequest?CATEGORY_FINDALL_CURRENTHOST+'?'+paramRequest.toString():CATEGORY_FINDALL,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}

const create = async (payload)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(CATEGORY_CREATE,{method:"POST",headers:header,body:JSON.stringify(payload.params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const deleteById = async (payload)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
    }
    const response = fetch(CATEGORY_DELETE+"?id="+payload.id,{method:"DELETE",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateHost = async (payload)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(CATEGORY_UPDATE_HOST,{method:"POST",headers:header,body:JSON.stringify(payload)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
export const createPriceQuote = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const results = await fetch(id?CATEGORY_PRICE_QUOTE+"?category="+id:CATEGORY_PRICE_QUOTE,{headers:header,method:"GET"});
    return await results.json();
}
const generateImage = (id, textFlag)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    return fetch(CATEGORY_GENERATE_IMAGE+"?id="+id + "&textFlag=" + textFlag,{headers:header,method:"GET"}).then(data=>data.json()).catch(data=>data);
}
const generateImages = (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    return fetch(CATEGORY_GENERATE_IMAGES+"?id="+id,{headers:header,method:"GET"}).then(data=>data.json()).catch(data=>data);
}
const generateShopeeTemplate = (id,shopeeCat)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    return fetch(CATEGORY_GENERATE_SHOPEE_TEMPLATE+"?catId="+id+"&shopeeCat="+shopeeCat,{headers:header,method:"GET"}).then(data=>data.json()).catch(data=>data);
}
const generateLazadaTemplate = (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    return fetch(CATEGORY_GENERATE_LAZADA_TEMPLATE+"?catId="+id,{headers:header,method:"GET"}).then(data=>data.json()).catch(data=>data);
}
const updateShopeeCategory = ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    return fetch(CATEGORY_CATEGORY_SHOPEE,{headers:header,method:"POST"}).then(data=>data.json()).catch(data=>data);
}
const getShopeeCategory = (page,pageSize,keyword)=>{
    const requestParams =  new URLSearchParams();
    if (page) requestParams.append("page",page);
    if (pageSize) requestParams.append("pageSize",pageSize);
    if (keyword) requestParams.append("keyword",keyword);

    const header = {"Authorization": localStorage.getItem("user_id")}
    return fetch(CATEGORY_CATEGORY_SHOPEE+"?"+requestParams.toString(),{headers:header,method:"GET"}).then(data=>data.json()).catch(data=>data);
}
export default {
    findAll:findAll,
    create:create,
    deleteById:deleteById,
    updateHost:updateHost,
    createPriceQuote:createPriceQuote,
    generateImage:generateImage,
    generateImages:generateImages,
    generateShopeeTemplate:generateShopeeTemplate,
    updateShopeeCategory:updateShopeeCategory,
    generateLazadaTemplate:generateLazadaTemplate,
    findAllByCurrentHost:findAllByCurrentHost,
    getShopeeCategory:getShopeeCategory


}
