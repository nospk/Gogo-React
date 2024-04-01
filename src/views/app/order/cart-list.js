import React, {useEffect, useState} from "react";
import OrderService from "../../../services/OrderService";
import CartListItem from "./component/CartListItem";
import Pagination from "react-bootstrap-4-pagination";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";


const CartList = ({history})=>{
    const [list,setList] = useState([]);
    const [page,setPage] = useState(1);
    const [totalElements,setTotalElements] = useState(0);
    const [pageSize,setPageSize] = useState(10);
    const [totalPages,setTotalPages] = useState(1);
    const [sort,setSort] = useState({});
    const [keyword,setKeyword] = useState('');
    const [time,setTime] = useState('');
    useEffect(()=>{
        OrderService.cartList(getDataRequest()).then((results)=>{
            setTotalElements(results.data.totalElements);
            setList(results.data.content);
            setTotalPages(results.data.totalPages);
        })
    },[]);
    const getDataRequest = (pagenew,sort,keywordValue)=>{
        const pageData = pagenew?pagenew:page
        setPage(pageData);
        const requestData = {
            page:pageData-1,
            pageSize:pageSize,
            sort:sort?sort:"date"
        }
        if (keywordValue){
            requestData.keyword = keywordValue;
        }else {
            if (keyword){
                requestData.keyword = keyword;
            }
        }
        return requestData;
    }
    const handlerSort = (data)=>{
        setSort(data);
        OrderService.cartList(getDataRequest(0,data.value)).then((results)=>{
            setList(results.data.content);
        })
    }
    const getSort = ()=>{
        return[
            {
                label:"Lọc theo ngày tạo mới nhất",
                value:"date"
            },
            {
                label:"Lọc theo chi phí",
                value:"cost"
            }
        ]
    }
    const pagination = ()=>{
        return {
            totalPages: totalPages?totalPages:1,
            currentPage: page,
            showMax: pageSize,
            size: "sm",
            prevNext: true,
            onClick: (pagePagination) => {
                const dataRequest = getDataRequest((pagePagination));
                OrderService.cartList(dataRequest).then((results)=>{
                    setList(results.data.content);
                })
            }
        };
    }
    const handleSearch = (e)=>{
        const value  = e.target.value;
        setKeyword(value);
        if (time) clearTimeout(time);
        setTime(setTimeout(()=>{

            OrderService.cartList( getDataRequest(0,'',value)).then((results)=>{
                setTotalElements(results.data.totalElements);
                setList(results.data.content);
                setTotalPages(results.data.totalPages);
            })

        },200))
    }
    return(
        <div>
            <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Số lượng giỏ hàng:<span className="text-danger">{totalElements}</span></span>
               <div>
                   <input className="rounded-sm"
                          value={keyword}
                          onChange={handleSearch}
                          placeholder={'Tìm kiếm'}/>
                   <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                       <DropdownToggle caret color="outline-dark" size="xs">
                           {sort && sort.label?sort.label:"Lọc theo ngày tạo mới nhất"}
                       </DropdownToggle>
                       <DropdownMenu>
                           {getSort().map((option,index)=>{
                               return(
                                   <DropdownItem
                                       key={index}
                                       onClick={()=>handlerSort(option)}>
                                       {option.label}
                                   </DropdownItem>
                               )
                           })}
                       </DropdownMenu>
                   </UncontrolledDropdown>
               </div>
            </div>
            <div>
                {list.map((item,index)=>{
                    return(
                        <CartListItem key={index} item={item} history={history}/>
                    )
                })}
            </div>

            <Pagination {...pagination()} />
        </div>
    )
}
export default CartList;
