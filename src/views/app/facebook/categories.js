import React, {useEffect, useState} from "react";
import CategoryService from "../../../services/CategoryService";
import FacebookAPI from "../../../services/FacebookAPI";
import ProgressService from "../../../services/ProgressService";
import Pagination from "react-bootstrap-4-pagination";
import {DOMAIN} from "../../../services/APIURL";
import {Button, Progress} from "reactstrap";

const FacebookCategories = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [progress, setProgress] = useState(0);
    const [currentProgress,setCurrentProgress] = useState(0);
    const [sizeProgress,setSizeProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [count,setCount] = useState([]);
    const [search,setSearch] = useState('');
    const [timeOut,setTimeOut] = useState();
    useEffect(() => {
        CategoryService.findAllByCurrentHost({params: {page: 0, pageSize: pageSize}}).then((results) => {
            countUploaded(results.data.content).then((data)=>{
                setCategories(data);
                setTotalPages(results.data.totalPages);
            })

        })
        getProgress(true);
    }, []);
    const action = (e, item) => {
        switch (e.target.value) {
            case "createPost":
                FacebookAPI.createPost(item.id).then((results) => {
                    getProgress()
                })
                break;
            case "deletePost":
                FacebookAPI.deletePost(item.id).then((results) => {
                   window.location.reload();
                })
                break;
        }
        e.target.selectedIndex = 0;
    }
    const getProgress = (initial) => {
        setShowProgress(true);
        let interval = setInterval(() => {
            ProgressService.getProgress("FACEBOOK_PROGESS").then((results) => {
                if (!results.success) {
                    if (initial){
                        setProgress(0)
                        setShowProgress(false);
                    }else {
                        setProgress(1);
                    }
                    clearInterval(interval);
                }else {
                    setCurrentProgress(results.data.current);
                    setSizeProgress(results.data.size);
                    setProgress(results.data.progress)
                }

            }).catch(()=>{
                console.log("reeesdf")
            })
        }, 1000)

    }
    const countUploaded = async (data)=>{
        for (let i = 0;i<data.length;i++){
            const results = await FacebookAPI.countUploaded(data[i].id)
            data[i].count = results.count;
        }
       return data;
    }
    const loadMore = (page,text) => {
        setCurrentPage(page);
        let request =  {
            page: page - 1,
            pageSize: pageSize
        }
        if (text)  request.keyword = text;
        if (search) request.keyword = search;
        CategoryService.findAllByCurrentHost({params:request}).then((results) => {
            countUploaded(results.data.content).then((data)=>{
                setCategories(data);
                setTotalPages(results.data.totalPages);
            })
        })
    }
    const pagination = () => {
        return {
            totalPages: totalPages > 1 ? totalPages - 1 : 1,
            currentPage: currentPage,
            showMax: 10,
            size: "sm",
            threeDots: true,
            prevNext: true,
            onClick: (page) => {
                loadMore(page)
            }
        };
    }
    const cancel = ()=>{
        FacebookAPI.cancel().then(()=>{

        })
    }
    const onChangeSearch = (text)=>{
        setSearch(text);
        if (timeOut){
            clearTimeout(timeOut);
        }

        if (text){
           setTimeOut(setTimeout(()=>{
               loadMore(1,text);
           },300))
        }else {
            setTimeOut(setTimeout(()=>{
                CategoryService.findAllByCurrentHost({params: {page: 0, pageSize: pageSize}}).then((results) => {
                    countUploaded(results.data.content).then((data)=>{
                        setCategories(data);
                        setTotalPages(results.data.totalPages);
                    })

                })
            },300))

        }

    }
    return (
        <div>

            <div className="w-100 align-items-center" style={{display: showProgress ? 'flex' : 'none',gap:10}}>
                <div className="w-100">
                    <Progress style={{height: 20}} striped
                              barStyle={{color:"#000",fontSize:20}}
                              value={progress * 100}>Đang xử lý {progress * 100}% ({currentProgress}/{sizeProgress})</Progress>
                </div>

                <Button onClick={()=>cancel()}>Tắt</Button>
            </div>
            <div className="row">

                <div className="col-6">
                    <input className="w-100 p-2 rounded border-0"
                           value={search?search:''}
                           onChange={(e)=>onChangeSearch(e.target.value)}
                           placeholder={"Tìm kiếm"}/>
                    <table className="w-100">
                        <thead>
                        <tr>
                            <th>Tên chuyên mục</th>
                            <th>Thao tác</th>
                            <th>Đã tải lên</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((item) => {
                            return (
                                <tr className="p-3" key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <select style={{padding: 10, borderRadius: 20, outline: "none"}} onChange={(e) => {
                                            action(e, item)
                                        }}>
                                            <option value="default">Thao tác</option>
                                            <option value="createUserPost">Tạo sản phẩm trên trang cá nhân</option>
                                            <option value="createPost">Tạo sản phẩm trên Fanpage</option>
                                            <option value="deletePost">Xóa dữ liệu</option>
                                        </select>
                                    </td>
                                    <td>{item.count}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <Pagination {...pagination()} />
                </div>

            </div>
        </div>

    )
}
export default FacebookCategories
