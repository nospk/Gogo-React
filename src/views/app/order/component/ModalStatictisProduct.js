import React from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
class ModalStatictisProduct extends React.Component{
    constructor(props) {
        super(props);

    }
    renderFooterTable(){
        if (this.props.data && this.props.data.length>0){
            const data = this.props.data.reduce((item1,item2)=>{
                const item = item1;
                item.countproduct+=item2.countproduct
                item.countvariant+=item2.countvariant
                item.totalquantity+=item2.totalquantity
                return item
            })
            return(
                <tr >
                    <th>Tổng</th>
                    <th>{data.countproduct}</th>
                    <th>{data.countvariant}</th>
                    <th>{data.totalquantity}</th>
                </tr>
            )
        }else {
            return '';
        }

    }
    render() {
        return(
           <Modal isOpen={this.props.open} toggle={this.props.toggle}>
               <ModalHeader toggle={this.props.toggle}>
                   Thống kê số lượng sản phẩm
               </ModalHeader>
               <ModalBody>
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th>Chuyên mục</th>
                                <th>Sản phẩm</th>
                                <th>Biến thể</th>
                                <th>Tổng số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.countproduct}</td>
                                        <td>{item.countvariant}</td>
                                        <td>{item.totalquantity}</td>
                                    </tr>
                                )
                            })}
                            {this.renderFooterTable()}
                        </tbody>
                    </table>
               </ModalBody>
               <ModalFooter>

               </ModalFooter>
           </Modal>
        )
    }

}
export default ModalStatictisProduct;