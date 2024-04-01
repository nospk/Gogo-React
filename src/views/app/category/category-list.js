import React from "react";
import {injectIntl} from "react-intl";
import {
    Button, Card, CardBody, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal,
    ModalBody, ModalFooter, ModalHeader, Progress, Row, Table, UncontrolledDropdown
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx} from "../../../components/common/CustomBootstrap";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect} from "react-redux";
import {toggleModal as toggleImagePicker} from '../../../redux/image/actions'
import {findAll, create, removeError, removeSuccess, deleteById, sorttree} from '../../../redux/category/actions'
import {NotificationManager} from "../../../components/common/react-notifications";
import ImagePicker from "../../../components/imagepicker/ImagePicker";
import imgNotFound from '../../../assets/img/no-image.jpg'
import {DOMAIN} from "../../../services/APIURL";
import ProductService from "../../../services/ProductService";
import Switch from "rc-switch";
import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css';
import {findAll as findAllPartner} from "../../../redux/partner/actions";
import CategoryService from "../../../services/CategoryService";
import ProgressService from "../../../services/ProgressService";
import ShopeeModal from "../shopee/ShopeeModal";
import LazadaModal from "../lazada/LadazaModal";
import LazadaCategoryModal from "../lazada/LazadaCategoryModal";
import {removeProduct} from "../../../services/LazadaService";
const CustomTbodyComponent = props => (
    <div {...props} className={classnames("rt-tbody", props.className || [])}>
        <PerfectScrollbar options={{suppressScrollX: true}}>
            {props.children}
        </PerfectScrollbar>
    </div>
);
const eventPicker = {
    thumbnail:"THUMBNAIL",
    banner:"BANNER"
}
class CategoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRequest: {
                id: null,
                name: "",
                sku: "",
                slug: "",
                rate: 0,
                factorDefault: 0,
                factor1: 0,
                factor2: 0,
                factor3: 0,
                factor4: 0,
                parent: 0,
                thumbnail: null,
                banner:null,
                description:''

            },
            updateProduct:false,
            modal: false,
            eventPicker:"",
            modalUpdateHost:{
                show:false,
                categoryId:''
            },
            selectPartner:[],
            hostLable:"",
            hostValue:"",
            displayOptionsIsOpen: false,
            progress:{
                status:true,
                value:0
            },
            shopeeModalData:{
                isOpen: false,
                catId:'',
                catName:''
            },
            lazadaModalData:{
                isOpen: false,
                catId:'',
                catName:''
            },
            lazadaCategory:{
                catId:'',
                open:false,
            }
        }
    }

    componentDidMount() {
        this.props.findAll({page: 0, pageSize: 1000}, this.props.history);
        this.props.findAllPartner();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.error) {
            NotificationManager.addChangeListener(()=>{
                this.props.removeError();
            })
            NotificationManager.error(this.props.error, "Thông báo", 3000, null, null, '');
        }
        if (this.props.success){
            NotificationManager.addChangeListener(()=>{
                this.props.removeSuccess();
                this.clearDataModal();
            })
            NotificationManager.success(this.props.success, "Thông báo", 3000, null, null, '');
        }
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
    clearDataModal(){
        this.setState({
            dataRequest: {
                id: null,
                name: "",
                sku: "",
                slug: "",
                rate: 0,
                factorDefault: 0,
                factor1: 0,
                factor2: 0,
                factor3: 0,
                factor4: 0,
                parent: 0,
            },
            modal: false
        })
    }
    callbackPicker(data){

        switch (this.state.eventPicker){
            case eventPicker.thumbnail:
                this.setState(prevState => ({
                    dataRequest: {...prevState.dataRequest, thumbnail: data[0].path}
                }))
                break;
            case eventPicker.banner:
                this.setState(prevState => ({
                    dataRequest: {...prevState.dataRequest, banner: data[0].path}
                }))
                break;
            default:

                break
        }
    }
    showImagePicker(event,id){
        this.state.eventPicker = event
        this.props.toggleImagePicker();
    }
    toggleModal() {
        this.setState({
            modal: !this.state.modal
        })
    }
    inputSelected(data) {
        this.setState(prevState => ({
            dataRequest: {...prevState.dataRequest, parent: data.value},
        }))
    }
    getInputSelected(parent){
        const data = this.props.selectData.filter((item)=>item.value===parent);
        return data[0]
    }
    generateImageZipForCustomer(id){
        ProductService.generateImageZip(id).then(()=>{
            this.getProgress()
        });
    }
    generateImageZip(){
        ProductService.generateImageZip().then(()=>{
            this.getProgress()
        });
    }
    generateImage(id, textFlag){
        CategoryService.generateImage(id,textFlag).then(()=>{
            this.getProgress()
        })
    }
    generateImages(id){
        CategoryService.generateImages(id).then(()=>{
            this.getProgress()
        })
    }
    createPriceQuote(id){
        CategoryService.createPriceQuote(id).then(()=>{
            NotificationManager.success("Tạo file thành công", "Thông báo", 3000, null, null, '');
        });
    }
    add() {
        this.toggleModal();
    }
    submit(){
       this.props.create({...this.state.dataRequest,updateProduct:this.state.updateProduct},this.props.history);
    }
    generateShopee(data){
        console.log(data);
        this.setState({
            shopeeModalData:{
                ...this.state.shopeeModalData,
                isOpen: true,
                catId:data.id,
                catName:data.name,
                catSlug:data.slug
            }
        })

    }
    toggleModalShopee(confirm){
        if (confirm){
            this.getProgress();
        }
        this.setState({
            shopeeModalData:{...this.state.shopeeModalData,
                isOpen: !this.state.shopeeModalData.isOpen,
            }
        })
    }
    toggleModalLazada(confirm){
        if (confirm){
            this.getProgress();
        }
        this.setState({
            lazadaModalData:{...this.state.lazadaModalData,
                isOpen: !this.state.lazadaModalData.isOpen,
            }
        })
    }
    generateLazada(data){
        this.setState({
            lazadaModalData:{
                ...this.state.lazadaModalData,
                isOpen: true,
                catId:data.id,
                catName:data.name,
                catSlug:data.slug
            }
        })
    }
    renderModal() {
        const {messages} = this.props.intl;
        const {name, sku, rate, factor1, factor2, factor3, factor4, factorDefault, id,parent,thumbnail,banner,conditionPurchse,description} = this.state.dataRequest
        return (
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggleModal.bind(this)}
                wrapClassName="modal-right">
                <ModalHeader toggle={this.toggleModal.bind(this)}>
                    <IntlMessages id="category.create"/>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Switch
                            className="custom-switch custom-switch-primary-inverse"
                            checked={this.state.updateProduct}
                            onChange={(e)=> {
                                this.setState({
                                    updateProduct:!this.state.updateProduct
                                })
                            }}
                        />
                    </Row>
                    <Row className="mb-2">
                        <Label className="mt-2" for="categoryName">
                            <IntlMessages id="category.name"/>
                        </Label>
                        <Input
                            type="text" name="categoryName" id="categoryName"
                            value={name}
                            onChange={(e) => {
                                const value = e.target.value;
                                this.setState(prevState => ({dataRequest: {...prevState.dataRequest, name: value}}))
                            }}
                            placeholder={messages["category.name"]}
                        />
                    </Row>
                    <Row className="mb-2">
                        <Label className="mt-2" for="categorySku">
                            <IntlMessages id="category.sku"/>
                        </Label>
                        <Input
                            type="text" name="categorySku" id="categorySku"
                            value={sku}
                            onChange={(e) => {
                                const value = e.target.value;
                                this.setState(prevState => ({dataRequest: {...prevState.dataRequest, sku: value}}))
                            }}
                            placeholder={messages["category.sku"]}
                        />
                    </Row>
                    <Row className="mb-2">
                        <Label className="mt-2" for="categoryRate">
                            <IntlMessages id="category.rate"/>
                        </Label>
                        <Input
                            type="text"
                            name="categoryRate"
                            value={rate}
                            onChange={(e) => {
                                const value = e.target.value;
                                this.setState(prevState => ({dataRequest: {...prevState.dataRequest, rate: value}}))
                            }}
                            id="categoryRate"
                            placeholder={messages["category.rate"]}
                        />
                    </Row>
                    <Row className="mb-2">
                        <Colxx className="p-0 pr-1" sm="6" xl="6">
                            <Label className="mt-2" for="factorDefault">
                                <IntlMessages id="category.factorDefault"/>
                            </Label>
                            <Input
                                type="text"
                                name="factorDefault"
                                value={factorDefault}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState(prevState => ({
                                        dataRequest: {
                                            ...prevState.dataRequest,
                                            factorDefault: value
                                        }
                                    }))
                                }}
                                id="factorDefault"
                                placeholder={messages["category.factorDefault"]}
                            />
                        </Colxx>
                        <Colxx className="p-0 pl-1" sm="6" xl="6">
                            <Label className="mt-2" for="factor1">
                                <IntlMessages id="category.factor1"/>
                            </Label>
                            <Input
                                type="text"
                                name="factor1"
                                value={factor1}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState(prevState => ({
                                        dataRequest: {
                                            ...prevState.dataRequest,
                                            factor1: value
                                        }
                                    }))
                                }}
                                id="factor1"
                                placeholder={messages["category.factor1"]}
                            />
                        </Colxx>
                    </Row>
                    <Row className="mb-2">
                        <Colxx className="p-0 pr-1" sm="6" xl="6">
                            <Label className="mt-2" for="factor2">
                                <IntlMessages id="category.factor2"/>
                            </Label>
                            <Input
                                type="text"
                                name="factor2"
                                value={factor2}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState(prevState => ({
                                        dataRequest: {
                                            ...prevState.dataRequest,
                                            factor2: value
                                        }
                                    }))
                                }}
                                id="factor2"
                                placeholder={messages["category.factor2"]}
                            />
                        </Colxx>
                        <Colxx className="p-0 pl-1" sm="6" xl="6">
                            <Label className="mt-2" for="factor3">
                                <IntlMessages id="category.factor3"/>
                            </Label>
                            <Input
                                type="text"
                                name="factor3"
                                value={factor3}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState(prevState => ({
                                        dataRequest: {
                                            ...prevState.dataRequest,
                                            factor3: value
                                        }
                                    }))
                                }}
                                id="factor3"
                                placeholder={messages["category.factor3"]}
                            />
                        </Colxx>
                        <Colxx className="p-0 pl-1" sm="6" xl="6">
                            <Label className="mt-2" for="factor4">
                                <IntlMessages id="category.factor4"/>
                            </Label>
                            <Input
                                type="text"
                                name="factor4"
                                value={factor4}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState(prevState => ({
                                        dataRequest: {
                                            ...prevState.dataRequest,
                                            factor4: value
                                        }
                                    }))
                                }}
                                id="factor4"
                                placeholder={messages["category.factor4"]}
                            />
                        </Colxx>
                        <Colxx className="p-0 pl-1" sm="6" xl="6">
                            <Label className="mt-2" for="conditionPurchse">
                                <IntlMessages id="category.conditionPurchse"/>
                            </Label>
                            <Input
                                type="text"
                                name="factor4"
                                value={conditionPurchse?conditionPurchse:''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState(prevState => ({
                                        dataRequest: {
                                            ...prevState.dataRequest,
                                            conditionPurchse: value
                                        }
                                    }))
                                }}
                                id="conditionPurchse"
                                placeholder={messages["category.conditionPurchse"]}
                            />
                        </Colxx>
                    </Row>
                    <Row className="mb-2">
                        <Label className="mt-2 w-100" for="categoryName">
                            Mô tả chuyên mục
                        </Label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            className="w-100"
                            style={{minHeight:150}}
                            value={description?description:''}
                            onChange={(e) => {
                                const value = e.target.value;
                                this.setState(prevState => ({dataRequest: {...prevState.dataRequest, description: value}}))
                            }}
                            placeholder='Mô tả chuyên mục'
                        />
                    </Row>
                    <Row>
                        <Colxx className="p-0">
                            <label>
                                <IntlMessages id="category.parent"/>
                            </label>
                            <Select
                                components={{Input: CustomSelectInput}}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={this.getInputSelected(parent)}
                                onChange={this.inputSelected.bind(this)}
                                options={this.props.selectData}
                            />
                        </Colxx>
                    </Row>
                    <Row className="align-items-center mt-3">
                        <Col sm={3} md={3} >
                            <img onClick={()=>this.showImagePicker(eventPicker.thumbnail)} className="w-100" src={thumbnail===null?imgNotFound:DOMAIN+thumbnail}/>
                        </Col>
                        <Col sm={9} md={9} >
                            <img onClick={()=>this.showImagePicker(eventPicker.banner)} className="w-100" src={banner===null?imgNotFound:DOMAIN+banner}/>
                        </Col>

                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submit.bind(this)}>
                        Do Something
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggleModal.bind(this)}>
                        <IntlMessages id="cancel"/>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
    removeCategory(item){
        this.props.deleteById(item);
    }
    editCategory(item){
        this.setState({
            dataRequest:item,
            modal: true
        })
    }
    renderBodyTable() {
        return this.props.list.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    <td>{item.rate}</td>
                    <td>{item.factorDefault}</td>
                    <td>{item.factor1}</td>
                    <td>{item.factor2}</td>
                    <td>{item.factor3}</td>
                    <td>{item.factor4}</td>
                    <td>
                        <UncontrolledDropdown>
                            <DropdownToggle caret color="secondary" outline>
                                <IntlMessages id="category.btn.action"/>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={(e)=>{this.removeCategory(item)}}>
                                    <IntlMessages id="category.btn.remove"/>
                                </DropdownItem>
                                <DropdownItem onClick={(e)=>{this.editCategory(item)}}>
                                    <IntlMessages id="category.btn.edit"/>
                                </DropdownItem>
                                <DropdownItem onClick={(e)=>{this.generateImageZip(item.id)}}>
                                    Tạo file hình ảnh
                                </DropdownItem>
                                <DropdownItem onClick={(e)=>{window.location.href=DOMAIN+'/resources/zip/'+item.slug+'-thumbnail.zip'}}>
                                   Tải hình ảnh đại diện
                                </DropdownItem>
                                <DropdownItem onClick={(e)=>{
                                    ProductService.deleteByCat(item.id).then(()=>{console.log("delete success")})}}>Xóa tất cả sản phẩm
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
            )
        });
    }
    removeLazadaProduct(item){
        removeProduct({categoryId:item}).then((results)=>{
            console.log(results);
        })
    }
    renderDataSortTable(rowInfo){
        return{
            buttons: [
                <UncontrolledDropdown>
                    <DropdownToggle caret color="secondary" outline>
                        <IntlMessages id="category.btn.action"/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={(e)=>{this.removeCategory(rowInfo.node.data)}}>
                            <IntlMessages id="category.btn.remove"/>
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.editCategory(rowInfo.node.data)}}>
                            <IntlMessages id="category.btn.edit"/>
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.createPriceQuote(rowInfo.node.data.id)}}>
                            Tạo file báo giá
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.generateImageZipForCustomer(rowInfo.node.data.id)}}>
                            Tạo file ảnh cho khách hàng
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.generateImage(rowInfo.node.data.id, '0')}}>
                            Tạo file ảnh đại diện ko sku
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.generateImage(rowInfo.node.data.id, '1')}}>
                            Tạo file ảnh đại diện có sku
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.generateImages(rowInfo.node.data.id)}}>
                            Tạo file toàn bộ ảnh
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{window.location.href=DOMAIN+'/resources/zip/'+rowInfo.node.data.slug+'-thumbnail.zip'}}>
                            Tải hình ảnh đại diện
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{window.location.href=DOMAIN+'/resources/zip/'+rowInfo.node.data.slug+'-image-all.zip'}}>
                            Tải toàn bộ hình ảnh
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.openModalUpdateHost(rowInfo.node.data)}}>
                            Chọn website hiển thị
                        </DropdownItem>

                        <DropdownItem onClick={(e)=>{this.generateShopee(rowInfo.node.data)}}>
                            Excel shopee
                        </DropdownItem>

                        <DropdownItem onClick={(e)=>{this.generateLazada(rowInfo.node.data)}}>
                           Excel lazada
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.togglelazadaCategory(rowInfo.node.data.id)}}>
                            Cập nhật lên lazada
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{this.removeLazadaProduct(rowInfo.node.data.id)}}>
                            Xóa sản phẩm lazada
                        </DropdownItem>
                        <DropdownItem onClick={(e)=>{
                            ProductService.deleteByCat(rowInfo.node.data.id).then(()=>{
                                console.log("delete success")
                            })
                        }}>
                            Xóa tất cả sản phẩm
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            ],
            style: {
                height: '60px',
                width:'800px',
                borderRadius:10
            },
            title:
            <div className="d-flex" style={{}}>
                <div className="p-1">
                    <div className="">#{rowInfo.node.data.id}</div>
                    <div className="">{rowInfo.node.title}</div>
                    <div className="">{rowInfo.node.data.sku}</div>
                </div>
            </div>

        }
    }
    openModalUpdateHost(data){
        this.setState({
            modalUpdateHost:{...this.state.modalUpdateHost,show:true,categoryId:data.id},
            selectPartner:data.categoryProvider.map(item=>item.id)
        });
    }
    submitUpdateHost(){
        const dataRequests = {
            categoryId:this.state.modalUpdateHost.categoryId,
            domains:this.state.selectPartner
        }
        CategoryService.updateHost(dataRequests).then((results)=>{
            this.toggleModalUpdateHost();
        })
    }
    toggleModalUpdateHost(){
        this.setState({
            modalUpdateHost:{...this.state.modalUpdateHost,show:!this.state.modalUpdateHost.show}
        });
    }
    selectHost(id){
        if(this.state.selectPartner.includes(id)){
            const newList = this.state.selectPartner.filter(item=>item!==id);
            this.setState({
                selectPartner:newList
            })
        }else {
            const newList = [...this.state.selectPartner,id];
            this.setState({
                selectPartner:newList
            })
        }
    }
    renderModalUpdateHost(){
        const {show} = this.state.modalUpdateHost;
        const partnerList = this.props.partnerList;
        return(
            <Modal className="shadow-none"
                   centered={true}
                   size="md"
                   toggle={() => {this.setState((prev)=>({modalUpdateHost:{...prev.modalUpdateHost,show:!show}}))}}
                   isOpen={show}>
                <ModalHeader>
                    <span>Chọn chuyên mục cần cập nhật</span>
                </ModalHeader>
                <ModalBody>
                    <p className="font-weight-bold">Chọn website</p>
                    {partnerList.map((item)=>(
                        <div key={item.id} className="d-flex justify-content-between p-2" style={{color:this.state.selectPartner.includes(item.id)?'red':'#000'}}>
                            <span>{item.providerName}</span>
                            <button disabled={item.id===this.state.selectPartner} className="btn-success" onClick={()=>this.selectHost(item.id)}>Chọn</button>
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button outline color="info" onClick={()=>this.setState((prev)=>({modalUpdateHost:{...prev.modalUpdateHost,show:!show}}))}>
                        Thoát
                    </Button>
                    <Button outline color="success" onClick={()=>{this.submitUpdateHost()}}>
                        Cập nhật
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
    handleSelectHost(value){
        if (value==="all"){
            this.setState({hostValue:"",hostLable:""})
            this.props.findAll({page: 0, pageSize: 1000}, this.props.history);
        }else {
            this.setState({hostValue:value.id,hostLable:value.providerName})
            this.props.findAll({page: 0, pageSize: 1000,host:value.id}, this.props.history);
        }

    }
    renderFilterByHost(){
        return(
            <div>
                <Collapse
                    id="displayOptions"
                    className="d-md-block"
                    isOpen={this.state.displayOptionsIsOpen}>
                    <div className="d-block mb-2 d-md-inline-block">
                        <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                            <DropdownToggle caret color="outline-dark" size="xs">
                                Lọc theo web:
                                <span>{this.state.hostLable}</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={()=>this.handleSelectHost("all")}>
                                    Tất cả
                                </DropdownItem>
                                {this.props.partnerList.map((item, index) => {
                                    return (
                                        <DropdownItem
                                            onClick={()=>this.handleSelectHost(item)}
                                            key={index}>
                                            {item.providerName}
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Collapse>
            </div>
        )
    }
    search(value){

        this.props.findAll({page: 0, pageSize: 1000,keyword:value}, this.props.history);
    }
    togglelazadaCategory(catId){
        this.setState({
            lazadaCategory:{
                catId:catId,
                open:!this.state.lazadaCategory.open
            }
        })
    }
    callbackLazadaModel(){
        this.getProgress();
    }
    render() {
        return (
            <div>
                <Progress style={{height:15}} striped value={this.state.progress.value*100}>Đang xử lý {this.state.progress.value*100}%</Progress>
                <Card>
                    <CardHeader className="pt-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex">
                            <div className="d-flex flex-column">
                                {this.renderFilterByHost()}
                            </div>
                            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                <input
                                    type="text"
                                    name="keyword"
                                    id="search"
                                    placeholder={'Tìm kiếm'}
                                    onChange={(e)=>this.search(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <UncontrolledDropdown>
                                <DropdownToggle caret color="secondary" outline>
                                    <IntlMessages id="category.btn.action"/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={(e)=>{this.generateImageZip()}}>
                                        Tạo file hình ảnh cho khách
                                    </DropdownItem>
                                    <DropdownItem onClick={(e)=>{this.createPriceQuote()}}>
                                       Tạo file báo giá
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <div onClick={() => {
                                this.add()
                            }} className="glyph-icon simple-icon-plus" style={{cursor: "pointer", fontSize: "20px"}}></div>
                        </div>
                    </CardHeader>
                    <div style={{ height: 800,width:'100%' }}>
                        <SortableTree
                            generateNodeProps={this.renderDataSortTable.bind(this)}
                            treeData={this.props.sortData}
                            canDrag={()=>(false)}
                            canDrop={({node,prevPath,prevParent,prevTreeIndex,nextPath,nextParent,nextTreeIndex})=>{
                                if (nextPath.length===1){
                                    if (node.children.length>0){
                                        for (let i=0;i<node.children;i++){
                                            if (node.children[i].children>0){
                                                for (let j=0;i<node.children[i].children.length;j++){
                                                    if (node.children[i].children[j].length>0) return false;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (nextPath.length===2){
                                    if (node.children.length>0){
                                        for (let i=0;i<node.children;i++){
                                            if (node.children[i].children>0){
                                                return false
                                            }
                                        }
                                    }
                                }
                                if (nextPath.length===3){
                                    if (node.children.length>0) return false;
                                }
                                if (nextPath.length>=4)return false;
                                return false;
                            }}
                            onChange={treeData => this.props.sorttree(treeData)}
                        />
                    </div>
                </Card>
                {this.renderModal()}
                {this.renderModalUpdateHost()}
                <ImagePicker callback={this.callbackPicker.bind(this)}/>
                <ShopeeModal isOpen={this.state.shopeeModalData.isOpen}
                             catId={this.state.shopeeModalData.catId}
                             catName={this.state.shopeeModalData.catName}
                             catSlug={this.state.shopeeModalData.catSlug}
                             toggle={this.toggleModalShopee.bind(this)}/>
                <LazadaModal isOpen={this.state.lazadaModalData.isOpen}
                             catId={this.state.lazadaModalData.catId}
                             catName={this.state.lazadaModalData.catName}
                             catSlug={this.state.lazadaModalData.catSlug}
                             toggle={this.toggleModalShopee.bind(this)}/>
                <LazadaCategoryModal isOpen={this.state.lazadaCategory.open}
                                     catId={this.state.lazadaCategory.catId}
                                     callback={this.callbackLazadaModel.bind(this)}
                                     toggle={this.togglelazadaCategory.bind(this)}/>
            </div>

        );
    }

}

const mapStateToProps = ({category,partner}) => {
    const {list, selectData,error,success,sortData} = category;
    const partnerList = partner.list;
    return {list, selectData,error,success,sortData,partnerList}
};
const mapActionsToProps = {findAll, create,removeError,removeSuccess,deleteById,toggleImagePicker,sorttree,findAllPartner};
export default injectIntl(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(CategoryView)
);


