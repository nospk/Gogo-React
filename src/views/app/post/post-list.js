import React, {Component} from "react";
import {toggleModal as toggleImagePicker} from "../../../redux/image/actions";
import {findAll,deleteById} from '../../../redux/post/actions'
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import ReactTable from "react-table";
import ReactTablePagination from "../../../components/ReactTablePagination";

class PostsView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage:0,
            pageSize:20,
            filter:""
        }

    }
    componentDidMount() {
        this.props.findAll({
            page:this.state.currentPage,
            pageSize:this.state.pageSize,
            type:this.state.filter
        });
    }
    goToDetailt(id){
        const location = {
            pathname:"/admin/post/create",
            state:{
                id:id
            }
        }
        this.props.history.push(location);
    }
    filter(filter){
        switch (filter){
            case "all":
                this.setState({
                    filter:""
                })
                this.props.findAll({
                    page:this.state.currentPage,
                    pageSize:this.state.pageSize,
                    type:""
                });
                break
            default:
                this.setState({
                    filter:filter
                })
                this.props.findAll({
                    page:this.state.currentPage,
                    pageSize:this.state.pageSize,
                    type:filter
                });
                break
        }
    }
    actions(e,rowData){
        switch (e.target.value){
            case "delete":
                this.props.deleteById(rowData.id);
                break;
            default:
                break;
        }
        e.target.selectedIndex=0
    }
    configTable(){
        return[
            {
                Header: "id",
                accessor: "id",
                width:80,
                Cell: props => (<p style={{cursor:"pointer"}} onClick={()=>this.goToDetailt(props.original.id)} className="list-item-heading">{props.value}</p>),

            },
            {
                Header: "Tên trang",
                accessor: "name",
                Cell: props => (<p className="list-item-heading" onClick={()=>this.goToDetailt(props.original.id)} style={{cursor:"pointer"}}>{props.value}</p>),

            },
            {
                Header: "Đường dẫn",
                accessor: "slug",
                Cell: props => (<p className="list-item-heading" onClick={()=>this.goToDetailt(props.original.id)} style={{cursor:"pointer"}}>{props.value}</p>),

            },
            {
                Header: "Mô tả",
                accessor: "description",
                Cell: props => (<p className="list-item-heading" onClick={()=>this.goToDetailt(props.original.id)} style={{cursor:"pointer"}}>{props.value}</p>),

            },
            {
                Header: "Thao tác",
                accessor: "description",
                Cell: props => (
                    <select style={{padding:10,borderRadius:20,outline:"none"}} onChange={(e)=>this.actions(e,props.original)}>
                        <option value="default">Thao tác</option>
                        <option value="delete">Xóa</option>
                    </select>
                ),

            }


        ];
    }
    loadMore(page){
        this.setState({
            currentPage:page
        })
        this.props.findAll({
            page:page,
            pageSize:this.state.pageSize,
            type:this.state.filter
        })
    }
    render() {
        return(
            <div>
                <div className="d-flex justify-content-end">
                    <select style={{padding:10,borderRadius:20,outline:"none"}} onChange={(e)=>this.filter(e.target.value)}>
                        <option value="default">Thao tác</option>
                        <option value="all">Tất cả</option>
                        <option value="page">Trang</option>
                        <option value="post">Bài viết</option>
                        <option value="simpleproduct">Bài sản phẩm</option>
                    </select>
                </div>
                <ReactTable
                    manual
                    data={this.props.list}
                    columns={this.configTable()}
                    pages={this.props.maxPage}
                    page={this.state.currentPage}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    onPageChange={(page)=>{
                        this.loadMore(page);
                    }}
                    PaginationComponent={ReactTablePagination}
                />
            </div>
        )
    }

}
const mapStateToProps = ({postRedux}) => {
    const {list,maxPage} = postRedux;
    return {list,maxPage}
};
const mapActionsToProps = {toggleImagePicker,findAll,deleteById};
export default injectIntl(
    connect(mapStateToProps,mapActionsToProps)(PostsView)
)

