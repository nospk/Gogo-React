import React, { Component, Fragment } from "react";
import {
    Row,
    Button,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Collapse,
    ButtonDropdown,
    CustomInput, UncontrolledDropdown, ModalBody
} from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import AddNewTodoModal from "../../../containers/applications/AddNewTodoModal";
import OrderListItem from "./component/OrderListItem";
import {findAll,addToTrash,changeStatus,deleteById,updateQuickview,countByStatus,restore, merge}from'../../../redux/order/actions'
import Pagination from "react-bootstrap-4-pagination";
import PrintOrder from "./component/print";
import ReactToPrint from "react-to-print";
import {DOMAIN, PRINT} from "../../../services/APIURL";
import PartnerService from "../../../services/PartnerService";
import {findAll as findAllPartner} from "../../../redux/partner/actions";
import TrackingOrder from "./component/TrackingOrder";
import DatePicker from "react-datepicker";
import moment from "moment";
import TrackingGHN from "./component/TrackingGHN";
import {getStatus} from "../../../services/OrderService";

class OrdersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownSplitOpen: false,
            modalOpen: false,
            lastChecked: [],
            displayOptionsIsOpen: false,
            filterLable:"",
            filterValue:"",
            currentPage:1,
            searchValue:"",
            hostLable:"",
            hostValue:"",
            page:0,
            pageSize:50,
            from:'',
            to:'',
            dataSearch:{
                status:'',
                host:'',
                keyword:'',
                from:'',
                to:''

            },
            trackingOrder:{
                show:false,
                id:0,
            },
            trackingGHN:{
                show:false,
                id:0,
            },
            timeOut:''
        };
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.history.location.search);
        if (params.get("status")){
            const  filter = this.filters().filter(value => value.action===params.get("status"))
            if (filter.length>0){
                this.handlerSelectFilter(filter[0])
            }else {
                this.props.findAll({page:this.state.page,pageSize:this.state.pageSize});
            }
        } else {
            this.props.findAll({page:this.state.page,pageSize:this.state.pageSize});
        }

        this.props.findAllPartner();
    }

    toggleDisplayOptions = () => {
        this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    };

    toggleSplit = () => {
        this.setState(prevState => ({
            dropdownSplitOpen: !prevState.dropdownSplitOpen
        }));
    };

    handleCheckChange = (item) => {
        const isExists = this.state.lastChecked.includes(item.id)
        if (isExists){
            const newList = this.state.lastChecked.filter((data)=>data!==item.id);
            this.setState({
                lastChecked:newList
            })
        }else {
            let newList = [...this.state.lastChecked];
            newList.push(item.id);
            this.setState({
                lastChecked:newList
            })
        }
        return;
    };

    handleChangeSelectAll = () => {
        const listChecked = this.props.list.map((item)=>item.id)
        if (this.state.lastChecked.length>=this.props.list.length){
            this.setState({
                lastChecked:[]
            })
        }else {
            this.setState({
                lastChecked:listChecked
            })
        }

    };
    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }
    redirectToCreate(){
        const location = {pathname: '/admin/order/create',}
        this.props.history.push(location)
    }
    redirectToDetailt(id){
        const location = {pathname: '/admin/order/create/'+id}
        this.props.history.push(location)
    }
    search(text){
        if (this.state.timeOut){
            clearTimeout(this.state.timeOut);
        }
        let request = {...this.state.dataSearch,keyword:text,page:0,pageSize:this.state.pageSize};
        this.setState({
            searchValue:text,
            dataSearch:request,
            timeOut:setTimeout(()=>{
                this.props.findAll(request);
                this.setState({page:0})
            },200)
        })

    }
    handleAction(action){
        switch (action){
            case "remove":  this.props.deleteById({action:action,ids:this.state.lastChecked}); break;
            case "exporttract":
                const paramsRequest = this.state.lastChecked.map((id)=> {
                    return "id="+id;
                }).join("&");
                window.location.href = DOMAIN+"/export-track?"+paramsRequest;
                break;
            case "trash": this.props.addToTrash({action:action,ids:this.state.lastChecked});break;
            case "print": this.print(); break;
            case "pendding": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "cancel": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "success": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "processing": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "shipping": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "awaitingadditionaldelivery": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "partiallypaid": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "paid": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "restore": this.props.restore({action:action,ids:this.state.lastChecked}); break;
            case "purchased": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "waitingreceived": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "deliveredall": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "customerreceived": this.props.changeStatus({action:action,ids:this.state.lastChecked}); break;
            case "merge":
                if (this.state.lastChecked.length < 2) {
                    alert("Vui lòng chọn 2 hóa đơn cần gộp")
                } else if (this.state.lastChecked.length > 2) {
                    alert("Bạn chọn nhiều hơn 2 hóa đơn không thể tiến hành gộp")
                } else {
                    this.props.merge({action:action,ids:this.state.lastChecked});
                }
                break;
        }
        setTimeout(()=>{
            this.props.countByStatus();
        },1000)
        this.setState({
            lastChecked:[]
        })
    }
    getListAction(){
        const actions = [
            {title:"Xóa hóa đơn", action:"remove"},
            {title:"Thùng rác", action:"trash"},
            {title:"Khôi phục", action:"restore"},
            {title:"In hóa đơn", action:"print"},
            {title:"Xuất excel vận chuyển", action:"exporttract"},
            {title:"Gộp hóa đơn", action:"merge"},
            ...getStatus()

        ]
        return actions;
    }
    renderAction(){
        return (
            <DropdownMenu right>
                {this.getListAction().map((item)=>(
                    <DropdownItem key={item.action} onClick={()=>this.handleAction(item.action)}>
                        <span>{item.title}</span>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        )
    }
    print(){

        const requestData = PRINT+"?"+this.state.lastChecked.map(item=>("id="+item)).join("&")
        window.open(requestData, '_blank').focus()
    }
    filters(){
        const actions = [
            {title:"Tất cả", action:"all"},
            {title:"Theo dõi đơn hàng", action:"tracking"},
            {title:"Chưa hoàn thành", action:"incomplate"},
            {title:"Thùng rác", action:"trash"},
            {title:"Chờ thanh toán", action:"pendding"},
            {title:"Hủy đơn hàng", action:"cancel"},
            {title:"Đã hoàn thành", action:"success"},
            {title:"Đang xử lý", action:"processing"},
            {title:"Đang vận chuyển", action:"shipping"},
            {title:"Chờ Phát Bổ Sung", action:"awaitingadditionaldelivery"},
            {title:"Đã thanh một phầm", action:"partiallypaid"},
            {title:"Đã thanh toán", action:"paid"},
        ]
        return actions;
    }
    handlerSelectFilter(filter){
        let request = {...this.state.dataSearch,status:filter.action,page:0,pageSize:this.state.pageSize};
        this.setState({
            filterLable:filter.title,
            filterValue:filter.action,
            dataSearch:request
        })
        this.props.findAll(request);
        this.setState({page:0})
    }
    handleSelectHost(value){
        let request = {...this.state.dataSearch,host:value.id,page:0,pageSize:this.state.pageSize};
        this.setState({
            hostValue:value.id,
            hostLable:value.providerName,
            dataSearch:request
        })

        this.props.findAll(request);
        this.setState({page:0})
    }
    handleSelectDateFrom(value){
        let request = {...this.state.dataSearch,from:value,page:0,pageSize:this.state.pageSize};
        this.setState({
            from:value,
            dataSearch:request
        })
        this.props.findAll(request);
    }
    handleSelectDateTo(value){
        let request = {...this.state.dataSearch,to:value,page:0,pageSize:this.state.pageSize};
        this.setState({
            to:value,
            dataSearch:request
        })
        this.props.findAll(request);
    }
    pagination() {
        return {
            totalPages: this.props.maxPage?this.props.maxPage:1,
            currentPage: this.state.page+1,
            showMax: 10,
            size: "sm",
            threeDots: true,
            prevNext: true,
            onClick: (page) => {
                this.setState({page:page-1})
                let request = {...this.state.dataSearch,page:page-1,pageSize:this.state.pageSize};
                this.props.findAll(request);
            }
        };
    }
    toggleTrackingOrder(){
        this.setState({
            trackingOrder:{
                ...this.state.trackingOrder,
                show:!this.state.trackingOrder.show,

            }
        });
    }
    openTrackingOrder(id,name){
        this.setState({
            trackingOrder:{
                show:true,
                id:id,
                name:name
            }
        });
    }
    handleChangeStatus(id,status,item){
        this.props.changeStatus({action:status,ids:[id]});
    }
    toggleTrackingGHN(){
        this.setState({
            trackingGHN:{
                ...this.state.trackingGHN,
                show:!this.state.trackingGHN.show,

            }
        });
    }
    openTrackingGHN(id,name){

        this.setState({
            trackingGHN:{
                show:true,
                id:id,
                name:name
            }
        });
    }
    reload(){
        let request = {...this.state.dataSearch,keyword:this.searchValue ? this.searchValue : "",page:this.page ? this.page : 0,pageSize:this.state.pageSize};
        this.props.findAll(request);
    }
    render() {
        const {list} = this.props;
        const { messages } = this.props.intl;
        const { modalOpen } = this.state;
        return (
            <Fragment>
                <Row className="survey-app">
                    <Colxx xxs="12">
                        <div className="mb-2">
                            <h1>
                                <IntlMessages id="order.list" />
                                <span className="ml-3 text-danger">{this.props.totalElements}</span>
                            </h1>
                            <div className="text-zero top-right-button-container">
                                <Button
                                    color="primary"
                                    size="lg"
                                    className="top-right-button"
                                    onClick={()=>{this.redirectToCreate()}}>
                                    <IntlMessages id="order.create" />
                                </Button>{" "}
                                <ButtonDropdown
                                    isOpen={this.state.dropdownSplitOpen}
                                    toggle={this.toggleSplit}>
                                    <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                                        <CustomInput
                                            className="custom-checkbox mb-0 d-inline-block"
                                            type="checkbox"
                                            id="checkAll"
                                            checked={this.state.lastChecked.length >= this.props.list.length}
                                            onClick={() => this.handleChangeSelectAll()}
                                            onChange={() => this.handleChangeSelectAll()}
                                            label={ <span
                                                className={`custom-control-label ${
                                                    this.state.lastChecked.length > 0 &&
                                                    this.state.lastChecked.length < this.props.list.length
                                                        ? "indeterminate"
                                                        : ""
                                                }`}
                                            />}
                                        />
                                    </div>
                                    <DropdownToggle
                                        caret
                                        color="primary"

                                        className="dropdown-toggle-split btn-lg"
                                    />
                                    {this.renderAction()}
                                </ButtonDropdown>
                            </div>

                        </div>
                        <div className="mb-2">
                            <Button
                                color="empty"
                                className="pt-0 pl-0 d-inline-block d-md-none"
                                onClick={this.toggleDisplayOptions}>
                               <span>Lọc hóa đơn</span>
                                <i className="simple-icon-arrow-down align-middle" />
                            </Button>
                            <Collapse
                                id="displayOptions"
                                className="d-md-block"
                                isOpen={this.state.displayOptionsIsOpen}>
                                <div className="d-block mb-2 d-md-inline-block">
                                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                        <DropdownToggle caret color="outline-dark" size="xs">
                                            <IntlMessages id="todo.orderby" />
                                            <span>{this.state.filterLable}</span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.filters().map((o, index) => {
                                                return (
                                                    <DropdownItem
                                                        onClick={()=>this.handlerSelectFilter(o)}
                                                        key={index+o.title}>
                                                        {o.title}
                                                    </DropdownItem>
                                                );
                                            })}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                        <DropdownToggle caret color="outline-dark" size="xs">
                                            Lọc theo web:
                                            <span>{this.state.hostLable}</span>
                                        </DropdownToggle>
                                        <DropdownMenu>
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
                                    <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                        <input
                                            type="text"
                                            name="keyword"
                                            id="search"
                                            placeholder={messages["menu.search"]}
                                            onChange={(e)=>this.search(e.target.value)}
                                        />
                                    </div>
                                    <div className="d-inline-block float-md-left mr-1 mb-1 align-top">
                                        <DatePicker
                                            dateFormat="DD-MM-YYYY"
                                            customInput={<input className="border-0" style={{border: 'none'}}/>}
                                            selected={this.state.from ? moment(this.state.from,"DD-MM-YYYY") : null}
                                            onChange={(value) => {
                                                console.log(value.format("DD-MM-YYYY"));
                                                this.handleSelectDateFrom(value?value.format("DD-MM-YYYY"):null)

                                            }}
                                            placeholderText={"Từ ngày"}/>
                                    </div>
                                    <div className="d-inline-block float-md-left mr-1 mb-1 align-top">
                                        <DatePicker
                                            dateFormat="DD-MM-YYYY"
                                            customInput={<input className="border-0" style={{border: 'none'}}/>}
                                            selected={this.state.to ? moment(this.state.to,"DD/MM/YYYY") : null}
                                            onChange={(value) => {
                                                this.handleSelectDateTo(value?value.format("DD-MM-YYYY"):null)
                                            }}
                                            placeholderText={"Đến ngày"}/>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                        <Separator className="mb-5" />
                        <Row>
                            {list.map((item, index) => {
                                return(
                                    <OrderListItem
                                        key={`todo_item_${index}`}
                                        item={item}
                                        trackingData={this.props.tracking}
                                        ghnData={this.props.ghn}
                                        changeStatus={this.handleChangeStatus.bind(this)}
                                        onClick={this.redirectToDetailt.bind(this)}
                                        handleCheckChange={this.handleCheckChange.bind(this)}
                                        isSelected={this.state.lastChecked.includes(item.id)}
                                        history={this.props.history}
                                        openTrackingOrder={this.openTrackingOrder.bind(this)}
                                        openTrackingGHN={this.openTrackingGHN.bind(this)}
                                        dispatch={this.props.updateQuickview}
                                        reload={this.reload.bind(this)}
                                    />
                                )
                            })}
                        </Row>
                        <Pagination {...this.pagination()} />
                    </Colxx>
                </Row>
                <AddNewTodoModal toggleModal={this.toggleModal} modalOpen={modalOpen} />
               <TrackingOrder show={this.state.trackingOrder.show}
                              name={this.state.trackingOrder.name}
                              id={this.state.trackingOrder.id}
                              toggle={this.toggleTrackingOrder.bind(this)}/>
                <TrackingGHN show={this.state.trackingGHN.show}
                             name={this.state.trackingGHN.name}
                             id={this.state.trackingGHN.id}
                             history={this.props.history}
                             toggle={this.toggleTrackingGHN.bind(this)}/>
            </Fragment>
        );
    }
}
const mapStateToProps = ({orderRedux,partner }) => {
    const {list,currentPage,maxPage,tracking,ghn,totalElements} = orderRedux;
    const partnerList = partner.list;
    return {
        list:list,
        currentPage:currentPage,
        maxPage:maxPage,
        partnerList:partnerList,
        tracking:tracking,
        ghn:ghn,
        totalElements:totalElements
    };
};
export default injectIntl(
    connect(
        mapStateToProps,
        {
            findAll,addToTrash,changeStatus,deleteById,findAllPartner,updateQuickview,countByStatus,restore,merge
        }
    )(OrdersView)
);
