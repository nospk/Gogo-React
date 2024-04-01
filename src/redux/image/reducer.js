import {
    IMAGE_DELETE,
    IMAGE_DELETE_ERROR,
    IMAGE_DELETE_SUCCESS,
    IMAGE_FINDALL,
    IMAGE_FINDALL_ERROR,
    IMAGE_FINDALL_SUCCESS,
    IMAGE_TOGGLE_MODAL,
    IMAGE_UPLOAD,
    IMAGE_UPLOAD_ERROR,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_ZIP_UPLOAD,
    IMAGE_ZIP_UPLOAD_ERROR,
    IMAGE_ZIP_UPLOAD_SUCCESS
} from "../actions";


const INIT_STATE = {
    modal:false,
    list: [],
    loading: false,
    error: '',
    success:'',
    maxPage:1,


};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case IMAGE_TOGGLE_MODAL: return { ...state,modal:!state.modal};
        case IMAGE_FINDALL: return { ...state,loading:true,error:'',success: ''};
        case IMAGE_FINDALL_SUCCESS: return { ...state,loading:false,error:'',list:action.payload.data.content,maxPage: action.payload.data.totalPages>0?action.payload.data.totalPages:1};
        case IMAGE_FINDALL_ERROR: return { ...state,loading:false,error:action.payload.message,success: ''};
        case IMAGE_UPLOAD: return { ...state};
        case IMAGE_UPLOAD_SUCCESS:
            const  data = action.payload.concat(state.list)
            return { ...state, success: '',list:data};
        case IMAGE_UPLOAD_ERROR: return { ...state, error: ''};
        case IMAGE_ZIP_UPLOAD: return { ...state, error: ''};
        case IMAGE_ZIP_UPLOAD_SUCCESS: return { ...state, error: ''};
        case IMAGE_ZIP_UPLOAD_ERROR: return { ...state, error: ''};
        case IMAGE_DELETE: return { ...state, error: '',success: ''};
        case IMAGE_DELETE_SUCCESS:
            const newListDelete = state.list.filter((item)=>item.id!==action.payload.params);
            return { ...state, list: newListDelete,modal: false};
        case IMAGE_DELETE_ERROR: return { ...state, error: ''};
        default:return {...state}
    }
}