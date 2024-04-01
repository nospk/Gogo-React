import React from "react";
import {findAll,findPicker,searchPicker} from "../../../redux/product/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {FormGroup, Input, Modal, ModalBody, ModalHeader} from "reactstrap";
import Pagination from "react-bootstrap-4-pagination";
import NumberFormat from "react-number-format";
import {DOMAIN} from "../../../services/APIURL";
class ProductPicker extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            currentPage:1,
            keyword:"",
            pageSize:20
        }
    }
    componentDidMount() {
        this.props.findPicker();
    }
    toggleModalSelectItem() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    pagination(){
        return {
            totalPages: this.props.totalPagesPicker?this.props.totalPagesPicker:1,
            currentPage: this.state.currentPage,
            showMax: 5,
            size: "sm",
            threeDots: true,
            prevNext: true,
            onClick: (page)=>{
                this.setState({
                    currentPage:page
                })
                this.props.findPicker({page:page,pageSize:this.state.pageSize});
            }
        };
    }
    renderItem(){
        return this.props.listPicker.map((item)=>{
            return(
                <div key={item.variantId} className="d-flex flex-row card mt-1 mb-1" style={{cursor:"pointer"}} onClick={()=>{this.props.selected(item)}}>
                    <a aria-current="page" className="d-flex active align-items-center">
                        <img  src={item.variantThumbnail?DOMAIN+item.variantThumbnail:DOMAIN+item.productThumbnail} className="list-thumbnail responsive border-0 card-img-left"/>
                    </a>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <p className="list-item-heading mb-1 w-40 w-sm-100 active">{item.productName} - {item.variantName}</p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">{item.stock} cái</p>
                            <NumberFormat value={item.priceDefault} displayType={'text'} thousandSeparator={true} suffix={"đ"} renderText={(text)=> <p className="mb-1 text-muted text-small w-15 w-sm-100">{text}</p>}/>
                        </div>
                    </div>
                </div>
            )
        })
    }
    search(text){
        this.setState({
            keyword:text,
            currentPage:1
        })
        this.props.searchPicker({keyword:text});
    }
    render() {
        return(
            <Modal
                isOpen={this.props.isOpen}
                size="lg"
                centered={true}
                className="shadow-none"
                toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    Chọn sản phẩm
                </ModalHeader>
                <ModalBody>
                    <div>
                        <FormGroup>
                            <Input placeholder="Nhập từ khóa tìm kiếm" value={this.state.keyword} onChange={(e)=>this.search(e.target.value)}/>
                        </FormGroup>
                    </div>
                    <div className="product-list" style={{height:500,overflow:"auto"}} >
                        {this.renderItem()}
                    </div>

                    <div className="p-2">
                        <Pagination {...this.pagination()} />
                    </div>
                </ModalBody>
            </Modal>
        )
    }

}
const mapStateToProps = ({productRedux}) => {
    const {listPicker,totalPagesPicker} = productRedux;
    return {listPicker,totalPagesPicker}
};
const mapActionsToProps = {findAll,findPicker,searchPicker};
export default injectIntl(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(ProductPicker)
);
