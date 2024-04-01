import React, {useEffect, useState} from "react";
import SettingService from "../../../services/SettingService";
import {Button} from "reactstrap";
import ImagePicker from "../../../components/imagepicker/ImagePicker";
import {toggleModal as toggleImagePicker} from "../../../redux/image/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {DOMAIN} from "../../../services/APIURL";

const SettingSEO = (props) => {
    const [data, setData] = useState();
    const [website, setWebsite] = useState();
    const [eventPicker, setEventPicker] = useState({name: "", index: 0});
    useEffect(() => {
        SettingService.getDeliverySetting().then((results) => {
            setData(results.data);
            setWebsite(results.data.website ? results.data.website : {});
        })
    }, [])
    const confirm = () => {
        SettingService.updateDeliverySetting({...data, website: website}).then(() => {
            console.log(data);
        })
    }
    const callBackPicker = (images) => {
        switch (eventPicker.name) {
            case "banner":
                if (website.banner && website.banner.length > 0) {
                    setWebsite({...website, banner: [...website.banner, images.map(item => item.path)]})
                } else {
                    setWebsite({...website, banner: images.map(item => item.path)})
                }
                break;
            case "review":
                onChangeValueReview(eventPicker.index, "thumbnail", images[0].path)
                break;
            case "logo":
                setWebsite({...website, logo: images[0].path})
                break;
        }

    }
    const openPicker = (event) => {
        setEventPicker(event);
        props.toggleImagePicker()
    }
    const onChangeValue = (key, value) => {
        switch (key) {
            case "name":
                setWebsite({...website, name: value});
                break
            case "description":
                setWebsite({...website, description: value});
                break
            case "banner":
                setWebsite({...website, description: value});
                break
            case "phoneNumber":
                setWebsite({...website, phoneNumber: value});
                break
            case "zalo":
                setWebsite({...website, zalo: value});
                break
            case "keywords":
                setWebsite({...website, keywords: value});
                break
            case "address":
                setWebsite({...website, address: value});
                break

        }
    }
    const addMenu = () => {
        if (website && website.menus) {
            setWebsite({...website, menus: [...website.menus, {name: "menu", children: []}]})
        } else {
            setWebsite({...website, menus: [{name: "menu", children: []}]})
        }
    }
    const removeMenu = (id) => {
        const removed = website.menus.filter((item, i) => i !== id);
        setWebsite({...website, menus: removed})
    }
    const addChildrenMenu = (parent) => {
        const added = website.menus.map((item, i) => {
            if (i === parent) {
                if (item.children) {
                    item.children = [...item.children, {name: "menu", children: []}]
                } else {
                    item.children = [{name: "menu", children: []}]
                }
            }
            return item;
        })
        setWebsite({...website, menus: added});
    }
    const removeChildrenMenu = (parent, child) => {
        const newData = website.menus.map((item, i) => {
            if (i === parent) {
                const removed = item.children.filter((item, iChild) => child !== iChild);
                item.children = removed;
            }
            return item;
        })
        setWebsite({...website, menus: newData});
    }
    const onChangeMenuParent = (parent, key, value) => {
        const newData = website.menus.map((item, i) => {
            if (i === parent) {
                switch (key) {
                    case "name":
                        item.name = value;
                        break;
                }
            }
            return item;
        })
        setWebsite({...website, menus: newData});
    }
    const onChangeMenuChild = (parent, child, key, value) => {
        const newData = website.menus.map((item, i) => {
            if (i === parent) {
                item.children = item.children.map((itemChild, iChild) => {
                    if (iChild === child) {
                        switch (key) {
                            case "name":
                                itemChild.name = value;
                                break;
                            case "link":
                                itemChild.link = value;
                                break;
                        }
                    }
                    return itemChild
                })

            }
            return item;
        })
        setWebsite({...website, menus: newData});
    }
    const renderMenu = () => {
        if (website && website.menus) {
            return website.menus.map((item, i) => {
                return (
                    <div key={i}>
                        <input className="w-100"
                               value={item && item.name ? item.name : ""}
                               onChange={(e) => onChangeMenuParent(i, "name", e.target.value)}
                               placeholder="Tên menu"/>
                        <div className="p-3">
                            <div className="d-flex justify-content-between">
                                <span className="font-weight-bold">Menu con</span>
                                <div className="d-flex" style={{gap: 5}}>
                                    <span onClick={() => removeMenu(i)}
                                          style={{cursor: "pointer", color: "#ff0309"}}>xóa</span>
                                    <span onClick={() => addChildrenMenu(i)}
                                          style={{cursor: "pointer", color: "#0c04f5"}}>Thêm</span>
                                </div>
                            </div>
                            {item.children ? item.children.map((itemChild, ichild) => {
                                return (
                                    <div key={ichild} className="d-flex justify-content-between" style={{gap: 10}}>
                                        <div className="w-100 d-flex" style={{gap: 5}}>
                                            <input className="w-100"
                                                   value={itemChild && itemChild.name ? itemChild.name : ""}
                                                   onChange={(e) => onChangeMenuChild(i, ichild, "name", e.target.value)}
                                                   placeholder={"Tên menu con"}/>
                                            <input className="w-100"
                                                   value={itemChild && itemChild.link ? itemChild.link : ""}
                                                   onChange={(e) => onChangeMenuChild(i, ichild, "link", e.target.value)}
                                                   placeholder={"Đường dẫn"}/>
                                        </div>
                                        <div>
                                              <span onClick={() => removeChildrenMenu(i, ichild)}
                                                    style={{cursor: "pointer", color: "#ff0309"}}>xóa</span>
                                        </div>
                                    </div>
                                )
                            }) : ""}
                        </div>

                    </div>
                )
            })
        }
        return ""
    }
    const removeBaner = (index) => {
        const removed = website.banner.filter((item, i) => i != index);
        setWebsite({...website, banner: removed});
    }
    const renderReview = () => {
        if (website && website.reviews) {
            return website.reviews.map((item, index) => {
                return (
                    <div style={{position: "relative"}}
                         key={index}
                         className="col-4 d-flex flex-column justify-content-center p-1">
                        <img onClick={() => {
                            openPicker({name: "review", index: index})
                        }}
                             className="w-100"
                             src={item.thumbnail ? DOMAIN + item.thumbnail : "https://cdn.kuaidi100.com/images/www/home/customer-1.png"}/>
                        <input value={item.name ? item.name : ""}
                               onChange={(e) => onChangeValueReview(index, "name", e.target.value)}
                               placeholder={"Nhập tên khách review"}/>
                        <textarea style={{minHeight: 100}}
                                  value={item.content ? item.content : ""}
                                  onChange={(e) => onChangeValueReview(index, "content", e.target.value)}
                                  placeholder={"Nội dung reviwe"}/>
                        <div onClick={() => removeReview(index)}
                             style={{cursor: "pointer", fontSize: 25, position: "absolute", top: 0, right: -5}}
                             className={"glyph-icon iconsminds-remove"}/>
                    </div>
                )
            })
        } else {
            return ""
        }
    }
    const addReview = () => {
        if (website && website.reviews) {
            setWebsite({...website, reviews: [...website.reviews, {thumbnail: "", name: "", content: ""}]})
        } else {
            setWebsite({...website, reviews: [{thumbnail: "", name: "", content: ""}]})
        }
    }
    const removeReview = (index) => {
        const removed = website.reviews.filter((item, i) => i != index);
        setWebsite({...website, reviews: removed});
    }
    const onChangeValueReview = (index, key, value) => {
        const updated = website.reviews.map((item, i) => {
            if (i === index) {
                switch (key) {
                    case "thumbnail":
                        item.thumbnail = value;
                        break;
                    case "name":
                        item.name = value;
                        break;
                    case "content":
                        item.content = value;
                        break;
                    default:
                }
            }
            return item;
        });
        setWebsite({...website, reviews: updated})
    }
    return (
        <div>
            <div className="d-flex justify-content-end">
                <Button onClick={confirm}>Cập nhật</Button>
            </div>
            <div className="row">
                <div className="col-6 flex-column d-flex" style={{gap: 10}}>
                    <div>
                        <p className="w-100 font-weight-bold">Tên trang web</p>
                        <input onChange={(e) => {
                            onChangeValue("name", e.target.value)
                        }}
                               className="w-100"
                               value={website && website.name ? website.name : ""}
                               placeholder={"Tên trang web"}/>
                    </div>
                    <div>
                        <p className="w-100 font-weight-bold">Mô tả trang web</p>
                        <textarea onChange={(e) => {
                            onChangeValue("description", e.target.value)
                        }}
                                  value={website && website.description ? website.description : ""}
                                  className="w-100"
                                  placeholder={"Mô tả trang web"}/>
                    </div>
                    <div>
                        <p className="w-100 font-weight-bold">Từ khóa tìm kiếm</p>
                        <textarea onChange={(e) => {
                            onChangeValue("keywords", e.target.value)
                        }}
                                  value={website && website.keywords ? website.keywords : ""}
                                  className="w-100"
                                  placeholder={"Từ khóa tìm kiếm"}/>
                    </div>
                    <div>
                        <p className="w-100 font-weight-bold">Số điện thoại</p>
                        <input onChange={(e) => {
                            onChangeValue("phoneNumber", e.target.value)
                        }}
                               className="w-100"
                               value={website && website.phoneNumber ? website.phoneNumber : ""}
                               placeholder={"Số điện thoại"}/>
                    </div>
                    <div>
                        <p className="w-100 font-weight-bold">Địa chỉ</p>
                        <input onChange={(e) => {
                            onChangeValue("address", e.target.value)
                        }}
                               className="w-100"
                               value={website && website.address ? website.address : ""}
                               placeholder={"Địa chỉ"}/>
                    </div>
                    <div>
                        <p className="w-100 font-weight-bold">Zalo</p>
                        <input onChange={(e) => {
                            onChangeValue("zalo", e.target.value)
                        }}
                               className="w-100"
                               value={website && website.zalo ? website.zalo : ""}
                               placeholder={"zalo"}/>
                    </div>

                    <div>
                        <div className="d-flex justify-content-between">
                            <span className="font-weight-bold ">Menu footer</span>
                            <span onClick={addMenu} style={{cursor: "pointer", color: "#0c04f5"}}>Thêm</span>
                        </div>
                        {renderMenu()}
                    </div>

                </div>
                <div className="col-6">
                    <div className="d-flex flex-column" style={{gap: 10}}>
                        <div className="d-flex flex-column">
                            <span className="font-weight-bold">Logo</span>
                            <img style={{cursor: "pointer"}}
                                 width={200}
                                 onClick={() => openPicker({name: "logo"})}
                                 src={website && website.logo ? DOMAIN + website.logo : "https://caysenda.vn/resources/upload/NOMI.png"}/>
                        </div>
                        <div>
                            <span className="font-weight-bold">banner</span>
                            <div className="row">
                                {website && website.banner && website.banner.map((item, index) => {
                                    return (
                                        <div style={{position: "relative"}} className="col-2" key={index}>
                                            <img className="w-100"
                                                 src={website && website.banner ? DOMAIN + item : "https://caysenda.vn/resources/upload/banner.png"}/>
                                            <div onClick={() => removeBaner(index)}
                                                 style={{
                                                     cursor: "pointer",
                                                     fontSize: 25,
                                                     position: "absolute",
                                                     top: 0,
                                                     right: -5
                                                 }}
                                                 className={"glyph-icon iconsminds-remove"}/>
                                        </div>
                                    )
                                })}
                                <div className="col-2">
                                    <div onClick={() => {
                                        openPicker({name: "banner"})
                                    }}
                                         style={{cursor: "pointer", fontSize: 25}}
                                         className={"glyph-icon simple-icon-plus"}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-6">
                    <p className="font-weight-bold mt-3">Thông tin review</p>
                    <div className="row">
                        {renderReview()}
                        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                            <div style={{cursor: "pointer", fontSize: 25}}
                                 onClick={() => addReview()}
                                 className={"glyph-icon simple-icon-plus"}/>
                        </div>
                    </div>
                </div>
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
    connect(mapStateToProps, mapActionsToProps)(SettingSEO)
)

