export const ModalGrapesjsRow = (editor) => {
    const doc = document.createElement('div');
    const options = [
        {label: "1 cột", value: "grid-1"},
        {label: "2 cột", value: "grid-2"},
        {label: "3 cột", value: "grid-3"},
        {label: "4 cột", value: "grid-4"},
        {label: "5 cột", value: "grid-5"},
        {label: "6 cột", value: "grid-6"},
        {label: "7 cột", value: "grid-7"},
        {label: "8 cột", value: "grid-8"},
        {label: "9 cột", value: "grid-9"},
        {label: "10 cột", value: "grid-10"},
    ]
    const hasScreen = (screen) => {
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : "";
        for (let i = 0; i < sectionClass.length; i++) {
            if (sectionClass[i].includes(screen)) {
                return true;
            }
        }

        return false;
    }
    const addClass = (value, screen) => {
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : "";
        if (hasScreen(screen)) {
            sectionClass = sectionClass.filter((item) => !item.includes(screen + "-grid"));
            sectionClass.push(screen + "-" + value);
        } else {
            if (screen) {
                sectionClass = sectionClass.filter((item) => !item.includes(screen + "-grid"));
                sectionClass.push(screen + "-" + value);
            } else {

                let gridClass = sectionClass.filter((item) => item.includes("xs-grid") ||
                    item.includes("sm-grid") ||
                    item.includes("md-grid"));

                sectionClass = sectionClass.filter((item) => !item.includes("grid"));

                sectionClass = [...sectionClass, ...gridClass, value]

            }
        }

        selected.setAttributes({'class': sectionClass.join(" ")});

    }
    const getClassByScreen = (screen) => {
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : "";

        if (screen) {
            const filter = sectionClass.filter((item) => item.includes(screen + "-grid"));
            if (filter[0]){
                return filter[0].substring(filter[0].indexOf("-")+1,filter[0].length);
            }

        } else {
            const gridClass = sectionClass.filter((item) => item.includes("grid"))
            if (gridClass) {
                const filterDefaulScreen = gridClass.filter((item) =>   !item.includes("xs-grid") &&
                                                                        !item.includes("sm-grid") &&
                                                                        !item.includes("md-grid"));
                return filterDefaulScreen[0]
            }
            return ""

        }
    }
    const addGap = (value)=>{
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : "";
        sectionClass = sectionClass.filter((item)=>!item.includes("gap"))
        sectionClass.push(value)
        selected.setAttributes({'class': sectionClass.join(" ")});

    }
    const getGapValue = ()=>{
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : "";
        const filter = sectionClass.filter((item)=>item.includes("gap"))
        return filter[0]
    }
    const renderSelection = () => {
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : "";

        const selectMobile = doc.querySelector("#mobile");
        const selectTablet = doc.querySelector("#tablet");
        const selectPC = doc.querySelector("#pc");
        const selectGap = doc.querySelector("#gap");
        options.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.value
            option.appendChild(document.createTextNode(item.label));
            selectMobile.appendChild(option)
            const tabletOption = document.createElement('option');
            tabletOption.value = item.value
            tabletOption.appendChild(document.createTextNode(item.label));
            selectTablet.appendChild(tabletOption)
            const pcOption = document.createElement('option');
            pcOption.value = item.value
            pcOption.appendChild(document.createTextNode(item.label));
            selectPC.appendChild(pcOption)
        })
        for (let i=0;i<=100;i++){
            const gap = document.createElement('option');
            gap.value = "gap-"+i;
            gap.appendChild(document.createTextNode(i));
            selectGap.appendChild(gap)
        }
        const valueMobile  = getClassByScreen();
        const valueTablet = getClassByScreen("sm");
        const valuePC = getClassByScreen("md");

        selectMobile.value = valueMobile;
        selectTablet.value = valueTablet;
        selectPC.value = valuePC;
        selectGap.value = getGapValue();
        selectGap.onchange = (e) => {
            addGap(e.target.value)
        }
        selectMobile.onchange = (e) => {
            addClass(e.target.value)
        }
        selectTablet.onchange = (e) => {
            addClass(e.target.value, "sm")
        }
        selectPC.onchange = (e) => {
            addClass(e.target.value, "md")
        }
    }
    const render = () => {
        doc.innerHTML = `
            <div id="app" style="display: flex;gap: 20px">
                <div style="display: flex;gap: 10px">
                  <span>Điện thoại</span>
                  <select id="mobile"></select>
                </div>
                <div style="display: flex;gap: 10px">
                   <span>Máy tính bản</span>
                  <select id="tablet"></select>
                </div>
                <div style="display: flex;gap: 10px">
                 <span>Máy tính </span>
                 <select id="pc"></select>
                </div>
                 <div style="display: flex;gap: 10px">
                 <span>Khoản cách các dòng </span>
                 <select id="gap"></select>
                </div>
            </div>
        `
        renderSelection();
        return doc
    }
    return {
        title: 'Cài đặt section',
        content: render(),
    }
}
