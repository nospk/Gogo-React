import ProductService from "../../services/ProductService";
import {ModalSelectBackgroundBuynow} from "./modal-select-background-buynow";

export const MODAL_VARIANT_BUYNOW_CALLBACK = "MODAL_VARIANT_BUYNOW_CALLBACK"
export const ModalVariantBuynow = (editor) => {
    const doc = document.createElement('div');
    let time = ''
    let currentPage = 1;
    let totalPages = 1;
    let variants = [];
    let options = [];
    const checkExists = (id)=>{

        const filter = options.filter((item)=>item===id);
        return filter.length>0
    }
    const renderVariants = ()=>{
        const components =  editor.getSelected().closestType("buynow-form")
        const attributes = components.getAttributes();
        const productId = attributes["data-productid"]

        if (productId){
            const variantElements = doc.querySelector("#list");
            ProductService.findById(productId).then((results)=>{
                variantElements.innerHTML = '';
                variants = results.data.variants;

                if (editor.getSelected().find("option")){
                    editor.getSelected().find("option").forEach((option)=>{
                        const attributesOption = option.getAttributes()
                        options.push(parseInt(attributesOption.value))
                    })
                }

                variants.forEach((variant,index)=>{
                    const variantElement = document.createElement('div');
                    variantElement.innerHTML = `
                        <div>
                            <input type="checkbox" ${checkExists(variant.id)?'checked':''}> 
                            <span>${variant.nameVi}</span>
                        </div>
                    `
                    variantElement.querySelector("input").onchange = (e)=>onChangeInput(e,index);
                    variantElements.appendChild(variantElement)
                })

            })
        }else {

            closeModal();
        }


    }
    const onChangeInput = (e,index)=>{
        variants = variants.map((item,i)=>{
            if (index===i){
                item.checked = e.target.checked;
            }
            return item
        })
    }

    const confirm = ()=>{
        editor.getSelected().empty();
        variants.forEach((item)=>{

            if (item.checked){

                editor.getSelected().append(`<option value="${item.id}">${item.nameVi}</option>`)
            }

        })
        closeModal();
    }
    const closeModal = ()=>{
        const modal = editor.Modal;
        modal.close();
    }
    const render = () => {
        doc.innerHTML = `
          <div style="display: flex;flex-direction: column;gap: 10px">
            <div style="display: flex;flex-direction: column;gap: 10px;padding: 10px;max-height: 400px;overflow-y: auto" id="list"></div>
            <div style="display: flex;justify-content: flex-end;padding: 10px">
                <button style="padding: 10px;border-radius: 10px" id="confirm">Xác nhận</button>
            </div>
          </div>
        `
        renderVariants();
        doc.querySelector("#confirm").onclick = confirm
        return doc;
    }
    return {
        title: 'Chọn biến thể cần bán',
        content: render(),
        attributes: {class: 'my-class'},
    }
}
