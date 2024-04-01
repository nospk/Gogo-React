import React from 'react'
import {Button, Col, FormGroup, Input, Label, Progress, Row} from "reactstrap";
import DictionaryService from "../../../services/DictionaryService";
import ReactTablePagination from "../../../components/ReactTablePagination";
import ReactTable from "react-table";
import {NotificationManager} from "../../../components/common/react-notifications";
class ExtensionDictionary extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            page:0,
            pageSize:20,
            totalPages:1,
            dictionary:{},
            search:'',
            progress:{
                status:false,
                value:0
            },
        }
    }
    componentDidMount() {
        DictionaryService.findAll(this.state.page,this.state.pageSize).then((results)=>{
            this.setState({
                list:results.data.content,
                totalPages:results.data.totalPages
            })
        })
    }
    createAndupdate(){
        DictionaryService.createAndupdate(this.state.dictionary.id,this.state.dictionary.zhWord,this.state.dictionary.viWord).then((results)=>{
            if (results.success){
                if (this.state.dictionary.id){
                    const updated = this.state.list.map((item)=>{
                        if (item.id===this.state.dictionary.id){
                            item = this.state.dictionary
                        }
                        return item;

                    })
                    this.setState({
                        list:updated
                    })
                }else {
                    const newList = [results.data].concat(this.state.list);
                    this.setState({
                        list:newList
                    })
                }
            }else {
                NotificationManager.error("Từ này đã tồn tại trên hệ thống","Thông báo",3000)
            }

        })
    }
    enableEdit(data){
        this.setState({
            dictionary:data
        })
    }
    clear(){
        this.setState({
            dictionary:{}
        })
    }
    processUpload(value,total,uploadSuccess){
        const percent = (value/total)
        this.setState({
            progress:{
                status:true,
                value:Number((percent).toFixed(2))
            }
        })
    }
    uploadExcel(){
        const input = document.createElement("input")
        input.type = 'file';
        input.setAttribute('multiple',true);
        input.onchange = (e)=>{
            let data = new FormData();
            const files = e.target.files;
            for (let i=0;i<files.length;i++){
                data.append('files['+i+']',files[i]);
            }
            DictionaryService.uploadExcel(data,this.processUpload.bind(this)).then((results)=>{
            });
        }
        input.click();
    }
    configTable(){
        return[
            {
                Header: "Trung Quốc",
                accessor: "zhWord",
                Cell: props => (
                    <p onClick={()=>this.enableEdit(props.original)}>{props.value}</p>
                ),
            },
            {
                Header: "Việt Nam",
                accessor: "viWord",
                Cell: props => (
                    <p>{props.value}</p>
                ),
            },
        ];
    }
    search(value){
        DictionaryService.findAll(0,this.state.pageSize,value).then((results)=>{
            this.setState({
                list:results.data.content,
                totalPages:results.data.totalPages,
                page:0,
                search:value
            })
        })
    }
    loadMore(page){
        DictionaryService.findAll(page,this.state.pageSize,this.state.search).then((results)=>{
            this.setState({
                list:results.data.content,
                totalPages:results.data.totalPages,
                page:page,
            })
        })
    }
    render() {
        return (
            <div>
                <div style={{display:this.state.progress.status?'block':'none'}}>
                    <Progress style={{height:10}} striped value={this.state.progress.value*100}>Đang xử lý {this.state.progress.value*100}%</Progress>
                </div>
                <div className="d-flex justify-content-end">
                    <Button onClick={()=>this.uploadExcel()}>Cập nhật excel</Button>
                </div>
                <Row>
                    <Col sm={12} xs={12} md={6} xl={6}>
                        <FormGroup>
                            <Label>
                                Từ Trung Quốc
                            </Label>
                            <Input
                                type="text"
                                name="variantName"
                                value={this.state.dictionary.zhWord?this.state.dictionary.zhWord:''}
                                placeholder={'Từ Trung Quốc'}
                                onChange={(e)=>{
                                    this.setState({
                                        dictionary:{...this.state.dictionary,zhWord:e.target.value}
                                    })
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Từ Việt Nam
                            </Label>
                            <Input
                                type="text"
                                name="variantName"
                                value={this.state.dictionary.viWord?this.state.dictionary.viWord:''}
                                placeholder={'Từ Việt Nam'}
                                onChange={(e)=>{
                                    this.setState({
                                        dictionary:{...this.state.dictionary,viWord:e.target.value}
                                    })
                                }}
                            />
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                            <Button onClick={()=>this.clear()}>Làm mới</Button>
                            <Button onClick={()=>this.createAndupdate()}>Cập nhật</Button>
                        </div>
                    </Col>
                    <Col sm={12} xs={12} md={6} xl={6}>
                        <FormGroup>
                            <Label>
                                Tìm kiếm từ khóa
                            </Label>
                            <Input
                                type="text"
                                value={this.state.search?this.state.search:''}
                                placeholder={'Tìm kiếm từ khóa'}
                                onChange={(e)=>{this.search(e.target.value)}}
                            />
                        </FormGroup>
                        <ReactTable
                            manual={true}
                            data={this.state.list}
                            columns={this.configTable()}
                            pages={this.state.totalPages}
                            page={this.state.page}
                            showPageJump={false}
                            showPageSizeOptions={false}
                            pageSize={this.state.pageSize}
                            collapseOnPageChange={true}
                            onPageChange={(page)=>{
                                this.loadMore(page);
                            }}
                            sortable={false}
                            PaginationComponent={ReactTablePagination}
                        />
                    </Col>
                </Row>
            </div>

        );
    }

}
export default ExtensionDictionary;
