import React, {useEffect, useState} from "react";
import GHNService from "../../../../services/GHNService";
import {Button} from "reactstrap";
import NumberFormat from "react-number-format";
const GHNOrderList = ({match,history}) => {
    const [list, setList] = useState([])
    useEffect(() => {
        if (match.params && match.params.id) {
            GHNService.findAllByOrderId(match.params.id).then((results) => {
                setList(results.data)
            })
        }
        //
    }, [])
    const gotoDetail = (order_code)=>{
        const location = {pathname: '/admin/ghn/detailt/' + order_code}
        history.push(location)

    }
    const gotoCreate = ()=>{
        const location = {pathname: '/admin/ghn/create/' + match.params.id}
        history.push(location)
    }
    return (
        <div>
            <Button onClick={gotoCreate}>Tạo mới</Button>
            <div className="mt-3 row">
                <h2 className="col-12">Danh sách đơn hàng GHN cho đơn hàng mã #{match.params.id}</h2>
                <div className="col-6">
                    <table className="w-100">
                        <thead>
                        <tr>
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
                </div>

            </div>

        </div>
    )
}
export default GHNOrderList
