import {DB_ACCESS_DATA, DICTIONARY_BASE} from "./APIURL";

export const getAll = async () => {
	let paramRequest = new URLSearchParams();
	paramRequest.append("FUNC_CD", "CHATGPT001");
	paramRequest.append("CODE_CD", "CHATGPTACCOUNT");
	paramRequest.append("CODE_CD1", "CHATGPTACCOUNT");
	paramRequest.append("CODE_CD2", "CHATGPTACCOUNT");

	const header = {"Authorization": localStorage.getItem("user_id")}
	const response = await fetch(DB_ACCESS_DATA+'?'+paramRequest.toString(),{method:"GET",headers:header});
	return await response.json();
}

export const entry = async (params) => {
	let paramRequest = new URLSearchParams(params);
	paramRequest.append("FUNC_CD", "CHATGPT002");
	paramRequest.append("CODE_CD", "CHATGPTACCOUNT");

	const header = {"Authorization": localStorage.getItem("user_id")}
	const response = await fetch(DB_ACCESS_DATA+'?'+paramRequest.toString(),{method:"GET",headers:header});
	return await response.json();
}
export const remove = async (params) => {
	let paramRequest = new URLSearchParams(params);
	paramRequest.append("FUNC_CD", "CHATGPT003");

	const header = {"Authorization": localStorage.getItem("user_id")}
	const response = await fetch(DB_ACCESS_DATA+'?'+paramRequest.toString(),{method:"GET",headers:header});
	return await response.json();
}
export const active = async (params) => {
	let paramRequest = new URLSearchParams(params);
	paramRequest.append("FUNC_CD", "CHATGPT004");
	paramRequest.append("CODE_CD", "CHATGPTACCOUNT");

	const header = {"Authorization": localStorage.getItem("user_id")}
	const response = await fetch(DB_ACCESS_DATA+'?'+paramRequest.toString(),{method:"GET",headers:header});
	return await response.json();
}
export const getActive = async () => {
	let paramRequest = new URLSearchParams();
	paramRequest.append("FUNC_CD", "CHATGPT005");

	const header = {"Authorization": localStorage.getItem("user_id")}
	const response = await fetch(DB_ACCESS_DATA+'?'+paramRequest.toString(),{method:"GET",headers:header});
	return await response.json();
}
export const getLogs = async (params) => {
	let paramRequest = new URLSearchParams(params);
	paramRequest.append("FUNC_CD", "GPTGETLOG");

	const header = {"Authorization": localStorage.getItem("user_id")}
	const response = await fetch(DB_ACCESS_DATA+'?'+paramRequest.toString(),{method:"GET",headers:header});
	return await response.json();
}

