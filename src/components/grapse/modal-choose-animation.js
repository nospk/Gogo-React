export const ModalChooseAnimation = (editor)=>{
    const doc = document.createElement('div');
    const animateList = ["none","bounce","flash","pulse","rubberBand","shakeX","shakeY","headShake","swing","tada","wobble","heartBeat","backInDown","backInLeft","backInRight","backInUp","bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp","flip","flipInX","flipInY","flipOutX","flipOutY","lightSpeedInRight","lightSpeedInLeft","jackInTheBox","zoomIn","zoomInDown",""];
    const optionsList = ["none","infinite"];

    const checkExists = (value)=>{
        return animateList.some((item)=>item===value);
    }
    const getAnimate = ()=>{
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : [];
        const filter = sectionClass.filter((item)=>checkExists(item));
        return filter[0];
    }
    const checkOptionExists = (value)=>{
        return optionsList.some((item)=>item===value);
    }
    const getOption = ()=>{
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : [];
        const filter = sectionClass.filter((item)=>checkOptionExists(item));
        return filter[0];
    }
    const removeAll = ()=>{
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : [];
        const removed = sectionClass.filter((item)=>!checkExists(item) && item!=="animated");
       return removed;
    }
    const removeOption = ()=>{
        const selected = editor.getSelected()
        let sectionClass = selected.getAttributes().class ? selected.getAttributes().class.split(" ") : [];
        const removed = sectionClass.filter((item)=>!checkOptionExists(item));
        return removed;
    }
    const addAnimate = (value)=>{
        const selected = editor.getSelected()
        const animateClass  = removeAll();
        console.log(animateClass);
        if (value!=="none"){
            animateClass.push(value);
            animateClass.push("animated")
        }
        console.log(animateClass.join(" "));
        selected.setAttributes({'class':(animateClass.length>0? animateClass.join(" "):" ")});

    }
    const addOption = (value)=>{

        const selected = editor.getSelected()
        const optionClass = removeOption()
        if (value!=="none"){
            optionClass.push(value);
        }

        selected.setAttributes({'class':(optionClass.length>0? optionClass.join(" "):" ")});
    }
    const renderAnimate = ()=>{
        const animate =  doc.querySelector("#animate");
        animateList.forEach((item)=>{
            const animateOption = document.createElement("option")
            animateOption.value = item;
            animateOption.appendChild(document.createTextNode(item))
            animate.appendChild(animateOption)
        })
        animate.value = getAnimate();
    }
    const renderOptions = ()=>{
        const options =  doc.querySelector("#options");
        optionsList.forEach((item)=>{
            const option = document.createElement("option")
            option.value = item;
            option.appendChild(document.createTextNode(item))
            options.appendChild(option)
        })
        options.value = getOption();
    }
    const render = ()=>{
        doc.innerHTML = `
            <div style="display: flex;gap: 30px">
                
                <div style="display: flex;gap: 20px">
                    <span>Chọn hiệu ứng</span>
                    <select id="animate"></select>
                </div>
                <div style="display: flex;gap: 20px">
                    <span>Tùy chọn</span>
                    <select id="options"></select>
                </div>
            </div>
        `
        renderAnimate();
        renderOptions();
        doc.querySelector("#animate").onchange = (e)=>{
            addAnimate(e.target.value)
        }
        doc.querySelector("#options").onchange = (e)=>{
            addOption(e.target.value)
        }
        return doc
    }
    return {
        title: 'Cài đặt section column',
        content: render(),
    }
}
