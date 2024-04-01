import React from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import validator from "validator/es";
import {DOMAIN} from "../../../../services/APIURL";
import ReactTablePagination from "../../../../components/ReactTablePagination";
import ReactTable from "react-table";
import GHNService from "../../../../services/GHNService";
class GHNOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        }
    }
    componentDidMount() {
        GHNService.getList().then((results)=>{
            this.setState({
                list:results.data
            })
        })
    }
    openDetailt(id){
        this.props.history.push('/admin/ghn/detailt/'+id)
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
                Header: "Mã đơn hàng",
                accessor: "orderCodeGhn",
                Cell: props => (<p style={{cursor:"pointer"}} onClick={()=>this.openDetailt(props.value)} className="list-item-heading">{props.value}</p>),
            },
            {
                Header: "Tên",
                accessor: "name",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),
            },
            {
                Header: "SDT",
                accessor: "phoneNumber",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),
            },
            {
                Header: "GT đơn hàng",
                accessor: "amount",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),
            },
            {
                Header: "COD",
                accessor: "cod",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),
            },

        ];
    }
    render() {
        return(
            <div>
                <ReactTable
                    data={this.state.list}
                    columns={this.configTable()}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    PaginationComponent={ReactTablePagination}
                />
            </div>
        )
    }
}
const mapStateToProps = ({orderRedux }) => {
    return {}
};
export default injectIntl(
    connect(
        mapStateToProps,
        {

        }
    )(GHNOrder)
);
