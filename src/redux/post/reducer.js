import {
    POST_DELETE,
    POST_DELETE_ERROR,
    POST_DELETE_SUCCESS,
    POST_FINDALL,
    POST_FINDALL_ERROR,
    POST_FINDALL_SUCCESS
} from "../actions";


const INIT_STATE = {
    list: [],
    currentPage:0,
    maxPage :0,
    success:"",
    error:"",

};
export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case POST_FINDALL: return { ...state, success:"",error: ""};
        case POST_FINDALL_SUCCESS:
            return { ...state, list: action.payload.content,maxPage:action.payload.totalPages,success:"",error: ""};
        case POST_FINDALL_ERROR: return { ...state, success:"",error: ""};
        case POST_DELETE: return { ...state, success:"",error: ""};
        case POST_DELETE_SUCCESS:
            const newListAfterDelete = state.list.filter((item)=>item.id!==action.payload.params);
            return { ...state, success:"",error: "",list: newListAfterDelete}
        case POST_DELETE_ERROR: return { ...state, success:"",error: ""};

        default:return {...state}
    }
}