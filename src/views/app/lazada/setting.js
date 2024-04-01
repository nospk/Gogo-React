import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import {NotificationManager} from "../../../components/common/react-notifications";
import {getData, updateData,getToken} from "../../../services/LazadaService";
const LazadaSetting = (props)=>{
    const [appId,setAppId] = useState('123');
    const [data,setData] = useState([]);

    useEffect(()=>{
        console.log(window.location)
        console.log()
       getData().then((results)=>{
           let tokens = results.data.tokens;
           setAppId(results.data.appId);
           const params = new URLSearchParams(props.location.search);
           console.log(results)
           if (params){
               const account = params.get("account");
               const code = params.get("code");
               if (account && code){
                   getToken(code).then(tokenData=>{
                       if (tokenData.data.access_token){
                           console.log(tokenData);
                           tokens = tokens.map((item)=>{
                               if (item.account===account){
                                   item.token = tokenData.data.access_token
                               }
                               return item;
                           })
                           updateData({appId:results.data.appId,tokens:tokens}).then((results)=>{
                               console.log(window.location.origin+window.location.pathname)
                                window.location.href = window.location.origin+window.location.pathname
                           })

                       }
                   })
               }
           }
           if (tokens){
               setData(tokens);
           }
       })

    },[])
    const addAccount = ()=>{
        setData([...data,{}])
    }
    const onChangeValue = (index,value)=>{
        const newData = data.map((item,i)=>{
            if (index===i){
                item.account = value;
            }
            return item;
        })
        setData(newData);
    }
    const generateToken = (index)=>{
        const filter = data.filter((item,i)=>i===index);
        if (filter[0]){
            if (filter[0].account){
                window.location.href = `https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${window.location.origin+window.location.pathname}?account=${filter[0].account}&client_id=${appId}`
                updateData({appId:appId,tokens:data}).then((results)=>{})
            }else {
                NotificationManager.warning("Vui lòng nhập tài khoản","Thông báo",2000)
            }
        }else {
            NotificationManager.warning("Không tìm thấy dữ liệu","Thông báo",2000)
        }
    }
    const remove = (index)=>{
        const removed = data.filter((item,i)=>i!==index);
        setData(removed);
    }
    const submit = ()=>{
        updateData({appId:appId,tokens:data}).then((results)=>{
            console.log(results);
        })
    }
    return(
        <div>
           <div className="d-flex justify-content-end">
               <Button onClick={addAccount}>Thêm tài khoản</Button>
               <Button onClick={submit}>Cập nhật</Button>
           </div>
            {data.map((item,index)=>{
                return(
                    <div key={index} className="d-flex flex-column" style={{gap:20}}>
                        <div className="d-flex align-items-center" style={{gap:10}}>
                            <span className="font-weight-bold">Tên tài khoản</span>
                            <input value={item.account?item.account:""}
                                   onChange={(e)=>onChangeValue(index,e.target.value)}
                                   className="border-0 rounded p-2"
                                   placeholder={"Tên tài khoản"}/>
                        </div>
                        <div className="d-flex align-items-center" style={{gap:10}}>
                            <span className="font-weight-bold">Token</span>
                            <input className="border-0 rounded p-2"
                                   value={item.token}
                                   readOnly
                                   placeholder={"Mã token"}/>
                            <Button onClick={()=>generateToken(index)}>Get Token</Button>
                            <Button onClick={()=>remove(index)} color={"danger"}>Xóa</Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default LazadaSetting;
