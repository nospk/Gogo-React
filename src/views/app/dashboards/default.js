import React, {Component, Fragment} from 'react';
import {injectIntl} from 'react-intl';
import {
    Card,
    CardBody,
    CardTitle, Col,
    CustomInput,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledDropdown
} from 'reactstrap';
import {Colxx, Separator} from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import OrderService from "../../../services/OrderService";
import ReactTable from "react-table";
import Pagination from "../../../components/DatatablePagination";
import ReportService from "../../../services/ReportService";
import NumberFormat from "react-number-format";
import {connect} from "react-redux";

import {findAll as findAllPartner} from "../../../redux/partner/actions";
import TopKeywords from "../../../components/TopKeywords";
import IconCard from "../../../components/cards/IconCard";

class DefaultDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconCardsCarousel: [
                {title: 'dashboards.pending-orders', icon: "iconsminds-mail-read", value: 25, status: 'processing'},
                {title: 'dashboards.processing-orders', icon: "iconsminds-clock", value: 14, status: 'pendding'},
                {title: 'dashboards.completed-orders', icon: "iconsminds-basket-coins", value: 32, status: 'success'},
                {title: 'dashboards.shipping-orders', icon: "iconsminds-arrow-refresh", value: 74, status: 'shipping'},
                {title: 'dashboards.paid-orders', icon: "iconsminds-arrow-refresh", value: 74, status: 'paid'},
                {title: 'dashboards.partiallypaid-orders', icon: "iconsminds-arrow-refresh", value: 74, status: 'partiallypaid'},
            ],
            statisticArea: [],
            option: {},
            host: {},
            status: {
                name: "Tất cả",
                value: "",
            },
            statictisTracking:{}
        }
        console.log("Test new version")
    }

    componentDidMount() {
        const countByStatus = async () => {
            const processing = await OrderService.countByStatus("processing");
            const pendding = await OrderService.countByStatus("pendding");
            const shipping = await OrderService.countByStatus("shipping");
            const success = await OrderService.countByStatus("success");
            const paid = await OrderService.countByStatus("paid");
            const partiallypaid = await OrderService.countByStatus("partiallypaid");

            const newDataIconCardsCarousel = this.state.iconCardsCarousel.map((item) => {
                switch (item.status) {
                    case "processing" :
                        item.value = processing.data;
                        break;
                    case "pendding" :
                        item.value = pendding.data;
                        break;
                    case "shipping" :
                        item.value = shipping.data;
                        break;
                    case "success" :
                        item.value = success.data;
                        break;
                    case "paid" :
                        item.value = paid.data;
                        break;
                    case "partiallypaid" :
                        item.value = partiallypaid.data;
                        break;
                }
                return item;
            });
            return newDataIconCardsCarousel;

        }
        countByStatus().then((results) => {
            this.setState({iconCardsCarousel: results})
        });
        ReportService.statisticArea({status: this.state.status.value}).then((results) => {
            this.setState({
                statisticArea: results.data
            })
        });
        OrderService.statictisTracking().then((results)=>{

            this.setState({
                statictisTracking:results.data
            })
        })
        this.props.findAllPartner();
    }

    options() {
        return [
            {name: "Hôm nay", value: "today"},
            {name: "Hôm qua", value: "yesterday"},
            {name: "Tháng này", value: "currentMonth"},
            {name: "7 ngày trước", value: "7daysago"},
            {name: "30 ngày trước", value: "30daysago"},
            {name: "90 ngày trước", value: "90daysago"},
            {name: "Năm trước", value: "earlyyear"},
            {name: "Quý 1", value: "q1"},
            {name: "Quý 2", value: "q2"},
            {name: "Quý 3", value: "q3"},
            {name: "Quý 4", value: "q4"},
            {name: "Tháng 1", value: "month1"},
            {name: "Tháng 2", value: "month2"},
            {name: "Tháng 3", value: "month3"},
            {name: "Tháng 4", value: "month4"},
            {name: "Tháng 5", value: "month5"},
            {name: "Tháng 6", value: "month6"},
            {name: "Tháng 7", value: "month7"},
            {name: "Tháng 8", value: "month8"},
            {name: "Tháng 9", value: "month9"},
            {name: "Tháng 10", value: "month10"},
            {name: "Tháng 11", value: "month11"},
            {name: "Tháng 12", value: "month12"},


        ]
    }

    status() {
        return [
            {name: "Tất cả", value: ""},
            {name: "Đã hoàn thành", value: "success"},
            {name: "Chờ thanh toán", value: "pendding"},
            {name: "Hủy đơn hàng", value: "cancel"},
            {name: "Đang xử lý", value: "processing"},
            {name: "Thất bại", value: "failed"},
            {name: "Đang vận chuyển", value: "shipping"},
            {name: "Chờ Phát Bổ Sung", value: "awaitingadditionaldelivery"},
            {name: "Đã thanh một phầm", value: "partiallypaid"},
            {name: "Đã thanh toán", value: "paid"},
            {name: "Đã hoàn lại tiền", value: "refunded"},
        ]
    }

    handleSelectStatus(status) {
        this.setState({status: status});
        const request = {status: status.value};
        if (this.state.host.id) request.host = this.state.host.id;
        if (this.state.option.value) request.option = this.state.option.value;
        ReportService.statisticArea(request).then((results) => {
            this.setState({
                statisticArea: results.data
            })
        });
    }

    handleSelectOption(option) {
        if (option === "all") option = {}
        this.setState({option: option})
        const request = {option: option.value}
        if (this.state.host.id) request.host = this.state.host.id
        if (this.state.status.value) request.status = this.state.status.value;
        ReportService.statisticArea(request).then((results) => {
            this.setState({
                statisticArea: results.data
            })
        });
    }

    handleSelectHost(option) {

        if (option === "all") option = {
            providerName: "Tất cả"
        }
        this.setState({host: option})
        const request = {host: option.id ? option.id : ''}
        if (this.state.option.value) request.option = this.state.option.value
        if (this.state.status.value) request.status = this.state.status.value;
        ReportService.statisticArea(request).then((results) => {
            this.setState({
                statisticArea: results.data
            })
        });
    }
    gotoOrderList(data){
        const location = {
            pathname: '/admin/order',
            search: '?status='+data.status,
        }
        this.props.history.push(location)
        // window.open('/admin/order?status='+data.status).focus()
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.default" match={this.props.match}/>
                        <Separator className="mb-5"/>
                    </Colxx>
                </Row>
                <Row>

                    <Colxx lg="12" xl="6">

                        <IconCardsCarousel data={this.state.iconCardsCarousel} callback={this.gotoOrderList.bind(this)}/>
                        <IconCard className="mb-4" icon={'iconsminds-mail-read'}
                                  value={(this.state.statictisTracking.totalCode?this.state.statictisTracking.totalCode:0)+" Tệ"}
                                  title={'dashboards.curentCost'}/>
                        <IconCard className="mb-4" icon={'iconsminds-mail-read'}
                                  value={(this.state.statictisTracking.totalPackage?this.state.statictisTracking.totalPackage:0)+" kiện"}
                                  title={'dashboards.curentPackage'}/>
                        <TopKeywords/>
                    </Colxx>
                    <Colxx lg="12" xl="6">
                        <Card className="h-100">
                            <CardBody>
                                <CardTitle>
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p>Thống kê theo khu vực</p>
                                            <div>
                                                <div>
                                                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                                        <DropdownToggle caret color="outline-dark" size="xs">
                                                            Lọc theo trạng thái:
                                                            <span>{this.state.status.name}</span>
                                                        </DropdownToggle>
                                                        <DropdownMenu style={{maxHeight: 500, overflowY: "auto"}}>
                                                            {this.status().map((option, index) => {
                                                                return (
                                                                    <DropdownItem key={index}
                                                                                  onClick={() => this.handleSelectStatus(option)}>
                                                                        {option.name}
                                                                    </DropdownItem>
                                                                )
                                                            })}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                                        <DropdownToggle caret color="outline-dark" size="xs">
                                                            Lọc theo thời gian:
                                                            <span>{this.state.option.name}</span>
                                                        </DropdownToggle>
                                                        <DropdownMenu style={{maxHeight: 500, overflowY: "auto"}}>
                                                            <DropdownItem
                                                                onClick={() => this.handleSelectOption("all")}>
                                                                Tất cả
                                                            </DropdownItem>
                                                            {this.options().map((option, index) => {
                                                                return (
                                                                    <DropdownItem key={index}
                                                                                  onClick={() => this.handleSelectOption(option)}>
                                                                        {option.name}
                                                                    </DropdownItem>
                                                                )
                                                            })}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                                        <DropdownToggle caret color="outline-dark" size="xs">
                                                            Lọc theo web:
                                                            <span>{this.state.host.providerName}</span>
                                                        </DropdownToggle>
                                                        <DropdownMenu style={{maxHeight: 500, overflowY: "auto"}}>
                                                            <DropdownItem
                                                                onClick={() => this.handleSelectHost("all")}>
                                                                Tất cả
                                                            </DropdownItem>
                                                            {this.props.partnerList.map((partner, index) => {
                                                                return (
                                                                    <DropdownItem key={index}
                                                                                  onClick={() => this.handleSelectHost(partner)}>
                                                                        {partner.providerName}
                                                                    </DropdownItem>
                                                                )
                                                            })}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </CardTitle>
                                <ReactTable
                                    data={this.state.statisticArea}
                                    defaultPageSize={6}
                                    showPageJump={false}
                                    showPageSizeOptions={false}
                                    PaginationComponent={Pagination}
                                    columns={[
                                        {
                                            sortable: false,
                                            Header: "Khu vực ",
                                            accessor: "province",
                                            Cell: props => <p className="text-muted">{props.value}</p>,
                                            Footer: (props) => {
                                                return <p className="text-muted font-weight-bold">Tổng</p>
                                            }
                                        },
                                        {
                                            Header: "Doanh thu",
                                            accessor: "netRevenue",
                                            Cell: props => (<NumberFormat className="border-0" displayType={'text'}
                                                                          value={props.value} thousandSeparator={true}
                                                                          suffix={"đ"}/>),
                                            Footer: (props) => {

                                                let sumNetRevenue = 0;
                                                if (props.data.length > 0) {
                                                    if (props.data.length > 1) {
                                                        for (let i = 0; i < props.data.length; i++) {
                                                            sumNetRevenue += props.data[i].netRevenue;
                                                        }
                                                    } else {
                                                        sumNetRevenue = props.data[0].netRevenue;
                                                    }
                                                    console.log(sumNetRevenue);

                                                }


                                                return (<NumberFormat className="border-0 font-weight-bold"
                                                                      displayType={'text'} value={sumNetRevenue}
                                                                      thousandSeparator={true} suffix={"đ"}/>)
                                            }

                                        },
                                        {
                                            Header: "Lợi nhuận",
                                            accessor: "profit",
                                            Cell: props => (
                                                <div>
                                                    <NumberFormat className="border-0" displayType={'text'}
                                                                  value={props.value} thousandSeparator={true}
                                                                  suffix={"đ"}/>
                                                    <span
                                                        style={{color: "#00a106"}}>({props.original.profitPercent})</span>
                                                </div>
                                            ),
                                            Footer: (props) => {
                                                let sumNetRevenue = 0;
                                                let sumProfit = 0;

                                                if (props.data.length > 0) {
                                                    if (props.data.length > 1) {
                                                        for (let i = 0; i < props.data.length; i++) {
                                                            sumNetRevenue += props.data[i].netRevenue;
                                                            sumProfit += props.data[i].profit;
                                                        }
                                                    } else {
                                                        sumNetRevenue = props.data[0].netRevenue;
                                                        sumProfit = props.data[0].profit;
                                                    }

                                                }
                                                return (
                                                    <div>
                                                        <NumberFormat className="border-0" displayType={'text'}
                                                                      value={sumProfit} thousandSeparator={true}
                                                                      suffix={"đ"}/>
                                                        <span
                                                            style={{color: "#00a106"}}>({parseFloat((sumProfit / sumNetRevenue) * 100).toFixed(2)})</span>
                                                    </div>
                                                )
                                            }
                                        },
                                        {
                                            Header: "Phí vận chuyển",
                                            accessor: "ship",
                                            Cell: props => (<NumberFormat className="border-0" displayType={'text'}
                                                                          value={props.value} thousandSeparator={true}
                                                                          suffix={"đ"}/>),
                                            Footer: (props) => {
                                                let sumShip = 0;
                                                if (props.data.length > 0) {
                                                    if (props.data.length > 1) {
                                                        for (let i = 0; i < props.data.length; i++) {
                                                            sumShip += props.data[i].ship;
                                                        }
                                                    } else {
                                                        sumShip = props.data[0].ship
                                                    }

                                                }
                                                return (<NumberFormat className="border-0 font-weight-bold"
                                                                      displayType={'text'} value={sumShip}
                                                                      thousandSeparator={true} suffix={"đ"}/>)
                                            }
                                        },
                                        {
                                            Header: "Chi phí phát sinh",
                                            accessor: "incurredCost",
                                            Cell: props => (<NumberFormat className="border-0" displayType={'text'}
                                                                          value={props.value} thousandSeparator={true}
                                                                          suffix={"đ"}/>),
                                            Footer: (props) => {
                                                let sumIncurredCost = 0;
                                                if (props.data.length > 0) {
                                                    if (props.data.length > 1) {
                                                        for (let i = 0; i < props.data.length; i++) {
                                                            sumIncurredCost += props.data[i].incurredCost;
                                                        }
                                                    } else {
                                                        sumIncurredCost = props.data[0].incurredCost;
                                                    }
                                                }
                                                return (<NumberFormat className="border-0 font-weight-bold"
                                                                      displayType={'text'} value={sumIncurredCost}
                                                                      thousandSeparator={true} suffix={"đ"}/>)
                                            }
                                        }
                                    ]}
                                />
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>


            </Fragment>
        );
    }
}

const mapStateToProps = ({partner}) => {
    const partnerList = partner.list;
    return {partnerList: partnerList,};
};
export default injectIntl(
    connect(
        mapStateToProps,
        {findAllPartner}
    )(DefaultDashboard)
);
