import {
    SETTING_BANNER,
    SETTING_BANNERTOP, SETTING_CREATE_SITEMAP, SETTING_DELIVERY,
    SETTING_EMAIL, SETTING_EMBED, SETTING_EMBED_SOCIAL, SETTING_FACEBOOK, SETTING_GEO2IP,
    SETTING_MENU,
    SETTING_PRICE, SETTING_ROBOTS, SETTING_SHIP,
    SETTING_SLIDEHOME, SETTING_TRADEMARK,
    SETTING_WEBSITE
} from "./APIURL";

const findAllSlideHome = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_SLIDEHOME,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateSlideHome = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_SLIDEHOME,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const deleteSlideHome = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_SLIDEHOME+"?id="+id,{method:"DELETE",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const findAllBannerTOP = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_BANNERTOP,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateBannerTOP = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_BANNERTOP,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const deleteBannerTOP = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_BANNERTOP+"?id="+id,{method:"DELETE",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const findAllBanner = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_BANNER,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateBanner = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_BANNER,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const deleteBanner = async (id)=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_BANNER+"?id="+id,{method:"DELETE",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const findAllMenu = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_MENU,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const createMenu = async (key,params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_MENU+"?key="+key,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const getWebsite = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_WEBSITE,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateWebsite = async (params)=>{

    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_WEBSITE,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);

    return response;
}
const getEmailSetting = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_EMAIL,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateEmailSetting = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_EMAIL,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const getPriceSetting = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_PRICE,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updatePriceSetting = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_PRICE,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const getShipSetting = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_SHIP,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateShipSetting = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_SHIP,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const getTrademark = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_TRADEMARK,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateTrademark = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_TRADEMARK,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const getEmbed = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_EMBED,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateEmbed = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_EMBED,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const getEmbedSocial = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_EMBED_SOCIAL,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateEmbedSocial = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_EMBED_SOCIAL,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const getRobots = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_ROBOTS,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateRobots = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_ROBOTS,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const createSitemap = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_CREATE_SITEMAP,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const facebookSetting = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_FACEBOOK,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateFacebookSetting= async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_FACEBOOK,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const deleteFacebookSetting = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_FACEBOOK,{method:"DELETE",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const geo2ipSetting = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_GEO2IP,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateGeo2ipSetting= async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_GEO2IP,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const deleteGeo2ipSetting = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_GEO2IP,{method:"DELETE",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const getDeliverySetting = async ()=>{
    const header = {"Authorization": localStorage.getItem("user_id"),}
    const response = fetch(SETTING_DELIVERY,{method:"GET",headers:header}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
const updateDeliverySetting = async (params)=>{
    const header = {
        "Authorization": localStorage.getItem("user_id"),
        'Content-Type': 'application/json'
    }
    const response = fetch(SETTING_DELIVERY,{method:"POST",headers:header,body:JSON.stringify(params)}).then(value => {return value.json()}).catch(reason => reason);
    return response;
}
export default {
    getDeliverySetting:getDeliverySetting,
    updateDeliverySetting:updateDeliverySetting,
    geo2ipSetting:geo2ipSetting,
    updateGeo2ipSetting:updateGeo2ipSetting,
    deleteGeo2ipSetting:deleteGeo2ipSetting,
    deleteFacebookSetting:deleteFacebookSetting,
    facebookSetting:facebookSetting,
    updateFacebookSetting:updateFacebookSetting,
    getEmailSetting:getEmailSetting,
    updateEmailSetting:updateEmailSetting,
    findAllSlideHome:findAllSlideHome,
    updateSlideHome:updateSlideHome,
    deleteSlideHome:deleteSlideHome,
    findAllBannerTOP:findAllBannerTOP,
    updateBannerTOP:updateBannerTOP,
    deleteBannerTOP:deleteBannerTOP,
    findAllBanner:findAllBanner,
    updateBanner:updateBanner,
    deleteBanner:deleteBanner,
    findAllMenu:findAllMenu,
    createMenu:createMenu,
    getWebsite:getWebsite,
    updateWebsite:updateWebsite,
    getPriceSetting:getPriceSetting,
    updatePriceSetting:updatePriceSetting,
    getShipSetting:getShipSetting,
    updateShipSetting:updateShipSetting,
    getTrademark:getTrademark,
    updateTrademark:updateTrademark,
    getEmbed:getEmbed,
    updateEmbed:updateEmbed,
    getEmbedSocial:getEmbedSocial,
    updateEmbedSocial:updateEmbedSocial,
    getRobots:getRobots,
    updateRobots:updateRobots,
    createSitemap:createSitemap
}
