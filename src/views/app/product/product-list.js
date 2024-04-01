import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Collapse, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    Label, Progress,
    Row, UncontrolledDropdown
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import ReactTable from "react-table";
import DataTablePagination from "../../../components/DatatablePagination";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {injectIntl} from "react-intl";
import {Colxx} from "../../../components/common/CustomBootstrap";
import {findAll as findAllCategory} from "../../../redux/category/actions";
import {deleteById, findAll, findById,updateFlag} from "../../../redux/product/actions";
import {connect} from "react-redux";
import {DOMAIN} from "../../../services/APIURL";
import {Link} from "react-router-dom";
import validator from "validator/es";
import ProductService from "../../../services/ProductService";
import ReactTablePagination from "../../../components/ReactTablePagination";

class ProductsView extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            viewSearch:false,
            category:"",
            page:0,
            pageSize:20,
            search:"",
            progress:{
                status:true,
                value:0
            },
        }
    }
    componentDidMount() {
        this.props.findAllCategory();
        this.props.findAll({page:this.state.page,pageSize:this.state.pageSize})
    }
    componentWillUnmount() {

    }
    progressBar(value,total){
        const percent = (value/total)
        this.setState({
            progress:{
                status:true,
                value:Number((percent).toFixed(2))
            }
        })
    }
    actionbulk(actionType){
        switch (actionType){
            case "importexcel":
                const input = document.createElement("input")
                input.type = 'file';
                input.setAttribute('multiple',true);
                input.onchange = (e)=>{
                    let data = new FormData();
                    const files = e.target.files;
                    for (let i=0;i<files.length;i++){
                        data.append('files['+i+']',files[i]);
                    }
                    ProductService.importExcel(data,this.progressBar.bind(this)).then((results)=>{
                        console.log(results)
                    })
                }
                input.click();
                break;
            case "create":
                this.props.history.push(this.props.match.path+"create/")
                break;
        }
    }
    actionProduct(e,rowData){
        switch (e.target.value){
            case "delete":
                this.props.deleteById(rowData.id);
                break;
            case "edit":
                this.props.history.push(this.props.match.path+"create/"+rowData.id)
                break;
            case "topFlag":
                this.props.updateFlag({id:rowData.id,flag:rowData.topFlag === "0" ? "1" : "0"});
                break;
            default:
                break;
        }
        e.target.selectedIndex=0
    }
    configTable(){

        return[
            {
                Header: "STT",
                accessor: "id",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),
                width:50
            },
            {
                Header: "Tên SP",
                accessor: "nameVi",
                Cell: props => {
                    return(
                        <Link
                            to={{pathname: "/admin/product/create/"+props.original.id,}}>
                            <div className="d-flex" style={{cursor:"pointer"}}>
                                <img  style={{width:50}} src={validator.isURL(props.original.thumbnail)?props.original.thumbnail:DOMAIN+props.original.thumbnail}/>
                                <p className="list-item-heading">{props.value}</p>
                            </div>
                        </Link>

                    )
                },
                width: 300
            },
            {
                Header: "Tên TQ",
                accessor: "nameZh",
                Cell: props => (<a href={props.original.link} target="_blank"><p className="list-item-heading">{props.value}</p></a>),
                width: 300
            },
            {
                Header: "SKU VI",
                accessor: "skuVi",
                Cell: props => (<p className="list-item-heading">{props.value}</p>)
            },
            {
                Header: "SKU TQ",
                accessor: "skuZh",
                Cell: props => (<p className="list-item-heading">{props.value}</p>)
            },
            {
                Header: "Giá VI",
                accessor: "minPrice",
                Cell: props => (<p className="list-item-heading">{props.value}</p>)
            },
            {
                Header: "Tổng SL",
                accessor: "stock",
                Cell: props => (<p className="list-item-heading">{props.value}</p>)
            },
            {

                Cell: props => (
                    <select style={{padding:10,borderRadius:20,outline:"none"}} onChange={(e)=>{this.actionProduct(e,props.original)}}>
                        <option value="default">Thao tác</option>
                        <option value="delete">Xóa</option>
                        <option value="edit">Chỉnh sửa</option>
                        <option value="topFlag">{props.original.topFlag === "1"? "Xóa Tag" : "Thêm Tag"}</option>
                    </select>
                )
            },
        ];
    }
    toggleViewSearch(){
        this.setState({
            viewSearch:!this.state.viewSearch
        })
    }
    handlerSelectCategory(data){
        this.setState({
            category:data
        });
    }
    loadMore(page){
        this.setState({
            page:page
        })
        const dataRequest = {};
        dataRequest.keyword = this.state.search;
        if (this.state.category){
            dataRequest.catId = this.state.category.value;
        }
        this.props.findAll({...dataRequest,page:page,pageSize:this.state.pageSize})
    }
    handlerSearch(e){
       this.state.search = e.target.value;
       const dataRequest = {};
        dataRequest.keyword = this.state.search;
       if (this.state.category){
           dataRequest.catId = this.state.category.value;
       }

        this.props.findAll({...dataRequest,page:0, pageSize:this.state.pageSize,})
    }
    render() {

        const { messages } = this.props.intl;
        return (
            <div>
                <div style={{display:this.state.progress.status?'block':'none'}}>
                    <Progress style={{height:15}} striped value={this.state.progress.value*100}>Đang xử lý {this.state.progress.value*100}%</Progress>
                </div>
                <Card className="p-0">
                    <CardBody>
                        <CardTitle className="d-flex justify-content-between align-items-center">
                            <IntlMessages id="product.list" />
                            <div className="d-flex align-items-center">
                                <div onClick={()=>{this.toggleViewSearch()}} className="glyph-icon simple-icon-magnifier mr-2" style={{cursor:"pointer"}}></div>
                                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                    <DropdownToggle caret color="outline-dark" size="xs">
                                        <span>Thao tác</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={()=>this.actionbulk("importexcel")}>
                                            <span>Tạo sản phẩm Excel</span>
                                        </DropdownItem>
                                        <DropdownItem onClick={()=>this.actionbulk("create")}>
                                            <span>Tạo sản phẩm</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                        </CardTitle>
                        <Collapse isOpen={this.state.viewSearch}>
                            <Row>
                                <Colxx sm="12" xxl="8" xl="8">
                                    <Row>
                                        <Colxx sm="5" xxl="5" xl="5">
                                            <label>
                                                <IntlMessages id="product.form.category.select" />
                                            </label>
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                name="form-field-name"
                                                value={this.state.category}
                                                onChange={this.handlerSelectCategory.bind(this)}
                                                options={this.props.categoryList}
                                            />
                                        </Colxx>
                                        <Colxx sm="5" xxl="5" xl="5">
                                            <FormGroup>
                                                <Label>
                                                    <IntlMessages id="search.input" />
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="search"
                                                    onChange={this.handlerSearch.bind(this)}
                                                    placeholder={messages["search.input"]}
                                                />
                                            </FormGroup>
                                        </Colxx>
                                        <Colxx sm="2" xxl="2" xl="2">
                                            <div className="d-flex justify-content-center align-items-end h-100 pb-3">
                                                <Button outline color="info">
                                                    <IntlMessages id="button.search" />
                                                </Button>
                                            </div>
                                        </Colxx>
                                    </Row>
                                </Colxx>
                            </Row>
                        </Collapse>
                        <ReactTable
                            manual
                            data={this.props.list}
                            columns={this.configTable()}
                            pages={this.props.totalPages}
                            page={this.state.page}

                            pageSize={this.state.pageSize}
                            showPageJump={false}
                            showPageSizeOptions={false}
                            onPageChange={(page)=>{
                                this.loadMore(page)
                            }}
                            PaginationComponent={ReactTablePagination}
                        />
                    </CardBody>
                </Card>
            </div>
        );
    }

}
const mapStateToProps = ({category,productRedux}) => {
    const categoryList = category.selectData;
    const {product,loadding,list,totalPages} = productRedux;
    return {categoryList,product,loadding,list,totalPages}
};
const mapActionsToProps = {findAllCategory,findAll,findById,deleteById,updateFlag};
export default injectIntl(
    connect(mapStateToProps,mapActionsToProps)(ProductsView)
)

