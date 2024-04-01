import {doGet} from "./HttpClient";
import {DB_ACCESS_DATA} from "../services/APIURL";

const monitoring = (batchkey, callback) => {
	const interval = setInterval(() => {
		const data = doGet("/api/admin/batch/monitoring?batchkey="+batchkey);
		data.then((res)=> {
			callback(res);
			if (res.BATCHSTATUS !== "RUNNING") {
				clearInterval(interval);
			}
		}).catch((err)=> {
			console.error(err);
		})
	}, 500);
}
const monitoringMulti = (batchkey, callback) => {
	const interval = setInterval(() => {
		const data = doGet("/api/admin/batch/monitoringmilti?batchkey="+batchkey);
		data.then((res)=> {
			callback(res);

			let count = 0;
			res.forEach((item) => {
				if (item.BATCHSTATUS !== "RUNNING") {
					count++;
				}
			});

			if (count === res.length) {
				clearInterval(interval);
			}
		}).catch((err)=> {
			console.error(err);
		})
	}, 1000);
}

const batchLog = async (batchkey) => {
	let paramRequest = new URLSearchParams();
	paramRequest.append("FUNC_CD", "GETLOG");
	paramRequest.append("BATCHKEY", batchkey);
	const data = await doGet('/api/admin/dataaccess'+'?'+paramRequest.toString());
	return data;
}
export {monitoring,monitoringMulti, batchLog}
