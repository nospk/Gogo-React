import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
class ModalAddService extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:'',
            price:'',
            quantity:'',

        }
    }
    onchangeValues(field,value){

        switch (field){
            case 'name': this.setState({name:value});break;
            case 'price': this.setState({price:value});break;
            case 'quantity': this.setState({quantity:value});break;

        }
    }
    add(){
        this.props.callback({
            name:this.state.name,
            price:this.state.price,
            quantity:this.state.quantity
        })
        this.setState({
            name:'',
            price:'',
            quantity:''
        })
    }
    render() {
        return (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    Thêm dịch vụ
                </ModalHeader>
                <ModalBody>
                    <div>
                        <label>Tên dịch vụ</label>
                        <input value={this.state.name}
                               className="w-100"
                               onChange={(e)=>this.onchangeValues('name',e.target.value)}/>
                    </div>
                    <div>
                        <label>Giá tiền</label>
                        <input value={this.state.price}
                               className="w-100"
                               onChange={(e)=>this.onchangeValues('price',e.target.value)}/>
                    </div>
                    <div>
                        <label>Số lượng</label>
                        <input value={this.state.quantity}
                               className="w-100"
                               onChange={(e)=>this.onchangeValues('quantity',e.target.value)}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color={'warning'} onClick={()=>this.add()}>Xác nhận</Button>
                </ModalFooter>
            </Modal>
        );
    }

}
export default ModalAddService;