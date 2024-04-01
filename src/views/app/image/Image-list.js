import React from "react";
import {injectIntl} from "react-intl";
import {
    Button,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Progress,
    Row,
    UncontrolledDropdown
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {connect} from "react-redux";
import {upload,findAll,deleteById,toggleModal,uploadZip} from "../../../redux/image/actions";
import {DOMAIN} from "../../../services/APIURL";
import ImageService from "../../../services/ImageService";
import ProgressService from "../../../services/ProgressService";
import Pagination from "react-bootstrap-4-pagination";
class ImageListView extends React.Component{
    constructor() {
        super();
        this.state={
            dropdownSplitOpen:false,
            selected:[],
            modal:false,
            imgSrcModal:"",
            currentId:null,
            progress:{
                status:true,
                value:0
            },
            type:this.filterByType()[0]
        }
    }
    componentDidMount() {
        this.props.findAll({page:0,pageSize:50});
        this.getProgress();
    }

    toggleModal(src,id){
        this.props.toggleModal();
        this.setState({
            imgSrcModal:src,
            currentId:id
        })
    }
    remove(){
        this.props.deleteById(this.state.currentId,this.props.history)
    }
    upload(){
        const input = document.createElement("input")
        input.type = 'file';
        input.setAttribute('multiple',true);
        input.onchange = (e)=>{
            let data = new FormData();
            const files = e.target.files;
            for (let i=0;i<files.length;i++){
                data.append('files['+i+']',files[i]);
            }
            data.append("type",this.state.type.value);
            this.props.upload(data);
        }
        input.click();
    }
    progressBar(value,total,uploadSuccess){
        if (uploadSuccess){
            setTimeout(()=>{
                console.log("running 1")

                this.getProgress()
            },2000)
            return;
        }
        const percent = (value/total)
        this.setState({
            progress:{
                status:true,
                value:Number((percent).toFixed(2))
            }
        })
    }
    uploadZip(){
        const input = document.createElement("input")
        input.type = 'file';
        input.setAttribute('multiple',true);
        input.onchange = (e)=>{
            let data = new FormData();
            const files = e.target.files;
            for (let i=0;i<files.length;i++){
                data.append('files['+i+']',files[i]);
            }
            ImageService.uploadZip(data,this.progressBar.bind(this))
        }
        input.click();
    }
    updateImages(){
        const input = document.createElement("input")
        input.type = 'file';
        input.setAttribute('multiple',true);
        input.onchange = (e)=>{
            let data = new FormData();
            const files = e.target.files;
            for (let i=0;i<files.length;i++){
                data.append('files['+i+']',files[i]);
            }
            ImageService.updateImages(data,this.progressBar.bind(this))
        }
        input.click();
    }
    getProgress(){
        ProgressService.getProgress("PROGRESS_IMAGE_ZIP").then((results)=>{
            if (results.success){
                this.setState({
                    progress:{
                        status:true,
                        value:results.data.progress
                    }
                })
                this.intervalProgress();
            }
        })
    }
    intervalProgress(){
        const interval = setInterval(()=>{
            ProgressService.getProgress("PROGRESS_IMAGE_ZIP").then((results)=>{
                if (results.success){
                    this.setState({
                        progress:{
                            status:true,
                            value:results.data.progress
                        }
                    })
                }else {
                    clearInterval(interval);
                    this.setState({
                        progress:{
                            status:true,
                            value:1
                        }
                    })
                }
            });
        },1000)
    }
    pagination(){
        return {
            totalPages: this.props.maxPage<=0?1:this.props.maxPage,
            currentPage: this.state.currentPage,
            showMax: 10,
            size: "sm",
            threeDots: true,
            prevNext: true,
            onClick: (page)=>{
                this.setState({currentPage:page})
                const request = {page:page-1,pageSize:50,type:this.state.type.value}
                this.props.findAll(request)
            }
        };
    }
    filterByType(){
        return[
            {label:"Hình ảnh", value:"img"},
            {label:"Icons", value:"icon"},
            {label:"Thương hiệu", value:"trademark"},
            {label:"logo", value:"logo"}
        ]
    }
    handleFilterByType(item){
        this.setState({type:item,currentPage:0})
        const request = {page:0,pageSize:50,type:item.value}
        this.props.findAll(request)
    }
    render() {
        return(
           <div>
               <div style={{display:this.state.progress.status?'block':'none'}}>
                   <Progress style={{height:15}} striped value={this.state.progress.value*100}>Đang xử lý {this.state.progress.value*100}%</Progress>
               </div>
                <div className="header">
                    <h1>Danh sách hình ảnh</h1>
                    <div className="text-zero top-right-button-container">
                        <UncontrolledDropdown>
                            <DropdownToggle caret color="secondary" outline>
                                <IntlMessages id="image.action" />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={()=>{this.upload()}}>
                                    <IntlMessages id="image.upload" />
                                </DropdownItem>
                                <DropdownItem onClick={()=>this.uploadZip()}>
                                    <IntlMessages id="image.uploadmulti"/>
                                </DropdownItem>
                                <DropdownItem onClick={()=>this.updateImages()}>
                                    Cập nhật hình ảnh SP
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown className="mt-2">
                            <DropdownToggle caret color="secondary" outline>
                                {this.state.type.label}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.filterByType().map((item,index)=>{
                                    return(
                                        <DropdownItem key={index} onClick={()=>{this.handleFilterByType(item)}}>
                                            {item.label}
                                        </DropdownItem>
                                    )
                                })}

                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </div>
                </div>
               <div >
                 <Row>
                     {this.props.list.map((item)=>{
                         return(
                             <Col key={item.id} onClick={()=>{this.toggleModal(DOMAIN+item.path,item.id)}} style={{cursor:"pointer"}} className="p-1" xs={3} sm={3} md={1} xl={1}>
                                 <img className="w-100" src={DOMAIN+item.path}/>
                             </Col>
                         )
                     })}
                 </Row>
                   <Pagination {...this.pagination()} />
               </div>
               <Modal isOpen={this.props.modal}
                      className="shadow-none"
                      size="lg"
                      toggle={this.toggleModal.bind(this)}
                      centered={true}>
                   <ModalBody>
                        <img className="w-100" src={this.state.imgSrcModal}/>
                   </ModalBody>
                   <ModalFooter>
                        <Button onClick={()=>this.remove()} outline color="danger">Xóa</Button>
                       <Button onClick={()=>this.toggleModal()} outline color="info">Thoát</Button>
                   </ModalFooter>
               </Modal>
           </div>
        )
    }
}
const mapStateToProps = ({image}) => {
    const {list,error,success,modal,maxPage} = image;
    return {list,error,success,modal,maxPage}
};
const mapActionsToProps = {upload,findAll,deleteById,toggleModal,uploadZip};
export default injectIntl(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(ImageListView)
);

