import React, {useEffect, useState} from "react";
import FacebookLogin from 'react-facebook-login';
import SettingService from "../../../services/SettingService";
import FacebookAPI from "../../../services/FacebookAPI";
import IntlMessages from "../../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {Button} from "reactstrap";

const Setting = ()=>{
    const [setting,setSetting] = useState();
    const [pageOptions,setPageOptions] = useState();
    const [valueOption,setValueOption] = useState();
    useEffect(()=>{
        SettingService.facebookSetting().then((results)=>{
            setSetting(results.data);
            if (results.data && results.data.userId && results.data.accessToken){
                getDataPageOptions(results.data.userId,results.data.accessToken).then((results)=>{

                })
            }
        })
    },[])
    const responseFacebook = (response) => {
        const requestParams = {
            userId:response.id,
            accessToken:response.accessToken,
            email:response.email,
            name:response.name,
            expireToken:response.expiresIn,
        }
        const data = {...setting,...requestParams};
        SettingService.updateFacebookSetting(data).then(()=>{
          window.location.reload();
        })
    }
    const getDataPageOptions = async (userId,accessToken)=>{
        const dataRequest = {
            id:userId,
            accessToken:accessToken
        }
        const data = await FacebookAPI.getPageAccessToken(dataRequest);
        let options = []
        if (data.data){
            options = data.data.map((item)=>{
                return {
                    access_token:item.access_token,
                    name:item.name,
                    id:item.id,
                    label:item.name,
                    value:item.id

                }
            });
            setPageOptions(options);
        }
    }
    const getPageSelected = ()=>{
        if (pageOptions && setting && setting.pageId){
            const filter = pageOptions.filter((item)=>item.id===setting.pageId)
            return filter[0]
        }
        return null;

    }
    const updateDateSelect = (e)=>{
        setValueOption(e)
        const newSetting = {...setting,
            pageId:e.id,
            pageAccessToken:e.access_token,
            expirePageToken:"",
            pageName:e.name
        }
        setSetting(newSetting);
    }
    const submitUpdate = ()=>{

        SettingService.updateFacebookSetting(setting).then(()=>{

        })
    }
    const deleteSetting = ()=>{
        SettingService.deleteFacebookSetting().then((results)=>{
            window.location.reload();
        })
    }
    return (
        <div>
            {(setting && !setting.userId && !setting.accessToken)||(!setting)?
                <FacebookLogin
                    appId= {"508705123866777"}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    scope="email, read_insights, pages_show_list, read_page_mailboxes, business_management, pages_messaging, pages_messaging_phone_number, pages_messaging_subscriptions, publish_to_groups, groups_access_member_info, whatsapp_business_management, attribution_read, page_events, pages_read_engagement, pages_manage_metadata, pages_read_user_content, pages_manage_posts, pages_manage_engagement, public_profile"
                    icon="fa-facebook"
                />
                 :
                <div className="d-flex justify-content-end" style={{gap:10}}>
                    <Button onClick={()=>deleteSetting()}>Thoát tài khoản</Button>
                    <Button onClick={()=>submitUpdate()}>Cập nhật</Button>
                </div>
            }
            <div className="row">
                <div className="col-12 col-md-6">
                    <label>
                        Chọn page cần đăng sản phẩm
                    </label>
                    <Select
                        components={{Input: CustomSelectInput}}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={getPageSelected()}
                        onChange={(e)=>{
                            updateDateSelect(e)
                        }}
                        options={pageOptions}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <div>
                        <label>
                            <p className="mb-0"> Nội dung tạo sản phẩm</p>
                            <p className="mb-0"><span className="font-weight-bold">productName:</span> Tên sản phẩm</p>
                            <p className="mb-0"><span className="font-weight-bold">productLink:</span> Link sản phẩm</p>
                            <p className="mb-0"><span className="font-weight-bold">catLink:</span> Link chuyên mục</p>
                            <p className="mb-0"><span className="font-weight-bold">productDescription:</span> Mô tả sản phẩm</p>
                            <p className="mb-0"><span className="font-weight-bold">price:</span> Giá sản phẩm</p>
                        </label>
                        <textarea className="w-100 "
                                  onChange={(event => {
                                      setSetting({...setting,content:event.target.value})
                                  })}
                                  value={setting && setting.content?setting.content:""}
                                  style={{minHeight:300}} placeholder={"Nội dung tạo sản phẩm"}></textarea>
                    </div>
                    <div>
                        <label>
                            <p className="mb-0">Mã ứng dụng</p>

                        </label>
                        <input
                            className="w-100"
                            value={setting && setting.appId?setting.appId:""}
                            onChange={(e)=>{
                                setSetting({...setting,appId:e.target.value})
                            }}/>
                    </div>
                    <div>
                        <label>
                            <p className="mb-0">Mật khẩu ứng dụng</p>

                        </label>
                        <input
                            className="w-100"
                            value={setting && setting.appSecrect?setting.appSecrect:""}
                            onChange={(e)=>{
                                setSetting({...setting,appSecrect:e.target.value})
                            }}/>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Setting
