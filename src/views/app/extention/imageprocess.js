import React from "react";
import {useState} from "react";
import {Modal, ModalBody} from "reactstrap";
interface Props {
	open:boolean,
	toggle:void,
	data:any
}
const ImageProgress = (props:Props) => {
	return (
		<Modal className="shadow-none"
			   centered={true}
			   size="md"
			   toggle={() => {
					props.toggle();
			   }}
			   contentClassName={'rounded-lg'}
			   isOpen={props.open}>
			<ModalBody style={{borderRadius: 20}}>
				<p className="text-center pb-3" style={{fontSize:24, color:"red"}}>Đang xử lý shop : {props.data.name}</p>
				<p className="text-center mb-0" style={{fontSize:60}}>{parseFloat(props.data.progress * 100).toFixed(0)}%</p>
			</ModalBody>

		</Modal>
	)
}
export default ImageProgress;
