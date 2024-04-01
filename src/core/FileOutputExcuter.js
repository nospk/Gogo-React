import {doGet} from "./HttpClient";
import {monitoring as batchMonitoring} from './batchManager'
import {DOMAIN} from "../services/APIURL";
const execute = (params, callback) => {
	const requestParams = new URLSearchParams(params);
	const data = doGet("/api/admin/outputfile/excel?" + requestParams.toString());

	data.then((res) => {
		monitoring(res.batchkey, callback)
	}).catch((err) => {
		console.error(err)
	})
}
const monitoring = (batchkey, callback) => {
	localStorage.setItem('fileMonitoring', batchkey);
	batchMonitoring(batchkey, (data) => {
		if (data.BATCHSTATUS === "COMPLETE") {
			getFileDownload(batchkey);
		}
		if (data.BATCHSTATUS !== "RUNNING") {
			localStorage.removeItem('fileMonitoring');
		}
		if (callback) callback(data);
	});
}

const reMonitoring = (callback) => {
	let batchkey = localStorage.getItem('fileMonitoring');
	monitoring(batchkey, callback);
}

const getFileDownload = (batchkey) => {
	const data = doGet("/api/admin/outputfile/downloadFile?batchkey=" + batchkey);
	data.then((res)=> {
		window.location.href = DOMAIN + res.DIRECTORY + res.FILENAME;
	}).catch((err) => {
		console.error(err)
	})
}
export {execute,monitoring, reMonitoring, getFileDownload}
