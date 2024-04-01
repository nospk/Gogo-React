import React from "react";
import {deleteById, findAll, toggleModal, upload} from "../../redux/image/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {
    Button,
    Col, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row, UncontrolledDropdown
} from "reactstrap";
import Pagination from "react-bootstrap-4-pagination";
import {DOMAIN} from "../../services/APIURL";
import './ImagePicker.scss'
class ImagePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            selected:[],
            multiple:false,
            search:"",
            type:this.filterByType()[0],
        }

    }
    keyDownHandler(e){
        if (!this.state.multiple){
            this.setState({
                multiple:true
            })
        }

    }
    keyUpHandler(){
        this.setState({
            multiple:false
        })
    }
    componentDidMount() {
        this.props.findAll({page: 0, pageSize: 50});
        document.addEventListener('keydown',this.keyDownHandler.bind(this));
        document.addEventListener('keyup',this.keyUpHandler.bind(this));

    }
    componentWillUnmount() {
        document.removeEventListener('keydown',this.keyDownHandler);
        document.removeEventListener('keyup',this.keyUpHandler);
    }

    toggleModal() {
        this.props.toggleModal();
    }

    select(item) {
        if (this.state.multiple){
            const filter = this.state.selected.filter((data)=>item.id===data.id);
            if (filter.length>0){
                this.setState({
                    selected:this.state.selected.filter((data)=>data.id!==item.id)
                })
            }else {
                this.setState({
                    selected:[...this.state.selected,item]
                })
            }
        }else {
            this.setState({
                selected:[item]
            })
        }

    }
    confirm(){
        this.props.callback(this.state.selected);
        this.state.selected = [];
        this.props.toggleModal();
    }
    pagination() {
        return {
            totalPages: this.props.maxPage,
            currentPage: this.state.currentPage,
            showMax: 10,
            size: "sm",
            threeDots: true,
            prevNext: true,
            onClick: (page) => {
                this.setState({currentPage: page})

                const request = {page: page-1, pageSize: 50,type:this.state.type.value}
                if (this.state.search) request.keyword = this.state.search;
                this.props.findAll(request)
            }
        };
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
            data.append('type',this.state.type.value);
            this.props.upload(data);
        }
        input.click();
    }
    getActive(selectId){
        const filter = this.state.selected.filter((item)=>{
            if (item.id===selectId)return true;
            return false;
        });
        if (filter.length>0){
            return true
        }else {

            return false;
        }
    }
    search(text){
        this.setState({search:text});
        const request = {page: 0, pageSize: 50,keyword:text,type:this.state.type.value}
        this.props.findAll(request)
    }
    renderList() {
        return (
            <Row>
                {this.props.list.map((item) => {
                    return (
                        <Col onClick={()=>this.select(item)}  key={item.id} style={{cursor: "pointer"}} className={this.getActive(item.id)?"p-1 image-active":"p-1"} xs={3} sm={3} md={1} xl={1}>
                            <img className="w-100" src={DOMAIN + item.path}/>
                        </Col>
                    )
                })}
            </Row>
        )
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
        return (
            <Modal isOpen={this.props.modal}
                   className="shadow-none"
                   size="lg"
                   toggle={this.toggleModal.bind(this)}
                   centered={true}>
                <ModalHeader>
                   <div className="d-flex justify-content-between">
                       <div className="search d-flex align-items-cente border p-1 border-primary rounded" data-search-path="/app/pages/search">
                           <Input
                               className="p-0 border-0"
                               name="searchKeyword"
                               id="searchKeyword"
                               onChange={(e)=>this.search(e.target.value)}
                           />
                           <i className="simple-icon-magnifier"/>
                       </div>
                   </div>
                </ModalHeader>
                <ModalBody>
                    {this.renderList()}
                    <Pagination {...this.pagination()} />
                </ModalBody>
                <ModalFooter>
                    <div className="w-100 d-flex justify-content-between">
                        <div className="left d-flex">
                            <button className="btn btn-warning" onClick={()=>this.upload()}>Tải ảnh lên</button>
                            <UncontrolledDropdown className="ml-2">
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
                        <div className="right d-flex">
                            <Button onClick={() => this.toggleModal()} outline color="info">Thoát</Button>
                            <Button onClick={() => this.confirm()} outline color="info">Chọn hình ảnh</Button>
                        </div>
                    </div>

                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = ({image}) => {
    const {list, error, success, modal,maxPage} = image;
    return {list, error, success, modal,maxPage}
};
const mapActionsToProps = {upload, findAll, deleteById, toggleModal};
export default injectIntl(
    connect(mapStateToProps, mapActionsToProps)(ImagePicker)
)
