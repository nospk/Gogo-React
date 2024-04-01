import React, {Component} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {findAll, save, deleteById} from '../../../redux/partner/actions'
import ReactTablePagination from "../../../components/ReactTablePagination";
import ReactTable from "react-table";
import {Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";

class Partnerlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partner:{},
            modal:false,
        }
    }

    componentDidMount() {
        this.props.findAll();
    }
    getDataEdit(data){
        this.setState({
            partner:data,
            modal:true,
        })
    }
    submit(){
        this.props.save(this.state.partner)
        this.setState({
            modal:false
        })
    }
    toggleModal(){
        this.setState({
            modal:!this.state.modal
        })
    }
    create(){
        this.setState({
            partner:{},
            modal:true,
        })
    }
    renderModal() {
        const {messages} = this.props.intl;
        const {providerName,host} = this.state.partner;
        return (
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggleModal.bind(this)}
                wrapClassName="modal-right">
                <ModalHeader >
                    Đối tác
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-2">
                        <Label className="mt-2" for="providerName">
                            Tên đối tác
                        </Label>
                        <Input
                            type="text" name="providerName" id="providerName"
                            value={providerName?providerName:''}
                            placeholder={'Tên đối tác'}
                            onChange={(e)=>{
                                this.setState({
                                    partner:{...this.state.partner,providerName:e.target.value}
                                })
                            }}
                        />
                    </Row>
                    <Row className="mb-2">
                        <Label className="mt-2" for="host">
                            Tên đối tác
                        </Label>
                        <Input
                            type="text" name="host" id="host"
                            value={host?host:''}
                            placeholder={'Domain'}
                            onChange={(e)=>{
                                this.setState({
                                    partner:{...this.state.partner,host:e.target.value}
                                })
                            }}
                        />
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submit.bind(this)}>
                        Do Something
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggleModal.bind(this)}>
                        <IntlMessages id="cancel"/>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
    configTable(){
        return[
            {
                Header: "id",
                accessor: "id",
                Cell: props => {
                    return (<p style={{cursor:"pointer"}} onClick={()=>this.getDataEdit(props.original)} className="list-item-heading">{props.value}</p>)
                },

            },
            {
                Header: "Tên đối tác",
                accessor: "providerName",
                Cell: props => (<p className="list-item-heading" onClick={()=>this.getDataEdit(props.original)} style={{cursor:"pointer"}}>{props.value}</p>),

            },
            {
                Header: "domain",
                accessor: "host",
                Cell: props => (<p className="list-item-heading" onClick={()=>this.getDataEdit(props.original)} style={{cursor:"pointer"}}>{props.value}</p>),

            },

        ];
    }
    render() {

        return (
            <div>
                <button className="btn btn-outline-info" onClick={this.create.bind(this)}>Tạo mới</button>
                <ReactTable
                    data={this.props.list}
                    columns={this.configTable()}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    PaginationComponent={ReactTablePagination}
                />
                {this.renderModal()}
            </div>

        )
    }

}

const mapStateToProps = ({partner}) => {
    const {list,success,error} = partner;
    return {list}
};
const mapActionsToProps = {findAll, save, deleteById};
export default injectIntl(
    connect(mapStateToProps, mapActionsToProps)(Partnerlist)
)

