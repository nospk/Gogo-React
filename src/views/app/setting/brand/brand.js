import React from "react";
import {Button, Col, Row} from "reactstrap";
import {create, deleteById, findAll, removeError, removeSuccess, sorttree} from "../../../../redux/category/actions";
import {toggleModal as toggleImagePicker} from "../../../../redux/image/actions";
import {findAll as findAllPartner} from "../../../../redux/partner/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import ImagePicker from "../../../../components/imagepicker/ImagePicker";
import {DOMAIN} from "../../../../services/APIURL";
import SettingService from "../../../../services/SettingService";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";


class Brand extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list:[
                {
                    href:'https://caysenda.vn/resources/img/200X60/img1.png',
                    logo:"https://caysenda.vn/resources/img/200X60/img1.png"
                },
                {
                    href:'https://caysenda.vn/resources/img/200X60/img1.png',
                    logo:"https://caysenda.vn/resources/img/200X60/img1.png"
                }
            ]
        }
    }
    componentDidMount() {
        SettingService.getTrademark().then((results)=>{
            console.log(results);
            this.setState({
                list:results.data
            });
        })
    }
    update(){
        SettingService.updateTrademark(this.state.list).then((results)=>{
            NotificationManager.success("Cập nhật thành công","Thông báo",1000)
        })
    }
    remove(index){
        const removed = this.state.list.filter((item,i)=>{
            if (index!==i){
                return true;
            }
            return false;
        })
        this.setState({
            list:removed
        })
    }
    callbackPicker(data){
        this.setState({
            list:[...this.state.list,{
                href:"#",
                logo:data[0].path
            }]
        })
    }
    showPicker(){
        this.props.toggleImagePicker();
    }
    render() {
        return(
            <div>
                <div className="d-flex justify-content-between">
                    <h2>Thương hiệu</h2>
                    <div>
                        <Button className="m-1" onClick={()=>{this.showPicker()}}>Thêm</Button>
                        <Button className="m-1" onClick={()=>{this.update()}}>Cập nhật</Button>
                    </div>
                </div>
                <Row>
                    {this.state.list.map((item,index)=>{
                        return(
                            <Col key={index} xs={2} sm={2} md={2} xl={2} className="d-flex flex-column justify-content-center">
                                <img className="w-100" src={DOMAIN+item.logo}/>
                                <Button onClick={()=>this.remove(index)}>Xóa</Button>
                            </Col>
                        )
                    })}
                </Row>
                <ImagePicker callback={this.callbackPicker.bind(this)}/>
            </div>
        )
    }

}
const mapStateToProps = () => {
    return{}
};
const mapActionsToProps = {toggleImagePicker};
export default injectIntl(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(Brand)
);


