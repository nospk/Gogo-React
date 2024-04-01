import ImageService from "../../services/ImageService";
import {DOMAIN} from "../../services/APIURL";


export const ModalSelectBackgroundBuynow = (editor,callback)=>{
    const doc = document.createElement('div');
    let type = "img"
    let  currentPage = 1;
    let totalPages = 1
    const confirm = (item)=>{
        editor.getSelected().setStyle({"background-image" : "url('"+DOMAIN+item.path+"')"  });
        if (callback){
            callback(item);
        }
        runCommands("callback_background_buynow",{...item})
    }
    const renderItem = (refresh)=>{
        const list = doc.querySelector("#list");
        const request = {page:currentPage-1,pageSize:50,type:type}
        ImageService.findAll(request).then((results)=>{
            if (refresh) currentPage = 1;
            list.innerHTML = ''
            const data = results.data.content;
            data.forEach((item, index) => {
                const image = document.createElement('img');
                image.src = DOMAIN+item.path;
                image.style.width = "50px"
                image.style.height = "50px"
                image.style.cursor = "pointer";
                image.onclick = ()=>confirm(item);
                list.appendChild(image)
            })

            totalPages = results.data.totalPages;
            renderPagination();
        })
    }
    const runCommands = (event,data)=>{
        editor.runCommand(event, data);
        closeModal();
    }
    const closeModal = ()=>{
        const modal = editor.Modal;
        modal.close();
    }
    const onChangePage = (page)=>{
        currentPage = page;
        renderItem()
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
    const uploadFile = ()=>{
        const input = document.createElement("input")
        input.type = 'file';
        input.setAttribute('multiple',true);
        input.onchange = (e)=>{
            let data = new FormData();
            const files = e.target.files;
            for (let i=0;i<files.length;i++){
                data.append('files['+i+']',files[i]);
            }
            data.append("type",type);
           ImageService.upload(data).then(()=>{
               renderItem(true);
           })
        }
        input.click();
    }
    const changeType = (e)=>{
        type = e.target.value
        renderItem(true);
    }
    const render = ()=>{
        doc.innerHTML = `
            <div style="display: flex;flex-direction: column;gap: 10px">
             
               <div id="list" style="display: flex;gap: 10px;max-height: 400px;overflow-y: auto;flex-wrap: wrap"></div>
                <div style="display: flex;justify-content: space-between">
                   <div id="pagination"></div> 
                   <div style="display: flex;gap: 10px">
                        <select id="type">
                            <option value="img">Hình ảnh</option>
                            <option value="icon">Icon</option>
                            <option value="trademark">Thương hiệu</option>
                             <option value="logo">Logo</option>
                        </select>
                        <button id="upload">Tải ảnh lên</button>
                    </div>
                </div>
          
            </div>
        `;
        doc.querySelector("#type").onchange = changeType
        doc.querySelector("#upload").onclick = uploadFile
        renderItem();
        return doc;
    }
    return {
        title: 'Thay đổi background',
        content: render(),
        attributes: { class: 'my-class' },
    }
}
