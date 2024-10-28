import {
    PRODUCT_CREATE_UPDATE,
    PRODUCT_CREATE_UPDATE_ERROR,
    PRODUCT_CREATE_UPDATE_SUCCESS,
    PRODUCT_DELETE,
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_FINDALL,
    PRODUCT_FINDALL_ERROR,
    PRODUCT_FINDALL_SUCCESS,
    PRODUCT_FINDBYID,
    PRODUCT_FINDBYID_ERROR,
    PRODUCT_FINDBYID_SUCCESS,
    PRODUCT_FINDPICKER,
    PRODUCT_FINDPICKER_ERROR,
    PRODUCT_FINDPICKER_SUCCESS,
    PRODUCT_REMOVE_MESSAGE,
    PRODUCT_UPDATETOPFLAG_SUCCESS,
    PRODUCT_UPDATETOPFLAG_ERROR,
    PRODUCT_UPDATEKEYWORD_SUCCESS,
} from "../actions";


const INIT_STATE = {
    list: [],
    listPicker:[],
    totalPagesPicker:1,
    pageSizePicker:20,
    product:{
        id:null,
        nameZh:"",
        slugZh:"",
        skuZh:"",
        nameVi:"",
        slugVi:"",
        skuVi:"",
        thumbnail:"",
        gallery:[],
        status:"",
        content:"",
        conditiondefault:"",
        condition1:"",
        condition2:"",
        condition3:"",
        condition4:"",
        categoryDefault:"",
        categories:[],
        keyword:""
    },
    loading: true,
    error: '',
    success:'',
    createupdatesuccess:'',
    createupdateerror:'',
    totalPages:1,
    pageSize:20,

};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case PRODUCT_REMOVE_MESSAGE: return { ...state, error: '',createupdateerror: '',createupdatesuccess:''};
        case PRODUCT_FINDALL: return { ...state, error: ''};
        case PRODUCT_FINDALL_SUCCESS:
            return { ...state, error: '',list:action.payload.params.content,totalPages:action.payload.params.totalPages};
        case PRODUCT_FINDALL_ERROR: return { ...state, error: ''};
        case PRODUCT_FINDBYID: return { ...state, error: '',loading: true};
        case PRODUCT_FINDBYID_SUCCESS: return { ...state, product:action.payload.params,loading: false};
        case PRODUCT_FINDBYID_ERROR: return { ...state, error: '',loading: false};
        case PRODUCT_CREATE_UPDATE: return { ...state, createupdateerror: '',createupdatesuccess:''};
        case PRODUCT_CREATE_UPDATE_SUCCESS: return { ...state, createupdateerror: '',createupdatesuccess:'create success'};
        case PRODUCT_CREATE_UPDATE_ERROR: return { ...state, createupdateerror: 'create error',createupdatesuccess:''};
        case PRODUCT_DELETE: return { ...state, error: ''};
        case PRODUCT_DELETE_SUCCESS:
            const newList = state.list.filter(value => value.id!==action.payload.params);
            return { ...state, error: '',list: newList};
        case PRODUCT_DELETE_ERROR: return { ...state, error: ''};
        case PRODUCT_FINDPICKER: return { ...state, error: ''};
        case PRODUCT_FINDPICKER_SUCCESS:
            return { ...state, error: '',listPicker:action.payload.params.content,totalPagesPicker:action.payload.params.totalPages};
        case PRODUCT_FINDPICKER_ERROR: return { ...state, error: ''};
        case PRODUCT_UPDATETOPFLAG_SUCCESS:
            const updated = state.list.map((res) => {
                if (res.id === action.payload.params.id) {
                    res.topFlag = action.payload.params.flag;
                }
                return res;
            });
            return { ...state,list:updated, error: ''};
        case PRODUCT_UPDATETOPFLAG_ERROR:
            return { ...state, error: ''};
        case PRODUCT_UPDATEKEYWORD_SUCCESS:
            const updateState = state.list.map((res) => {
                if (res.id === action.payload.params.id) {
                    res.keyword = action.payload.params.keyword;
                }
                return res;
            });
            return { ...state,list:updateState, error: ''};
        default:return {...state}
    }
}
