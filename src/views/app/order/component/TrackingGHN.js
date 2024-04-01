import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import NumberFormat from "react-number-format";

import GHNService from "../../../../services/GHNService";
interface Props {
    name:string,
    show: boolean,
    id: number,
    toggle: any,
    history:any,

}
const TrackingGHN = (props:Props)=>{
    const [list,setList] = useState([])

    useEffect(()=>{
       GHNService.findAllByOrderId(props.id).then((results)=>{
           setList(results.data);
       })
    },[props.id])
    const gotoDetail = (order_code)=>{
        window.open('/admin/ghn/detailt/' + order_code,'_blank').focus()
        // const location = {pathname: '/admin/ghn/detailt/' + order_code}
        // props.history.push(location)

    }
    const gotoCreate = ()=>{
        window.open('/admin/ghn/create/' + props.id,'_blank').focus()
        // const location = {pathname: '/admin/ghn/create/' + props.id}
        // props.history.push(location)
    }
    return(
        <Modal isOpen={props.show}
               className="shadow-none w-100 mw-100"
               size={"xl"}
               centered={true}
               toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}   cssModule={{'modal-title': 'w-100 d-flex align-items-center justify-content-between'}} >
                <span>Theo dõi đơn hàng:<span className="font-weight-bold text-danger">{props.name}</span></span>
                <div className="d-flex align-items-center " style={{gap:10}}>

                    <Button color={"info"} onClick={()=>gotoCreate()}>Thêm</Button>
                </div>
            </ModalHeader>
            <ModalBody>
                <table className="w-100">
                    <thead>
                    <tr>
                        <th>Tên sp</th>
                        <th>Mã đơn hàng</th>
                        <th>Số tiền</th>
                        <th>COD</th>
                        <th>Phí</th>
                        <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td style={{cursor:"pointer"}} onClick={()=>gotoDetail(item.orderCodeGhn)}>{item.name}</td>
                                <td style={{cursor:"pointer"}} onClick={()=>gotoDetail(item.orderCodeGhn)}>{item.orderCodeGhn}</td>
                                <td>
                                    <NumberFormat displayType={'text'} value={item.amount} thousandSeparator={true}/>

                                </td>
                                <td>
                                    <NumberFormat displayType={'text'} value={item.cod} thousandSeparator={true}/>
                                </td>
                                <td>
                                    <NumberFormat displayType={'text'} value= {item.totalFee} thousandSeparator={true}/>
                                </td>
                                <td>{item.status}</td>
                            </tr>
                        )
                    })}
                    </tbody>

                </table>
            </ModalBody>
            <ModalFooter className="justify-content-between">


            </ModalFooter>
        </Modal>
    )
}
export default TrackingGHN;
