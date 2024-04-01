import React from "react";
import ExtensionService from "../../../services/ExtensionService";
import {
	Button, Col,
	FormGroup,
	FormText,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Progress, Row,
	Table
} from "reactstrap";
import {DOMAIN} from "../../../services/APIURL";
import {findAll as categoryFindAll} from "../../../redux/category/actions";
import {findAll as findAllPartner} from '../../../redux/partner/actions'
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import ProgressService from "../../../services/ProgressService";
import IntlMessages from "../../../helpers/IntlMessages";
import {NotificationManager} from "../../../components/common/react-notifications";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import Pagination from "react-bootstrap-4-pagination";
import DictionaryService from "../../../services/DictionaryService";
import ModalUpdateAttributeExtension from "./ModalUpdateAttributeExtension";
import NumberFormat from "react-number-format";
import Switch from "rc-switch";
import {execute as outputExecute, reMonitoring} from "../../../core/FileOutputExcuter";
import {monitoring as batchMonitoring} from '../../../core/batchManager'
import ImageProgress from "./imageprocess";
var cancelFlag = false;
class ExtensionShop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			users: [],
			page:1,
			pageSize:20,
			totalPages:1,
			modal: false,
			currentShop: 0,
			modalEditSKU:false,
			modalEditData:{
				shopId:null,
				sku:'',
			},
			modalUploadProduct:{
				show:false,
				categoryId:'',
				shopId:''
			},
			modalEditRateAndFactor:{
				show:false,
				data:{}
			},
			selectPartner:[],
			selectCategory:'',
			progress:{
				status:false,
				value:0
			},
			enableEdit:false,
			search:'',
			modalUpdateAttribute:{
				show:false,
				shopId:''
			},
			modalUpdateCurrencyRate:{
				show:false,
				value:0
			},
			imageProgress: {
				open:false,
				data: ''
			}

		}

	}
	componentDidMount() {
		ExtensionService.findAllShop({page:this.state.page-1,pageSize:this.state.pageSize}).then((results) => {
			this.setState({
				list: results.data.content,
				totalPages:results.data.totalPages
			});
		});
		ExtensionService.findAllEmployee().then((results) => {
			this.setState({
				users:results.data
			});
		})
		this.props.categoryFindAll({page: 0, pageSize: 1000})
		this.props.findAllPartner();
		this.getProgress();

		reMonitoring((data) => {
			this.setState({
				progress:{
					status:data.BATCHSTATUS === "RUNNING" ? true : false,
					value:data.PROGRESS
				}
			});
		});
		cancelFlag = false;
		ExtensionService.imageprocessing(null,null,(res) => {
			this.handleImageProgress(res)
		});
	}
	toggleModalEditRateAndFactor(){
		this.setState({modalEditRateAndFactor:{...this.state.modalEditRateAndFactor,show:!this.state.modalEditRateAndFactor.show}})
	}
	loadMore(page){
		this.setState({
			page:page
		})
		ExtensionService.findAllShop({page:page,pageSize:this.state.pageSize}).then((results) => {
			this.setState({
				list: results.data.content,
				totalPages:results.data.totalPages
			});
		});
	}
	onCopy = (text)=>{
		NotificationManager.success("Copy thành công", "Thông báo", 3000, null, null, '');
	}
	toggleEdit(data){
		const newData = this.state.list.map((item)=>{
			if (item.id===data.id){
				const toggleValue = item.enableEdit?true:false;
				item.enableEdit = !toggleValue
			}
			return item;
		})
	this.setState({
		list:newData
	})
	}
	updateQuickView(data){
		ExtensionService.updateQuickview(data).then(()=>{
			this.toggleEdit(data);
		})

	}
	onChangeValueTable(id,value,field){
		const newData = this.state.list.map((item)=>{
			if (item.id===id){
				switch (field){
					case "name": item.name = value; break;
					case "mainProduct":  item.mainProduct = value; break;
					case "status":  item.status = value; break;
					case "enableUpdatePrice":  item.enableUpdatePrice = value; break;

				}
			}
			return item;
		})
	this.setState({
		list:newData
	})
	}
	getProgress(){
		ProgressService.getProgress("EXTENSION_EXCEL").then((results)=>{
			if (results.success){
				this.setState({
					progress:{
						status:true,
						value:results.data.progress
					}
				})
				this.intervalProgress();
			}
		})
	}
	intervalProgress(){
		const interval = setInterval(()=>{
			ProgressService.getProgress("EXTENSION_EXCEL").then((results)=>{
				if (results.success){
					this.setState({
						progress:{
							status:true,
							value:results.data.progress
						}
					})
				}else {
					clearInterval(interval);
					this.setState({
						progress:{
							status:true,
							value:1
						}
					})
				}
			});
		},1000)
	}
	processUpload(value,total,uploadSuccess){
		const percent = (value/total)
		if (uploadSuccess){
			setTimeout(()=>{
				this.getProgress();
			},2000)

		}
		this.setState({
			progress:{
				status:true,
				value:Number((percent).toFixed(2))
			}
		})
	}
	action(e, rowData,index) {
		switch (e.target.value) {
			case "show":
				this.props.history.push("/admin/extention/product/" + rowData.id);
				break;
			case "remove":
				ExtensionService.deleteById(rowData.id).then(()=>{
					window.location.reload();
				})
				break;
			case "authorization":
				this.setState({
					modal: true,
					currentShop: rowData.id
				});
				break;
			case "generate":
				this.generateExcel(rowData.id);
				break
			case "generateandtranslate":
				this.generateExcel(rowData.id,1);
				break
			case "download":
				window.location.href = DOMAIN+"/resources/excel/"+rowData.id+".xlsx"
				break
			case "editSKU":
			this.setState({
				modalEditSKU:true,
				modalEditData:{...this.state.modalEditData,shopId:rowData.id,sku:rowData.sku}
			})
				break
			case "uploadProduct":
				this.setState((prev)=>({modalUploadProduct:{...prev.modalUploadProduct,show:true,shopId:rowData.id}}))
				break
			case "rateAndFactor":
				this.setState({modalEditRateAndFactor:{...this.state.modalEditRateAndFactor,data:rowData,show:true}})
				break
			case "imageprocessing":
				cancelFlag = false;
				ExtensionService.imageprocessing(rowData.id,rowData.name,(res) => {
					this.handleImageProgress(res)
				});
				break
			case "uploadExcel":
				const input = document.createElement("input")
				input.type = 'file';
				input.setAttribute('multiple',true);
				input.onchange = (e)=>{
					let data = new FormData();
					const files = e.target.files;
					for (let i=0;i<files.length;i++){
						data.append('files['+i+']',files[i]);
					}
				ExtensionService.uploadExcel(data,this.processUpload.bind(this)).then((results)=>{
				});
				}
				input.click();
				break
			case "fixPrice":
				window.location.href = DOMAIN+"/extention/fix-price?id="+rowData.id
				break
			case "updateProductInfo":
				this.setState({
					modalUpdateAttribute:{
						show:true,
						shopId:rowData.id
					}
				})
				break
			case "enableUpdatePrice":
				ExtensionService.updateEnablePrice(rowData.id,!rowData.enableUpdatePrice).then((results)=>{
					this.onChangeValueTable(rowData.id,!rowData.enableUpdatePrice,'enableUpdatePrice')
				});
				break;
			case "exportsapo":
				outputExecute({file_cd:"SAPO_EXPORT", shop_id: rowData.id}, (data) => {
					this.setState({
						progress:{
							status:data.BATCHSTATUS === "RUNNING" ? true : false,
							value:data.PROGRESS
						}
					});
				})
				break
			case "translate":
				let gptString = localStorage.getItem('chatgpt');
				let gptData = JSON.parse(gptString ? gptString : '[]');
				let filter = gptData.filter((item) => item.id === rowData.id);
				if (filter.length <= 0) {
					ExtensionService.translate(rowData.id).then((res)=> {
						if (res.success === true) {
							gptData.push({
								name: rowData.name,
								id: rowData.id,
								batchkey: res.batchkey,

							});
							localStorage.setItem('chatgpt', JSON.stringify(gptData));
						}
					});
				}
				break
			case "downloadvideo":
				ExtensionService.downloadVideo(rowData.id);
				break;
			default:
				break;
		}
		e.target.selectedIndex = 0;
	}
	handleImageProgress(res) {
		if (res.BATCHSTATUS !== "RUNNING") {
			this.setState({
				imageProgress: {
					...this.state.imageProgress,
					open:false,
					data: {progress:1, name: res.name}
				}
			})
		} else {
			console.log(res)
			if (!cancelFlag) {
				this.setState({
					imageProgress: {
						...this.state.imageProgress,
						open:true,
						data: {progress:res.PROGRESS, name: res.name}
					}
				});
			}
		}
	}

	switchEnableUpdatePrice(rowData){
		ExtensionService.updateEnablePrice(rowData.id,!rowData.enableUpdatePrice).then((results)=>{
			this.onChangeValueTable(rowData.id,!rowData.enableUpdatePrice,'enableUpdatePrice')
		});
	}
	generateExcel(shopId,translate){

		ExtensionService.generateExcel(shopId,translate).then((results)=>{
			setTimeout(()=>{this.getProgress();},3000)
		})
	}
	authorization(userId){
	ExtensionService.authorization(userId,this.state.currentShop).then((results)=>{
		window.location.reload();
	})
	}
	submitEditSKU(){
		ExtensionService.updateSKU(this.state.modalEditData).then((results)=>{
			this.setState({
				modalEditSKU:false
			})
		})

	}
	submitUploadProduct(){
		ExtensionService.uploadProductToWeb({shopId:this.state.modalUploadProduct.shopId,categoryId:this.state.selectCategory,providers:this.state.selectPartner}).then((results)=>{
			this.getProgress();
		})
		this.setState((prev)=>({modalUploadProduct:{...prev.modalUploadProduct,show:false}}))
	}
	submitEdtitRateAndFactor(){
		const {exchangeRate,factor1,factor2,factor3,factor4,factorDefault,id} = this.state.modalEditRateAndFactor.data;
		ExtensionService.updateRateAndFactor({
			shopId:id,
			exchangeRate:exchangeRate,
			factor1:factor1,
			factor2:factor2,
			factor3:factor3,
			factor4:factor4,
			factorDefault:factorDefault
		}).then((results)=>{
		this.toggleModalEditRateAndFactor();
		})
	}
	uploadDitionary(){
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
	searchCategory(value){
		this.props.categoryFindAll({page: 0, pageSize: 1000,keyword:value})
	}
	selectHosts(id){
		if(this.state.selectPartner.includes(id)){
			const newList = this.state.selectPartner.filter(item=>item!==id);
			this.setState({
				selectPartner:newList
			})
		}else {
			const newList = [...this.state.selectPartner,id];
			this.setState({
				selectPartner:newList
			})
		}
	}
	cancelImageProcess() {
		cancelFlag = true;
		this.setState(
			{
				imageProgress: {
					...this.state.imageProgress,
					open:false,
				}
			}
		)
	}
	renderModal() {
		const {modal,users} = this.state;
		return (
			<Modal className="shadow-none"
				centered={true}
				size="md"
				toggle={() => {
					this.setState({modal: !modal})
				}}
				isOpen={modal}>
				<ModalHeader>
					<span>Chọn nhân viên</span>
				</ModalHeader>
				<ModalBody>
					<Table>
						<thead>
							<tr>
								<th>Tên NV</th>
								<th>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user)=>{
								return(
									<tr key={user.id}>
										<td>{user.username}</td>
										<td>
											<Button outline color="info" onClick={this.authorization.bind(this,user.id)}>
												Chọn
											</Button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</ModalBody>
			</Modal>
		)
	}
	renderModalEditSKU(){
		const {modalEditSKU,users,modalEditData} = this.state;
		return(
			<Modal className="shadow-none"
				centered={true}
				size="md"
				toggle={() => {
					this.setState({modalEditSKU: !modalEditSKU})
				}}
				isOpen={modalEditSKU}>
				<ModalHeader>
					<span>Nhập vào SKU</span>
				</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Input
							type="text"
							name="name"
							value={modalEditData.sku}
							onChange={(e) => {
								const value = e.target.value;
								this.setState(prevState => ({modalEditData: {...prevState.modalEditData, sku: value}}))
							}}
							placeholder="Nhập vào SKU"
						/>

					</FormGroup>

				</ModalBody>
				<ModalFooter>
					<Button outline color="info" onClick={this.submitEditSKU.bind(this)}>
						Cập nhật
					</Button>
				</ModalFooter>
			</Modal>
		);

	}
	renderModalUploadProduct(){
		const {show} = this.state.modalUploadProduct;
		const list = this.props.categoryList;
		const partnerList = this.props.partnerList;
		return(
			<Modal className="shadow-none"
				centered={true}
				size="md"
				toggle={() => {this.setState((prev)=>({modalUploadProduct:{...prev.modalUploadProduct,show:!show}}))}}
				isOpen={show}>
				<ModalHeader>
					<span>Chọn chuyên mục cần cập nhật</span>
				</ModalHeader>
				<ModalBody>
					<p className="font-weight-bold">Chọn website</p>
					{partnerList.map((item)=>(
						<div key={item.id} className="d-flex justify-content-between p-2" style={{color:this.state.selectPartner.includes(item.id)?'red':'#000'}}>
							<span>{item.providerName}</span>
							<button disabled={item.id===this.state.selectPartner} className="btn-success" onClick={()=>this.selectHosts(item.id)}>Chọn</button>
						</div>
					))}
					<div className="d-flex justify-content-between" style={{height:30}}>
						<p className="font-weight-bold">Chọn chuyên mục</p>
						<input placeholder={"Tìm kiếm chuyên mục"} onChange={(e)=>{this.searchCategory(e.target.value)}}/>
					</div>
					{list.map((item)=>(
						<div key={item.id} className="d-flex justify-content-between p-2" style={{color:item.id===this.state.selectCategory?'red':'#000'}}>
							<span>{item.name}</span>
							<button disabled={item.id===this.state.selectCategory} className="btn-success"  onClick={()=>this.setState({selectCategory:item.id})}>Chọn</button>
						</div>
					))}
				</ModalBody>
				<ModalFooter>
					<Button outline color="info" onClick={()=>this.setState((prev)=>({modalUploadProduct:{...prev.modalUploadProduct,show:!show}}))}>
						Thoát
					</Button>
					<Button outline color="success" onClick={this.submitUploadProduct.bind(this)}>
						Cập nhật
					</Button>
				</ModalFooter>
			</Modal>
		)
	}
	renderEditRateAndFactorModal() {
		const {exchangeRate,factor1,factor2,factor3,factor4,factorDefault} = this.state.modalEditRateAndFactor.data;
		return (
			<Modal
				isOpen={this.state.modalEditRateAndFactor.show}
				toggle={this.toggleModalEditRateAndFactor.bind(this)}
				wrapClassName="modal-right">
				<ModalHeader >
				Thay đổi tỷ giá
				</ModalHeader>
				<ModalBody>
					<Row className="mb-2">
						<Label className="mt-2" for="rate">
							Tỷ giá
						</Label>
						<Input
							type="text" name="rate" id="rate"
							value={exchangeRate?exchangeRate:''}
							placeholder={'Tỷ giá'}
							onChange={(e)=>{this.setState({modalEditRateAndFactor:{...this.state.modalEditRateAndFactor,data:{...this.state.modalEditRateAndFactor.data,exchangeRate:e.target.value}}})}}

						/>
					</Row>
					<Row className="mb-2">
						<Label className="mt-2" for="factorDefault">
							Hệ số mặc định
						</Label>
						<Input
							type="text" name="host" id="factorDefault"
							value={factorDefault?factorDefault:''}
							onChange={(e)=>{this.setState({modalEditRateAndFactor:{...this.state.modalEditRateAndFactor,data:{...this.state.modalEditRateAndFactor.data,factorDefault:e.target.value}}})}}
							placeholder={'Hệ số mặc định'}
						/>
					</Row>
					<Row className="mb-2">
						<Label className="mt-2" for="factor1">
							Hệ số 1
						</Label>
						<Input
							type="text" name="factor1" id="factor1"
							value={factor1?factor1:''}
							onChange={(e)=>{this.setState({modalEditRateAndFactor:{...this.state.modalEditRateAndFactor,data:{...this.state.modalEditRateAndFactor.data,factor1:e.target.value}}})}}
							placeholder={'Hệ số 1'}
						/>
					</Row>
					<Row className="mb-2">
						<Label className="mt-2" for="factor2">
							Hệ số 2
						</Label>
						<Input
							type="text" name="factor2" id="factor2"
							value={factor2?factor2:''}
							onChange={(e)=>{this.setState({modalEditRateAndFactor:{...this.state.modalEditRateAndFactor,data:{...this.state.modalEditRateAndFactor.data,factor2:e.target.value}}})}}
							placeholder={'Hệ số 2'}
						/>
					</Row>
					<Row className="mb-2">
						<Label className="mt-2" for="factor3">
							Hệ số 3
						</Label>
						<Input
							type="text" name="factor3" id="factor3"
							value={factor3?factor3:''}
							onChange={(e)=>{this.setState({modalEditRateAndFactor:{...this.state.modalEditRateAndFactor,data:{...this.state.modalEditRateAndFactor.data,factor3:e.target.value}}})}}
							placeholder={'Hệ số 3'}
						/>
					</Row>
					<Row className="mb-2">
						<Label className="mt-2" for="factor4">
							Hệ số 4
						</Label>
						<Input
							type="text" name="factor4" id="factor4"
							value={factor4?factor4:''}
							onChange={(e)=>{this.setState({modalEditRateAndFactor:{...this.state.modalEditRateAndFactor,data:{...this.state.modalEditRateAndFactor.data,factor4:e.target.value}}})}}
							placeholder={'Hệ số 4'}
						/>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.submitEdtitRateAndFactor.bind(this)}>
						Do Something
					</Button>{" "}
					<Button color="secondary" onClick={this.toggleModalEditRateAndFactor.bind(this)}>
						<IntlMessages id="cancel"/>
					</Button>
				</ModalFooter>
			</Modal>
		)
	}
	thead(){
		return[
			{name:"#ID"},
			{name:"Tên"},
			{name:"Sản phẩm chính"},
			{name:"Số lượng"},
			{name:"Trạng thái"},
			{name:"Nhân viên"},
			{name:"Thao tác"},

		]
	}
	tbody(){

		return this.state.list.map((item,index)=>{
			return(
				<tr key={item.id} style={{fontSize:18}}>
					<td>{item.id}</td>
					<td>
						{item.enableEdit? <Input value={item.name} onChange={(event => this.onChangeValueTable(item.id,event.target.value,"name"))}/>: (
							<div className="d-flex">
								<p className="mr-2" style={{fontSize:18}}>{item.name}</p>
								<CopyToClipboard text={item.link} onCopy={()=>this.onCopy()}>
									<div className="glyph-icon iconsminds-file-copy" style={{cursor:"pointer"}}></div>
								</CopyToClipboard>
							</div>
						)}
					</td>
					<td>
						{item.enableEdit? <Input value={item.mainProduct} onChange={(event => this.onChangeValueTable(item.id,event.target.value,"mainProduct"))}/>: <p style={{fontSize:18}}>{item.mainProduct}</p>}
					</td>
					<td>{item.count}</td>
					<td>
						{item.enableEdit? <Input value={item.status} onChange={(event => this.onChangeValueTable(item.id,event.target.value,"status"))}/>: <p style={{fontSize:18}}>{item.status}</p>}
					</td>
					<td>
						{item.userExtensionShop? <p style={{fontSize:18}}>{item.userExtensionShop.username}</p>:<p style={{fontSize:18}}>Chưa có nhân viên</p>}
					</td>
					<td style={{width:50}}>
						<div className="d-flex flex-column align-items-end" style={{gap:5}}>
							<Switch
								className="custom-switch custom-switch-secondary"
								checked={item.enableUpdatePrice?item.enableUpdatePrice:false}
								onChange={switchCheckedSecondary => {
								this.switchEnableUpdatePrice(item)
								}}
							/>
							<select style={{padding: 10, borderRadius: 20, outline: "none"}} onChange={(e) => {
								this.action(e, item,index)
							}}>
								<option value="default">Thao tác</option>
								<option value="remove">Xóa shop</option>
								<option value="uploadExcel">Cập nhật excel</option>
								<option value="enableUpdatePrice">{item.enableUpdatePrice?"Tự động cập nhật giá đang bật":"Tự động cập nhật giá đang tắt"}</option>
								<option value="updateProductInfo">Cập nhật các thông tin sản phẩm</option>
								<option value="rateAndFactor">Chỉnh sửa tỷ giá và hệ số</option>
								<option value="show">Xem sản phẩm</option>
								<option value="authorization">Cấp quyền cho user</option>
								<option value="editSKU">Cập nhật SKU</option>
								<option value="uploadProduct">Cập nhật sản phẩm</option>
								<option value="generate">Tạo excel</option>
								<option value="generateandtranslate">Tạo excel và dịch</option>
								<option value="download">Tải excel</option>
								<option value="imageprocessing">Xử lý hình ảnh</option>
								<option value="exportsapo">sapo</option>
								<option value="translate">Dịch sản phẩm</option>
								<option value="downloadvideo">Tải video</option>
							</select>
							{
								item.enableEdit?
									<Button className="mt-2" color="success" onClick={()=>this.updateQuickView(item)}>Cập nhật</Button>:
									<Button className="mt-2" onClick={()=>this.toggleEdit(item)}>Sửa nhanh</Button>
							}
						</div>
					</td>
				</tr>
			)
		})
	}
	pagination() {
		return {
			totalPages:this.state.totalPages,
			currentPage: this.state.page,
			showMax: 10,
			size: "sm",
			threeDots: true,
			prevNext: true,
			onClick: (page) => {
				const request ={page:page-1,pageSize:this.state.pageSize}
				if (this.state.search) request.keyword = this.state.search;
				ExtensionService.findAllShop(request).then((results) => {
					this.setState({
						list: results.data.content,
						totalPages:results.data.totalPages,
						page:page,
					});
				});


			}
		};
	}
	search(text){
		this.setState({search:text});
		const request ={page:0,pageSize:this.state.pageSize}
		if (text) request.keyword = text;
		ExtensionService.findAllShop(request).then((results) => {
			this.setState({
				list: results.data.content,
				totalPages:results.data.totalPages===0?1:results.data.totalPages,
				page:1,
			});
		});
	}
	toggleModalUpdateAttribute(processRunning){
		this.setState({
			modalUpdateAttribute:{
				show:false,
				shopId:''
			}
		})
		if (processRunning){
			this.getProgress();
		}
	}
	toggleModalUpdateCurrencyRate(){
		this.setState((prev)=>({modalUpdateCurrencyRate:{...prev.modalUpdateCurrencyRate,show:!prev.modalUpdateCurrencyRate.show}}))
	}
	submitUpdateCurrencyRate(){
		ExtensionService.updateCurrencyRate(this.state.modalUpdateCurrencyRate.value).then((results)=>{
			this.getProgress();
		})
		this.toggleModalUpdateCurrencyRate();
	}
	onChangeInputUpdateCurrencyRate(value){
		this.setState((prev)=>({modalUpdateCurrencyRate:{...prev.modalUpdateCurrencyRate,value:value}}))

	}
	renderModalUpdateCurrencyRate(){
		const {show,value} = this.state.modalUpdateCurrencyRate;

		return(
			<Modal className="shadow-none"
				centered={true}
				size="md"
				toggle={() => {this.toggleModalUpdateCurrencyRate()}}
				isOpen={show}>
				<ModalHeader>
					<span>Cập nhật tỷ giá tiền tệ</span>
				</ModalHeader>
				<ModalBody>
					<NumberFormat value={value ? value : 0}
								className="w-100 p-3 rounded border-0"
								onValueChange={(e)=>{
									this.onChangeInputUpdateCurrencyRate(e.value);
								}}
								displayType={'input'} thousandSeparator={true} suffix={" đ"}/>
				</ModalBody>
				<ModalFooter>
					<Button outline color="info" onClick={()=>{this.toggleModalUpdateCurrencyRate()}}>
						Thoát
					</Button>
					<Button outline color="success" onClick={this.submitUpdateCurrencyRate.bind(this)}>
						Cập nhật
					</Button>
				</ModalFooter>
			</Modal>
		)
	}
	clearProcess() {

	}
	render() {
		return (
			<div>

				<Row >
				<Col md={6} xl={6}>
					<label>Tìm kiếm</label>
					<Input placeholder={"Tìm kiếm"}
							onChange={(e)=>this.search(e.target.value)}
							value={this.state.search}/>
				</Col>
					<Col md={6} xl={6} className="d-flex justify-content-end align-items-end">
						<div className="d-flex justify-content-end align-items-end">
							<Button onClick={()=>this.toggleModalUpdateCurrencyRate()}>Cập nhật tỷ giá </Button>
							<Button onClick={()=>this.uploadDitionary()}>Cập nhật excel</Button>
							<Button onClick={()=>this.uploadDitionary()}>Cập nhật excel</Button>
						</div>

					</Col>
				</Row>
				<div style={{display:this.state.progress.status?'block':'none'}}>
					<Progress style={{height:10}} striped value={this.state.progress.value*100}>Đang xử lý {this.state.progress.value*100}%</Progress>
				</div>
				<Table striped bordered hover>
					<thead>
					<tr>
						{this.thead().map((item)=>{
							return(
								<th key={item.name}>{item.name}</th>
							)
						})}
					</tr>
					</thead>
					<tbody>{this.tbody()}</tbody>
				</Table>
				<Pagination {...this.pagination()} />
				{this.renderModal()}
				{this.renderModalEditSKU()}
				{this.renderModalUploadProduct()}
				{this.renderEditRateAndFactorModal()}
				{this.renderModalUpdateCurrencyRate()}
				<ModalUpdateAttributeExtension show={this.state.modalUpdateAttribute.show} toggle={this.toggleModalUpdateAttribute.bind(this)} id={this.state.modalUpdateAttribute.shopId}/>
				<ImageProgress open={this.state.imageProgress.open} data={this.state.imageProgress.data} toggle={this.cancelImageProcess.bind(this)}/>
			</div>
		)
	}
}



const mapStateToProps = ({category,partner}) => {
	const categoryList = category.list;
	const categoryTotalPages = category.totalPages;
	const partnerList = partner.list;
	return {categoryList,partnerList,categoryTotalPages}
};
const mapActionsToProps = {categoryFindAll,findAllPartner};
export default injectIntl(
	connect(
		mapStateToProps,
		mapActionsToProps
	)(ExtensionShop)
);
