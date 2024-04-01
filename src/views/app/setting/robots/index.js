import React from 'react';
import SettingService from "../../../../services/SettingService";
import {Button} from "reactstrap";
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs/components/prism-core";
import {NotificationManager} from "../../../../components/common/react-notifications";
import {DOMAIN} from "../../../../services/APIURL";

class Robots extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:{}
        }
    }
    componentDidMount() {
        SettingService.getRobots().then((results)=>{
            this.setState({
                data:results.data
            })
        })
    }
    enable(){
        this.setState({
            data:{...this.state.data,enable:!this.state.data.enable}
        });
    }
    onChangeContent(code){
        this.setState({
            data:{...this.state.data,content:code}
        })
    }
    submit(){
        SettingService.updateRobots(this.state.data).then((results)=>{
           NotificationManager.success("Cập nhật thành công","Thông báo",3000)
        })
    }
    createSitemap(){
        NotificationManager.warning("Đang tiến hàng tạo sitemap","Thông báo")
        SettingService.createSitemap().then(()=>{
            NotificationManager.success("Tạo thành công","Thông báo")
        })
    }
    seeSitemap(){
        window.location.href = DOMAIN+"/resources/sitemap/sitemap-index.xml";
    }

    render() {
        return(
            <div>
                <div className="d-flex" style={{gap:'10px'}}>
                    <Button onClick={this.createSitemap.bind(this)}>Tạo sitemap</Button>
                    <Button onClick={this.seeSitemap.bind(this)}>Xem sitemap</Button>
                    <Button onClick={this.enable.bind(this)}>{this.state.data.enable?'Tắt':'Bật'}</Button>
                    <Button onClick={this.submit.bind(this)}>Cập nhật</Button>
                </div>
                <Editor
                    value={this.state.data.content?this.state.data.content:''}
                    onValueChange={code => this.onChangeContent(code)}
                    highlight={code => highlight(code, languages.txt)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div>
        )
    }

}
export default Robots;