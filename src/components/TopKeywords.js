import React, {useEffect, useState} from "react";
import Pagination from "./DatatablePagination";
import NumberFormat from "react-number-format";
import ReactTable from "react-table";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {KEYWORD_STATICTIS} from "../services/APIURL";
const TopKeywords = ()=>{
    const [data,setData] = useState();
    const [totalPages,setTotalPages] = useState(1);
    const [currentPage,setCurrentPage] = useState(0);
    const [filterMonth,setFilterMonth] = useState(null);
    const [filterYear,setFilterYear] = useState(null);
    useEffect(()=>{
        reloadData(currentPage);

    },[])
    const loadMore = (page)=>{
        setCurrentPage(page);
        reloadData(page,filterMonth,filterYear)
    }
    const getFilterMonth = ()=>{
        const filters = [];
        for (let i=1;i<=12;i++){
            filters.push(i)
        }
        return filters;
    }
    const getFilterYear = ()=>{
        let filters = []
        let now = new Date();
        for (let i = 2020;i<=now.getFullYear();i++){
            filters.push(i)
        }
        return filters;
    }
    const handlerFilterMonth = (month)=>{
        setFilterMonth(month)
        reloadData(0,month,filterYear)
    }
    const handlerFilterYear = (year)=>{
        setFilterYear(year)
        reloadData(0,filterMonth,year)
    }
    const reloadData = (page,month,year)=>{
        let paramsRequest = {page:page}
        if (month) paramsRequest.month = month;
        if (year) paramsRequest.year = year;
        request(paramsRequest).then((results)=>{
            console.log(results);
            if (results.success){
                setData(results.data.content);
                setTotalPages(results.data.totalPages);
            }
        })
    }
    const request = async (params)=>{
        const paramsRequest = new URLSearchParams(params);
        const header = {"Authorization": localStorage.getItem("user_id")}
        const responses = await fetch(KEYWORD_STATICTIS+"?"+paramsRequest.toString(),{method:"GET",headers:header});
        return await responses.json();
    }
    return(
        <div className="d-flex flex-column bg-white border-radius p-3">
            <div className="d-flex align-items-end justify-content-end">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1" >
                    <DropdownToggle caret color="outline-dark" size="xs">
                        Lọc theo tháng: {filterMonth?filterMonth:'Hiện tại'}

                    </DropdownToggle>
                    <DropdownMenu style={{maxHeight:500,overflowY:"auto"}}>
                        {getFilterMonth().map((item)=>{
                            return(
                                <DropdownItem key={item}
                                              onClick={()=>{handlerFilterMonth(item)}}>
                                    tháng {item}
                                </DropdownItem>
                            )
                        })}

                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1" >
                    <DropdownToggle caret color="outline-dark" size="xs">
                        Lọc theo năm: {filterYear?filterYear:'Hiện tại'}

                    </DropdownToggle>
                    <DropdownMenu style={{maxHeight:500,overflowY:"auto"}}>
                        {getFilterYear().map((item)=>{
                            return(
                                <DropdownItem key={item}
                                              onClick={()=>{handlerFilterYear(item)}}>
                                    Năm {item}
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>

            <div className="">

                <ReactTable
                    data={data}
                    page={currentPage}
                    manual={true}
                    pages={totalPages}
                    defaultPageSize={10}

                    showPageJump={false}
                    showPageSizeOptions={false}
                    PaginationComponent={Pagination}
                    onPageChange={(page)=>{
                        loadMore(page)
                    }}
                    columns={[
                        {
                            Header: "Từ khóa",
                            accessor: "keyword",
                            sortable:false,
                            Cell: props => <p className="text-muted">{props.value}</p>,

                        },
                        {
                            Header: "Số lượng tìm kiếm",
                            accessor: "count",
                            sortable:false,
                            Cell: props => <p className="text-muted">{props.value}</p>,

                        },

                    ]}
                />
            </div>
        </div>

    )
}
export default TopKeywords;