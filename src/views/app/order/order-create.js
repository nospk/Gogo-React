import React from "react";
import {injectIntl} from "react-intl";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Collapse, CustomInput,
    FormGroup,
    Input,
    Label, Modal, ModalBody,
    ModalHeader,
    Row,
    Table
} from "reactstrap";
import NumberFormat from 'react-number-format';
import IntlMessages from "../../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {Colxx} from "../../../components/common/CustomBootstrap";
import Pagination from "react-bootstrap-4-pagination";
import OrderService from "../../../services/OrderService";
import * as moment from "moment";
import {DOMAIN, PRINT} from "../../../services/APIURL";
import AddressService from "../../../services/AddressService";
import ProductPicker from "../product/product-picker";
import {NotificationManager} from "../../../components/common/react-notifications";
import validator from "validator/es";
import ModalStatictisProduct from "./component/ModalStatictisProduct";
import ModalAddService from "./component/ModalAddService";
import TopNav from "../../../containers/navs/Topnav";
import Sidebar from "../../../containers/navs/Sidebar";
class OrderCreateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleInfoCustomer: true,
            icon: "glyph-icon simple-icon-arrow-up font-weight-bold",
            modalSelectItem: false,
            currentPage:1,
            data:{
                ship:0,
                refunded:0,
                incurredCost:0,
                paid:0,
                discountType:"PERCENT",
                discountValue:0
            },
            detailts:[],
            methods:null,
            statusList:null,
            provinces:[],
            dictricts:[],
            wards:[],
            productStatictis:{
                open:false,
                data:[]
            },
            service:false,
            oweAll:false,
            taskbarSummary:{
                all:false,
                show:false,
                cat:0,
                product:0,
                variant:0,
                catBase:0,
                productBase:0,
                variantBase:0,
                amount:0,
                amountBase:0,
                owe:0
            }
        }
    }
    componentDidMount() {
        OrderService.getMethodsAndStatusList().then((results)=>{
            this.setState({
                methods:results.methods,
                statusList:results.status,
                provinces:results.provinces.length>0?results.provinces.map((item=>({value:item.id,label:item.name}))):[]
            })
            if (this.props.match.params.id!=null){
                OrderService.findById(this.props.match.params.id).then((results)=>{
                    this.setState({
                        data:results.order,
                        detailts:results.detailts,
                        dictricts:results.dictricts.length>0?results.dictricts.map((item=>({value:item.id,label:item.name}))):[],
                        wards:results.wards.length>0?results.wards.map((item=>({value:item.id,label:item.name}))):[]
                    });
                    console.log(results)

                });
            }

        })

    }

    toggleInfo() {
        this.setState({
            toggleInfoCustomer: !this.state.toggleInfoCustomer,
            icon: this.state.toggleInfoCustomer ? "glyph-icon simple-icon-arrow-up font-weight-bold" : "glyph-icon simple-icon-arrow-down font-weight-bold"
        })
    }
    toggleModalSelectItem() {
        this.setState({
            modalSelectItem: !this.state.modalSelectItem
        })
    }
    getStatus(status){
        let resulst = '';
        if (this.state.statusList!=null){
            Object.keys(this.state.statusList).forEach(key=>{
                if (status===key){
                    resulst = this.state.statusList[key];
                }
            });
        }

        return resulst;
    }
    getMethod(method){
        let resulst = '';
        if (this.state.methods!=null){
            Object.keys(this.state.methods).forEach(key=>{
                if (method===key){
                    resulst = this.state.methods[key];
                }
            });
        }

        return resulst;
    }
    onChangeInputSelectProvince(data){
        AddressService.getDictricts(data.value).then((results)=>{
            this.setState({
                data:{...this.state.data,billingCity:data.value},
                dictricts:results.data.length>0?results.data.map((item=>({value:item.id,label:item.name}))):[],
                wards:[]
            })
        })
    }
    onChangeInputSelectDictrict(data){
        AddressService.getWards(data.value).then((results)=>{
            this.setState({
                data:{...this.state.data,billingDistrict:data.value},
                wards:results.data.length>0?results.data.map((item=>({value:item.id,label:item.name}))):[],
            })
        })
    }
    onChangeInputSelectWard(data){
        this.setState({
            data:{...this.state.data,billingWards:data.value},
        })
    }
    getInputSelectProvince(province){
        const provinceFilter = this.state.provinces.filter((item)=>item.value===province);
        return provinceFilter;
    }
    getInputSelectDictrict(dictrict){
        const dictrictFilter = this.state.dictricts.filter((item)=>item.value===dictrict);
        return dictrictFilter;
    }
    getInputSelectWard(ward){
        const wardFilter = this.state.wards.filter((item)=>item.value===ward);
        return wardFilter;
    }
    onChangeInputDetailt(index,filed,value){
        value = value?value:"0";
        const asyncUpdate = async ()=>{
            const newData = this.state.detailts.map((item,i)=>{
                if (index===i){
                    switch (filed){
                        case "owe":
                            item.owe = parseInt(value);
                            break
                        case "price":
                            item.price = parseInt(value);
                            break
                        case "quantity":
                            item.quantity = parseInt(value);
                            break
                    }
                }
                return item;
            })
            this.setState({
                detailts:newData
            })
        }
        asyncUpdate().then(()=>{
            this.invoiceCalculation();
        })

    }
    onChangeInputOrder(field,value){
        const asyncUpdate = async ()=>{
            switch (field){
                case "ship":
                    this.setState({data:{...this.state.data,ship:parseInt(value)}})
                    break;
                case "paid":
                    this.setState({data:{...this.state.data,paid:parseInt(value)}})
                    break;
                case "incurredCost":
                    this.setState({data:{...this.state.data,incurredCost:parseInt(value)}})
                    break;
                case "refunded":
                    this.setState({data:{...this.state.data,refunded:parseInt(value)}})
                    break;
                case "discountValue":
                    this.setState({data:{...this.state.data,discountValue:parseInt(value)}})
                    break;
                case "discountType":
                    this.setState({data:{...this.state.data,discountType:value}})
                    break;
                case "cost":
                    this.setState({data:{...this.state.data,cost:value}})
                    break;
            }
        }
        asyncUpdate().then(()=>{
            this.invoiceCalculation();
        })

    }
    invoiceCalculation(){
        if (this.state.detailts && this.state.detailts.length>0){
            const productAmount = this.state.detailts.map((item)=>item.price*item.quantity).reduce((a,b)=>a+b);
            const {ship,refunded,incurredCost,paid,discountType,discountValue} = this.state.data;
            let discount = 0;
            if (discountType==="PERCENT"){
                discount = ((productAmount*discountValue)/100)
            }else {
                discount = discountValue;
            }
            const orderAmount = productAmount+ship-discount;
            this.setState(prev =>({data:{...prev.data,productAmount:productAmount,orderAmount:orderAmount}}))
        }

    }
    modalSelected(data){
        if (data.productId){
            this.toggleModalSelectItem();
        }

        const filter = data.productId?this.state.detailts.filter((item)=>item.productId===data.productId && item.variantId===data.variantId):[]
        const asyncUpdate = async ()=>{
            const newList = [...this.state.detailts];
            newList.push({
                name:data.productName,
                owe:data.quantity,
                price:data.priceDefault,
                productId:data.productId,
                productThumbnail:data.productThumbnail,
                quantity:1,
                variantId:data.variantId,
                variantName:data.variantName,
                variantThumbnail:data.variantThumbnail,
                categoryId:data.categoryId
            })

            this.setState({
                detailts:newList
            })
        }

        if (filter.length<=0){
            asyncUpdate().then(()=>{
                NotificationManager.success("Thêm sản phẩm thành công", "Thông báo", 3000, null, null, '');
                this.invoiceCalculation();
            })

        }else {
            NotificationManager.error("Sản phẩm đã tồn tại", "Thông báo", 3000, null, null, '');
        }

    }
    removeProduct(index){
        const asyncUpdate = async ()=>{
            const removed = this.state.detailts.filter((item,i)=>index!==i);
            this.setState({
                detailts:removed
            })
        }
        asyncUpdate().then(()=>{
            this.invoiceCalculation();
        })

    }
    submit(){
        const dataRequest = {...this.state.data,detailts:this.state.detailts};
        OrderService.create(dataRequest).then((results)=>{
            window.location.reload();
        })
    }
    print(){
        const {id} = this.state.data;
        const requestData = PRINT+"?id="+id
        window.open(requestData, '_blank').focus()
    }
    splitOrder() {
        const {id} = this.state.data;
        const list = this.state.detailts.filter((item) => item.check).map((item) => item.id);
        if (list && list.length > 0) {
            OrderService.split({
                orderId: id,
                ids: list
            }).then((res) => {
                window.location.href = "/admin/order/create/" + res.data.id;
            });
        } else {
            NotificationManager.error("Vui lòng chọn sản phẩm cần tách","Thông báo", 2000);
        }
    }
    createOrderGHN(){
        const {id} = this.state.data;
        const location = {pathname: '/admin/ghn/create/'+id}
        this.props.history.push(location)
    }
    statistic(){
        if (!this.state.productStatictis.open){
            const dataRequest = {...this.state.data,detailts:this.state.detailts};
            OrderService.statictisProduct(dataRequest).then((results)=>{
                console.log(results);
                this.setState({
                    productStatictis:{
                        open:true,
                        data:results.data
                    }
                })
            })
        }else {
            this.setState({
                productStatictis:{
                    open:false,
                    data:[]
                }
            })
        }

    }
    toggleService(){
        this.setState({
            service:!this.state.service
        })
    }
    callbackService(data){
        this.modalSelected({
            productName:data.name,
            priceDefault:data.price,
            quantity:data.quantity
        })
    }
    setOwe(e){

        const newData = this.state.detailts.map((item,i)=>{
            if (this.state.oweAll){
                item.owe =   item.oweTemp
            }else {
                item.oweTemp = item.owe;
                item.owe = parseInt(0);
            }

            return item;
        })
        this.setState({
            detailts:newData,
            oweAll:!this.state.oweAll
        })
    }
    onChangeCheckProduct(data, type){
        let taskbarData ={
            ...this.state.taskbarSummary,
            show:false
        }
        if (!data){
            taskbarData.all = !taskbarData.all
        }

        const changed = this.state.detailts.map((item)=>{
            if (data){
                if (type === "product") {
                    if (item.productId === parseInt(data)) {
                        if (!item.check) item.check = false;
                        item.check = !item.check;
                        taskbarData.all = false;
                    }

                } else  {
                    if (data.id===item.id){
                        if (!item.check) item.check = false;
                        item.check = !item.check;
                        taskbarData.all = false;
                    }
                }

            }else {
                item.check = taskbarData.all;
            }
            if (item.check){
                taskbarData.show = true;
            }
            return item;
        });
        /** base*/
        let categoryGroupBase = this.state.detailts.reduce((r, a) => {
            r[a.categoryId] = [...r[a.categoryId] || [], a];
            return r;
        }, {});
        taskbarData.catBase = Object.keys(categoryGroupBase).length;
        let productGroupBase = this.state.detailts.reduce((r, a) => {
            r[a.productId] = [...r[a.productId] || [], a];
            return r;
        }, {});
        taskbarData.productBase = Object.keys(productGroupBase).length;
        let countQuantityBase = this.state.detailts.reduce(((previousValue, currentValue) => {
            return [previousValue[0]+currentValue.quantity,previousValue[1]+(currentValue.quantity*currentValue.price)]
        }),[0,0])
        taskbarData.variantBase = countQuantityBase[0];
        taskbarData.amountBase = countQuantityBase[1];

        /** check*/
        const filterChecked = changed.filter((item)=>item.check);
        let categoryGroup = filterChecked.reduce((r, a) => {
            r[a.categoryId] = [...r[a.categoryId] || [], a];
            return r;
        }, {});
        taskbarData.cat = Object.keys(categoryGroup).length
        let productGroup = filterChecked.reduce((r, a) => {
            r[a.productId] = [...r[a.productId] || [], a];
            return r;
        }, {});
        taskbarData.product = Object.keys(productGroup).length;
        let countQuantity = filterChecked.reduce(((previousValue, currentValue) => {
            return [previousValue[0]+currentValue.quantity,previousValue[1]+(currentValue.quantity*currentValue.price),previousValue[2]+currentValue.owe]
        }),[0,0,0])
        taskbarData.variant = countQuantity[0];
        taskbarData.amount = countQuantity[1];
        taskbarData.owe = countQuantity[2];
        this.setState({
            detailts:changed,
            taskbarSummary:taskbarData
        })

    }

    renderVariantView() {
        let listOrder = [];
        let data = this.state.detailts.sort((a, b) => b.topFlag - a.topFlag ).reduce((a, b, idx) => {
            let product = a[b.productId];

            if (product === undefined) {
                a[b.productId] = [{...b, index: idx}];
                listOrder.push(b.productId);
            } else {
                a[b.productId].push({...b, index: idx});
            }

            return a;
        }, {});

        let index = 0;
        return listOrder.map((productId, idx) => {
            let check = data[productId].filter((product) => product.check);

            return (
                <>
                   <tr>
                       <td colSpan={1}>
                           <div  className="d-flex align-items-center">
                               <CustomInput
                                   type="checkbox"
                                   checked={check.length === 0 ? false : true}
                                   onChange={(e)=>this.onChangeCheckProduct(productId, "product")}
                               />
                           </div>
                       </td>
                       <td colSpan={6}>{data[productId][0].name}</td>
                   </tr>
                    {
                        data[productId].map((item, idxVariant) => {
                            return(
                                <tr key={index} className={item.quantity>0?'':'bg-danger'}>
                                    <th scope="row" >
                                        <div  className="d-flex align-items-center">
                                            <CustomInput
                                                type="checkbox"
                                                checked={item.check?item.check:false}
                                                value={this.state.oweAll}
                                                onChange={(e)=>this.onChangeCheckProduct(item)}
                                            />
                                            <span>{++index}</span>
                                        </div>
                                        {
                                            item.topFlag === '1'
                                            ?
                                                <Badge color="danger" pill>
                                                    HOT
                                                </Badge>
                                            : ''
                                        }
                                    </th>
                                    <td>
                                        <div className="d-flex">
                                            {item.productThumbnail? <a href={item.linkZh} target="_blank">
                                                {
                                                    item.variantThumbnail?
                                                        <img style={{width:60}} src={validator.isURL(item.variantThumbnail)?item.variantThumbnail:DOMAIN+item.variantThumbnail}/>
                                                        :
                                                        <img style={{width:60}} src={validator.isURL(item.productThumbnail)?item.productThumbnail:DOMAIN+item.productThumbnail}/>
                                                }
                                            </a>:''}
                                            <div>
                                                <a href={DOMAIN+item.slug} target="_blank" className="ml-2">
                                                    <p className="mb-1">{item.name}</p>
                                                    <p className="mb-1">{item.variantName}</p>
                                                </a>
                                                {item.sku?<p className="mb-1 font-weight-bold">{item.sku}</p>:''}
                                                {item.variantNameZh?<p className="mb-1 font-weight-bold">{item.variantNameZh}</p>:''}
                                            </div>


                                        </div>
                                    </td>
                                    <td>
                                        <NumberFormat className="border-0" value={item.price} thousandSeparator={true} suffix={"đ"} onValueChange={(values) => {
                                            const {formattedValue, value} = values;
                                            this.onChangeInputDetailt(item.index,"price",value)
                                        }}/>
                                    </td>
                                    <td>
                                        <input className="border-0" value={item.quantity} onChange={(e)=>{this.onChangeInputDetailt(item.index,"quantity",e.target.value)}}/>
                                    </td>
                                    <td>
                                        <NumberFormat value={item.price*item.quantity} displayType={'text'} thousandSeparator={true} suffix={"đ"} renderText={(text)=> <span>{text}</span>}/>
                                    </td>
                                    <td>
                                        <input className="border-0" value={item.owe} onChange={(e)=>{this.onChangeInputDetailt(item.index,"owe",e.target.value)}}/>
                                    </td>
                                    <td>
                                        <button className="btn-danger" onClick={()=>this.removeProduct(item.index)}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </>
            )
        });
    }
    renderProductListView() {
        return (
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên SP</th>
                        <th>Giá tiền</th>
                        <th>Số Lượng</th>
                        <th>Tổng</th>
                        <th>
                            <div  className="d-flex " >
                                <span>Nợ</span>
                                <CustomInput
                                    type="checkbox"
                                    id="check1"
                                    label=""
                                    value={this.state.oweAll}
                                    onChange={(e)=>this.setOwe(e)}
                                />
                            </div>

                        </th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderVariantView()}
                    </tbody>
                </Table>
            </div>
        )
    }

    render() {
        const {messages} = this.props.intl;
        const {
            createBy,createDate,status,method,
            billingFullName,billingPhoneNumber,billingEmail,orderComment,billingAddress,billingCity,billingDistrict,billingWards,
            ship,productAmount,orderAmount,refunded,paid,incurredCost,note,discountType,discountValue,cost
        } = this.state.data;

        return (
            <div>
                <Card  className="" style={{paddingBottom:100}}>
                    <CardHeader className="p-3">
                        <h2>Thông tin đơn hàng</h2>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="9" xl="9" sm="12">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="d-block w-100 pt-3 pb-3" style={{fontSize: "20px"}}>Thông tin khách hàng</span>
                                        <div onClick={() => this.toggleInfo()} className={this.state.icon}
                                             style={{fontSize: '20px', cursor: "pointer"}}/>
                                    </div>
                                    <Collapse isOpen={this.state.toggleInfoCustomer}>
                                        <div>
                                            <Row>
                                                <Col sm={12} md={4} xl={4}>
                                                    <Row>
                                                        <Col sm="12" md={12} xl={12}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Ngày tạo</span>
                                                                </Label>
                                                                <Input readOnly={true} placeholder={"Ngày tạo"}
                                                                       value={moment(createDate).format("DD/MM/YYYY hh:mm:ss")}/>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col sm="12" md={12} xl={12}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Trạng thái đơn hàng</span>
                                                                </Label>
                                                                <Input readOnly={true} placeholder={this.getStatus(status)}/>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col sm="12" md={12} xl={12}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Người tạo</span>
                                                                </Label>
                                                                <Input readOnly={true} placeholder={createBy}/>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col sm="12" md={12} xl={12}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Hình thức vận chuyển</span>
                                                                </Label>
                                                                <Input readOnly={true}
                                                                       placeholder={this.getMethod(method)}/>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={12} md={8} xl={8}>
                                                    <Row>
                                                        <Col sm="12" md={6} xl={6}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Họ và tên</span>
                                                                </Label>
                                                                <Input placeholder={"Họ và tên"}
                                                                       type={"text"}
                                                                       value={billingFullName?billingFullName:""}
                                                                       onChange={(e) => {
                                                                           const value = e.target.value;
                                                                           this.setState(prevState => ({data: {...prevState.data, billingFullName: value}}))
                                                                       }}/>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col sm="12" md={6} xl={6}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Số điện thoại</span>
                                                                </Label>
                                                                <Input placeholder={"Số điện thoại"}
                                                                       value={billingPhoneNumber?billingPhoneNumber:""}
                                                                       onChange={(e) => {
                                                                           const value = e.target.value;
                                                                           this.setState(prevState => ({data: {...prevState.data, billingPhoneNumber: value}}))
                                                                       }}/>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col sm="12" md={6} xl={6}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Email</span>
                                                                </Label>
                                                                <Input placeholder={"Email"}
                                                                       value={billingEmail?billingEmail:""}
                                                                       onChange={(e) => {
                                                                           const value = e.target.value;
                                                                           this.setState(prevState => ({data: {...prevState.data, billingEmail: value}}))
                                                                       }}/>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col sm="12" md={6} xl={6}>
                                                            <label>
                                                                <IntlMessages id="order.address.province"/>
                                                            </label>
                                                            <Select
                                                                components={{Input: CustomSelectInput}}
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                placeholder={"Chọn thành phố"}
                                                                name="form-field-name"
                                                                onChange={this.onChangeInputSelectProvince.bind(this)}
                                                                value={this.getInputSelectProvince(billingCity)}
                                                                options={this.state.provinces}
                                                            />
                                                        </Col>
                                                        <Col sm="12" md={6} xl={6}>
                                                            <label>
                                                                <IntlMessages id="order.address.dictrict"/>
                                                            </label>
                                                            <Select
                                                                components={{Input: CustomSelectInput}}
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                placeholder={"Chọn quận huyện"}
                                                                name="form-field-name"
                                                                onChange={this.onChangeInputSelectDictrict.bind(this)}
                                                                value={this.getInputSelectDictrict(billingDistrict)}
                                                                options={this.state.dictricts}
                                                            />
                                                        </Col>
                                                        <Col sm="12" md={6} xl={6}>
                                                            <label>
                                                                <IntlMessages id="order.address.ward"/>
                                                            </label>
                                                            <Select
                                                                components={{Input: CustomSelectInput}}
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                placeholder={"Chọn xã phường"}
                                                                name="form-field-name"
                                                                onChange={this.onChangeInputSelectWard.bind(this)}
                                                                value={this.getInputSelectWard(billingWards)}
                                                                options={this.state.wards}
                                                            />
                                                        </Col>
                                                        <Col className="mt-3" sm="12" md={12} xl={12}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Địa chỉ</span>
                                                                </Label>
                                                                <Input  value={billingAddress?billingAddress:""}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            this.setState(prevState => ({data: {...prevState.data, billingAddress: value}}))
                                                                        }} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col sm="12" md={12} xl={12}>
                                                            <FormGroup>
                                                                <Label>
                                                                    <span>Ghi chú đơn hàng</span>
                                                                </Label>
                                                                <textarea className="w-100"
                                                                          placeholder={"Ghi chú đơn hàng"}
                                                                          value={note?note:""}
                                                                          onChange={(e) => {
                                                                              const value = e.target.value;
                                                                              this.setState(prevState => ({data: {...prevState.data, note: value}}))
                                                                          }}></textarea>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </div>
                                    </Collapse>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="d-block w-100 pt-3 pb-3" style={{fontSize: "20px"}}>Thông tin sản phẩm</span>
                                        <div onClick={() => this.toggleModalSelectItem()}
                                             className="glyph-icon simple-icon-plus font-weight-bold"
                                             style={{fontSize: '20px', cursor: "pointer"}}/>
                                    </div>
                                    {this.renderProductListView()}
                                </div>
                                <div className="d-flex justify-content-end" style={{gap:10}}>
                                    <Button outline color="warning" onClick={()=>this.toggleService()}>
                                            Thêm dịch vụ
                                    </Button>
                                    <Button onClick={()=>this.toggleModalSelectItem()}>
                                        Thêm sản phẩm
                                    </Button>

                                </div>
                                <div>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td style={{textAlign:"end"}} colSpan={2}>
                                                    <span className="font-weight-bold">Tổng sản phẩm</span>
                                                </td>
                                                <td style={{textAlign:"end"}}>
                                                    <NumberFormat value={productAmount} displayType={'text'} thousandSeparator={true} suffix={"đ"} renderText={(text)=> <span>{text}</span>}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign:"end"}} colSpan={2}>
                                                    <span className="font-weight-bold">Phí vận chuyển</span>
                                                </td>
                                                <td style={{textAlign:"end"}}>
                                                    <NumberFormat style={{textAlign:"end"}}
                                                                  className='border-0 p-0'
                                                                  value={ship?ship:"0"} thousandSeparator={true} suffix={"đ"} onValueChange={(values) => {
                                                        const {formattedValue, value} = values;
                                                        this.onChangeInputOrder("ship",value)
                                                    }}/>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign:"end"}} colSpan={2}>
                                                    <span className="font-weight-bold">Chiết khấu</span>
                                                </td>
                                                <td style={{textAlign:"end"}}>
                                                    <div className="d-flex" style={{justifyContent:"flex-end"}}>
                                                        <div>
                                                            <button className={discountType==='PERCENT'?"m-1 btn-info":"m-1"}
                                                                    onClick={()=>this.onChangeInputOrder("discountType","PERCENT")}>%</button>
                                                            <button className={discountType==='CURRENCY'?"m-1 btn-info":"m-1"}
                                                                    onClick={()=>this.onChangeInputOrder("discountType","CURRENCY")}>$</button>
                                                        </div>
                                                        <NumberFormat style={{textAlign:"end"}}
                                                                      className='border-0 p-0'
                                                                      value={discountValue?discountValue:"0"} thousandSeparator={true} suffix={discountType==='PERCENT'?'%':'đ'} onValueChange={(values) => {
                                                            const {formattedValue, value} = values;
                                                            this.onChangeInputOrder("discountValue",value)
                                                        }}/>

                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign:"end"}} colSpan={2}>
                                                    <span className="font-weight-bold">Chi phí phát sinh</span>
                                                </td>
                                                <td style={{textAlign:"end"}}>
                                                    <NumberFormat style={{textAlign:"end"}}
                                                                  className='border-0 p-0'
                                                                  value={incurredCost?incurredCost:"0"} thousandSeparator={true} suffix={"đ"} onValueChange={(values) => {
                                                        const {formattedValue, value} = values;
                                                        this.onChangeInputOrder("incurredCost",value)
                                                    }}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign:"end"}} colSpan={2}>
                                                    <span className="font-weight-bold">Tổng hóa đơn</span>
                                                </td>
                                                <td style={{textAlign:"end"}}>
                                                    <NumberFormat value={orderAmount} displayType={'text'} thousandSeparator={true} suffix={"đ"} renderText={(text)=> <span>{text}</span>}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign:"end"}} colSpan={2}>
                                                    <span className="font-weight-bold">Đã thanh toán</span>
                                                </td>
                                                <td style={{textAlign:"end"}}>
                                                   <div className="d-flex w-100 justify-content-end">
                                                       <div className="glyph-icon iconsminds-dollar-sign-2 pointer text-danger" ></div>
                                                       <NumberFormat style={{textAlign:"end"}}
                                                                     className='border-0 p-0'
                                                                     value={paid?paid:"0"} thousandSeparator={true}
                                                                     suffix={"đ"} onValueChange={(values) => {
                                                           const {formattedValue, value} = values;
                                                           this.onChangeInputOrder("paid",value)
                                                       }}/>


                                                   </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign:"end"}} colSpan={2}>
                                                    <span className="font-weight-bold">Còn nợ</span>
                                                </td>
                                                <td style={{textAlign:"end"}}>
                                                    <NumberFormat value={orderAmount-paid} displayType={'text'} thousandSeparator={true} suffix={"đ"} renderText={(text)=> <span>{text}</span>}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign:"end"}} colSpan={2}>
                                                    <span className="font-weight-bold">Vốn </span>
                                                </td>
                                                <td style={{textAlign:"end"}}>
                                                    <NumberFormat value={cost}
                                                                  style={{textAlign:"end"}}
                                                                  displayType={'input'}
                                                                  className='border-0 p-0 text-end'
                                                                  thousandSeparator={true} suffix={"đ"}
                                                                  onValueChange={(values) => {
                                                                      const {formattedValue, value} = values;
                                                                      this.onChangeInputOrder("cost",value)}}
                                                                  renderText={(text)=> <span>{text}</span>}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button outline color="success" onClick={()=>this.submit()}>
                                        <IntlMessages id="button.update"/>
                                    </Button>
                                </div>

                            </Col>
                            <Col md={3} xl={3} sm={12}>
                                <Card>
                                    <CardHeader className="pt-3">
                                        <h2>Thao tác</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Colxx xxl="6" xl="6" sm="6">
                                                <Button outline color="success" onClick={()=>this.submit()}>
                                                    <IntlMessages id="button.update"/>
                                                </Button>
                                            </Colxx>
                                            <Colxx xxl="6" xl="6" sm="6">
                                                <Button className="m-1" outline color="success" onClick={this.statistic.bind(this)}>
                                                    Thống kê
                                                </Button>
                                            </Colxx>

                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="mt-3">
                                    <CardHeader className="pt-3">
                                        <h2>In đơn hàng</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <Button className="m-1" outline color="success" onClick={this.print.bind(this)}>
                                            In đơn hàng
                                        </Button>
                                    </CardBody>
                                </Card>

                                {
                                    !this.state.data?'':
                                        <>
                                            <Card className="mt-3">
                                                <CardHeader className="pt-3">
                                                    <h2>Giao hàng nhanh</h2>
                                                </CardHeader>
                                                <CardBody>
                                                    <Button className="m-1" outline color="success" onClick={this.createOrderGHN.bind(this)}>
                                                        Tạo hóa đơn
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                            <Card className="mt-3">
                                                <CardHeader className="pt-3">
                                                    <h2>Tách đơn hàng</h2>
                                                </CardHeader>
                                                <CardBody>
                                                    <Button className="m-1" outline color="success" onClick={this.splitOrder.bind(this)}>
                                                        Tách đơn hàng
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        </>
                                }

                            </Col>
                        </Row>

                    </CardBody>

                </Card>
                <div className="" style={{display:this.state.taskbarSummary.show?'block':'none',left:0,bottom:0,right:0,position:"fixed"}}>
                    <div style={{marginLeft:410,marginRight:60}}>
                        <div className="d-flex justify-content-between align-items-center p-2 font-weight-bold" style={{background:"#fed700",height:50}}>
                            <div>
                                <CustomInput
                                    type="checkbox"
                                    label="Tất cả"
                                    value={this.state.taskbarSummary.all}
                                    onChange={(e)=>{
                                        this.onChangeCheckProduct()
                                    }}
                                />
                            </div>
                            <div>
                                <span>Chuyên mục:</span>
                                <span>{this.state.taskbarSummary.cat}/{this.state.taskbarSummary.catBase}</span>
                            </div>
                            <div>
                                <span>Sản phẩm:</span>
                                <span>{this.state.taskbarSummary.product}/{this.state.taskbarSummary.productBase}</span>
                            </div>
                            <div>
                                <span>Số lượng:</span>
                                <span>{this.state.taskbarSummary.variant}/{this.state.taskbarSummary.variantBase}</span>
                            </div>
                            <div>
                                <span>Nợ thực tế:</span>
                                <span>{this.state.taskbarSummary.owe}/{this.state.taskbarSummary.variantBase}</span>
                            </div>
                            <div>
                                <span>Tổng tiền:</span>
                                <span>
                                    <NumberFormat displayType={'text'} value={this.state.taskbarSummary.amount} thousandSeparator={true} suffix={"đ"}/>
                                    / <NumberFormat displayType={'text'} value={this.state.taskbarSummary.amountBase} thousandSeparator={true} suffix={"đ"}/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductPicker isOpen={this.state.modalSelectItem}
                               selected={this.modalSelected.bind(this)}
                               toggle={this.toggleModalSelectItem.bind(this)}/>
                <ModalStatictisProduct open={this.state.productStatictis.open} data={this.state.productStatictis.data} toggle={this.statistic.bind(this)}/>
                <ModalAddService open={this.state.service}
                                 callback={this.callbackService.bind(this)}
                                 toggle={this.toggleService.bind(this)}/>
            </div>
        );
    }

}

export default injectIntl(OrderCreateView)
