import {
    LAZADA_CREATE_TO_LAZADA,
    LAZADA_GETCATEGORIES,
    LAZADA_GETDATA,
    LAZADA_GETTOKEN,
    LAZADA_REMOVE_PRODUCT
} from "./APIURL";

export const getData = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(LAZADA_GETDATA,{method:"GET",headers:header});
    return await responses.json()
}
export const updateData = async (data)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const responses = await fetch(LAZADA_GETDATA,{method:"POST",headers:header,body:JSON.stringify(data)});
    return await responses.json()
}
export const getToken = async (code)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(LAZADA_GETTOKEN+"?code="+code,{method:"GET",headers:header});
    return await responses.json()
}
export const getCategories = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(LAZADA_GETCATEGORIES,{method:"GET",headers:header});
    return await responses.json()
}
export const removeProduct = async (params)=>{
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(LAZADA_REMOVE_PRODUCT+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header});
    return await responses.json();
}
export const uploadToLazada = async (categoryId:number,lazadaCategoryId:number)=>{
    console.log(categoryId,lazadaCategoryId)
    const header = {"Authorization": localStorage.getItem("user_id")}
    const responses = await fetch(LAZADA_CREATE_TO_LAZADA+"?"+"categoryId="+categoryId+"&lazadaCategoryId="+lazadaCategoryId,{method:"GET",headers:header});
    return await responses.json()
}
