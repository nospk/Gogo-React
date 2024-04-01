import React from "react";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import {Button, Row} from "reactstrap";
import {create, deleteById, findAll, removeError, removeSuccess} from "../../../../redux/category/actions";
import {toggleModal as toggleImagePicker} from "../../../../redux/image/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import SettingService from "../../../../services/SettingService";

class PriceSetting extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }

    }
    componentDidMount() {
        SettingService.getPriceSetting().then((results)=>{
            this.setState({
                data:results.data
            })
        })
    }

    getDataSelection(){
        return[
            {label:"Mức giá bán lẻ", value:"default"},
            {label:"Mức giá VIP1", value:"vip1"},
            {label:"Mức giá VIP2", value:"vip2"},
            {label:"Mức giá VIP3", value:"vip3"},
            {label:"Mức giá VIP4", value:"vip4"}
        ]
    }
    getValue(valueSelect){
        const filter = this.getDataSelection().filter(value => value.value===valueSelect);
        return filter[0];
    }
    setValueSelect(value,field){

        switch (field){
            case "price1": this.setState({data:{...this.state.data,price1:value}}); break;
            case "price2": this.setState({data:{...this.state.data,price2:value}}); break;
            case "price3": this.setState({data:{...this.state.data,price3:value}}); break;
            case "priceDefault": this.setState({data:{...this.state.data,priceDefault:value}}); break;
            case "enableConditionCategory": this.setState({data:{...this.state.data,enableConditionCategory:value}}); break;
            case "enableRetail": this.setState({data:{...this.state.data,enableRetail:value}}); break;
            case "login": this.setState({data:{...this.state.data,login:value}}); break;
        }
    }
    submit(){
        SettingService.updatePriceSetting(this.state.data).then(()=>{
            window.location.reload();
        })
    }
    render() {
        return (
            <div>
                <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex">
                        <Button className="m-2" onClick={()=>this.setValueSelect(!this.state.data.enableConditionCategory,'enableConditionCategory')}>{this.state.data.enableConditionCategory?'Bật điều kiện chuyên mục':'Tắt điều kiện chuyên mục'}</Button>
                        <Button className="m-2" onClick={()=>this.setValueSelect(!this.state.data.enableRetail,'enableRetail')}>{this.state.data.enableRetail?'Tắt bán lẻ':'Bật bán lẻ'}</Button>
                        <Button className="m-2" onClick={()=>this.setValueSelect(!this.state.data.login,'login')}>{this.state.data.login?'Không yêu cầu đăng nhập':'Yêu cầu đăng nhập'}</Button>

                    </div>
                    <Button onClick={this.submit.bind(this)} name={"Cập nhật"}>Cập nhật</Button>
                </div>
                <Row>
                    <Colxx>
                        <label>
                            <IntlMessages id="menu.setting.price.condition1"/>
                        </label>
                        <Select
                            components={{Input: CustomSelectInput}}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={this.getValue(this.state.data.price1)}
                            onChange={(e)=>{this.setValueSelect(e.value,"price1")}}
                            options={this.getDataSelection()}
                        />
                    </Colxx>
                    <Colxx>
                        <label>
                            <IntlMessages id="menu.setting.price.condition2"/>
                        </label>
                        <Select
                            components={{Input: CustomSelectInput}}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={this.getValue(this.state.data.price2)}
                            onChange={(e)=>{this.setValueSelect(e.value,"price2")}}
                            options={this.getDataSelection()}
                        />
                    </Colxx>
                    <Colxx>
                        <label>
                            <IntlMessages id="menu.setting.price.condition3"/>
                        </label>
                        <Select
                            components={{Input: CustomSelectInput}}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={this.getValue(this.state.data.price3)}
                            onChange={(e)=>{this.setValueSelect(e.value,"price3")}}
                            options={this.getDataSelection()}
                        />
                    </Colxx>
                    <Colxx>
                        <label>
                            Sản phẩm một mức giá
                        </label>
                        <Select
                            components={{Input: CustomSelectInput}}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={this.getValue(this.state.data.priceDefault)}
                            onChange={(e)=>{this.setValueSelect(e.value,"priceDefault")}}
                            options={this.getDataSelection()}
                        />
                    </Colxx>
                </Row>
            </div>
        )
    }

}
const mapStateToProps = ({category}) => {

    return {}
};
const mapActionsToProps = {};
export default injectIntl(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(PriceSetting)
);


