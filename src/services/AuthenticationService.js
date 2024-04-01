import {CHECK_TOKEN, LOGIN} from "./APIURL";

const login = async (login)=>{
    const params = new URLSearchParams(login);
    const response = await fetch(LOGIN+"?"+params.toString(),{method:"GET"})
    return await response.json();
}
const checkToken = async (token)=>{
    const response = await fetch(CHECK_TOKEN+"?token="+token,{method:"GET"})
    return await response.json();
}
export default {
    login:login,
    checkToken:checkToken
}
