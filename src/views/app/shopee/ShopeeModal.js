import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import CategoryService from "../../../services/CategoryService";
import {DOMAIN} from "../../../services/APIURL";
import ReactPaginate from 'react-paginate';
import './styles.scss'

interface ShopeeModalType {
    isOpen: boolean,
    toggle: any,
    catId?:number,
    catName?:string,
    catSlug?:string
}

const ShopeeModal = (props: ShopeeModalType) => {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState('');
    const [processValue,setProcessValue] = useState(0);
    const [processTotal,setProcessTotal] = useState(0);
    const [page,setPage]= useState(0);
    const [pageSize,setPageSize] = useState(20);
    const [keyword,setKeyword] = useState('');
    const [totalPages,setTotalPages] = useState(1)
    const [time,setTime] = useState('');
    useEffect(() => {
        CategoryService.getShopeeCategory(page,pageSize).then((results)=>{
            setList(results.data.content);
            setTotalPages(results.data.totalPages);
            console.log(results);
        })
    }, []);
    const handleSelect = (id) => {
        console.log(id);
        setSelected(id)
    }
    const getSelected = (id) => {
        if (id === selected) {
            return {color:"#fc0303"};
        }
        return ""
    }
    const importCategory = ()=>{
        CategoryService.updateShopeeCategory().then(results=>{
            console.log(results);
        })
    }
    const createExcel = ()=>{
        CategoryService.generateShopeeTemplate(props.catId,selected).then(result=>{
            props.toggle('asd')
        })
    }
    const downloadExcel = ()=>{
        window.location.href = DOMAIN+"/resources/shopeetemplates/"+props.catSlug+".xlsx";
    }
    const search = (value)=>{
        console.log(value)
        setKeyword(value);
        if (time) clearTimeout(time);
        setTime(setTimeout(()=>{
            CategoryService.getShopeeCategory(page,pageSize,value).then((results)=>{
                setPage(0);
                setList(results.data.content);
                setTotalPages(results.data.totalPages);
            })
        },300));
    }
    const loadmore = (value)=>{
        setPage(value.selected)
        if (time) clearTimeout(time);
        setTime(setTimeout(()=>{
            CategoryService.getShopeeCategory(value.selected,pageSize,keyword).then((results)=>{
                setList(results.data.content);
                setTotalPages(results.data.totalPages);

            })
        },200))

    }

    return (
        <Modal className="shadow-none"
               centered={true}
               size="xl"
               toggle={props.toggle}
               isOpen={props.isOpen}>
            <ModalHeader >
               <div className="d-flex w-100 justify-content-between">
                   <span>Chọn ngành cho chuyên mục <span className="text-danger">{props.catName}</span></span>
               </div>
            </ModalHeader>
            <ModalBody>
                <div className="d-flex justify-content-end">
                    {/*<div className="d-flex justify-content-end mt-3" style={{gap:10}}>*/}
                    {/*    <Button onClick={()=>importCategory()}>Tạo category</Button>*/}
                    {/*</div>*/}
                    <div className="d-flex justify-content-end mt-3" style={{gap:10}}>
                        <Button onClick={()=>downloadExcel()}>Tải excel</Button>
                        <Button onClick={()=>createExcel()}>Tạo excel</Button>
                    </div>
                </div>

                <div className="mt-3">
                    <input className="w-100 p-2 rounded border-0 border-bottom"
                           value={keyword}
                           onChange={event => search(event.target.value)}
                           placeholder={'Tìm kiếm'}/>
                </div>
                <div>
                    {list.map((item,index) => {
                        return (
                            <div className="mt-2 mb-2"
                                 style={{...getSelected(item.id),cursor:"pointer"}}
                                 key={index}
                                 onClick={()=>handleSelect(item.id)}>
                                <span>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="font-weight-bold border mr-2 db"></div>
                <div>
                    <ReactPaginate
                        containerClassName="page-container"
                        nextLabel="Sau"
                        onPageChange={loadmore}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        pageClassName="page-item"
                        activeClassName="page-active"
                        previousClassName="page-item"
                        initialPage={page}
                        nextClassName="page-item"
                        pageLinkClassName={"display-block"}
                        pageCount={totalPages}
                        previousLabel="Trước"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button outline color="info" onClick={props.toggle}>
                    Thoát
                </Button>
                <Button outline color="success">
                    Tạo
                </Button>
            </ModalFooter>
        </Modal>
    )
}
export default ShopeeModal;
