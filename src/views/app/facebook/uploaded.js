import React, {useEffect, useState} from "react";
import FacebookAPI from "../../../services/FacebookAPI";
import ReactTable from "react-table";
import ReactTablePagination from "../../../components/ReactTablePagination";
import {CardBody} from "reactstrap";
const ProductUploaded = ()=>{
    const [currentPage,setCurrentPage] = useState(0);
    const [pageSize,setPageSize] = useState(50);
    const [totalPages,setTotalPages] = useState(1);
    const [data,setData] = useState([]);

    useEffect(()=>{
        FacebookAPI.findAllUploaded({page:currentPage,pageSize:pageSize}).then((results)=>{
            setData(results.data.content);
            setTotalPages(results.data.totalPages);
        })

    },[])
    const loadMore = (page)=>{
        setCurrentPage(page)
        FacebookAPI.findAllUploaded({page:page,pageSize:pageSize}).then((results)=>{
            setData(results.data.content);
            setTotalPages(results.data.totalPages);
        })
    }
    const configTable = ()=>{
        return[
            {
                Header: "STT",
                accessor: "id",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),
                width:50
            },
            {
                Header: "Tên sp",
                accessor: "productName",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),

            },
            {
                Header: "Tên chuyên mục",
                accessor: "catName",
                Cell: props => (<p className="list-item-heading">{props.value}</p>),

            },
            {
                Header: "Mã bài viết",
                accessor: "postId",
                Cell: props => (<a target={'_blank'} href={"https://www.facebook.com/"+props.value} className="list-item-heading" >{props.value}</a>),

            },
        ]
    }
    return(
        <div>
            <ReactTable
                manual
                data={data}
                columns={configTable()}
                pages={totalPages}
                page={currentPage}

                pageSize={pageSize}
                showPageJump={false}
                showPageSizeOptions={false}
                onPageChange={(page)=>{
                    loadMore(page)
                }}
                PaginationComponent={ReactTablePagination}
            />
        </div>
    )
}
export default ProductUploaded