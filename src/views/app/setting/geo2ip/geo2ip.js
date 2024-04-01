import React, {useEffect, useState} from "react";
import SettingService from "../../../../services/SettingService";
import ISOCODE from "./ISOCODE";
import {Button} from "reactstrap";
import Switch from "rc-switch";
import {Colxx} from "../../../../components/common/CustomBootstrap";

const Geo2IP = () => {
    const [country, setCountry] = useState([]);
    const [data,setData] = useState({});
    useEffect(() => {
        SettingService.geo2ipSetting().then((results) => {
            setData(results.data);

        })
        setCountry(getDataISO);
    }, [])
    const getDataISO = () => {
        return Object.entries(ISOCODE).map((item) => {
            return {
                value: item[0],
                name: item[1],
            }
        })
    }

    const filter = (e) => {
        const text = e.target.value;
        if (text){
            const filter = getDataISO().filter((item) => {
                return  item.name.toLowerCase().includes(text.toLowerCase());
            });
            setCountry(filter);
        }else {
            setCountry(getDataISO);
        }


    }
    const addCountry = (country)=>{
        if (data.list){
            const check = data.list.filter((item)=>{
                if (item.value===country.value){
                    return true
                }
                return false;
            })
            if (!check.length>0){
                setData({...data,list:[...data.list,country]})
            }

        }else {
            setData({...data,list:[country]})
        }
    }
    const removeCountry = (country)=>{
        const removed = data.list.filter((item)=>item.value!=country.value);
        setData({...data,list:removed})
    }
    const renderCountry = () => {
        return country.map((item, index) => {
            return (
                <div key={index}
                     style={{cursor:"pointer"}}
                     onClick={()=>{
                         addCountry(item);
                     }}
                     className="pt-3 pb-3 border-bottom">
                    <span  >{item.name}</span>
                </div>
            )
        })
    }
    const renderCountryIsBan = ()=>{
        if (data.list){
            return data.list.map((item,index)=>{
                return(
                    <div className="d-flex justify-content-between pt-3 pb-3 border-bottom" key={index}>
                        <span>{item.name}</span>
                        <span style={{cursor:"pointer"}} onClick={()=>removeCountry(item)}>Xóa</span>
                    </div>
                )
            })
        }
    }
    const submit = ()=>{
        SettingService.updateGeo2ipSetting(data).then((results)=>{
            console.log()
        })
    }
    return (
        <div className="bg-white rounded p-5">
            <div className="d-flex justify-content-end align-items-center" style={{gap:10}}>
                <Switch
                    className="custom-switch custom-switch-secondary"
                    checked={data.enable}
                    onChange={switchCheckedSecondary => {
                     setData({...data,enable:switchCheckedSecondary})
                    }}
                />
                <Button onClick={submit}>Cập nhật</Button>
            </div>
            <div className="row">
                <div className="col-6">
                    <div>
                        <input onChange={filter} placeholder={"Tìm kiếm quốc gia"}/>
                    </div>
                    {renderCountry()}
                </div>
                <div className="col-6">
                    <span className="font-weight-bold">Các quốc gia bị chặn</span>
                    {renderCountryIsBan()}
                </div>
            </div>
        </div>
    )
}
export default Geo2IP;