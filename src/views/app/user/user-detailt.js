import React, {Component} from "react";
import {Col, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import UserService from "../../../services/UserService";
import {findAll,roleFindAll} from "../../../redux/user/actions";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {NotificationManager} from "../../../components/common/react-notifications";

class UserDetailtView extends Component{
    constructor(props) {
        super(props);
        this.state={
            user:{}
        }
    }
    componentDidMount() {
        const {state} = this.props.location;
        this.props.roleFindAll();
        if (state){
            const {id} = state
            if (id){
                UserService.findOne(id).then((results)=>{
                    if (results.success) this.setState({user:results.data});
                })
            }
        }

    }
    getRoleSelected(){
        const roles = this.state.user.roles;
        if (roles){
            return roles.map((item)=>{
                return {label:item.name, value:item.code, key:item.id}
            })
        }
        return ;
    }
    setRole(e){
        this.setState({
            user:{...this.state.user,roles:[{code:e.value,id:e.id,name:e.label}]}
        })
    }
    submit(){
        UserService.create(this.state.user).then((results)=>{

           if (results.status){
               NotificationManager.success("Thao tác thành công", "Thông báo", 3000, null, null, '');
           }else {
               NotificationManager.error("Thao tác thất bại", "Thông báo", 3000, null, null, '');

           }
        })
    }
    render() {
        const {username,email,password,phonenumber} = this.state.user;
        return(
            <Row>
                <div className="row justify-content-end"></div>
                <Col xs={12} sm={12} md={12} xl={12} className="d-flex justify-content-end pb-2 pt-2">
                    <button onClick={()=>this.submit()} className="btn btn-outline-info">Cập nhật</button>
                </Col>
                <Col sm={12} xs={12} md={6} xl={6}>
                   <div>
                       <h2>Thông tin thành viên</h2>
                        <div>
                            <Label className="mt-2" for="username">
                                <span>Tài khoản</span>
                            </Label>
                            <Input
                                value={username?username:''}
                                onChange={(text)=>{
                                    const value = text.target.value;
                                    this.setState({user:{...this.state.user,username:value}})
                                }}
                                type="text"
                                name="username"
                                id="username"
                            />
                        </div>
                       <div>
                           <Label className="mt-2" for="email">
                               <span>Email</span>
                           </Label>
                           <Input
                               value={email?email:''}
                               onChange={(text)=>{
                                   const value = text.target.value;
                                   this.setState({user:{...this.state.user,email:value}})
                               }}
                               type="text"
                               name="email"
                               id="email"
                           />
                       </div>
                       <div>
                           <Label className="mt-2" for="phoneNumber">
                               <span>SDT</span>
                           </Label>
                           <Input
                               value={phonenumber?phonenumber:''}
                               onChange={(text)=>{
                                   const value = text.target.value;
                                   this.setState({user:{...this.state.user,phonenumber:value}})
                               }}
                               type="text"
                               name="phoneNumber"
                               id="phoneNumber"
                           />
                       </div>
                       <div>
                           <Label className="mt-2" for="password">
                               <span>Mật khẩu</span>
                           </Label>
                           <Input
                               value={password?password:''}
                               onChange={(text)=>{
                                   const value = text.target.value;
                                   this.setState({user:{...this.state.user,password:value}})
                               }}
                               type="password"
                               name="password"
                               id="password"
                           />
                       </div>
                   </div>
                </Col>
                <Col sm={12} xs={12} md={6} xl={6}>
                    <h2>Thông tin quyền hạn</h2>
                    <div>
                        <label>
                           Quyền hạn
                        </label>
                        <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder={"Quyền hạn"}
                            name="form-field-name"
                            options={this.props.roles}
                            value={this.getRoleSelected()}
                            onChange={this.setRole.bind(this)}
                        />
                    </div>
                </Col>
            </Row>
        )
    }

}
const mapStateToProps = ({user}) => {
    const {list,roles} = user;
    return {list,roles}
};
const mapActionsToProps = {findAll,roleFindAll};
export default injectIntl(
    connect(mapStateToProps,mapActionsToProps)(UserDetailtView)
)



