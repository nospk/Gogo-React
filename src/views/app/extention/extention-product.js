import React from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import ExtensionService from "../../../services/ExtensionService";
import DataTablePagination from "../../../components/DatatablePagination";
import ReactTable from "react-table";
import {Link} from "react-router-dom";
import {CustomInput, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Label} from "reactstrap";
import validator from "validator/es";
import ReactTablePagination from "../../../components/ReactTablePagination";
import {DOMAIN} from "../../../services/APIURL";
const bulkEvents = [
    {event:"browse", name:"Duyệt sản phẩm"},
    {event:"cancelbrowse", name:"Hủy duyệt sản phẩm"},
    {event:"remove", name:"Xóa sản phẩm"},
    {event:"removeToWeb", name:"Xóa cập nhật trên web"},

]
class ExtentionProduct extends React.Component{
    constructor(props) {

        super(props);
        this.state= {
            products:[],
            pageSize:50,
            currentPage:0,
            pages:0,
            dropdownBasicOpen: false,
            select:[],
            search:''
        }
    }
    componentDidMount() {
       this.getData(0)
    }
    loadmore(page){
        let requestParams ={};
        const {shopId} = this.props.match.params;
        if (shopId){
            requestParams.shopId = shopId
        }
        if (page) requestParams.page = page;
        if (this.state.pageSize) requestParams.pageSize = this.state.pageSize;
        if (this.state.search) requestParams.keyword = this.state.search;
        ExtensionService.findAllProduct(requestParams).then((results)=>{

            if (results.success){
                this.setState({
                    products:results.data.content,
                    pages:results.data.totalPages,
                    select:[]
                })
            }

        })
    }
    getData(page){
        let requestParams ={};
        const {shopId} = this.props.match.params;
        if (shopId){
            requestParams.shopId = shopId
        }
        if (page) requestParams.page = page;
        if (this.state.pageSize) requestParams.pageSize = this.state.pageSize;

        ExtensionService.findAllProduct(requestParams).then((results)=>{
            if (results.success){
                this.setState({
                    products:results.data.content,
                    pages:results.data.totalPages,
                    select:[]
                })
            }

        })
    }
    action(e,rowData){

        switch (e.target.value){
            case "show":
                this.props.history.push("/admin/extention/detailt/"+rowData.id)
                break;
            case "edit":
                break;
            case "toggleSynchronize":
                ExtensionService.disableSynchronize(rowData.id).then(()=>{
                    window.location.reload();
                })
                break;
            case "remove":
                ExtensionService.deleteProductById(rowData.id).then(()=>{
                    window.location.reload();
                })
                break;
            default:
                break;
        }
        e.target.selectedIndex=0
    }
    select(type,id,e){
        switch (type){
            case "all":
                if (this.state.select.length<this.state.products.length){
                    this.setState({select:this.state.products.map((item)=>item.id)})
                }else {
                    this.setState({select:[]})
                }
            break
            case "item":
                const filter = this.state.select.filter(item=>item===id);
                if (filter.length>0){
                    this.setState({
                        select:this.state.select.filter(item=>item!==id)
                    })
                }else {
                    this.setState({
                        select:[...this.state.select,id]
                    })
                }
            break;
            default:break
        }
    }
    getSelected(id){
        const filter = this.state.select.filter(item=>item===id);
        if (filter.length>0){
            return true;
        }
        return false;
    }
    configTable(){
        return[
            {
                Header: ()=>(
                    <div className="d-flex align-content-center">
                        <CustomInput id={"checkall"} checked={this.state.select.length===this.state.products.length}  onChange={this.select.bind(this,"all")} type="checkbox"/>
                        <p>ID</p>
                    </div>
                ),
                accessor: "id",
                Cell: props => (
                    <div className="d-flex align-content-center">
                        <CustomInput id={props.value} checked={this.getSelected(props.value)} onChange={this.select.bind(this,"item",props.value)} type="checkbox"/>
                        <p className="list-item-heading">{props.value}</p>
                    </div>
                ),
                width:50
            },
            {
                Header: "Tên TQ",
                accessor: "nameZh",
                Cell: props => (
                    <a className="d-flex" href={props.original.link} target="_blank">
                        {
                            props.original.gallery.length>0?<img width={50} height={50} src={validator.isURL(props.original.gallery[0])?props.original.gallery[0]:DOMAIN+props.original.gallery[0]}/>:''
                        }
                        <p className="list-item-heading">{props.value}</p>
                    </a>
                ),
            },
            {
                Header: "Dịch tạm",
                accessor: "tempName",
                Cell: props => (
                    <Link to={"/admin/extention/detailt/"+props.original.id}><p className="list-item-heading">{props.value}</p></Link>
                ),
            },
            {
                Header: "Tên Dịch chuẩn",
                accessor: "standardName",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),
            },
            {
                Cell: props => {
                    console.log(props);
                    return (
                        <select style={{padding:10,borderRadius:20,outline:"none"}} onChange={(e)=>{this.action(e,props.original)}}>
                            <option value="default">Thao tác</option>
                            <option value="show">Xem sản phẩm</option>
                            <option value="edit">Chỉnh sửa</option>
                            <option value="toggleSynchronize">{props.original.synchronize && props.original.synchronize?"Không đồng bộ":"Đồng bộ"}</option>
                            <option value="remove">Xóa sản phẩm</option>
                        </select>
                    )
                }
            },
        ];
    }
    toggleBasic(){
        this.setState(prevState => ({
            dropdownBasicOpen: !prevState.dropdownBasicOpen
        }));
    };
    onSearch(value){
        this.setState({
            search:value
        })
        let requestParams ={};
        const {shopId} = this.props.match.params;
        if (shopId){
            requestParams.shopId = shopId
        }
        requestParams.page = 1;
        requestParams.keyword = this.state.search;
        if (this.state.pageSize) requestParams.pageSize = this.state.pageSize;
        console.log(requestParams);
        ExtensionService.findAllProduct(requestParams).then((results)=>{
            if (results.success){
                this.setState({
                    products:results.data.content,
                    pages:results.data.totalPages,
                    select:[]
                })
            }

        })
    }
    bulkAction(event){
        switch (event){
            case "browse": ExtensionService.bulkAction({ids:this.state.select,event:event}); break;
            case "cancelbrowse": ExtensionService.bulkAction({ids:this.state.select,event:event});break;
            case "remove":
                ExtensionService.bulkAction({ids:this.state.select,event:event}).then(()=>{
                    this.getData(0)
                });
                break;
            case "removeToWeb": ExtensionService.bulkAction({ids:this.state.select,event:event});break;
        }
    }
    render() {

        return(
            <div>
                <div className="d-flex justify-content-end">
                    <Dropdown
                        isOpen={this.state.dropdownBasicOpen}
                        toggle={this.toggleBasic.bind(this)}
                        className="mb-5">
                        <DropdownToggle caret color="secondary" outline>
                            <span>Thao tác</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            {bulkEvents.map((item)=>(
                                <DropdownItem key={item.event} onClick={()=>{this.bulkAction(item.event)}}>
                                    <span>{item.name}</span>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <input onChange={(e)=>{this.onSearch(e.target.value)}} value={this.state.search}/>
                </div>
                <ReactTable
                    manual={true}
                    data={this.state.products}
                    columns={this.configTable()}
                    pages={this.state.pages}
                    page={this.state.currentPage}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    pageSize={this.state.pageSize}
                    collapseOnPageChange={true}

                    onPageChange={(page)=>{
                        this.setState({currentPage:page});
                        this.loadmore(page)

                    }}
                    sortable={false}
                    PaginationComponent={ReactTablePagination}
                />
            </div>
        )
    }

}
export default injectIntl(ExtentionProduct)

