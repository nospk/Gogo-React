import React, {Component} from "react";
import {injectIntl} from "react-intl";
import {Button, Col, Container, ModalFooter, Row} from "reactstrap";
import SettingService from "../../../../services/SettingService";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import './styles.scss'
import SortableTree, {addNodeUnderParent, changeNodeAtPath, getNodeAtPath, removeNodeAtPath} from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import Menupicker from "../../../../components/menupicker/menupicker";
import {NotificationManager} from "../../../../components/common/react-notifications";
import imageNotFound from '../../../../assets/img/no-image.jpg';
import ImagePicker from "../../../../components/imagepicker/ImagePicker";
import {toggleModal as toggleImagePicker} from "../../../../redux/image/actions";
import {connect} from "react-redux";
import {DOMAIN} from "../../../../services/APIURL";
class SettingMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            menu: {data: [], key: "",},
            count: 1,
            treeData: [],
            modal:false,
            rowData:{}
        };

    }
    componentDidMount() {
        SettingService.findAllMenu().then((results) => {
            console.log(results);
            if (results.success) {
                this.setState({
                    menus: results.data,
                    menu: results.data[0],
                    count: results.data[0].data.length>0?results.data[0].data[results.data[0].data.length - 1].id:1,
                    treeData:results.data[0].data.length<=0?[{name:'',href:'#'}]:results.data[0].data
                })
            }
        })
    }
    toggle(){
        this.setState({modal:!this.state.modal})
    }
    showModal(rowData){
        this.setState({
            modal:true,
            rowData:rowData
        })
    }
    callback(data){
        this.addNode(this.state.rowData,data.name,data.href);
        this.toggle();
    }
    selectMenu(menu) {
        this.setState({
            menu: menu,
            count: menu.data.length>0?menu.data[menu.data.length - 1].id:1,
            treeData:menu.data.length<=0?[{name:'',href:'#'}]:menu.data
        })
    }

    showPickerIcon(rowData){
        this.setState({rowData:rowData})
        this.props.toggleImagePicker();
    }
    removeNode(rowInfo) {
        let {node, treeIndex, path} = rowInfo;
        this.setState(state => ({
            treeData: removeNodeAtPath({
                treeData: state.treeData,
                path,
                getNodeKey: ({ treeIndex }) => treeIndex,
            })
        }));
    }
    addNode(rowInfo,name,href){
        let NEW_NODE = {name: name,href:href};
        let {node, treeIndex, path} = rowInfo;
        path.pop();
        let parentNode = getNodeAtPath({
            treeData: this.state.treeData,
            path : path,
            getNodeKey: ({ treeIndex }) =>  treeIndex,
            ignoreCollapsed : true
        });
        let getNodeKey = ({ node: object, treeIndex: number }) => {
            return number;
        };
        let parentKey = getNodeKey(parentNode);
        if(parentKey == -1) {
            parentKey = null;
        }
        let newTree = addNodeUnderParent({
            treeData: this.state.treeData,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: parentKey,
            getNodeKey: ({ treeIndex }) =>  treeIndex
        });
        this.setState({treeData: newTree.treeData});

    }
    submit(){
        SettingService.createMenu(this.state.menu.key,this.state.treeData).then((results)=>{
            NotificationManager.success("Cập nhật thành công", "Thông báo", 3000, null, null, '');
        })
    }
    updateIcon(icon){
        let {node, treeIndex, path} = this.state.rowData;
        const treeDataNew = changeNodeAtPath({
            treeData: this.state.treeData,
            path: path,
            newNode: {
                icon: icon[0].path,
                name: node.name,
                href:node.href,
                children: node.children // tried with or without this line
            },
            getNodeKey: ({node: TreeNode, treeIndex: number}) => {
                return number;
            },
            ignoreCollapsed: true
        });
        this.setState({
            treeData:treeDataNew
        })
        console.log(treeDataNew);
    }
    onChangeInputName (text,rowInfo){
        let {node, treeIndex, path} = rowInfo;
        const treeDataNew = changeNodeAtPath({
            treeData: this.state.treeData,
            path: path,
            newNode: {
                name: text,
                href:node.href,
                icon:node.icon,
                children: node.children // tried with or without this line
            },
            getNodeKey: ({node: TreeNode, treeIndex: number}) => {
                // console.log(number);
                return number;
            },
            ignoreCollapsed: true
        });
        this.setState({
            treeData:treeDataNew
        })
    }
    onChangeInputHref (text,rowInfo){
        let {node, treeIndex, path} = rowInfo;
        const treeDataNew = changeNodeAtPath({
            treeData: this.state.treeData,
            path: path,
            newNode: {
                name: node.name,
                href:text,
                icon:node.icon,
                children: node.children // tried with or without this line
            },
            getNodeKey: ({node: TreeNode, treeIndex: number}) => {
                // console.log(number);
                return number;
            },
            ignoreCollapsed: true
        });
        this.setState({
            treeData:treeDataNew
        })
    }
    renderMenuList(){
        return(
            <ul style={{listStyleType:"none"}}>
                {this.state.menus.map((item)=>{
                    return(
                        <li className="p-2"
                            style={{cursor:"pointer"}}
                            key={item.key} onClick={()=>{this.selectMenu(item)}}>{item.key}</li>
                    )
                })}
            </ul>
        )
    }
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} xl={12}>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={()=>this.submit()}>Cập nhật</button>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={3} xl={3}>
                        {this.renderMenuList()}
                    </Col>
                    <Col xs={12} sm={12} md={9} xl={9}>
                        <div style={{ height: 800 }}>
                            <SortableTree
                                generateNodeProps={rowInfo => ({
                                    buttons: [
                                        <div className="d-flex ">
                                            <div className="glyph-icon simple-icon-plus icon-Font-Size ml-2 mr-2" onClick={()=>{this.showModal(rowInfo)}}></div>
                                            <div className="glyph-icon simple-icon-minus icon-Font-Size ml-2 mr-2" onClick={()=>{this.removeNode(rowInfo)}}></div>
                                        </div>,
                                    ],
                                    style: {
                                        height: '60px',
                                        width:500
                                    },
                                    title:
                                    <div className="d-flex">
                                        <div className="" style={{display:"grid",padding:"3px"}}>
                                            <div>
                                                <span>Tên</span>
                                                <input style={{margin:"2px"}} value={rowInfo.node.name} onChange={(e)=>{this.onChangeInputName(e.target.value,rowInfo)}}/>
                                            </div>
                                            <div>
                                                <span>Đường dẫn</span>
                                                <input style={{margin:"2px"}} value={rowInfo.node.href} onChange={(e)=>{this.onChangeInputHref(e.target.value,rowInfo)}}/>
                                            </div>
                                        </div>
                                        <div className="">
                                            <img onClick={()=>this.showPickerIcon(rowInfo)} style={{width:20,height:20}} src={rowInfo.node.icon?DOMAIN+rowInfo.node.icon:imageNotFound}/>
                                        </div>
                                    </div>

                                })}
                                treeData={this.state.treeData}
                                onChange={treeData => this.setState({ treeData })}
                            />
                        </div>
                    </Col>
                </Row>
                <Menupicker show={this.state.modal}
                            callback={this.callback.bind(this)}
                            toggle={this.toggle.bind(this)}/>
                <ImagePicker callback={this.updateIcon.bind(this)}/>
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
    )(SettingMenu)
);
