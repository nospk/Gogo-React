import React from "react";
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import SettingService from "../../../../services/SettingService";
import {NotificationManager} from "../../../../components/common/react-notifications";

class EmbedSocial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            modal:{
                show:false,
                data:{},
                index:''
            },
        }
    }
    componentDidMount() {
        SettingService.getEmbedSocial().then((results)=>{
            this.setState({
                list:results.data
            })
        })
    }

    toggleModal(){
        this.setState({
            modal:{...this.state.modal,show:!this.state.modal.show}
        })
    }
    updateState(){
        let newData = [];
       if (this.state.modal.index!=null){
           newData = this.state.list.map((item,index)=>{

               if (index===this.state.modal.index){
                   item = this.state.modal.data
               }
               return item;
           })

       }else {
           newData = [...this.state.list,this.state.modal.data]
       }

       this.setState({
           list:newData
       })
        this.toggleModal();
    }
    add(){
        this.setState({modal:{show:true, data:{}}})
    }
    remove(index){
        const removed = this.state.list.filter((item,i)=>index!==i);
        this.setState({
            list:removed
        })
    }
    edit(index){
        this.setState({
            modal:{
                show:true,
                data:this.state.list[index],
                index:index
            }
        })
    }
    onChangeValueModal(value,field){
        switch (field){
            case "name":
                this.setState({modal:{...this.state.modal,data:{...this.state.modal.data,name:value}}})
                break;
            case "embedCode":
                this.setState({modal:{...this.state.modal,data:{...this.state.modal.data,embedCode:value}}})
                break;
        }
    }
    update(){
        SettingService.updateEmbedSocial(this.state.list).then(()=>{
            NotificationManager.success("Cập nhật thành công","Thông báo",1000);
        })
    }
    renderModal(){
        return(
           <Modal isOpen={this.state.modal.show}
                  toggle={()=>this.toggleModal()}>
                <ModalHeader toggle={()=>this.toggleModal()}>Nhúng mã code</ModalHeader>
               <ModalBody>
                   <div>
                       <p>Tên nhúng</p>
                       <Input className="w-100"
                              onChange={(e)=>this.onChangeValueModal(e.target.value,'name')}
                              value={this.state.modal.data.name?this.state.modal.data.name:''}/>
                   </div>
                   <div>
                       <p>Code nhúng</p>
                       <Editor
                           value={this.state.modal.data.embedCode?this.state.modal.data.embedCode:''}
                           onValueChange={code => this.onChangeValueModal(code,'embedCode')}
                           highlight={code => highlight(code, languages.js)}
                           padding={10}
                           style={{
                               fontFamily: '"Fira code", "Fira Mono", monospace',
                               fontSize: 12,
                           }}
                       />
                   </div>
               </ModalBody>
               <ModalFooter>
                   <Button onClick={()=>this.updateState()}>Cập nhật</Button>
               </ModalFooter>
           </Modal>
        )
    }
    render() {
        return (
            <div>
                <div className="d-flex justify-content-end">
                    <Button onClick={()=>this.add()}>Thêm</Button>
                    <Button onClick={()=>this.update()}>Cập nhật</Button>
                </div>
                <Row>
                    {this.state.list.map((item,index)=>{
                        return(
                            <Col key={index} xs={2} sm={2} md={2} xl={2}>
                                <p className="font-weight-bold">{item.name}</p>
                                <Button onClick={()=>this.remove(index)}>Xóa</Button>
                                <Button onClick={()=>this.edit(index)}>Sửa</Button>
                            </Col>
                        )
                    })}
                </Row>
                {this.renderModal()}
            </div>
        )
    }

}

export default EmbedSocial;