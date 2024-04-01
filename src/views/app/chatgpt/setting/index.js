import React, {useEffect, useState} from "react";
import "./styles.scss"
import {getAll, entry, remove, active, getActive} from "../../../../services/chatgptService";
import { AiOutlineCheck } from "react-icons/ai";
import { RiDeleteBack2Line } from "react-icons/ri";
import classnames from "classnames";


const Setting = () => {
	const [list, setList] = useState([]);
	const [id, setId] = useState("");
	const [index, setIndex] = useState("");
	const [name, setName] = useState("");
	const [value, setValue] = useState("");
	const [prompt, setPrompt] = useState("");
	const [activeData, setActiveData] = useState({});

	useEffect(()=> {
		getAccounts();
		getAccountActive();
	}, []);

	const getAccountActive = () => {
		getActive().then((res) => {
			if(res.results && res.results.length > 0) {
				setActiveData(res.results[0]);
			}
			console.log(res);
		}).catch((err) => {
			console.log(err);
		})
	}

	const activeAccount = (item) => {
		if (item.ID) {
			active({
				ID:item.ID
			}).then((res) => {
				getAccountActive();
			}).catch((err) => {

			})
		}
	}

	const getAccounts = () => {
		getAll().then((res) => {
			if(res.results && res.results.length > 0) {
				setList(res.results);
				account_click(res.results[0], 0);
			}
		}).catch((er)=> {

		});
	}
	const newAccount = () => {
		setList([...list, {
			ID: "",
			NAME: "Tài khoản mới",
			VALUE: "",
			PROMPT:"translate chinese to vietnamese max 50 characters"
		}]);
	}

	const account_click = (item, index) => {
		setName(item.NAME);
		setValue(item.VALUE);
		setId(item.ID);
		setPrompt(item.PROMPT);
	}

	const save = () => {
		entry({
			NAME: name,
			VALUE: value,
			ID: id,
			PROMPT: prompt
		}).then((res) => {
			getAccounts();
			setName("");
			setId("");
			setValue("");
			setPrompt("");
		}).catch((err) => {

		})
	}
	const removeAccount = (item) => {
		remove({
			ID: item.ID
		}).then((res) => {
			getAccounts();
		}).catch((err) => {
			console.log(err);
		});
	}
	const changeValue = (e) => {
		switch (e.target.id){
			case "name"		:	setName(e.target.value);break;
			case "token" 	:	setValue(e.target.value);break;
			case "prompt" 	:	setPrompt(e.target.value);break;
		}
	}

	const action = (e, item) => {
		switch (e.target.id){
			case "active":
				activeAccount(item);
				break;
			case "remove":
				removeAccount(item);
				break;
		}
	}
	const checkActive = (item) => {
		return activeData.VALUE == item.ID;
	}
	return (
		<div className={"d-flex"}>
			<div className={"d-flex flex-column col-2 chatgpt-left"}>
				<div>
					<span className={"chatgpt-button-add"} onClick={newAccount}>Thêm tài khoản</span>
				</div>
				<div className={"chatgpt-account-list"}>
					{
						list.map((item, index) => {
							return (
								<div className={classnames({"chatgpt-account-item": true, "active": checkActive(item)})} onClick={() => account_click(item, index)} key={index}>
									<span>{item.NAME}</span>
									<span className={"actions"}>
										<AiOutlineCheck id={"active"} fontSize={14} onClick={(e) => action(e, item)}/>
										<RiDeleteBack2Line id={"remove"} fontSize={14} onClick={(e) => action(e, item)}/>
									</span>
								</div>
							)
						})
					}
				</div>
			</div>
			<div className={"col-10"}>
				<div className={"account-info"}>
					<div className={"form"}>
						<span>Tên tài khoản</span>
						<input id={"name"} type="text" placeholder={"Tên tài khoản"} value={name} onChange={changeValue}/>
					</div>
					<div className={"form"}>
						<span>Token</span>
						<input id={"token"} className={"token"} type="text" placeholder={"Token"} value={value} onChange={changeValue}/>
					</div>
					<div className={"form"}>
						<span>Prompt</span>
						<input id={"prompt"} className={"prompt"} type="text" placeholder={"Prompt"} value={prompt} onChange={changeValue}/>
					</div>
				</div>
				<div className={"chatgpt-actions"}>
					<span className={"chatgpt-button-save"} onClick={save}>Lưu</span>
				</div>
			</div>
		</div>
	)
}
export default Setting;
