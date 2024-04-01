import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import './styles.scss'
import {monitoringMulti} from "../../../../core/batchManager";
import {getLogs} from "../../../../services/chatgptService";

const Log = () => {
	const [progress,setProgress] = useState([]);
	const [show,setShow] = useState(false);
	const [loadding, setLoading] = useState(false);
	const [data,setData] = useState([]);
	useEffect(() => {
		getLogs({
			SELECTTYPE: '@SELECT',
			LIMIT: '1000',
			OFFSET: ''
		}).then((res) => {
			if (res.status === 'ok') {
				setData(res.results);
			}
			console.log(res);
		});
	}, []);

	const showProgress = () => {
		let gptString = localStorage.getItem('chatgpt');
		let gptData = JSON.parse(gptString ? gptString : '[]');
		let batchkey = gptData.map((item) => item.batchkey).join(",");
		let names = gptData.reduce((prev, item, arr) => {
			if(!prev[item.batchkey]) {
				prev[item.batchkey] = item.name
			}
			return prev;
		}, {});

		if (batchkey) {
			if (!loadding) {
				monitoringMulti(batchkey, (data) => {
					if (data.length > 0) {
						for(let batch of data) {
							if (batch.BATCHSTATUS !== 'RUNNING') {
								gptData = gptData.filter((item) => {
									return item.batchkey !== batch.BATCHKEY;
								});
								localStorage.setItem('chatgpt', JSON.stringify(gptData));
								setLoading(false);
							}
							batch.NAMME = names[batch.BATCHKEY];
						}
					}

					setLoading(true);
					setProgress(data);
					console.log(data);
				});
			}

			setShow(!show);
		}
	}

	const loadData = () => {
		setShow(false);
	}
	return (
		<div className={"chatgpt-log log"}>
			<Button outline color="success" onClick={showProgress}>
				Xem tiến độ
			</Button>
			{
				show ? <div className={"chatgpt-progress"}>
					{
						progress.map((data, index) => (
							<div className={"progress-box"} key={index}>
								<span className={"box-title"}>
									<span>{data.NAMME}:</span>
									<span>{data.PROGRESS*100}%</span>
								</span>
							</div>
						))
					}
					</div>: ''
			}
			<div className={"log-contents"}>
				<div className={"row-content"}>
					<table>
						<thead>
							<tr>
								<th>Tiếng trung</th>
								<th>Trạng thái</th>
							</tr>
						</thead>
						<tbody>
							{
								data.map((item, index) => {
									return(
										<tr className={item.TYPE === '1'? '' : "error"} key={index}>
											<td><span>{item.WORD}</span></td>
											<td><span>{item.MESSAGE}</span></td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
export default Log;
