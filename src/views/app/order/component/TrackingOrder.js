import React, {useEffect, useState,useMemo} from "react";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customcontaierinputdatepicker.css"
import moment from "moment";
import NumberFormat from "react-number-format";
import OrderService from "../../../../services/OrderService";
import {NotificationManager} from "../../../../components/common/react-notifications";
import Switch from "rc-switch";

interface Props {
    name:string,
    show: boolean,
    id: number,
    toggle: any
}

const TrackingOrder = (props: Props) => {
    const [data, setData] = useState([]);
    const [total,setTotal] = useState(0);
    const [exchangeRate,setExchangeRate] = useState(3800);
    useEffect(() => {
       OrderService.getTracking(props.id).then((results)=>{
            //console.log(results.data)
           setData(results.data)
       })
        OrderService.getExchangeRateTracking().then((results)=>{
            setExchangeRate(results.data)
        })
    }, [props.id])
    const totalData = useMemo(() => {
        return data.map((item)=>{
            return  item.productAmount?parseInt(item.productAmount):0;
        }).reduce((prev,current)=>{
            return prev+current;
        },0);
    }, [data]);

    const add = () => {
        setData([...data, {}])
    }
    const remove = (index)=>{
        const filter = data.filter((item,i)=>i===index);
        if (filter.length > 0) {
              const data = filter[0];
              if (data.id){
                  OrderService.deleteTracking(data.id).then(()=>{

                  });
              }
        }
        const removed = data.filter((value,i)=>{
            return index!==i;
        })
        setData(removed);

    }
    const submit = () => {
        OrderService.updateTracking(data).then((results)=>{
            NotificationManager.success("Cập nhật thành công","Thông báo",2000)

        })
    }
    const onChangeValue = (value, field, index) => {
        const updated = data.map((item, i) => {
            item.orderId = props.id;
            if (i === index) {
                switch (field) {
                    case "dateOrder":
                        item.dateOrder = value.toDate();
                        break;
                    case "productAmount":
                        item.productAmount = value;
                        break;
                    case "ladingCode":
                        item.ladingCode = value;
                        break;
                    case "carrier":
                        item.carrier = value;
                        break;
                    case "receiptDate":
                        item.receiptDate = value.toDate();
                        break;
                    case "packageNumber":
                        item.packageNumber = value;
                        break;
                    case "note":
                        item.note = value;
                        break;
                    case "status":
                        item.status = value;
                        break;
                    case "name":
                        item.name = value;
                        break;
                    case "quantity":
                        item.quantity = value;
                        break;
                    case "orderCode":
                        item.orderCode = value;
                        break;
                    case "received":
                        item.received = !item.received;
                        break;
                    case "packageReceived":
                        item.packageReceived = value;
                        break;
                }
            }
            return item;
        })
        setData(updated)
    }
    const onChangeExchangeRate = (e)=>{
       setExchangeRate(e)
    }
    const updateExchangeRate = ()=>{
        OrderService.updateExchangeRateTracking(exchangeRate).then((results)=>{
            NotificationManager.success("Cập nhật thành công","Thông báo",2000)
        })
    }
    const exportExcel = ()=>{

    }
    return (
        <Modal isOpen={props.show}
               className="shadow-none w-100 mw-100"
               size={"xl"}
               centered={true}
               toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}   cssModule={{'modal-title': 'w-100 d-flex align-items-center justify-content-between'}} >
                <span>Theo dõi đơn hàng:<span className="font-weight-bold text-danger">{props.name}</span></span>
                <div className="d-flex align-items-center " style={{gap:10}}>
                    <Button onClick={exportExcel}>Tải excel</Button>
                    <span>Tỷ giá:</span>
                    <NumberFormat value={exchangeRate}
                                  className="border-0"
                                  onValueChange={(e)=>{onChangeExchangeRate(e.value)}}
                                  thousandSeparator={true} />
                    <Button color={"info"} onClick={()=>updateExchangeRate()}>Cập nhật</Button>
                </div>
            </ModalHeader>
            <ModalBody>

                <table className="w-100">
                    <thead>
                    <tr>
                        <th width={'5%'}>SL</th>
                        <th width={'20%'}>Sản phẩm</th>
                        <th width={'5%'}>Tiền hàng</th>
                        <th>Ngày đặt</th>
                        <th>Mã đơn hàng</th>
                        <th>Vận đơn</th>
                        <th>Hãng vận chuyển</th>
                        <th>Ngày nhập kho</th>
                        <th>Trạng thái</th>
                        <th width={'5%'}>Số kiện</th>
                        <th width={'10%'}>Ghi chú</th>
                        <th width={'5%'}>Đã nhận</th>
                        <th width={'10%'}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <div className="d-flex">
                                        <div className="glyph-icon iconsminds-remove font-weight-bold"
                                             onClick={()=>remove(index)}
                                             style={{cursor:"pointer"}}></div>
                                        <input className="border-0 w-100"
                                               type={'text'}
                                               placeholder={"SL"}
                                               onChange={(e) => onChangeValue(e.target.value, 'quantity', index)}
                                               value={item.quantity ? item.quantity : ''}/>
                                    </div>

                                </td>
                                <td>
                                    <input className="border-0 w-100"
                                              type={'text'}
                                              onChange={(e) => onChangeValue(e.target.value, 'name', index)}
                                              value={item.name ? item.name : ''}/>
                                </td>
                                <td>
                                    <NumberFormat value={item.productAmount ? item.productAmount : 0}
                                                  className="border-0"
                                                  onValueChange={(e) => onChangeValue(e.value, 'productAmount', index)}
                                                  displayType={'input'} thousandSeparator={true} suffix={" tệ"}/>
                                </td>
                                <td>
                                    <DatePicker
                                        dateFormat="DD/MM/YYYY"
                                        customInput={<input className="border-0" style={{border: 'none'}}/>}
                                        selected={item.dateOrder ? moment(item.dateOrder) : null}
                                        onChange={(value) => onChangeValue(value, "dateOrder", index)}
                                        placeholderText={"Ngày đặt"}/>
                                </td>
                                <td>
                                    <input className="border-0 w-100"
                                           type={'text'}
                                           placeholder={"Mã đơn hàng"}
                                           onChange={(e) => onChangeValue(e.target.value, 'orderCode', index)}
                                           value={item.orderCode ? item.orderCode : ''}/>
                                </td>
                                <td>
                                    <input className="border-0 w-100"
                                           type={'text'}
                                           placeholder={"Vận đơn"}
                                           onChange={(e) => onChangeValue(e.target.value, 'ladingCode', index)}
                                           value={item.ladingCode ? item.ladingCode : ''}/>
                                </td>
                                <td>
                                    <input className="border-0 w-100"
                                           type={'text'}
                                           placeholder={"Hãng vận chuyển"}
                                           onChange={(e) => onChangeValue(e.target.value, 'carrier', index)}
                                           value={item.carrier ? item.carrier : ''}/>
                                </td>
                                <td>
                                    <DatePicker
                                        dateFormat="DD/MM/YYYY"
                                        customInput={<input className="border-0" style={{border: 'none'}}/>}
                                        selected={item.receiptDate ? moment(item.receiptDate) : null}
                                        onChange={(value) => onChangeValue(value, "receiptDate", index)}
                                        placeholderText={"Ngày Nhập kho"}/>
                                </td>
                                <td>
                                    <input className="border-0 w-100"
                                           type={'text'}
                                           placeholder={"trạng thái"}
                                           onChange={(e) => onChangeValue(e.target.value, 'status', index)}
                                           value={item.status ? item.status : ''}/>
                                </td>
                                <td>
                                    <input className="border-0 w-100"
                                           type={'text'}
                                           placeholder={"số kiện"}
                                           onChange={(e) => onChangeValue(e.target.value, 'packageNumber', index)}
                                           value={item.packageNumber ? item.packageNumber : ''}/>
                                </td>
                                <td>
                                    <input className="border-0 w-100"
                                           type={'text'}
                                           placeholder={"ghi chú"}
                                           onChange={(e) => onChangeValue(e.target.value, 'note', index)}
                                           value={item.note ? item.note : ''}/>
                                </td>
                                <td>
                                    <input className="border-0 w-100"
                                           type={'text'}
                                           placeholder={"Đã nhận"}
                                           onChange={(e) => onChangeValue(e.target.value, 'packageReceived', index)}
                                           value={item.packageReceived ? item.packageReceived : ''}/>
                                </td>
                                <td>
                                    <Switch
                                        className="custom-switch custom-switch-secondary"
                                        checked={item.received}
                                        onChange={switchCheckedSecondary => {
                                            onChangeValue(switchCheckedSecondary.toSource, 'received', index)
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>
                            <i className="glyph-icon simple-icon-plus"
                               style={{cursor: "pointer", fontSize: 25}}
                               onClick={() => add()}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter className="justify-content-between">
                <div className="d-flex font-weight-bold text-danger" style={{gap:20}}>
                    <span>Tổng:{totalData} tệ</span>
                    <span>VND: <NumberFormat value={totalData*exchangeRate}
                                             thousandSeparator={true}
                                             displayType={'text'} suffix={"đ"}/></span>
                </div>
                <div>
                    <Button color={"info"} onClick={() => submit()}>Cập nhật</Button>
                </div>

            </ModalFooter>
        </Modal>
    )
}
export default TrackingOrder;
