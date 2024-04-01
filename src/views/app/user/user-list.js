import React, {Component, useState} from "react";
import {findAll} from '../../../redux/user/actions'
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import ReactTablePagination from "../../../components/ReactTablePagination";
import ReactTable from "react-table";
import {DropdownItem, DropdownMenu, DropdownToggle, Progress, UncontrolledDropdown} from "reactstrap";
import {DOMAIN} from "../../../services/APIURL";
import UserService from "../../../services/UserService";
import ProgressService from "../../../services/ProgressService";

class UsersView extends Component{
    constructor(props) {
        super(props);
        this.state= {
            list:[
                {
                    id:1,
                    username:"lakdak",
                    email:"2132",
                    role:"ADMIN"
                }
            ],
            currentPage:0,
            pageSize:20,
            timeOut:'',
            search:'',
            progress:{
                status:false,
                value:0
            },


        }
    }
    componentDidMount() {
        this.props.findAll({page:this.state.currentPage,pageSize:this.state.pageSize})
        this.getProgress()
    }
    getProgress(){
        ProgressService.getProgress("USER_PROGRESS").then((results)=>{
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
            ProgressService.getProgress("USER_PROGRESS").then((results)=>{
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

    goToDetailt(id){
        const location = {
            pathname: '/admin/user/create',
            state: { id: id }
        }

        this.props.history.push(location)
    }
    configTable(){
        return[
            {
                Header: "ID",
                accessor: "id",
                Cell: props => (<p style={{cursor:"pointer"}} onClick={()=>this.goToDetailt(props.original.id)} className="list-item-heading">{props.value}</p>),

            },
            {
                Header: "Username",
                accessor: "username",
                Cell: props => (<p className="list-item-heading" onClick={()=>this.goToDetailt(props.original.id)} style={{cursor:"pointer"}}>{props.value}</p>),

            },
            {
                Header: "SDT",
                accessor: "phonenumber",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),

            },
            {
                Header: "Email",
                accessor: "email",
                Cell: props => (<p style={{cursor:"pointer"}} onClick={()=>this.goToDetailt(props.original.id)} className="list-item-heading">{props.value}</p>),

            },
            {
                Header: "Quyền",
                Cell: props => (
                    <div>
                        {props.original.roles.map((item)=>(
                            <p key={item.id} className="list-item-heading">{item.name}</p>
                        ))}
                    </div>
                ),

            },

        ];
    }
    handlerActions(){
        UserService.exportUsers().then((results)=>{
            this.getProgress();
        })
    }
    downloadExcel(){
        window.open(DOMAIN+"/resources/excel/export-users.xlsx")
    }
    onChangeSearch(value){

        if (this.state.timeOut){
            clearTimeout(this.state.timeOut);
        }
        if (value){
            this.setState({
                search:value,
                timeOut:setTimeout(()=>{
                    this.props.findAll({page:0,pageSize:this.state.pageSize,keyword:value})
                },200)
            });
        }else {
            this.props.findAll({page:0,pageSize:this.state.pageSize})
        }

    }
    render() {

        return(
            <div>
                <div className="mb-3" style={{display:this.state.progress.status?'block':'none'}}>
                    <Progress style={{height:10}} striped value={this.state.progress.value*100}>Đang xử lý {this.state.progress.value*100}%</Progress>
                </div>
                <div className="d-flex justify-content-between">
                    <input onChange={(event)=>{
                        this.onChangeSearch(event.target.value)
                    }} placeholder={"Tìm kiếm"}/>
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                        <DropdownToggle caret color="outline-dark" size="xs">
                            <span>Thao tác</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=>this.handlerActions()}>
                                <span>Tạo excel</span>
                            </DropdownItem>
                            <DropdownItem onClick={()=>this.downloadExcel()}>
                                <span>Tải excel</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>

                <ReactTable
                    manual
                    data={this.props.list}
                    columns={this.configTable()}
                    pages={this.props.maxPage}
                    page={this.state.currentPage}
                    pageSize={this.state.pageSize}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    onPageChange={(page)=>{
                        this.setState({
                            currentPage:page
                        })
                        const reqquestParams = {page:page,pageSize:this.state.pageSize};
                        if (this.state.search) reqquestParams.keyword = this.state.search
                        this.props.findAll(reqquestParams)
                    }}
                    PaginationComponent={ReactTablePagination}
                />
            </div>
        )
    }

}
const mapStateToProps = ({user}) => {
    const {list,maxPage} = user;
    return {list,maxPage}
};
const mapActionsToProps = {findAll};
export default injectIntl(
    connect(mapStateToProps,mapActionsToProps)(UsersView)
)

