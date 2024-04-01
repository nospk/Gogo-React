import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import {getCategories,uploadToLazada} from "../../../services/LazadaService";
import {NotificationManager} from "../../../components/common/react-notifications";
interface LazadaCategoryModalProps{
    isOpen:boolean,
    toggle:any,
    catId:number,
    callback:any
}
const LazadaCategoryModal = (props:LazadaCategoryModalProps)=>{
    const [level1,setLevel1] = useState([]);
    const [level2,setLevel2] = useState([]);
    const [level3,setLevel3] = useState([]);
    const [level4,setLevel4] = useState([]);
    const [level1Selected,setlevel1Selected] = useState('');
    const [level2Selected,setlevel2Selected] = useState('')
    const [level3Selected,setlevel3Selected] = useState('')
    const [level4Selected,setlevel4Selected] = useState('')
    const [catSubmit,setCatSubmit] = useState('')
    useEffect(()=>{
        getCategories().then(results=>{
           setLevel1(results.data.data);
        })
    },[]);
    const handleLevel1 = (item)=>{
        if (item.children && item.children.length>0){
            setlevel1Selected(item.category_id)
            setLevel2(item.children);
            setLevel3([])
            setLevel4([]);
            setCatSubmit('')
        }else {
            setCatSubmit(item.category_id)
            // submit(item.category_id,props.catId)
        }
    }
    const handleLevel2 = (item)=>{
        setlevel2Selected(item.category_id)
        if (item.children && item.children.length>0){
            setLevel3(item.children)
            setLevel4([]);
            setCatSubmit('');
        }else {
            setCatSubmit(item.category_id);

        }
    }
    const handleLevel3 = (item)=>{
        setlevel3Selected(item.category_id)
        if (item.children && item.children.length>0){
            setLevel4(item.children);
            setCatSubmit('');
        }else {
            setCatSubmit(item.category_id);
        }
    }
    const handleLevel4 = (item)=>{
        setlevel4Selected(item.category_id);
        setCatSubmit(item.category_id);
        // submit(item.category_id,props.catId)
    }
    const submit = ()=>{
        if (catSubmit){
           uploadToLazada(props.catId,catSubmit).then((results)=>{
              console.log(results);
              props.callback();
           });
        }else {
            NotificationManager.warning("Vui lòng chọn chuyên mục cuối cùng","Thông báo",2000)
        }

    }
    return(
        <Modal className="shadow-none"
               centered={true}
               size="xl"
               toggle={props.toggle}
               isOpen={props.isOpen}>
            <ModalHeader >
                <div className="d-flex w-100 justify-content-between">
                    Chọn chuyên mục cần cập nhật
                </div>
            </ModalHeader>
            <ModalBody>
                <div style={{maxHeight:400,overflowY:'auto'}}></div>
                <Row>
                    <Col md={3} style={{maxHeight:400,overflowY:'auto'}}>
                        {level1.map((item)=>{
                            return(
                                <div style={{cursor:"pointer",color:item.category_id===level1Selected?"red":"#000"}} onClick={()=>handleLevel1(item)}>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })}
                    </Col>
                    <Col md={3} style={{maxHeight:400,overflowY:'auto'}}>
                        {level2.map((item)=>{
                            return(
                                <div style={{cursor:"pointer",color:item.category_id===level2Selected?"red":"#000"}} onClick={()=>handleLevel2(item)}>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })}
                    </Col>
                    <Col md={3} style={{maxHeight:400,overflowY:'auto'}}>
                        {level3.map((item)=>{
                            return(
                                <div style={{cursor:"pointer",color:item.category_id===level3Selected?"red":"#000"}} onClick={()=>handleLevel3(item)}>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })}
                    </Col>
                    <Col md={3} style={{maxHeight:400,overflowY:'auto'}}>
                        {level4.map((item)=>{
                            return(
                                <div style={{cursor:"pointer",color:item.category_id===level4Selected?"red":"#000"}} onClick={()=>handleLevel4(item)}>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button outline color="info" onClick={props.toggle}>
                    Thoát
                </Button>
                <Button outline color="success" onClick={submit}>
                    Tạo
                </Button>
            </ModalFooter>
        </Modal>
    )
}
export default LazadaCategoryModal;
