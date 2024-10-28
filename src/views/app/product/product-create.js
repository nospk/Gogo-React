import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {
    Button,
    Card,
    CardBody,
    CardTitle, Col,
    Collapse,
    FormGroup,
    FormText,
    Input,
    Label, Modal, ModalBody, ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import {Colxx} from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {injectIntl} from "react-intl";
import Switch from "rc-switch";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {findAll as findAllCategory} from "../../../redux/category/actions";
import {toggleModal as toggleImagePicker} from '../../../redux/image/actions'
import {create,findAll,deleteById,findById,removeMessage} from '../../../redux/product/actions'
import {connect} from "react-redux";
import ImagePicker from "../../../components/imagepicker/ImagePicker";
import {DOMAIN} from "../../../services/APIURL";
// import { ReactSortable } from "react-sortablejs";
import imgNotFound from '../../../assets/img/no-image.jpg'
import ProductService from "../../../services/ProductService";
import {NotificationManager} from "../../../components/common/react-notifications";
import validator from "validator/es";
const pickerEvent = {
    productThumbnail:"productThumbnail",
    gallery:"gallery",
    variantThumbnail:"variantThumbnail",
    content:"content",
    EDIT_VARIANT_GROUP:"EDIT_VARIANT_GROUP"
}

class ProductCreateView extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            variants:[],
            toggleVariant:[],
            categorySelected:[],
            mainCategory:"",
            product:{
                id:null,
                nameZh:"",
                slugZh:"",
                skuZh:"",
                nameVi:"",
                slugVi:"",
                skuVi:"",
                thumbnail:"",
                gallery:[],
                status:"",
                content:"",
                conditiondefault:"",
                condition1:"",
                condition2:"",
                condition3:"",
                condition4:"",
                categoryDefault:"",
                categories:[],
                enableAutoUpdatePrice:true,
                material:"",
                description:"",
                variantGroup:[],
                keyword:"",
                unit:""
            },
            eventPicker:null,
            editor:null,
            modalEditVariantGroup:{
                show:false,
                data:{},
                index:'',
            },
            modalSelectGroup:{
                show:false,
                variantSelected:''
            },
        }

    }
    componentDidMount() {
        this.props.findAllCategory({page:0,pageSize:9999});
        if (this.props.match.params.id!=null){
            ProductService.findById(this.props.match.params.id).then((results)=>{
                if (results.success){

                    const categoryDefault = results.data.categories.filter((category)=>category.id===results.data.categoryDefault);
                    console.log(results.data)
                    this.setState({
                        product:{
                            ...results.data,
                            categories:results.data.categories.map((item)=>({
                                label:item.name,
                                value:item.id,
                                key:item.id
                            })),
                            categoryDefault:{label:categoryDefault[0].name, value:categoryDefault[0].id, key:categoryDefault[0].id},
                        },
                        variants:results.data.variants,
                    })
                }else {

                }
            })
        }

    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.createupdatesuccess){
            window.location.reload();
        }
        if (this.props.createupdateerror){

            NotificationManager.error(this.props.createupdateerror, "Thông báo", 3000, null, null, '');
            NotificationManager.addChangeListener(()=>{
                this.props.removeMessage();
            })
        }
    }
    getToogleVariant(id){
        const filter = this.state.toggleVariant.filter((item,index)=> {
            if (index===id)return true;
            return false;
        });

        if (filter!=null && filter.length>0){
            return filter[0];
        }else {
            return false;
        }
    }
    toggleVariant(tab){
        const prevState = this.state.toggleVariant;
        const filter = this.state.toggleVariant.filter((item,index)=>index===tab);
        if (filter!=null && filter.length<=0){
            prevState[tab] = false;
        }
        const state = prevState.map((x, index) => (tab === index ? !x : false));
        this.setState({
            toggleVariant: state
        });

    }
    removeGallery(key){
        const removed = this.state.product.gallery.filter((item,index)=>index!==key);
        this.setState(prevState => ({product: {...prevState.product, gallery: removed}}))
    }
    handlerSelectCategory(selectedOptions){
        let listSelected = [...selectedOptions];

        const findCategoryById = (id) => {
            let res = this.props.categoryData.filter((category) => category.id === id);
            if(res.length > 0) {
                return res[0]
            }else {
                return null;
            }
        }

        const findAllParent = (id) => {
            let ListParent = [];
            let category =  findCategoryById(id);

            ListParent.push(category);

            while (category && category.parent !== 0) {
                category =  findCategoryById(category.parent);
                ListParent.push(category);
            }

            return ListParent;
        }

        selectedOptions.forEach((category) => {
            let parents = findAllParent(category.value);

            parents.forEach((parent) => {
                let checkExists = listSelected.filter((selected)=> selected.value === parent.id);
                if (checkExists.length <=0) {
                    listSelected.push(
                        {
                            label:parent.name,
                            value:parent.id,
                            key:parent.id
                        }
                    );
                }
            });
        });

        this.setState(prevState => ({
            product: {
                ...prevState.product,
                categories: listSelected
            }
        }));
    }
    handlerSelectMainCategory(selectedOptions){
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                categoryDefault: selectedOptions
            }
        }));
    }
    removeVariant(id){
        const removed = this.state.variants.filter((item,index)=>index!==id);
           this.setState({
               variants:removed
           })
    }
    addVariant(){
        let data = [...this.state.variants]
        data.push({
            nameZh:"",
            skuZh:"",
            nameVi:"Biến thể ",
            skuVi:"",
            thumbnail:"",
            weight:"",
            width:"",
            height:"",
            length:"",
            stock:"",
            price:"",
            vip1:"",
            vip2:"",
            vip3:"",
            vip4:"",
            priceZh:""
        })
        this.setState({
            variants:data
        })
    }
    submit(){
        this.props.create({
            ...this.state.product,
            variants:this.state.variants,
            categories:this.state.product.categories.map((item)=>{
                return item.value;
            }),
            categoryDefault:this.state.product.categoryDefault.value

        });
    }
    showModalSelectGroup(index){
        this.setState({
            modalSelectGroup:{
                show:true,
                variantSelected:index
            }
        })
    }
    toggleModalSelectGroup(){
        this.setState({
            modalSelectGroup:{...this.state.modalSelectGroup,show:!this.state.modalSelectGroup.show}
        })
    }
    updateValueSelectGroup(value){
        const update = this.state.variants.map((item,index)=>{
            if (index===this.state.modalSelectGroup.variantSelected){
                item.parent=value.skuGroup
            }
            return item;
        });
        this.setState({
            variants:update,
            modalSelectGroup:{
                show:false,
                variantSelected:''
            }
        })
    }
    renderVariant(){
        const { messages } = this.props.intl;
        return this.state.variants.map((variant,index)=>{
            const {
                nameZh,skuZh,nameVi,
                skuVi,thumbnail,weight,
                width,height,length,priceZh,
                stock,price,vip1,vip2,vip3,vip4,dimension,parent,cost} = variant;
            return(
                <div key={index}>
                    <div className="header-variant d-flex justify-content-between align-items-center p-2 ">
                        <h2 onClick={()=>{this.toggleVariant(index)}} className="font-weight-bold"  style={{fontSize:'15px',cursor:"pointer"}}>{nameVi}</h2>
                        <div className="d-flex">
                            <p className="mb-0 mr-3 font-weight-bold -cursor-pointer" onClick={()=>this.showModalSelectGroup(index)} >{parent?parent:'Không có'}</p>
                            <div onClick={()=>{this.removeVariant(index)}} className="glyph-icon simple-icon-close font-weight-bold" style={{fontSize:'15px',cursor:"pointer"}}/>
                        </div>

                    </div>
                    <Collapse isOpen={this.getToogleVariant(index)}>
                        <div onClick={()=>this.showImagePicker(pickerEvent.variantThumbnail,index)} className="pb-2 pt-2" style={{width:100}}>
                            <img className="w-100" src={thumbnail===''||thumbnail===null?imgNotFound:(validator.isURL(thumbnail)?thumbnail:DOMAIN+thumbnail)}/>
                        </div>
                        <Row>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label>
                                        <IntlMessages id="product.form.variant.nameZh" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantName"
                                        value={nameZh}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.nameZh=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.nameZh"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label>
                                        <IntlMessages id="product.form.variant.skuZh" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantName"
                                        value={skuZh}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.skuZh=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.skuZh"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label>
                                        <IntlMessages id="product.form.variant.name" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantName"
                                        value={nameVi}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.nameVi=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.name"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label>
                                        <IntlMessages id="product.form.variant.sku" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantSku"
                                        value={skuVi}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.skuVi=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.sku"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        <IntlMessages id="product.form.variant.stock" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantStock"
                                        value={stock}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.stock=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.stock"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label>
                                        <IntlMessages id="product.form.variant.barcodeVariant" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantBarcode"
                                        placeholder={messages["product.form.variant.barcodeVariant"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        <IntlMessages id="product.form.variant.priceZh" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantPriceZh"
                                        value={priceZh}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.priceZh=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.priceZh"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        <IntlMessages id="product.form.variant.pricedefault" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantPriceDefault"
                                        value={price}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.price=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.pricedefault"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        <IntlMessages id="product.form.variant.vip1" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantVip1"
                                        value={vip1}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.vip1=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.vip1"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        <IntlMessages id="product.form.variant.vip2" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantVip2"
                                        value={vip2}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.vip2=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.vip2"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        <IntlMessages id="product.form.variant.vip3" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantVip3"
                                        value={vip3}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.vip3=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.vip3"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        <IntlMessages id="product.form.variant.vip4" />
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantVip4"
                                        value={vip4}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.vip4=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.vip4"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        <IntlMessages id="product.form.variant.dimension" />(Dài*Rộng*Cao)
                                    </Label>
                                    <Input
                                        type="text"
                                        name="variantLength"
                                        value={dimension?dimension:""}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.dimension=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.lenght"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                         Khối lượng(g)
                                    </Label>
                                    <Input
                                        type="text"
                                        className="w-100"
                                        name="variantLength"
                                        value={weight?weight:""}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.weight=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={messages["product.form.variant.lenght"]}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx xl="6" sm="12">
                                <FormGroup>
                                    <Label >
                                        Giá vốn
                                    </Label>
                                    <Input
                                        type="text"
                                        className="w-100"
                                        name="cost"
                                        value={cost?cost:""}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            this.setState({
                                                variants:this.state.variants.map((item,indexId)=>{
                                                    if(index ===indexId){item.cost=value}
                                                    return item;
                                                })
                                            })
                                        }}
                                        placeholder={"Giá vốn"}
                                    />
                                </FormGroup>
                            </Colxx>
                        </Row>
                    </Collapse>
                </div>

            )
        })

    }
    callBackPicker(data){
        switch (this.state.eventPicker.event){
            case pickerEvent.productThumbnail:
                this.setState(prevState => ({product: {...prevState.product, thumbnail: data[0].path}}))
                break;
            case pickerEvent.variantThumbnail:
                this.setState({
                    variants:this.state.variants.map((item,index)=>{
                      if (index===this.state.eventPicker.id){
                          item.thumbnail = data[0].path
                      }
                      return item;
                    })
                })
                break;
            case pickerEvent.gallery:
                let gallery =[]
                data.forEach((item)=>{
                    gallery.push(item.path)
                })
                this.setState(prevState => ({product: {...prevState.product, gallery: [...prevState.product.gallery,...gallery]}}))
                ;break;
            case pickerEvent.content:
                const {editor} = this.state
                const content = data.map((item)=>{
                    return `<img src="${DOMAIN+item.path}"/>`
                });

                const viewFragment = editor.data.processor.toView( content.join('') );
                const modelFragment = editor.data.toModel( viewFragment );
                editor.model.insertContent( modelFragment );
                break;
            case pickerEvent.EDIT_VARIANT_GROUP:
                this.onchangeInputVariantGroup('thumbnail',data[0].path)
                break;
        }
    }
    showImagePicker(event,id){
        this.state.eventPicker = {
            event:event,
            id:id
        };
        this.props.toggleImagePicker();
    }
    showModalEditVariantGroup(item,index){
        this.setState({modalEditVariantGroup:{
                show:true,
                data:item,
                index:index
            }});
    }
    updateEditVariantGroup(){
       const updated = this.state.product.variantGroup.map((item,i)=>{
            if (this.state.modalEditVariantGroup.index===i){
                item = this.state.modalEditVariantGroup.data
            }
            return item;
        })
        this.setState({
            product:{...this.state.product,variantGroup:updated},
            modalEditVariantGroup:{
                show:false,
                data:{}
            }
        });
    }
    addVariantGroup(){
        const variantGroup = {
            name:"Nhóm biến thể",
            skuGroup:"",
            thumbnail:"",
            zhName:""
        }
        this.setState({
            product:{...this.state.product,variantGroup:[...this.state.product.variantGroup,variantGroup]}
        })
    }
    removeVariantGroup(index){
        const {variantGroup} = this.state.product;
        const filter = variantGroup.filter((item,groupIndex)=>index!=groupIndex);
        this.setState({
            product:{...this.state.product,variantGroup:filter}
        })
    }
    toggleModalEditVariantGroup(){
        this.setState({
            modalEditVariantGroup:{...this.state.modalEditVariantGroup,show:!this.state.modalEditVariantGroup.show}
        })
    }
    onchangeInputVariantGroup(filed,value){
        const {data} = this.state.modalEditVariantGroup;
        switch (filed){
            case 'name':
                this.setState({modalEditVariantGroup:{...this.state.modalEditVariantGroup,data:{...data,name:value}}})
                break;
            case 'skuGroup':
                this.setState({modalEditVariantGroup:{...this.state.modalEditVariantGroup,data:{...data,skuGroup:value}}})
                break;
            case 'thumbnail':
                this.setState({modalEditVariantGroup:{...this.state.modalEditVariantGroup,data:{...data,thumbnail:value}}})
                break;
            case 'zhName':
                this.setState({modalEditVariantGroup:{...this.state.modalEditVariantGroup,data:{...data,zhName:value}}})
                break;
        }
    }
    renderGallery(){
        if (this.state.product.gallery){
            return this.state.product.gallery.map((item,key)=>{
                return(
                    <Colxx key={key} className="p-1 position-relative" xl="3" xxl="3" sm="4">
                        <div onClick={()=>this.removeGallery(key)} className="position-absolute glyph-icon iconsminds-remove font-weight-bold" style={{fontSize:'20px',cursor:"pointer",top:0,right:0}}/>
                        <img className="w-100" src={validator.isURL(item)?item:DOMAIN+item}/>
                    </Colxx>

                )
            })
        }
        this.state.product.gallery = [];
        return null;

    }
    renderVariantGroup(){
        return this.state.product.variantGroup.map((item,index)=>{
            return(
                <div key={index} className="d-flex justify-content-between">
                    <div>
                        <p>{item.name}</p>
                    </div>
                    <div className="d-flex">
                        <div className="glyph-icon iconsminds-file-edit ml-1 mr-1 icon-Font-Size" style={{fontSize:18,cursor:'pointer'}} onClick={()=>this.showModalEditVariantGroup(item,index)}></div>
                        <div className="glyph-icon iconsminds-remove-file ml-1 mr-1 icon-Font-Size" style={{fontSize:18,cursor:'pointer'}} onClick={()=>this.removeVariantGroup(index)}></div>
                    </div>
                </div>
            )
        });
    }
    updateStateEditGroup(){

    }
    renderModalEditVariantGroup(){
        const {name,skuGroup,thumbnail,zhName} = this.state.modalEditVariantGroup.data
        return(
            <Modal
                isOpen={this.state.modalEditVariantGroup.show}
                toggle={this.toggleModalEditVariantGroup.bind(this)}
                centered
                className="shadow-none"
                wrapClassName="modal-center">
                <ModalHeader toggle={this.toggleModalEditVariantGroup.bind(this)}>
                    Chỉnh sửa
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={8} xl={8}>
                            <FormGroup>
                                <Label for="name">Tên nhóm biến thể</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name?name:''}
                                    onChange={(e)=>this.onchangeInputVariantGroup('name',e.target.value)}
                                    placeholder={'Tên nhóm biến thể'}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Mã nhóm biến thể</Label>
                                <Input
                                    type="text"
                                    name="skuGroup"
                                    value={skuGroup?skuGroup:''}
                                    onChange={(e)=>this.onchangeInputVariantGroup('skuGroup',e.target.value)}
                                    placeholder={'Mã nhóm biến thể'}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Tên nhóm biến thể TQ</Label>
                                <Input
                                    type="text"
                                    name="zhName"
                                    value={zhName?zhName:''}
                                    onChange={(e)=>this.onchangeInputVariantGroup('zhName',e.target.value)}
                                    placeholder={'Tên nhóm biến thể TQ'}/>
                            </FormGroup>
                        </Col>
                        <Col md={4} xl={4}>
                            <div>
                                <img onClick={()=>this.showImagePicker(pickerEvent.EDIT_VARIANT_GROUP)} className="w-100" src={thumbnail?(validator.isURL(thumbnail)?thumbnail:DOMAIN+thumbnail):imgNotFound}/>
                            </div>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color={'primary'} onClick={()=>this.updateEditVariantGroup()}>Cập nhật</Button>
                </ModalFooter>
            </Modal>
        )
    }
    renderModalSelectGroup(){
        return(
            <Modal
                isOpen={this.state.modalSelectGroup.show}
                toggle={this.toggleModalSelectGroup.bind(this)}
                centered
                className="shadow-none"
                wrapClassName="modal-center">
                <ModalHeader toggle={this.toggleModalSelectGroup.bind(this)}>
                  Chọn nhóm biến thể
                </ModalHeader>
                <ModalBody>
                    {this.state.product.variantGroup.map((item,index)=>{
                        return(
                            <div key={index} className="d-flex justify-content-between align-items-center mt-2">
                                <p>{item.name}</p>
                                <Button color={"info"} onClick={()=>this.updateValueSelectGroup(item)}>Chọn</Button>
                            </div>
                        )
                    })}

                </ModalBody>
            </Modal>
        )
    }
    render() {
        const { messages } = this.props.intl;
        const {nameZh,skuZh,slugZh, nameVi,skuVi,slugVi,enableAutoUpdatePrice,
            conditiondefault,condition1,condition2,condition3,condition4,
            thumbnail, content,material,description,averageWeight,keyword,unit} = this.state.product;
        return (
            <div>
                <Row>
                    <Colxx xxs="12" sm="12" xxl="9" xl="9">
                        <FormGroup>
                            <Label for="name">
                                <IntlMessages id="product.form.nameZh" />
                            </Label>
                            <Input
                                type="text"
                                name="nameZh"
                                id="nameZh"
                                value={nameZh}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState(prevState => ({product: {...prevState.product, nameZh: value}}))
                                }}
                                placeholder={messages["product.form.nameZh"]}
                            />
                            <FormText color="muted">
                                <IntlMessages id="forms.email-muted" />
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">
                                <IntlMessages id="product.form.name" />
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={nameVi}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState(prevState => ({product: {...prevState.product, nameVi: value}}))
                                }}
                                placeholder={messages["product.form.name"]}
                            />
                            <FormText color="muted">
                                <IntlMessages id="forms.email-muted" />
                            </FormText>
                        </FormGroup>
                        <Card className="mb-3">
                            <CardBody>
                                <CardTitle>
                                    <IntlMessages id="product.form.info" />
                                </CardTitle>
                                <FormGroup>
                                    <Row>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="skuVi">
                                                <IntlMessages id="product.form.skuVi" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="skuVi"
                                                id="skuVi"
                                                value={skuVi}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, skuVi: value}}))
                                                }}
                                                placeholder={messages["product.form.skuVi"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="skuZh">
                                                <IntlMessages id="product.form.skuZh" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="skuZh"
                                                id="skuZh"
                                                value={skuZh}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, skuZh: value}}))
                                                }}
                                                placeholder={messages["product.form.skuZh"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="conditiondefault">
                                                <IntlMessages id="product.form.conditiondefault" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="conditiondefault"
                                                id="conditiondefault"
                                                value={conditiondefault}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, conditiondefault: value}}))
                                                }}
                                                placeholder={messages["product.form.conditiondefault"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="condition1">
                                                <IntlMessages id="product.form.condition1" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="condition1"
                                                id="condition1"
                                                value={condition1?condition1:0}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, condition1: value}}))
                                                }}
                                                placeholder={messages["product.form.condition1"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="condition2">
                                                <IntlMessages id="product.form.condition2" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="condition2"
                                                id="condition2"
                                                value={condition2?condition2:0}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, condition2: value}}))
                                                }}
                                                placeholder={messages["product.form.condition2"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="condition3">
                                                <IntlMessages id="product.form.condition3" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="condition3"
                                                id="condition3"
                                                value={condition3?condition3:0}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, condition3: value}}))
                                                }}
                                                placeholder={messages["product.form.condition3"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="condition4">
                                                <IntlMessages id="product.form.condition4" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="condition4"
                                                id="condition4"
                                                value={condition4?condition4:0}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, condition4: value}}))
                                                }}
                                                placeholder={messages["product.form.condition4"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="condition4">
                                                Đơn vị
                                            </Label>
                                            <Input
                                                type="text"
                                                name="unit"
                                                id="unit"
                                                value={unit?unit:""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, unit: value}}))
                                                }}
                                                placeholder={messages["product.form.material"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="6" sm="12">
                                            <Label className="mt-2" for="condition4">
                                                <IntlMessages id="product.form.material" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="material"
                                                id="material"
                                                value={material?material:""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, material: value}}))
                                                }}
                                                placeholder={messages["product.form.material"]}
                                            />
                                        </Colxx>

                                        <Colxx xxl="12" sm="12">
                                            <Label className="mt-2" for="condition4">
                                                <IntlMessages id="product.form.averageweight" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="averageWeight"
                                                id="averageWeight"
                                                value={averageWeight?averageWeight:""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState(prevState => ({product: {...prevState.product, averageWeight: value}}))
                                                }}
                                                placeholder={messages["product.form.averageweight"]}
                                            />
                                        </Colxx>
                                        <Colxx xxl="12" sm="12">
                                            <Label className="mt-2" for="condition4">
                                                <IntlMessages id="product.form.description" />
                                            </Label>
                                            <textarea  name="material"
                                                       className="w-100"
                                                       id="material"
                                                       value={description?description:""}
                                                        onChange={(e) => {
                                                          const value = e.target.value;
                                                          this.setState(prevState => ({product: {...prevState.product, description: value}}))
                                                      }}></textarea>
                                        </Colxx>
                                    </Row>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        <Card className="mb-3">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <IntlMessages id="product.form.variant.info" />
                                    <div onClick={()=>{this.addVariant()}} className="glyph-icon simple-icon-plus"></div>
                                </CardTitle>
                                {this.renderVariant()}

                            </CardBody>
                        </Card>
                        <Button className="mt-1 mb-1" outline color="success" onClick={()=>{this.showImagePicker(pickerEvent.content)}}>
                            <IntlMessages id="button.media" />
                        </Button>

                        <CKEditor
                        onReady={ editor => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            );
                            this.state.editor = editor;
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState(prevState => ({product: {...prevState.product, content: data}}))

                        } }
                        editor={ DecoupledEditor }
                        data={this.state.product.content?this.state.product.content:""}
                    />
                    </Colxx>
                    <Colxx xxs="12" sm="12" xxl="3" xl="3">
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <IntlMessages id="product.form.action" />
                                    <Switch
                                        className="custom-switch custom-switch-primary-inverse"
                                        checked={enableAutoUpdatePrice}
                                        onChange={(e)=> {
                                            this.setState(prevState => ({product: {...prevState.product, enableAutoUpdatePrice: !enableAutoUpdatePrice}}))
                                        }}
                                    />
                                </CardTitle>
                                <Row>
                                    <Colxx xxl="6" xl="6" sm="6">
                                        <Button outline color="success" onClick={()=>{this.submit()}}>
                                            <IntlMessages id="button.update" />
                                        </Button>
                                    </Colxx>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <IntlMessages id="product.form.category.list" />
                                </CardTitle>
                                <div className="mb-3">
                                    <label>
                                        <IntlMessages id="product.form.category.select" />
                                    </label>
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder={"Chọn chuyên mục"}
                                        isMulti
                                        name="form-field-name"
                                        value={this.state.product.categories}
                                        onChange={this.handlerSelectCategory.bind(this)}
                                        options={this.props.categoryList}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <IntlMessages id="product.form.category.default" />
                                    </label>
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={this.state.product.categoryDefault}
                                        onChange={this.handlerSelectMainCategory.bind(this)}
                                        options={this.state.product.categories}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    Từ khóa chính
                                </CardTitle>
                                <div>
                                    <textarea className="w-100"
                                              onChange={(e)=>{
                                                  this.setState({product:{...this.state.product,keyword:e.target.value}})
                                              }}
                                              value={keyword?keyword:""}/>
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <IntlMessages id="product.form.thumbnail" />
                                </CardTitle>
                                <div>
                                    <img onClick={()=>this.showImagePicker(pickerEvent.productThumbnail)} className="w-100" src={thumbnail===''?imgNotFound:validator.isURL(thumbnail)?thumbnail:DOMAIN+thumbnail}/>
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <IntlMessages id="product.form.thumbnail" />
                                </CardTitle>
                                <div>
                                    <img onClick={()=>this.showImagePicker(pickerEvent.productThumbnail)} className="w-100" src={thumbnail===''?imgNotFound:validator.isURL(thumbnail)?thumbnail:DOMAIN+thumbnail}/>
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0"> Nhóm các biến thể</p>
                                    <div className="glyph-icon iconsminds-add" style={{fontSize:18,cursor:'pointer'}} onClick={()=>this.addVariantGroup()}></div>
                                </CardTitle>
                                <div>
                                    {this.renderVariantGroup()}
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <IntlMessages id="product.form.gallery" />
                                    <div onClick={()=>this.showImagePicker(pickerEvent.gallery)} className="glyph-icon iconsminds-add font-weight-bold" style={{fontSize:'20px',cursor:"pointer"}}/>
                                </CardTitle>
                                <div className="row">
                                    {this.renderGallery()}
                                </div>
                                {/*<ReactSortable swap className="row" list={this.state.product.gallery} setList={(data,sortable,store,)=>{*/}
                                {/*    const newData = data.map((item)=>{*/}
                                {/*        if (Array.isArray(item)){*/}
                                {/*            return item.join('');*/}
                                {/*        }*/}
                                {/*        return item;*/}
                                {/*    })*/}
                                {/*}}>*/}
                                {/* */}
                                {/*</ReactSortable>*/}
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
                <ImagePicker callback={this.callBackPicker.bind(this)}/>
                {this.renderModalEditVariantGroup()}
                {this.renderModalSelectGroup()}
            </div>
        );
    }

}
const mapStateToProps = ({category,productRedux}) => {
    const categoryList = category.selectData;
    const categoryData= category.list;
    const {product,loadding,createupdatesuccess,createupdateerror} = productRedux;
    return {categoryList,product,loadding,createupdatesuccess,createupdateerror,categoryData}
};
const mapActionsToProps = {findAllCategory,toggleImagePicker,findAll,create,findById,deleteById,removeMessage};
export default injectIntl(
    connect(mapStateToProps,mapActionsToProps)(ProductCreateView)
)
