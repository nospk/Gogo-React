import React from "react";
import ExtensionService from "../../../services/ExtensionService";
import validator from "validator/es";
import {DOMAIN} from "../../../services/APIURL";
import NumberFormat from "react-number-format";
import {Table} from "reactstrap";

class ExtensionCartDetailt extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
    }
    componentDidMount() {
        const {id} = this.props.match.params
        ExtensionService.getCart({id:id}).then((results)=>{
            this.setState({
                data:results.data
            })
        })
    }
    getRowStyles(item){

        if (item.orderedQuantity>0 && item.orderedQuantity<item.quantity){
            return{ background:"#a4623c",color:"#fff" }
        }else if (item.orderedQuantity===0){
            return{ background:"#f64343",color:"#464646" }
        }
        return{ background:"#f5f5f5",color:"#000000" }
    }
    renderBodyTable(){
        if (this.state.data.detailts){
            return this.state.data.detailts.map((item,index)=>{
                return(
                    <tr style={this.getRowStyles(item)}>
                        <th scope="row" >{index+1}</th>
                        <td>
                            <div className="d-flex">
                                <a href={item.linkZh} target="_blank">
                                    {
                                        item.variantThumbnail?
                                            <img style={{width:60}} src={validator.isURL(item.variantThumbnail)?item.variantThumbnail:DOMAIN+item.variantThumbnail}/>
                                            :
                                            <img style={{width:60}} src={validator.isURL(item.productThumbnail)?item.productThumbnail:DOMAIN+item.productThumbnail}/>
                                    }
                                </a>
                                <div className="ml-2">
                                    <p className="mb-1">{item.productName}</p>
                                    <p className="mb-1">{item.variantName}</p>
                                    <p className="mb-1 font-weight-bold">({item.sku})</p>
                                    <p className="mb-1 font-weight-bold">({item.variantNameZh})</p>
                                </div>

                            </div>
                        </td>
                        <td>
                            <span>{item.quantity}</span>
                        </td>
                        <td>
                            <span>{item.orderedQuantity}</span>
                        </td>
                    </tr>
                )
            })
        }

    }

    render() {
        return (
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên SP</th>
                        <th>Số Lượng</th>
                        <th>Số lượng đã đặt</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderBodyTable()}
                    </tbody>
                </Table>
            </div>
        );
    }

}
export default ExtensionCartDetailt
