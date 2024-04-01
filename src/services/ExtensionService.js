import {
	EXTENSION_BULK_ACTION,
	EXTENSION_CART,
	EXTENSION_DETAILT,
	EXTENSION_DISABLE_ASYNCHRONIZE,
	EXTENSION_EMPLOYEE,
	EXTENSION_EXCEL,
	EXTENSION_IMAGE_PROCESSING,
	EXTENSION_PRODUCT,
	EXTENSION_PRODUCT_UPDATE,
	EXTENSION_REMOVE,
	EXTENSION_REMOVE_PRODUCT,
	EXTENSION_SHOP,
	EXTENSION_SHOP_UPDATE_SKU, EXTENSION_TRANSLATE, EXTENSION_UPDATE_CURRENTCY_RATE, EXTENSION_UPDATE_ENABLEPRICE,
	EXTENSION_UPDATE_PRODUCTS_INFO,
	EXTENSION_UPDATE_RATE_AND_FACTOR,
	EXTENSION_UPDATE_TO_WEB,
	IMAGE_UPLOAD,
	EXTENSION_DOWNLOADVIDEO,
} from "./APIURL";
import {monitoring} from '../core/batchManager';
const findAllEmployee = async ()=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_EMPLOYEE,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const authorization = async (userId,shopId)=>{
	const paramsRequest = new URLSearchParams({userId:userId, shopId:shopId})
	const header = {
		"Authorization": localStorage.getItem("user_id"),
		'Content-Type': 'application/json'
	}
	const responses = await fetch(EXTENSION_EMPLOYEE+"?"+paramsRequest,{method:"POST",headers:header})
	const data = await responses.json();
	return data;
}
const findAllShop = async (params)=>{
	const request = new URLSearchParams(params);
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_SHOP+"?"+request.toString(),{method:"GET",headers:header})
	const data = await responses.json();
	return data;

}
const findAllProduct = async (params)=>{
	const urlParams = new URLSearchParams(params)
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_PRODUCT+"?"+urlParams.toString(),{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const findProductById = async (productId)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_DETAILT+"?id="+productId,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const updateProduct = async (params)=>{
	const responses = await fetch(EXTENSION_PRODUCT_UPDATE,{
		method:"POST",
		headers:{
			"Authorization": localStorage.getItem("user_id"),
			'Content-Type': 'application/json'
		},
		body:JSON.stringify(params)
	})
	const data = await responses.json();
	return data;
}
const updateSKU = async (params)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_SHOP_UPDATE_SKU+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const uploadProductToWeb = async (params)=>{
	const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'}

	const responses = await fetch(EXTENSION_UPDATE_TO_WEB,{method:"POST",headers:header,body:JSON.stringify(params)})
	const data = await responses.json();
	return data;
}
const generateExcel = async (shopId,translate)=>{
	const paramsRequest = {
		shopId:shopId
	}
	if (translate) paramsRequest.translate = translate;
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_EXCEL+"?"+new URLSearchParams(paramsRequest).toString(),{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const updateRateAndFactor = async (params)=>{
	const dataRequest = new URLSearchParams(params);
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_UPDATE_RATE_AND_FACTOR+"?"+dataRequest.toString(),{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const imageProcessIsRunning = () => {
	return new Promise((resolve, reject) => {
		let batchkey = localStorage.getItem("IMAGEPROCESS");
		if (batchkey) {
			monitoring(batchkey, (res) => {
				if (res.BATCHSTATUS !== "RUNNING") {
					resolve(false);
				} else {
					resolve(true);
				}
			});
		} else {
			resolve(false);
		}
	});
}
const imageprocessing = async (shopId, name, callback)=>{
	const isRunning = await imageProcessIsRunning();

	if (!isRunning && shopId) {
		const header = {"Authorization": localStorage.getItem("user_id")}
		const responses = await fetch(EXTENSION_IMAGE_PROCESSING+"?shopId="+shopId,{method:"GET",headers:header})
		const data = await responses.json();
		localStorage.setItem("IMAGEPROCESS", data.batchkey);
		localStorage.setItem("SHOPNAME", name);
		localStorage.setItem("CANCELPROCESS", 'false');

		monitoring(data.batchkey, (res) => {
			callback({...res, name:name});
			if (res.BATCHSTATUS !== "RUNNING" || localStorage.getItem("CANCELPROCESS") === 'true') {
				localStorage.removeItem("IMAGEPROCESS");
				callback({...{BATCHSTATUS: "CANCEL"}, name:name});
			}
		});
		return data;
	} else {
		monitoring(localStorage.getItem("IMAGEPROCESS"), (res) => {
			if (localStorage.getItem("CANCELPROCESS") === 'false') {
				callback({...res, name:localStorage.getItem("SHOPNAME")});
			} else {
				localStorage.removeItem("IMAGEPROCESS");
				callback({...{BATCHSTATUS: "CANCEL"}, name:localStorage.getItem("SHOPNAME")});
			}
		});
	}
}
const bulkAction = async (params)=>{
	const responses = await fetch(EXTENSION_BULK_ACTION,{
		method:"POST",
		headers:{
			"Authorization": localStorage.getItem("user_id"),
			'Content-Type': 'application/json'
		},
		body:JSON.stringify(params)
	})
	return await responses.json();
}
const uploadExcel = async (data,callbackProcess)=>{
	let request = new XMLHttpRequest();
	request.open('POST', EXTENSION_EXCEL);
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
const deleteById = async (shopId)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_REMOVE+"?shopId="+shopId,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const deleteProductById = async (productId)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_REMOVE_PRODUCT+"?productId="+productId,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const disableSynchronize = async (productId)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_DISABLE_ASYNCHRONIZE+"?productId="+productId,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const updateQuickview = async (params)=>{
	const responses = await fetch(EXTENSION_SHOP,{
		method:"PUT",
		headers:{"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'},
		body:JSON.stringify(params)
	})
	return await responses.json();
}
const getCart = async (params)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_CART+"?"+new URLSearchParams(params).toString(),{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const deleteCart = async (params)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_CART+"?id="+params,{method:"DELETE",headers:header})
	const data = await responses.json();
	return data;
}
const updateProductsInfo = async (params)=>{
	const responses = await fetch(EXTENSION_UPDATE_PRODUCTS_INFO,{
		method:"POST",
		headers:{"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'},
		body:JSON.stringify(params)
	})
	return await responses.json();
}
const getShopById = async (id)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_UPDATE_PRODUCTS_INFO+"?id="+id,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const updateCurrencyRate = async (value)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_UPDATE_CURRENTCY_RATE+"?value="+value,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const updateEnablePrice = async (id,value)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_UPDATE_ENABLEPRICE+"?id="+id+"&value="+value,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}
const translate = async (id)=>{
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_TRANSLATE+"?id="+id,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}

const downloadVideo = async (id) => {
	const header = {"Authorization": localStorage.getItem("user_id")}
	const responses = await fetch(EXTENSION_DOWNLOADVIDEO+"?id="+id,{method:"GET",headers:header})
	const data = await responses.json();
	return data;
}

export default {
	updateEnablePrice:updateEnablePrice,
	updateCurrencyRate:updateCurrencyRate,
	findAllShop:findAllShop,
	findAllProduct:findAllProduct,
	findProductById:findProductById,
	updateProduct:updateProduct,
	findAllEmployee:findAllEmployee,
	authorization:authorization,
	updateSKU:updateSKU,
	uploadProductToWeb:uploadProductToWeb,
	generateExcel:generateExcel,
	updateRateAndFactor:updateRateAndFactor,
	bulkAction:bulkAction,
	imageprocessing:imageprocessing,
	uploadExcel:uploadExcel,
	deleteById:deleteById,
	deleteProductById:deleteProductById,
	disableSynchronize:disableSynchronize,
	updateQuickview:updateQuickview,
	getCart:getCart,
	deleteCart:deleteCart,
	updateProductsInfo:updateProductsInfo,
	getShopById:getShopById,
	translate:translate,
	downloadVideo:downloadVideo
}
