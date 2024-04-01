export const ModalGrapesjsColumn = (editor) => {
    const doc = document.createElement('div');
    const options = [
        {label: "1 cột", value: "grid-column-1-1"},
        {label: "2 cột", value: "grid-column-1-2"},
        {label: "3 cột", value: "grid-column-1-3"},
        {label: "4 cột", value: "grid-column-1-4"},
        {label: "5 cột", value: "grid-column-1-5"},
        {label: "6 cột", value: "grid-column-1-6"},
        {label: "7 cột", value: "grid-column-1-7"},
        {label: "8 cột", value: "grid-column-1-8"},
        {label: "9 cột", value: "grid-column-1-9"},
        {label: "10 cột", value: "grid-column-1-10"},
    ]
    const addClass = (index,size)=>{

        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : "";
        sectionClass = sectionClass.filter((item)=>!item.includes("grid-column"));
        sectionClass.push("grid-column-"+index+"-"+size);
        selected.setAttributes({'class': sectionClass.join(" ")});

    }
    const getValue = ()=>{
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : "";
        if (sectionClass){
            const filter = sectionClass.filter((item)=>item.includes("grid-column"));
            if (sectionClass){
                if (filter[0]){
                    const values = filter[0].substring(filter[0].indexOf("grid-column-")+("grid-column-").length,filter[0].length).split("-");
                    return {
                        index: values[0],
                        size:values[1]
                    }
                }
            }
        }

        return {
            index:1,
            size:1
        }
    }
    const renderSelection = () => {
        const indexSelect = doc.querySelector("#index");
        const sizeSelect = doc.querySelector("#size");
        const values = getValue();
        for (let i=1;i<=10;i++){
            const indexOption = document.createElement('option');
            indexOption.value = i
            indexOption.appendChild(document.createTextNode(i));
            indexSelect.appendChild(indexOption)
            const sizeOption = document.createElement('option');
            sizeOption.value = i
            sizeOption.appendChild(document.createTextNode(i));
            sizeSelect.appendChild(sizeOption)
        }
        indexSelect.value = values.index;
        sizeSelect.value = values.size;
        sizeSelect.onchange = (e)=>{
            addClass(indexSelect.value,e.target.value)
        }
        indexSelect.onchange = (e)=>{
            addClass(e.target.value,sizeSelect.value)
        }
    }

    const render = () => {
        doc.innerHTML = `
           <div style="display:flex;gap: 20px">
                <div style="display: flex;gap: 10px">
                    <span>Gộp từ cột </span>
                    <select id="index"></select>
                </div>
                 <div style="display: flex;gap: 10px">
                    <span>Đến cột</span>
                    <select id="size"></select>
                </div>
           </div>
        `
        renderSelection();
        return doc;
    }
    return {
        title: 'Cài đặt section column',
        content: render(),
    }
}
