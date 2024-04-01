import React, { useEffect, useState } from "react";
import './batchlog_style.scss';
import { batchLog } from "../../../core/batchManager";

const BatchLog = () => {
	const [list,setList] = useState([]);

	useEffect(() => {
		loadData('');
	},[]);

	const loadData = (batchkey) => {
		batchLog(batchkey).then((res) => {
			if (res.status === "ok") {
				let data = res.results.map((res) => {
					return {
						batchkey	: res.BATCHKEY,
						active		: false,
						logs		: res.LOGS? res.LOGS : [],
						title		: res.TITLE
					}
				});

				setList(data);
			}
		});
	}

	const handleClick = async (data) => {
		batchLog(data.batchkey).then((res) => {
			if (res.status === "ok") {
				let newData = list.map((item) => {
					if (data.batchkey === item.batchkey) {
						item.active = !item.active;
						data.logs = JSON.parse(res.results[0].LOGS);
					}
					return item;
				});
				setList(newData);
			}
		});
	}

	return (
		<div>
			<div className="list">
				{list.map((data, idx) => {
					return (
						<div className="item" key={idx}>
							<p className="title" onClick={() => handleClick(data)}>{data.title}</p>
							<div className={data.active? 'logs open': 'logs'}>
								{data.logs.map((log, logidx) => {
									return(
										<p key={logidx}>{log}</p>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default BatchLog;
