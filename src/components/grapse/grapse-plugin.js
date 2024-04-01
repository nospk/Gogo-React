import React from "react";
import {
    TEMPLATE_ABOUT,
    TEMPLATE_ARTICLE,
    TEMPLATE_BUYNOW,
    TEMPLATE_CONTACT,
    TEMPLATE_SUMMARY_PRODUCT,
    TEMPLATE_TERMS
} from "./template";

import {ModalSelectBackgroundBuynow} from "./modal-select-background-buynow";
import {ModalProductBuynow} from "./modal-select-product-buynow";
import {ModalVariantBuynow} from "./modal-select-variants-buynow";
import AddressService from "../../services/AddressService";
import {ModalSelectImage} from "./modal-select-image";
import {ModalGrapesjsRow} from "./modal-grapesjs-row";
import {ModalGrapesjsColumn} from "./modal-grapesjs-column";
import {ModalChooseAnimation} from "./modal-choose-animation";
export const image = (editor)=>{
    editor.BlockManager.add('image-plugin', {
        label: 'image',
        content: `<img src=""></img>`,
        attributes: {class: 'fa fa-picture-o'},
    });
}

export const box = (editor)=>{
    let element  = `<div class="box"><span>Nhập dữ liệu vào đây </span></div>`
    editor.BlockManager.add('box-plugin', {
        label: 'box',
        className: 'grapsejs-box',
        content: element,
        attributes: {class: 'fa  fa-th-large'},
    });

}
export const scrollTo = (editor)=>{
    let element  = `<div class="scrollto"></div>`
    editor.BlockManager.add('scrollto', {
        label: 'scroll to',
        content: element,
        attributes: {class: 'fa  fa-th-large'},
    });

}
export const section = (editor)=>{
    editor.BlockManager.add('section', {
        label: 'section',
        content: `<div class="section"> 
                        <span>Cột</span>
                        <span>Cột</span>
                  </div>`,
        attributes: {class: 'fa  fa-bars'},
    });
}
export const backlink = (editor)=>{
    let element  = `<a href="#"><p>asdasd</p></a>`
    editor.BlockManager.add('backlink-plugin', {
        label: 'backlink',
        className: 'grapsejs-backlink',
        content: element,
    });

}
export const col = (editor)=>{
    for (let i =1;i<=6;i++){
        let col = '';
        for (let j = 1;j<=i;j++){
            col += `<div class="col col-12 col-sm-12 col-md-${12/i} col-xl-${12/i}" title="123123">
                            <img  src="" alt="">
                      </div>`
        }
        let element  = `<div class="row">${col}</div>`
        editor.BlockManager.add('col-'+i+'-plugin', {
            label: 'col-'+i,
            className: 'fa fa-text',
            content: element,
        });
    }

}
export const textP = (editor)=>{
    editor.BlockManager.add('text-plugin', {
        label: 'text p',
        content: `<p class="mb-0">Thêm nội dung bạn vào đây</p>`,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const textSpan = (editor)=>{
    editor.BlockManager.add('text-span-plugin', {
        label: 'text span',
        content: `<span>Nhập vào dữ liệu</span>`,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const card =  (editor)=>{
    editor.BlockManager.add('card-plugin', {
        label: 'card',
        content: `<div class="card">
                      <img src="..." class="card-img-top">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>`,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const boxText =  (editor)=>{
    editor.BlockManager.add('boxText-plugin', {
        label: 'boxText',
        content: `<div class="p-4 p-md-5 mb-4 text-white rounded">
                    <div class="col-md-6 px-0">
                      <h1 class="display-4 fst-italic">Title of a longer featured blog post</h1>
                      <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                      <p class="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p>
                    </div>
                  </div>`,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const featuretteLeft =  (editor)=>{
    editor.BlockManager.add('featuretteLeft-plugin', {
        label: 'featuretteLeft',
        content: `<div class="row featurette">
                  <div class="col-md-7">
                    <h2 class="featurette-heading">Tiêu đề <span class="text-muted"> Tiêu đề </span></h2>
                    <p class="lead"> Nội dung bài viết</p>
                  </div>
                  <div class="col-md-5">
                    <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"/>
            
                  </div>
                </div>`,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const featuretteRight =  (editor)=>{
    editor.BlockManager.add('featuretteRight-plugin', {
        label: 'featuretteRight',
        content: `<div class="row featurette">
                  <div class="col-md-7 order-md-2">
                    <h2 class="featurette-heading">Tiêu đề <span class="text-muted">Tiêu đề </span></h2>
                    <p class="lead">Nội dung bài viết</p>
                  </div>
                  <div class="col-md-5 order-md-1">
                    <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"/>
            
                  </div>
                </div>`,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const tempateContact = (editor)=>{
    editor.BlockManager.add('tempateContact-plugin', {
        label: 'tempateContact',
        content: TEMPLATE_CONTACT,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const tempateAbout = (editor)=>{
    editor.BlockManager.add('tempateAbout-plugin', {
        label: 'tempateAbout',
        content: TEMPLATE_ABOUT,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const tempateTerms = (editor)=>{
    editor.BlockManager.add('tempateTerms-plugin', {
        label: 'tempateTerms',
        content: TEMPLATE_TERMS,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const tempateArticle = (editor)=>{
    editor.BlockManager.add('tempateArticle-plugin', {
        label: 'tempateArticle',
        content: TEMPLATE_ARTICLE,
        attributes: {class: 'fa fa-text-width'},
    });
}
export const htag = (editor)=>{
    for (let i=1;i<4;i++){
        editor.BlockManager.add('htag-'+i, {
            label: 'H'+i,
            content: `<h${i}>Nội dung ở đây</h${i}>`,
            attributes: {class: 'fa fa-text-width'},
        });
    }

}
export const formBuyNow = (editor)=>{
    editor.BlockManager.add('form-buy-now', {
        label: 'buynow',
        content: TEMPLATE_BUYNOW,
        attributes: {class: 'fa fa-shopping-cart'},
    });
}
export const boxSummaryProduct = (editor)=>{
    editor.BlockManager.add('box-summaryproduct', {
        label: 'Thông tin SP',
        content: TEMPLATE_SUMMARY_PRODUCT,
        attributes: {class: 'fa fa-product-hunt'},
    });
}
const customStyles = (editor)=>{
    const styleManager = editor.StyleManager;
   styleManager.addSector('mySector',{
        name: 'My sector',
        open: true,
       traitsManager: {},
       sectors: [{
           open: true,
       }],
    }, { at: 0 });

    styleManager.addType('my-custom-prop', {
        create({ props, change }) {
            const el = document.createElement('div');
            el.innerHTML = `<input type="range" style="width: 100%" class="my-input" min="0" max="200"/><span class="input-label">1</span>`;
            const inputEl = el.querySelector('.my-input');
            const inputLabel = el.querySelector('.input-label');
            inputEl.addEventListener('change', event => {
                change({ event })
                inputLabel.innerHTML = event.target.value
            }); // change will trigger the emit
            inputEl.addEventListener('input', event => change({ event, complete: false }));
            return el;
        },
        emit({ props, updateStyle }, { event, complete }) {
            const { value } = event.target;
            const valueRes = value + 'px';
            updateStyle(valueRes, { complete });
        },
        update({ value, el }) {
            el.querySelector('.my-input').value = parseInt(value, 10);
            el.querySelector('.input-label').innerHTML = parseInt(value, 10);
        },
        destroy() {

        }
    })

    const propertyFontSize = styleManager.addProperty('mySector',{
        name: 'Kích thước chữ',
        property: 'font-size',
        type: 'my-custom-prop',

    }, { at: 0 });
    styleManager.addProperty('mySector',{
        name: 'Display',
        property: 'display',
        type: 'radio',
        defaults: 'flex',
        list: [
            {value: 'flex', name: 'flex'},
            {value: 'block', name: 'block'}
        ],
    }, { at: 0 });
    styleManager.addProperty('mySector',{
        name: 'Căn lề',
        property: 'justify-content',
        type: 'radio',
        defaults: 'flex',
        list: [
            {value: 'left', name: 'Căn Trái'},
            {value: 'center', name: 'Căn giữa'},
            {value: 'flex-end', name: 'Căn phải'},

        ],
    }, { at: 0 });

}
const addCommands = (editor)=>{
    editor.Commands.add('openedit', {
        run() {
          const typeSelected = editor.getSelected().attributes.type;
          const modal = editor.Modal;
          switch (typeSelected?typeSelected:""){
              case "buynow-background":  modal.open(ModalSelectBackgroundBuynow(editor)); break;
              case "buynow-form":   modal.open(ModalProductBuynow(editor)); break;
              case "buynow-variants":
                  const components =  editor.getSelected().closestType("buynow-form")
                  const attributes = components.getAttributes();
                  const productId = attributes["data-productid"]

                  if (productId){
                      modal.open(ModalVariantBuynow(editor));
                  }else {
                      alert("Vui lòng chọn sản phẩm trước")
                  }
                  break;
              case "section": modal.open(ModalGrapesjsRow(editor)); break;
              case "section-column": modal.open(ModalGrapesjsColumn(editor)); break;
          }

        },
    });
    editor.Commands.add('animation', {
        run() {
            const modal = editor.Modal;
            modal.open(ModalChooseAnimation(editor));
        },
    });
}
const customModal = (editor)=>{
    editor.editor.on('component:selected', (some, argument, test) => {
        if (some.attributes.type==='image'){
            const modal = editor.Modal;
            modal.open(ModalSelectImage(editor));
        }
        const selectedComponent = editor.getSelected();
        const defaultToolbar = selectedComponent.get('toolbar');
        let toolbar = [...defaultToolbar]
        const listOpenEdit = ["buynow-background","buynow-form","buynow-variants","section","section-column"]
        if (listOpenEdit.includes(some.attributes.type?some.attributes.type:"")){
            const commandToAdd = 'openedit';
            const commandIcon = 'fa fa-list';
            const commandExists = toolbar.some(item => item.command === commandToAdd);
            if (!commandExists) {
               toolbar.push({
                   attributes: {
                       class: commandIcon
                   },
                   command: commandToAdd
               })
            }
        }
        const commandAnimation = 'animation';
        const commandAnimationIcon = 'fa fa-bolt';
        const commandAnimationExists = toolbar.some(item => item.command === commandAnimation);

        if (!commandAnimationExists) {
            toolbar.push({
                attributes: {
                    class: commandAnimationIcon
                },
                command: commandAnimation
            });

        }
        console.log(toolbar);
        selectedComponent.set({
            toolbar: toolbar
        });
    })
}
const addType = (editor)=>{
    editor.DomComponents.addType('provinces', {
        isComponent: el => {

            if (el.id && el.id ==="provinces") {
                return true
            };
            return false;
        },
    });
    editor.DomComponents.addType('section', {
        isComponent: el => {
            if (el.classList && el.classList.contains("section")) {
                return true
            };
            return false;
        },
    });
    editor.DomComponents.addType('scrollto', {
        isComponent: el => {
            if (el.classList && el.classList.contains("scrollto")) {
                return true
            };
            return false;
        },
    });
    editor.DomComponents.addType('section-column', {
        isComponent: el => {
            if (el.parentElement &&  el.parentElement.classList && el.parentElement.classList.contains("section")){
                return true
            }
            return false;
        },
    });
    editor.DomComponents.addType('buynow-background', {
        isComponent: el => {
            if (el.classList && el.classList.contains("buynow-background")) {
                return true
            };
            return false;
        },
    });
    editor.DomComponents.addType('buynow-form', {
        isComponent: el => {
            if (el.classList && el.classList.contains("buynow-form")) {
                return true
            };
            return false;
        },
        model: {
            defaults: {
                traits: ['src'],
                attributes: { type: 'text', required: true },
            },
        },
    });
    editor.DomComponents.addType('buynow-variants', {
        isComponent: el => {
            if (el.classList && el.classList.contains("variants")) {
                return true
            };
            return false;
        },
    });
    editor.DomComponents.addType('iframe', {
        isComponent: el => {
            if (el.tagName == 'IFRAME') {
                return true
            };
            return false;
        },
        model: {
            defaults: {
                traits: ['src'],
                attributes: { type: 'text', required: true },
            },
        },
    });
}
const customEvent = (editor)=>{
    editor.on('component:add', (component) => {
        if (component.getAttributes() && component.getAttributes().id && component.getAttributes().id==="provinces"){
            AddressService.getProvinces().then((results)=>{
                const data = results.data;
                component.empty();
                data.forEach((province)=>{
                    component.append(`<option value="${province.id}">${province.name}</option>`)
                })
            })
        }

    });
}
export const addAll = (editor)=>{
    section(editor);
    formBuyNow(editor);
    boxSummaryProduct(editor);
    box(editor);
    scrollTo(editor)
    textSpan(editor);
    htag(editor);
    image(editor);
    card(editor);
    featuretteLeft(editor);
    featuretteRight(editor);
    tempateContact(editor);
    tempateAbout(editor);
    tempateTerms(editor);
    tempateArticle(editor);
    customModal(editor);
    addType(editor);
    customEvent(editor);
    addCommands(editor);


}
