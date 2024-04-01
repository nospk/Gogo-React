import React from "react";
import {injectIntl} from "react-intl";
import ExtensionService from "../../../services/ExtensionService";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    FormGroup,
    Input,
    Label,
    Row,
    Table
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx} from "../../../components/common/CustomBootstrap";
import imageNotfound from "../../../assets/img/no-image.jpg"
import GalleryDetail from "../../../containers/pages/GalleryDetail";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import validator from "validator/es";
import {DOMAIN} from "../../../services/APIURL";
class ExtensionDetailt extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            toggleVariant:[],
            product: {
                id:"",
                nameZh:"",
                price1:"",
                price2:"",
                price3:"",
                condition1:"",
                condition2:"",
                condition3:"",
                link:"",
                tempName:"",
                standardName:"",
                gallery:[],
                description:""
            },
            variants:[],
            attributes:[],
            editor:null,

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

    componentDidMount() {
       const {id} = this.props.match.params
        if (id){
            ExtensionService.findProductById(id).then((results)=>{
                if (results.success){
                    console.log(results);
                    this.setState({
                        product:results.product,
                        variants:results.variants,
                        attributes:results.attributes,
                    })
                }
            })
        }
    }
    renderAttributes(){
        return(
            <Table responsive="lg">
                <thead>
                <tr>
                    <th className="w-40">Thuộc tính</th>
                    <th>Thông tin</th>
                </tr>
                </thead>
                <tbody>
                {this.state.attributes.map((item)=>{
                   return(
                       <tr key={item.id}>
                           <td>{item.tempName}({item.name})</td>
                           <td>{item.tempValue}</td>
                       </tr>
                   )
                })}
                </tbody>
            </Table>
        )
    }
    renderProductInfo(){
        const {price1,price2,price3,condition1,condition2,condition3} = this.state.product

        return(
            <Table responsive="lg">
                <thead>
                <tr>
                    <th className="w-40">Thuộc tính</th>
                    <th>Thông tin</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Giá TQ 1</td>
                    <td>{price1}</td>
                </tr>
                <tr>
                    <td>Giá TQ 2</td>
                    <td>{price2}</td>
                </tr>
                <tr>
                    <td>Giá TQ 3</td>
                    <td>{price3}</td>
                </tr>
                <tr>
                    <td>DK 1</td>
                    <td>{condition1}</td>
                </tr>
                <tr>
                    <td>DK 2</td>
                    <td>{condition2}</td>
                </tr>
                <tr>
                    <td>DK 3</td>
                    <td>{condition3}</td>
                </tr>
                </tbody>
            </Table>
        )
    }
    renderVariants(){
        return this.state.variants.map((item,index)=>{
            const {nameZh,tempName,standardName,img,price,stock,unit,parent,priceDefault,price1,price2,price3,price4,length,width,height,weight,dimension,parentTemp} = item;
           return(
               <Card className="mt-2 mb-2" key={index}>
                   <div className="header-variant d-flex justify-content-between align-items-center p-2 ">
                       <h2 onClick={()=>{this.toggleVariant(index)}} className="font-weight-bold"  style={{fontSize:'15px',cursor:"pointer"}}>{nameZh}({standardName})</h2>
                       <h2 onClick={()=>{this.toggleVariant(index)}} className="font-weight-bold"  style={{fontSize:'15px',cursor:"pointer"}}>{parent}({parentTemp})</h2>
                   </div>
                   <Collapse isOpen={this.getToogleVariant(index)}>
                       <Row className="p-2">
                           <Col xs={12} sm={12} md={9} xl={9}>
                               <Row>
                                   <Col xs={12} sm={12} md={6} xl={6}>
                                       <FormGroup>
                                           <Label for="standardName">
                                               <span>Tên up web</span>
                                           </Label>
                                           <Input
                                               type="text" name="standardName" value={standardName!==null?standardName:""}
                                               onChange={(e) => {
                                                   const value = e.target.value;
                                                   this.setState({
                                                       variants:this.state.variants.map((item,indexId)=>{
                                                           if(index ===indexId){item.standardName=value}
                                                           return item;
                                                       })
                                                   })
                                               }}
                                               placeholder={""}
                                           />
                                       </FormGroup>
                                   </Col>
                                   <Col xs={12} sm={12} md={6} xl={6}>
                                       <FormGroup>
                                           <Label for="tempName">
                                               <span>Tên tạm thời</span>
                                           </Label>
                                           <Input
                                               readOnly
                                               type="text" name="tempName" value={tempName!==null?tempName:""}
                                               onChange={(e) => {
                                                   const value = e.target.value;
                                               }}
                                               placeholder={""}
                                           />
                                       </FormGroup>
                                   </Col>
                                   <Col xs={12} sm={12} md={6} xl={6}>
                                       <FormGroup>
                                           <Label for="price">
                                               <span>Giá TQ</span>
                                           </Label>
                                           <Input
                                               type="text" name="price" value={price!==null?price:""}
                                               onChange={(e) => {
                                                   const value = e.target.value;
                                                   this.setState({
                                                       variants:this.state.variants.map((item,indexId)=>{
                                                           if(index ===indexId){item.price=value}
                                                           return item;
                                                       })
                                                   })
                                               }}
                                               placeholder={""}
                                           />
                                       </FormGroup>
                                   </Col>
                                   <Col xs={12} sm={12} md={6} xl={6}>
                                       <FormGroup>
                                           <Label for="tempName">
                                               <span>Giá bán lẻ</span>
                                           </Label>
                                           <Input
                                               type="text" name="tempName" value={priceDefault!==null?priceDefault:""}
                                               onChange={(e) => {
                                                   const value = e.target.value;
                                                   this.setState({
                                                       variants:this.state.variants.map((item,indexId)=>{
                                                           if(index ===indexId){item.priceDefault=value}
                                                           return item;
                                                       })
                                                   })
                                               }}
                                               placeholder={""}
                                           />
                                       </FormGroup>
                                   </Col>
                                   <Col xs={12} sm={12} md={6} xl={6}>
                                       <FormGroup>
                                           <Label for="stock">
                                               <span>Tồn kho</span>
                                           </Label>
                                           <Input
                                               type="text" name="stock" value={stock!==null?stock:""}
                                               onChange={(e) => {
                                                   const value = e.target.value;
                                                   this.setState({
                                                       variants:this.state.variants.map((item,indexId)=>{
                                                           if(index ===indexId){item.stock=value}
                                                           return item;
                                                       })
                                                   })
                                               }}
                                               placeholder={""}
                                           />
                                       </FormGroup>
                                   </Col>
                                   <Col xs={12} sm={12} md={6} xl={6}>
                                       <FormGroup>
                                           <Label for="weight">
                                               <span>Khối lượng</span>
                                           </Label>
                                           <Input
                                               type="text" name="stock" value={weight!==null?weight:""}
                                               onChange={(e) => {
                                                   const value = e.target.value;
                                                   this.setState({
                                                       variants:this.state.variants.map((item,indexId)=>{
                                                           if(index ===indexId){item.weight=value}
                                                           return item;
                                                       })
                                                   })
                                               }}
                                               placeholder={""}
                                           />
                                       </FormGroup>
                                   </Col>
                                   <Colxx xl="12" sm="12">
                                       <FormGroup>
                                           <Row>
                                               <Colxx xl="3">
                                                   <Label >
                                                       <span>Vip1</span>
                                                   </Label>
                                                   <Input
                                                       type="text"
                                                       name="price1"
                                                       value={price1}
                                                       onChange={(e)=>{
                                                           const value = e.target.value;
                                                           this.setState({
                                                               variants:this.state.variants.map((item,indexId)=>{
                                                                   if(index ===indexId){item.price1=value}
                                                                   return item;
                                                               })
                                                           })
                                                       }}

                                                   />
                                               </Colxx>
                                               <Colxx xl="3">
                                                   <Label >
                                                       <span>Vip2</span>
                                                   </Label>
                                                   <Input
                                                       type="text"
                                                       name="price2"
                                                       value={price2}
                                                       onChange={(e)=>{
                                                           const value = e.target.value;
                                                           this.setState({
                                                               variants:this.state.variants.map((item,indexId)=>{
                                                                   if(index ===indexId){item.price2=value}
                                                                   return item;
                                                               })
                                                           })
                                                       }}
                                                   />
                                               </Colxx>
                                               <Colxx xl="3">
                                                   <Label >
                                                       <span>Vip3</span>
                                                   </Label>
                                                   <Input
                                                       type="text"
                                                       name="price3"
                                                       value={price3}
                                                       onChange={(e)=>{
                                                           const value = e.target.value;
                                                           this.setState({
                                                               variants:this.state.variants.map((item,indexId)=>{
                                                                   if(index ===indexId){item.price3=value}
                                                                   return item;
                                                               })
                                                           })
                                                       }}
                                                   />
                                               </Colxx>
                                               <Colxx xl="3">
                                                   <Label >
                                                       <span>Vip4</span>
                                                   </Label>
                                                   <Input
                                                       type="text"
                                                       name="price4"
                                                       value={price4}
                                                       onChange={(e)=>{
                                                           const value = e.target.value;
                                                           this.setState({
                                                               variants:this.state.variants.map((item,indexId)=>{
                                                                   if(index ===indexId){item.price4=value}
                                                                   return item;
                                                               })
                                                           })
                                                       }}

                                                   />
                                               </Colxx>
                                           </Row>
                                       </FormGroup>
                                   </Colxx>
                                   <Colxx xl="12" sm="12">
                                       <FormGroup>
                                           <Row>
                                               <Colxx xl="3">
                                                   <Label >
                                                       <span>Kích thước</span>
                                                   </Label>
                                                   <Input
                                                       type="text"
                                                       name="variantLength"
                                                       value={dimension?dimension:''}
                                                       onChange={(e)=>{
                                                           const value = e.target.value;
                                                           this.setState({
                                                               variants:this.state.variants.map((item,indexId)=>{
                                                                   if(index ===indexId){item.dimension=value}
                                                                   return item;
                                                               })
                                                           })
                                                       }}

                                                   />
                                               </Colxx>
                                               {/*<Colxx xl="3">*/}
                                               {/*    <Label >*/}
                                               {/*        <span>Chiều rộng</span>*/}
                                               {/*    </Label>*/}
                                               {/*    <Input*/}
                                               {/*        type="text"*/}
                                               {/*        name="variantWidth"*/}
                                               {/*        value={width?width:''}*/}
                                               {/*        onChange={(e)=>{*/}
                                               {/*            const value = e.target.value;*/}
                                               {/*            this.setState({*/}
                                               {/*                variants:this.state.variants.map((item,indexId)=>{*/}
                                               {/*                    if(index ===indexId){item.width=value}*/}
                                               {/*                    return item;*/}
                                               {/*                })*/}
                                               {/*            })*/}
                                               {/*        }}*/}
                                               {/*    />*/}
                                               {/*</Colxx>*/}
                                               {/*<Colxx xl="3">*/}
                                               {/*    <Label >*/}
                                               {/*        <span>Chiều cao</span>*/}
                                               {/*    </Label>*/}
                                               {/*    <Input*/}
                                               {/*        type="text"*/}
                                               {/*        name="variantHeight"*/}
                                               {/*        value={height?height:''}*/}
                                               {/*        onChange={(e)=>{*/}
                                               {/*            const value = e.target.value;*/}
                                               {/*            this.setState({*/}
                                               {/*                variants:this.state.variants.map((item,indexId)=>{*/}
                                               {/*                    if(index ===indexId){item.height=value}*/}
                                               {/*                    return item;*/}
                                               {/*                })*/}
                                               {/*            })*/}
                                               {/*        }}*/}
                                               {/*    />*/}
                                               {/*</Colxx>*/}
                                               {/*<Colxx xl="3">*/}
                                               {/*    <Label >*/}
                                               {/*        <span>Chiều cân nặng</span>*/}
                                               {/*    </Label>*/}
                                               {/*    <Input*/}
                                               {/*        type="text"*/}
                                               {/*        name="variantWeight"*/}
                                               {/*        value={weight?weight:''}*/}
                                               {/*        onChange={(e)=>{*/}
                                               {/*            const value = e.target.value;*/}
                                               {/*            this.setState({*/}
                                               {/*                variants:this.state.variants.map((item,indexId)=>{*/}
                                               {/*                    if(index ===indexId){item.weight=value}*/}
                                               {/*                    return item;*/}
                                               {/*                })*/}
                                               {/*            })*/}
                                               {/*        }}*/}

                                               {/*    />*/}
                                               {/*</Colxx>*/}
                                           </Row>
                                       </FormGroup>
                                   </Colxx>
                               </Row>

                           </Col>

                           <Col xs={12} sm={12} md={3} xl={3}>
                               <img className="w-100" src={img?validator.isURL(img)?img:DOMAIN+img:imageNotfound}/>
                           </Col>
                       </Row>
                   </Collapse>
               </Card>
           )
        })
    }
    submit(){
        const productRequest = {
            ...this.state.product,variants:this.state.variants
        }
        ExtensionService.updateProduct(productRequest).then((results)=>{
            if (results.success){
                window.location.reload()
            }
        });
    }

    render() {
        const {nameZh,link,tempName,standardName,gallery,description,unit,html,images} = this.state.product
        return(
            <div>
                <Row>
                    <Col xs={12} sm={12} md={9} xl={9}>
                        <FormGroup>
                            <Label for="standardName">
                                <span>Tên up web</span>
                            </Label>
                            <Input
                                type="text" name="standardName" id="standardName" value={standardName!==null?standardName:""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState({
                                        product:{...this.state.product,standardName:value}
                                    })
                                }}
                                placeholder={""}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="nameZh">
                                <span>Tên TQ</span>
                            </Label>
                            <Input
                                readOnly
                                type="text" name="nameZh" id="nameZh" value={nameZh}
                                onChange={(e) => {
                                    const value = e.target.value;
                                }}
                                placeholder={""}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="tempName">
                                <span>Tên tạm thời </span>
                            </Label>
                            <Input
                                readOnly
                                type="text" name="tempName" id="tempName" value={tempName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                }}
                                placeholder={""}
                            />
                        </FormGroup>
                        <div>
                            <Label>
                                <span>Mô tả sản phẩm</span>
                            </Label>
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
                                    this.setState(prevState => ({product: {...prevState.product, description: data}}))

                                } }
                                editor={ DecoupledEditor }
                                data={description===null?"":description}
                            />
                        </div>
                        <FormGroup>
                            <Label for="unit">
                                <span>Đơn vị</span>
                            </Label>
                            <Input
                                type="text" name="unit" value={unit!==null?unit:""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState({
                                        product:{...this.state.product,unit:value}
                                    })
                                }}
                                placeholder={""}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="html" className="w-100">
                                <span>Nội dung nhúng</span>
                            </Label>
                            <textarea
                                className="w-100"
                                type="text" name="html" value={html!==null?html:""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState({
                                        product:{...this.state.product,html:value}
                                    })
                                }}
                                placeholder={""}
                            />
                        </FormGroup>
                        <div className="variants">
                            {this.renderVariants()}
                        </div>
                        <div className="gallery">
                            {gallery.length>0?<GalleryDetail gallery={gallery}/>:""}
                            {images?<GalleryDetail gallery={images}/>:""}
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={3} xl={3}>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <IntlMessages id="product.form.action" />
                                </CardTitle>
                                <Row>
                                    <Colxx xxl="6" xl="6" sm="6">
                                        <Button outline color="success" onClick={this.submit.bind(this)}>
                                            <IntlMessages id="button.update" />
                                        </Button>
                                    </Colxx>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <span>Ảnh sản phẩm</span>
                                </CardTitle>
                                <Row>
                                    <img width="100%" src={gallery.length>0?validator.isURL(gallery[0])?gallery[0]:DOMAIN+gallery[0]:imageNotfound}/>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <span>Thông tin sản phẩm</span>
                                </CardTitle>
                                {this.renderProductInfo()}
                            </CardBody>
                        </Card>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <span>Thông tin thuộc tính</span>
                                </CardTitle>
                                {this.renderAttributes()}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }

}
export default injectIntl(ExtensionDetailt)

