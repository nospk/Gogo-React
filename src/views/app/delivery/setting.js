import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import ImagePicker from "../../../components/imagepicker/ImagePicker";
import {toggleModal as toggleImagePicker} from '../../../redux/image/actions'

import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {DOMAIN} from "../../../services/APIURL";
import SettingService from "../../../services/SettingService";
import {NotificationManager} from "../../../components/common/react-notifications";

const DeliverySetting = (props) => {
    const [data, setData] = useState({
        delivery: {},
        order: {},
        currency: {},
        advise: {},
        supportResearch: {},
        contents: []
    });
    const [editor, setEditor] = useState();
    const [event, setEvent] = useState();
    useEffect(() => {
        SettingService.getDeliverySetting().then((results) => {
            setData(results.data);
        })
    }, []);
    const callBackPicker = (image) => {
        switch (event.event) {
            case "selectBanner":
                onChangeValue("banner", image[0].path, event.index);
                break;

        }
    }
    const openModalPicker = (event) => {
        props.toggleImagePicker();
        setEvent(event);
    }
    const confirm = () => {
        SettingService.updateDeliverySetting(data).then(() => {
            NotificationManager.success("Cập nhật thông tin thành công", "Thông báo", 2000)
        })
    }
    const addItem = () => {
        let newItem = {
            formType: "",
            content: "",
            title: "",
            banner: "",
            id: "",
            top: true,
            align:"left_right"
        }
        setData({...data, contents: data.contents ? [...data.contents, newItem] : [newItem]})
    }
    const removeItem = (index) => {
        const removed = data.contents.filter((item, i) => i != index);
        setData({...data, contents: removed});
    }
    const onChangeValue = (key, value, index) => {
        const updated = data.contents.map((item, i) => {
            if (index === i) {
                switch (key) {
                    case "formType":
                        item.formType = value;
                        break;
                    case "content":
                        item.content = value;
                        break;
                    case "title":
                        item.title = value;
                        break;
                    case "banner":
                        item.banner = value;
                        break;
                    case "id":
                        item.id = value;
                        break;
                    case "align":
                        item.align = value;
                        break;
                    case "top":
                        item.top = value;
                        break;
                }
            }
            return item;
        })
        setData({...data, contents: updated});
    }
    const renderItem = () => {
        if (data && data.contents) {
            return data.contents.map((item, index) => {
                return (
                    <div className="mt-3" key={index}>
                        <div className="d-flex" style={{gap: 5}}>
                            <input className="w-100 p-2 rounded mb-2 mt-2 border-0"
                                   value={item.title ? item.title : ""}
                                   onChange={(e) => {
                                       onChangeValue("title", e.target.value, index)
                                   }}
                                   placeholder={"Tiêu đề"}/>
                            <input className="p-2 rounded mb-2 mt-2 border-0"
                                   value={item.id ? item.id : ""}
                                   placeholder={"Nhập ID"}
                                   onChange={(e) => {
                                       onChangeValue("id", e.target.value, index)
                                   }}/>
                            {renderTop(item.top,index)}
                            {renderAlign(item.align, index)}
                            {formTypeOption(item.formType, index)}
                            <Button onClick={() => removeItem(index)} color={"danger"}>Xóa</Button>
                        </div>
                        <CKEditor
                            onReady={editor => {
                                editor.ui.getEditableElement().parentElement.insertBefore(
                                    editor.ui.view.toolbar.element,
                                    editor.ui.getEditableElement()
                                );

                            }}
                            onChange={(event, editor) => {
                                onChangeValue("content", editor.getData(), index)
                            }}
                            editor={DecoupledEditor}
                            data={item.content ? item.content : ""}
                        />
                        <img width={200}
                             height={200}
                             onClick={() => {
                                 openModalPicker({event: "selectBanner", index: index})
                             }}
                             src={item.banner ? DOMAIN + item.banner : "https://cdn.kuaidi100.com/images/www/home/section1.png"}/>
                    </div>
                )
            })
        } else {
            return ""
        }

    }
    const handleSelectOption = (value, index) => {
        onChangeValue("formType", value, index);
    }
    const formTypeOption = (value, index) => {
        const formType = [
            {value: "", label: "Không chọn"},
            {value: "delivery", label: "Form vận chuyển"},
            {value: "order", label: "Form đặt hàng"},
            {value: "currency", label: "Form chuyển đổi tiền tệ"},
        ]
        return (
            <select className="rounded "
                    value={value ? value : ""}
                    onChange={(e) => handleSelectOption(e.target.value, index)}>
                {formType.map((item, i) => {
                    return (
                        <option key={i} value={item.value}>{item.label}</option>
                    )
                })}
            </select>
        )

    }
    const handleSelectAlignOption = (value, index) => {
        onChangeValue("align", value, index);
    }
    const renderAlign = (value, index) => {
        const alignType = [
            {value: "none", label: "Không chọn"},
            {value: "right_left", label: "Phải trái"},
            {value: "left_right", label: "Phải trái"},
        ]
        return (
            <select className="rounded "
                    value={value ? value : ""}
                    onChange={(e) => handleSelectAlignOption(e.target.value, index)}>
                {alignType.map((item, i) => {
                    return (
                        <option key={i} value={item.value}>{item.label}</option>
                    )
                })}
            </select>
        )
    }
    const handleSelectTopOption = (value, index) => {
        onChangeValue("top", value, index);
    }
    const renderTop = (value, index) => {
        const alignType = [
            {value: true, label: "Hiển trên"},
            {value: false, label: "Hiển thị dưới"},
        ]
        return (
            <select className="rounded "
                    value={value ? value : ""}
                    onChange={(e) => handleSelectTopOption(e.target.value, index)}>
                {alignType.map((item, i) => {
                    return (
                        <option key={i} value={item.value}>{item.label}</option>
                    )
                })}
            </select>
        )
    }

    return (
        <div>
            <div className="d-flex justify-content-end">
                <Button onClick={() => {
                    confirm()
                }}>Cập nhật</Button>
                <Button onClick={() => addItem()}>Thêm</Button>
            </div>
            <div className="wrap-contents">
                {renderItem()}
            </div>

            <ImagePicker callback={callBackPicker}/>
        </div>
    )
}
const mapStateToProps = () => {
    return {}
};
const mapActionsToProps = {toggleImagePicker};
export default injectIntl(
    connect(mapStateToProps, mapActionsToProps)(DeliverySetting)
)


