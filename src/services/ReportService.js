import {CATEGORY_DELETE, REPORT_STATISTIC_AREA} from "./APIURL";

export const statisticArea = (params)=>{
    let request = '';
    if (params){request = "?"+new URLSearchParams(params)}
    const header = {"Authorization": localStorage.getItem("user_id")}
    const response = fetch(REPORT_STATISTIC_AREA+request,{method:"GET",headers:header})
                    .then(value => {return value.json()})
                    .catch(reason => reason);
    return response;
}
export default {
    statisticArea:statisticArea,

}