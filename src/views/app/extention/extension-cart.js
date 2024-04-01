import React from "react";
import ExtensionService from "../../../services/ExtensionService";
import {Link} from "react-router-dom";
import validator from "validator/es";
import {DOMAIN} from "../../../services/APIURL";
import ReactTablePagination from "../../../components/ReactTablePagination";
import ReactTable from "react-table";
import {Button, Card} from "reactstrap";

class ExtensionCart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            totalPages:1,
            page:0,
            pageSize:20
        }
    }
    componentDidMount() {
        ExtensionService.getCart({page:0,pageSize:20}).then((results)=>{

            this.setState({
                list:results.data.content,
                totalPages:results.data.totalPages
            })
        })
    }
    gotoDetailt(id){
        this.props.history.push("/admin/extention/cart/" + id);
    }
    deleteById(id){
        ExtensionService.deleteCart(id).then((results)=>{
            console.log(results);
            const removed = this.state.list.filter((item)=>item.id!=id);
            this.setState({
                list:removed
            })
        })
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
                Header: "Tên",
                accessor: "fullName",
                Cell: props => (<p className="list-item-heading" style={{cursor:"pointer"}} onClick={()=>this.gotoDetailt(props.original.id)}>{props.value}</p>),

            },
            {
                Header: "Số điện thoại",
                accessor: "phoneNumber",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),

            },
            {
                Header: "Mã đơn hàng",
                accessor: "orderId",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),

            },
            {
                Header: "Thao tác",
                Cell: props => (<Button color={'info'} onClick={()=>this.deleteById(props.original.id)}>Xóa</Button>),

            },

        ];
    }
    loadMore(page){
        ExtensionService.getCart({page:page,pageSize:20}).then((results)=>{
            this.setState({
                list:results.data.content,
                totalPages:results.data.totalPages,
                page:page
            })
        })
    }
    render() {
        return (
            <Card>

                <ReactTable
                    manual
                    data={this.state.list}
                    columns={this.configTable()}
                    pages={this.state.totalPages}
                    page={this.state.page}

                    pageSize={this.state.pageSize}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    onPageChange={(page)=>{
                        this.loadMore(page)
                    }}
                    PaginationComponent={ReactTablePagination}
                />
            </Card>
        );
    }

}
export default ExtensionCart;