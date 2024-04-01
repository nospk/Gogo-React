import {
    ORDER_ADD_TO_TRASH, ORDER_ADD_TO_TRASH_ERROR, ORDER_ADD_TO_TRASH_SUCCESS,
    ORDER_CHANGE_STATUS, ORDER_CHANGE_STATUS_ERROR, ORDER_CHANGE_STATUS_SUCCESS, ORDER_COUNT_BY_STATUS_SUCCESS,
    ORDER_CREATE, ORDER_CREATE_ERROR,
    ORDER_CREATE_SUCCESS, ORDER_DELETE, ORDER_DELETE_ERROR, ORDER_DELETE_SUCCESS,
    ORDER_FINDALL,
    ORDER_FINDALL_ERROR,
    ORDER_FINDALL_SUCCESS, ORDER_UPDATE_QUICKVIEW
} from "../actions";


const INIT_STATE = {
    list: [],
    currentPage:0,
    maxPage :0,
    success:"",
    error:"",
    count:0,
    tracking:[],
    ghn:[],
    totalElements:0

};
export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case ORDER_FINDALL: return { ...state, success:"",error: ""};
        case ORDER_FINDALL_SUCCESS:
            console.log(action);
            return { ...state,
                list: action.payload.data.content,
                maxPage:action.payload.data.totalPages,
                success:"",
                error: "",
                tracking:action.payload.tracking,
                totalElements:action.payload.data.totalElements,
                ghn:action.payload.ghn
            };
        case ORDER_FINDALL_ERROR: return { ...state, success:"",error: ""};
        case ORDER_CREATE: return { ...state, success:"",error: ""};
        case ORDER_CREATE_SUCCESS: return { ...state, success:"",error: ""};
        case ORDER_CREATE_ERROR: return { ...state, success:"",error: ""};
        case ORDER_DELETE: return { ...state, success:"",error: ""};
        case ORDER_DELETE_SUCCESS:
            const filters = state.list.filter((item)=>!action.payload.params.ids.includes(item.id))
            if (filters.length<=0) window.location.reload();
            return { ...state,list:filters, success:"",error: ""};
        case ORDER_DELETE_ERROR: return { ...state, success:"",error: ""};
        case ORDER_CHANGE_STATUS: return { ...state, success:"",error: ""};
        case ORDER_CHANGE_STATUS_SUCCESS:
            const newList = state.list.map((order)=>{
                const filter = action.payload.params.data.filter((item)=>item.id===order.id);
                if (filter.length>0){
                    order.status = filter[0].status;
                    order.cashflowStatus =  filter[0].cashflow;
                }
                return order;
            })
            return { ...state,list:newList, success:"",error: ""};
        case ORDER_CHANGE_STATUS_ERROR: return { ...state, success:"",error: ""};
        case ORDER_ADD_TO_TRASH: return { ...state, success:"",error: ""};
        case ORDER_ADD_TO_TRASH_SUCCESS:
            const newDataTrashed = state.list.filter((order)=>{
                const check = action.payload.params.ids.includes(order.id);
                return !check;
            })
            if (newDataTrashed.length<=0) window.location.reload();
            return { ...state,list:newDataTrashed, success:"",error: ""};
        case ORDER_ADD_TO_TRASH_ERROR: return { ...state, success:"",error: ""};
        case ORDER_COUNT_BY_STATUS_SUCCESS:
            return { ...state, success:"",error: "",count:action.payload};
        case ORDER_UPDATE_QUICKVIEW:
            const updated = state.list.map((item)=>{
                if (item.id===action.payload.id){
                    item = action.payload
                }
                return item;
            });
            return {...state,list: updated}
        default:return {...state}
    }
}
