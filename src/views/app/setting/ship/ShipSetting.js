import React from "react";
import {toggleModal as toggleImagePicker} from "../../../../redux/image/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {Button, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import SettingService from "../../../../services/SettingService";

class ShipSetting extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:{
                enable:false,
                shipType:"",
                shipValue:"",
                fee:0,
                extraFee:0
            }
        }
    }
    componentDidMount() {
        SettingService.getShipSetting().then((results)=>{
            this.setState({
                data:results.data
            })
        })
    }

    getDataSelection(){
        return[
            {label:"Khuyến mãi theo %", value:"PERCENT"},
            {label:"Khuyến mãi theo giá ", value:"CURRENCY"},
        ]
    }
    setValueSelect(value){
        this.setState({
            data:{...this.state.data,shipType:value}
        })
    }
    getValue(value){
        const filter = this.getDataSelection().filter((item)=>item.value===value)
        return filter[0];
    }
    submit(){
        SettingService.updateShipSetting(this.state.data).then((results)=>{
           window.location.reload();
        })
    }
    render() {
        const { enable,shipType,shipValue,fee,extraFee} = this.state.data;
        return(
            <div className="row">
                <div className="col-12 col-md-6 col-xl-6">
                    <div className="d-flex justify-content-between">
                        <Button className="mb-2" onClick={()=>{this.setState({data:{...this.state.data,enable:!this.state.data.enable}})}}>{this.state.data.enable?"Tắt chức năng KM":"Bật chức năng KM"}</Button>
                        <Button className="mb-2" onClick={()=>{this.submit()}}>Cập nhật</Button>

                    </div>
                    <Row>
                        <Colxx className="mb-2">
                            <Label className="mt-2" for="providerName">
                               Số tiền 5kg đầu tiên
                            </Label>
                            <Input
                                type="text"
                                value={fee?fee:'0'}
                                onChange={(e)=>{
                                    this.setState({
                                        data:{...this.state.data,fee:parseInt(e.target.value)}
                                    })
                                }}
                                placeholder={'Số tiền 5kg đầu tiên'}
                            />
                        </Colxx>
                        <Colxx className="mb-2">
                            <Label className="mt-2" for="providerName">
                                Số tiền mỗi kg tiếp theo
                            </Label>
                            <Input
                                type="text"
                                value={extraFee?extraFee:'0'}
                                onChange={(e)=>{
                                    this.setState({
                                        data:{...this.state.data,extraFee:parseInt(e.target.value)}
                                    })
                                }}
                                placeholder={'Số tiền mỗi kg tiếp theo'}
                            />
                        </Colxx>
                    </Row>
                    {
                        this.state.data.enable?
                            <div className="container-form">
                                <Select
                                    components={{Input: CustomSelectInput}}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={this.getValue(this.state.data.shipType)}
                                    onChange={(e)=>{this.setValueSelect(e.value)}}
                                    options={this.getDataSelection()}
                                />
                                <input className="form-control"
                                       type="text"
                                       onChange={(event => this.setState({
                                           data:{...this.state.data,shipValue:event.target.value}
                                       }))}
                                       value={this.state.data.shipValue}/>
                            </div>
                            :""
                    }

                </div>

            </div>
        )
    }

}
const mapStateToProps = ({}) => {
    return {}
};
const mapActionsToProps = {toggleImagePicker};
export default injectIntl(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(ShipSetting)
);
