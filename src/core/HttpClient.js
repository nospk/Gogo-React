export const DOMAIN = localStorage.getItem("host")?localStorage.getItem("host"):(process.env.NODE_ENV==="development"?"http://localhost:8080":"https://caysenda.vn")

const doGet = async (url) => {
	const header = {"Authorization": localStorage.getItem("user_id")}
	const response = await fetch(DOMAIN+url,{method:"GET",headers:header});
	const data = await response.json();
	return data;
}

const doPost = async (url, params) => {
	const header = {"Authorization": localStorage.getItem("user_id"), 'Content-Type': 'application/json'};
	const response = await fetch(DOMAIN+url,{method:"POST",headers:header,body:JSON.stringify(params)});
	const data = await response.json()
	return data;
}
export {doGet,doPost}
