import ProductService from "../../services/ProductService";
import {DOMAIN} from "../../services/APIURL";
export const MODAL_PRODUCT_BUYNOW_CALLBACK = "MODAL_PRODUCT_BUYNOW_CALLBACK"
export const ModalProductBuynow = (editor,callback) => {
    const doc = document.createElement('div');
    let time = ''
    let currentPage = 1;
    let totalPages = 1;
    let keyword = "";
    const renderlist = (search) => {
        const list = doc.querySelector("#list");
        ProductService.findAll(keyword?{keyword:keyword,page:currentPage-1}:{page:currentPage-1}).then((results) => {
            list.innerHTML = ''
            const data = results.data.content;
            if (search) currentPage = 1;
            totalPages = results.data.totalPages;
            renderPagination()
            data.forEach((item, index) => {
                const product = document.createElement("div");
                const name = document.createElement("span");
                product.style.cursor = "pointer";
                product.style.borderBottom = "solid #fff 1px";
                product.appendChild(name.appendChild(document.createTextNode(item.nameVi)));
                product.onclick = ()=>selectProduct(item)
                list.appendChild(product)
            })

        })
        ;

    }
    const handleSearch = (e) => {
        if (time) {clearTimeout(time);}
        time = setTimeout(() => {
            keyword = e.target.value;
            renderlist(keyword);
        }, 200)

    }
    const selectProduct = (product)=>{
        editor.getSelected().setAttributes({'data-productid': product.id });
        if (callback){
            callback(product);
        }
        closeModal();
    }
    const closeModal = ()=>{
        const modal = editor.Modal;
        modal.close();
    }
    const onChangePage = (page)=>{
        currentPage = page;
        renderlist()
        renderPagination()
    }
    const renderPagination = ()=>{
        const window = 8;
        const paginations = doc.querySelector("#pagination");
        paginations.innerHTML = ``
        let maxLeft = (currentPage - Math.floor(window / 2))
        let maxRight = (currentPage + Math.floor(window / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = window
        }

        if (maxRight > totalPages) {
            maxLeft = totalPages - (window - 1)

            if (maxLeft < 1){
                maxLeft = 1
            }
            maxRight = totalPages
        }

        for (let page = maxLeft; page <= maxRight; page++) {
            const pageElement = document.createElement("button")
            pageElement.classList.add("active");
            if (page===currentPage){
                pageElement.style.color = "#f10909"
            }
            pageElement.appendChild(document.createTextNode(""+page))
            paginations.appendChild(pageElement);
            pageElement.onclick = (e)=>onChangePage(page)
        }
    }
    const render = () => {
        doc.innerHTML = `
          <div style="display: flex;flex-direction: column;gap: 10px">
            <input id="input" style="width: 100%;padding: 10px;border-radius: 10px"  placeholder="Nhập tên sản phẩm">
            <div style="display: flex;flex-direction: column;gap: 10px;padding: 10px;max-height: 400px;overflow-y: auto" id="list"></div>
            <div id="pagination" style="display: flex;gap: 5px"></div>
          
          </div>
        `
        renderlist()
        doc.querySelector("#input").onkeyup = handleSearch;
        return doc;
    }
    return {
        title: 'Chọn sản phẩm',
        content: render(),
        attributes: {class: 'my-class'},
    }
}
