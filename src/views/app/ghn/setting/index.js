import React from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {Col, Input, Label, Row} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import GHNService from "../../../../services/GHNService";
class GHNSetting extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{
                tokenDefault:"",
                tokens:[]
            }
        }

    }
    componentDidMount() {
        GHNService.getData().then(results=>{
            if (results.success && results.data){
                const tokens = results.data.tokens.map((token)=>{
                    const shops = token.shops.map((shop)=>{
                        return {
                            label:shop.name,
                            value:shop._id,

                        }
                    })
                    token.shops = shops;
                    return token;
                })
                this.setState({
                    data: {...results.data,tokens:tokens}
                })
            }
        });
    }

    onChangeInput(indexItem,value,field){
       const newTokens = this.state.data.tokens.map((item,index)=>{
           if (index===indexItem){
               switch (field){
                   case "name":
                       item.name = value;
                       break;
                   case "token":
                       item.token = value;
                       break;
               }
           }
           return item;
       })
        this.setState({
            data:{...this.state.data,tokens:newTokens}
        });

    }
    addAccount(){
        const newTokens = [
            ...this.state.data.tokens,
            {
                name:"0942492445",
                token:"123456as1das1d23as1d",
                shopId:10,
                shops:[]
            }
        ];
        this.setState({
            data:{...this.state.data,tokens:newTokens}
        })
    }
    removeAccount(index){
        const removed = this.state.data.tokens.filter((item,indexData)=>index!==indexData);
        this.setState({
            data:{...this.state.data,tokens:removed}
        })
    }
    setDefaultShop(item,value){
        const newTokens = this.state.data.tokens.map((itemState,index)=>{
            if (itemState.token===item.token){
                itemState.shopId = value;
            }
            return itemState;
        })
        this.setState({
            data:{...this.state.data,tokens:newTokens}
        })
    }
    getDefaultShop(index,shopId){
        const filter = this.state.data.tokens.filter((itemState,indexData)=>index===indexData);
        if (filter){
            return filter[0].shops.filter((shop)=>shop.value===shopId)[0]
        }
        return null;
    }
    getShop(itemIndex,token){

    }
    addDefaultAccount(index){
        const filterAccount =  this.state.data.tokens.filter((item,indexData)=>index===indexData);
        this.setState({
            data:{...this.state.data,tokenDefault:filterAccount[0].token}
        })

    }
    submit(){
        GHNService.update(this.state.data).then(result=>{

        });
    }
    renderListAccount(){
        return this.state.data.tokens.map((item,index)=>{
            return(
                <div key={index} className="row border-bottom pt-2 pb-2">
                    <div className="col-12 p-0 d-flex justify-content-between">
                        <button disabled={item.token===this.state.data.tokenDefault} className="btn btn-info" onClick={()=>this.addDefaultAccount(index)}>Mặc định</button>
                        <button className="btn btn-danger" onClick={()=>this.removeAccount(index)}>Xóa</button>
                    </div>
                    <div className="col-6">
                        <Row className="mb-2">
                            <Label className="mt-2" for="providerName">
                                Tên tài khoản
                            </Label>
                            <Input
                                type="text"
                                value={item.name}
                                onChange={(e)=>this.onChangeInput(index,e.target.value,"name")}
                                placeholder={'Tên tài khoản'}
                            />
                        </Row>
                        <Row className="mb-2">
                            <Label className="mt-2" for="providerName">
                                Token
                            </Label>
                            <Input
                                type="text"
                                value={item.token}
                                onChange={(e)=>this.onChangeInput(index,e.target.value,"token")}
                                placeholder={'Token'}
                            />
                        </Row>
                    </div>
                    <div className="col-6">
                        <Row >
                            <Col className="pt-2">
                                <label>
                                    Chọn shop
                                </label>
                                <Select
                                    components={{Input: CustomSelectInput}}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    value={this.getDefaultShop(index,item.shopId)}
                                    options={item.shops}
                                    onChange={(e)=>{this.setDefaultShop(item,e.value)}}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        })

    }
    render() {
        return(
            <div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-info" onClick={()=>this.addAccount()}>Thêm tài khoản</button>
                    <button className="btn btn-success" onClick={()=>this.submit()}>Cập nhật</button>
                </div>
                <div>
                    {this.renderListAccount()}
                </div>
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
    )(GHNSetting)
);
