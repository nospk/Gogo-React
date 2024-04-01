import {
    CATEGORY_CREATE, CATEGORY_CREATE_ERROR,
    CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE, CATEGORY_DELETE_ERROR, CATEGORY_DELETE_SUCCESS,
    CATEGORY_FINDALL,
    CATEGORY_FINDALL_ERROR,
    CATEGORY_FINDALL_SUCCESS, CATEGORY_REMOVE_ERROR, CATEGORY_REMOVE_SUCCESS, CATEGORY_SORTTREE, REMOVE_ERROR
} from "../actions";

const INIT_STATE = {
    list: [],
    sortData:[],
    totalPages:0,
    selectData:[],
    loading: false,
    error: '',
    success:'',

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CATEGORY_REMOVE_ERROR: return { ...state, error: ''};
        case CATEGORY_REMOVE_SUCCESS: return { ...state, success: ''};
        case CATEGORY_FINDALL: return { ...state, loading: true, error: ''};
        case CATEGORY_SORTTREE:
            return { ...state,sortData:action.payload.params};
        case CATEGORY_FINDALL_SUCCESS:
            let selectData = [{label:"Không chọn", value:0, key:0}];
            let data = [];
            let list = action.payload.content;
            action.payload.content.forEach((item)=>{
                selectData.push({label:item.name, value:item.id, key:item.id});
                if (item.parent===0){
                    let itemsort = {title:item.name, data:item, children:[]}
                    let children = list.filter((itemchild)=>itemchild.parent===item.id).map((mapChild)=>{
                        return{
                            title:mapChild.name,
                            data:mapChild,
                            children:list.filter((child)=>child.parent===mapChild.id).map((child1)=>{return{title:child1.name, data:child1, children:[]}})
                        }
                    });

                    itemsort.children = children;
                    data.push(itemsort);
                }
            });
            return { ...state, loading: false, list: action.payload.content,selectData:selectData,totalPages:action.payload.totalPages,sortData:data};
        case CATEGORY_FINDALL_ERROR:return { ...state, loading: false, error: action.payload};
        case CATEGORY_CREATE: return { ...state, loading: true, error: ''};
        case CATEGORY_CREATE_SUCCESS:
            if (action.payload.method=="update"){
                const newList = state.list.map((item)=>{
                    if (item.id===action.payload.data.id){
                        item = action.payload.data;
                    }
                    return item;
                })
                return { ...state, loading: false,list:newList,success:"Cập nhật thành công"};
            }else {
                return { ...state, loading: false,list:[...state.list,action.payload.data],success:"Tạo thành công"};
            }
        case CATEGORY_CREATE_ERROR: return { ...state, loading: false, error: action.payload.params};
        case CATEGORY_DELETE: return { ...state, loading: true, error: ''};
        case CATEGORY_DELETE_SUCCESS:
            const newList = state.list.filter((item)=>item.id!==action.payload.params);
            return { ...state, loading: false,list:newList,success:"Xóa thành công"};
        case CATEGORY_DELETE_ERROR: return { ...state, loading: false, error: action.payload.params};
        default:return {...state}
    }
}