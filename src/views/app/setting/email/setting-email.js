import React from "react";
import SettingService from "../../../../services/SettingService";

class SettingEmail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:{}
        }
    }
    componentDidMount() {
        SettingService.getEmailSetting().then((results)=>{
            this.setState({
                data:results.data
            })
            console.log(results);
        })

    }
    onchangeValue(key,value){
        const data = Object.fromEntries(
            Object.entries(this.state.data.contents).map(([k,v])=>{
                if (key===k){
                    return [k,value];
                }
                return [k,v];
        }))
      this.setState({
          data:{...this.state.data,contents:data}
      })
    }

    renderContent(){
        if (this.state.data.contents){
            return Object.entries(this.state.data.contents).map((value, index) => {
                return (
                    <div key={index}>
                        <label className="w-100">{value[0]}</label>
                        <textarea className="w-100" value={value[1]} onChange={(e)=>this.onchangeValue(value[0],e.target.value)}></textarea>
                    </div>
                )
            })
        }

    }
    submit(){
       SettingService.updateEmailSetting(this.state.data).then((results)=>{
           window.location.reload();
       })
    }
    render() {
        return(
            <div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success" onClick={()=>{this.submit()}}>Cập nhật</button>
                </div>
                <div>
                    <div>
                        <label>Tiêu đề</label>
                        <input className="w-100" value={this.state.data.title?this.state.data.title:''} onChange={(e)=>this.setState({
                            data:{...this.state.data,title:e.target.value}
                        })}/>
                    </div>
                    <div>
                        <label>Email admin</label>
                        <input className="w-100" value={this.state.data.email?this.state.data.email:''} onChange={(e)=>this.setState({
                            data:{...this.state.data,email:e.target.value}
                        })}/>
                    </div>

                </div>
                {this.renderContent()}
            </div>
        )
    }

}
export default SettingEmail;