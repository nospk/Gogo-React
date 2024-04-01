import React from 'react'
import LogService from "../../../services/LogService";
import {Button} from "reactstrap";
import Pagination from "react-bootstrap-4-pagination";
class Log extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            pageSize:50,
            page:0,
            totalPages:0
        }
    }
    componentDidMount() {
        LogService.findAll({page:this.state.page,pageSize:this.state.pageSize}).then((results)=>{
            this.setState({
                list:results.data.content,
                totalPages:results.data.totalPages
            })
        })
    }
    deleteByIds(){
        const params = this.state.list.map((item)=>item.id);
        LogService.deleteByIds(params).then((results)=>{
            window.location.reload();
        });
    }
    pagination() {
        return {
            totalPages: this.state.totalPages?this.state.totalPages:1,
            currentPage: this.state.page+1,
            showMax: 10,
            size: "sm",
            threeDots: true,
            prevNext: true,
            onClick: (page) => {
                this.setState({page:page-1})
                LogService.findAll({page:this.state.page,pageSize:this.state.pageSize}).then((results)=>{
                    this.setState({
                        list:results.data.content,
                        totalPages:results.data.totalPages
                    })
                })
            }
        };
    }
    render() {
        return (
            <div>
                <div>
                    <Button onClick={()=>this.deleteByIds()}>Xóa</Button>
                </div>
                {this.state.list.map(item=>{
                    return(
                        <p className="alert alert-danger" key={item.id}>{item.log}</p>
                    )
                })}
                <Pagination {...this.pagination()} />
            </div>
        );
    }

}
export default Log;