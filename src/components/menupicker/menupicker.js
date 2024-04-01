import React from "react";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Pagination from "react-bootstrap-4-pagination";
import {findAll as findAllProduct} from '../../redux/product/actions'
import {findAll as findAllCategory} from '../../redux/category/actions'
import {findAll as findAllPage} from '../../redux/post/actions'
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import './styles.scss'
import category from "../../redux/category/reducer";
import productRedux from "../../redux/product/reducer";
import postRedux from "../../redux/post/reducer";
import ReactTablePagination from "../ReactTablePagination";
import ReactTable from "react-table";
import validator from "validator/es";
import {DOMAIN} from "../../services/APIURL";

const tabsData = [
    {name: "Sản phẩm", tab: "product", active: true},
    {name: "Chuyên mục", tab: "category"},
    {name: "Trang", tab: "page"}
]

class Menupicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: tabsData,
            product:{page:0, pageSize:20},
            category:{page:0, pageSize:20},
            post:{page:0, pageSize:20},
            search:''
        }
    }
    componentDidMount() {
        this.props.findAllProduct({page:this.state.product.page,pageSize:this.state.product.pageSize})
    }
    selected(data){
        const tabActive = this.state.tabs.filter((item) => item.active);
        switch (tabActive[0].tab) {
            case "product":
                this.props.callback({name:data.nameVi,href:data.slug})
                break;
            case "category":
                this.props.callback({name:data.name,href:'/'+data.slug})
                break;
            case "page":
                this.props.callback({name:data.name,href:'/'+data.slug})
                break;
        }
    }
    changeTab(tab) {
        switch (tab){
            case "product": this.props.findAllProduct({page:this.state.product.page,pageSize:this.state.product.pageSize}); break;
            case "category": this.props.findAllCategory({page:this.state.category.page,pageSize:this.state.category.pageSize}); break;
            case "page": this.props.findAllPage({page:this.state.post.page,pageSize:this.state.post.pageSize}); break;
        }
        const changed = this.state.tabs.map((item) => {
            if (item.tab === tab) {
                item.active = true
            } else {
                item.active = false;
            }
            return item;
        })
        this.setState({
            tabs: changed
        })
    }

    renderTabs() {
        return this.state.tabs.map((item) => {
            return (
                <div className={item.active ? 'menu-picker-tab active' : 'menu-picker-tab'}
                     onClick={() => {
                         this.changeTab(item.tab)
                     }}
                     key={item.tab}>{item.name}</div>
            )
        })
    }
    loadMore(page){
        const tabActive = this.state.tabs.filter((item) => item.active);
        switch (tabActive[0].tab) {
            case "product":
                this.setState({product:{...this.state.product,page:page}});
                this.props.findAllProduct({page:page,pageSize:this.state.product.pageSize});
                break;
            case "category":
                this.setState({category:{...this.state.product,page:page}});
                this.props.findAllCategory({page:page,pageSize:this.state.category.pageSize});
                break;
            case "page":
                this.setState({post:{...this.state.product,page:page}});
                this.props.findAllPage({page:page,pageSize:this.state.post.pageSize});
                break;
        }
    }
    search(keyword){
        const tabActive = this.state.tabs.filter((item) => item.active);
        switch (tabActive[0].tab) {
            case "product":
                this.props.findAllProduct({page:0,pageSize:this.state.product.pageSize,keyword:keyword});
                break;
            case "category":
                this.props.findAllCategory({page:0,pageSize:this.state.category.pageSize,keyword:keyword});
                break;
            case "page":
                this.props.findAllPage({page:0,pageSize:this.state.post.pageSize,keyword:keyword});
                break;
        }
        this.setState({
            search:keyword,
            page:0
        })
    }
    renderTabProduct() {
        const config = [
            {
                Header: "Tên",
                accessor: "nameVi",
                Cell: props =>{

                    return (
                        <div className="d-flex align-items-center" onClick={()=>this.selected(props.original)}>
                            <img style={{width:40}} src={validator.isURL(props.original.thumbnail)?props.original.thumbnail:DOMAIN+props.original.thumbnail}/>
                            <p className="list-item-heading ml-2">{props.value}</p>
                        </div>
                    )
                },
            },
        ]
        return (
            <div>

                <ReactTable
                    manual
                    data={this.props.products}
                    columns={config}
                    pages={this.props.product_totalPages}
                    page={this.state.product.page}
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

    renderTabCategory() {
        const config = [
            {
                Header: "Tên",
                accessor: "name",
                Cell: props =>{
                    return (
                        <div className="d-flex align-items-center" onClick={()=>this.selected(props.original)}>
                            <p className="list-item-heading ml-2">{props.value}</p>
                        </div>
                    )
                },
            },
        ]
        return (
            <div>
                <ReactTable
                    manual
                    data={this.props.categories}
                    columns={config}
                    pages={this.props.category_totalPages}
                    page={this.state.category.page}
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

    renderTabPage() {
        const config = [
            {
                Header: "Tên",
                accessor: "name",
                Cell: props =>{
                    return (
                        <div className="d-flex align-items-center" onClick={()=>this.selected(props.original)}>
                            <p className="list-item-heading ml-2">{props.value}</p>
                        </div>
                    )
                },
            },
        ]
        return (
            <div>
                <ReactTable
                    manual
                    data={this.props.posts}
                    columns={config}
                    pages={this.props.post_totalPages}
                    page={this.state.post.page}
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

    renderContent() {
        const tabActive = this.state.tabs.filter((item) => item.active);
        switch (tabActive[0].tab) {
            case "product":
                return this.renderTabProduct();
            case "category":
                return this.renderTabCategory();
            case "page":
                return this.renderTabPage();
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show}
                   className="shadow-none"
                   size="lg"
                   toggle={this.props.toggle}
                   centered={true}>
                <ModalHeader toggle={this.props.toggle}>
                    <p>Tùy chọn menu</p>
                </ModalHeader>
                <ModalBody>
                    <Input value={this.state.search}
                           style={{borderRadius:10}}
                           onChange={(e)=>this.search(e.target.value)}
                           placeholder={'Nhập từ khóa tìm kiếm'} />
                    <div className="menu-picker-tabs ">{this.renderTabs()}</div>
                    <div className="menu-picker-contents">
                        {this.renderContent()}
                    </div>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = ({category,productRedux,postRedux}) => {
    const categories = category.list;
    const category_totalPages = category.totalPages;
    const products = productRedux.list
    const product_totalPages = productRedux.totalPages;
    const posts = postRedux.list;
    const post_totalPages = postRedux.maxPage
    return {categories, products, posts,product_totalPages,post_totalPages,category_totalPages}
};
const mapActionsToProps = {findAllProduct, findAllCategory, findAllPage};
export default injectIntl(
    connect(mapStateToProps, mapActionsToProps)(Menupicker)
)
