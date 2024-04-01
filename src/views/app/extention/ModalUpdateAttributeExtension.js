import React, {useEffect, useState} from "react";
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ExtensionService from "../../../services/ExtensionService";
interface Props{
    show:boolean,
    id?:number,
    toggle:void,

}
const ModalUpdateAttributeExtension = (props:Props)=>{
    const [editor,setEditor] = useState();
    const [contentHtml,setContentHtml] = useState('');
    const [ship,setShip] = useState();
    const [keyword,setKeyword] = useState();
    const [description,setDescription] = useState();
    const submit = ()=>{
        const request = {
            shopId:props.id,
            ship:ship,
            descript:description,
            html:contentHtml,
            keyword:keyword
        }
        ExtensionService.updateProductsInfo(request).then((results)=>{
            props.toggle(true)
        })
    }
    useEffect(() => {
       if (props.show){
            ExtensionService.getShopById(props.id).then((results)=>{
                if (results.data){
                    setContentHtml(results.data.html);
                    setShip(results.data.ship)
                    setKeyword(results.data.keyword);
                    setDescription(results.data.descript)
                }
            })
       }
    },[props.show])
    return(
        <Modal isOpen={props.show} toggle={props.toggle} size="lg">
            <ModalHeader>Cập nhật thông tin</ModalHeader>
            <ModalBody>
              <div>
                  <FormGroup>
                      <Input placeholder={"Ship"} value={ship?ship:''} onChange={(e)=>setShip(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                      <textarea className="w-100" placeholder={"Từ khóa"} value={keyword?keyword:''} onChange={(e)=>setKeyword(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                      <textarea className="w-100" placeholder={"Mô tả"} value={description?description:''} onChange={(e)=>setDescription(e.target.value)}/>
                  </FormGroup>
                  <CKEditor
                      onReady={ editor => {
                          editor.ui.getEditableElement().parentElement.insertBefore(
                              editor.ui.view.toolbar.element,
                              editor.ui.getEditableElement()
                          );
                          setEditor(editor);
                      } }
                      onChange={ ( event, editor ) => {
                          const data = editor.getData();
                            setContentHtml(data)

                      } }
                      editor={ DecoupledEditor }
                      data={contentHtml?contentHtml:""}
                  />
              </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={()=>submit()}>Cập nhật</Button>
            </ModalFooter>
        </Modal>
    )
}
export default ModalUpdateAttributeExtension;