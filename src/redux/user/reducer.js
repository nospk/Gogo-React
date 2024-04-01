import {
    ROLE_CREATE, ROLE_CREATE_ERROR, ROLE_CREATE_SUCCESS, ROLE_DELETE, ROLE_DELETE_ERROR, ROLE_DELETE_SUCCESS,
    ROLE_FINDALL, ROLE_FINDALL_ERROR, ROLE_FINDALL_SUCCESS,
    USER_CHANGE_ROLE, USER_CHANGE_ROLE_ERROR, USER_CHANGE_ROLE_SUCCESS,
    USER_CREATE,
    USER_CREATE_ERROR,
    USER_CREATE_SUCCESS, USER_DELETE, USER_DELETE_ERROR, USER_DELETE_SUCCESS,
    USER_FINDALL,
    USER_FINDALL_ERROR,
    USER_FINDALL_SUCCESS, USER_FINDONE, USER_FINDONE_ERROR, USER_FINDONE_SUCCESS
} from "../actions";

const INIT_STATE = {
    list: [],
    roles:[],
    currentPage:0,
    maxPage :0,
    success:"",
    error:"",

};
export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case USER_FINDALL: return { ...state, success:"",error: ""};
        case USER_FINDALL_SUCCESS:
            return { ...state,list: [...action.payload.params.content],maxPage:action.payload.params.totalPages,success:"",error: ""};
        case USER_FINDALL_ERROR: return { ...state, success:"",error: ""};
        case USER_CREATE: return { ...state, success:"",error: ""};
        case USER_CREATE_SUCCESS: return { ...state, success:"",error: ""};
        case USER_CREATE_ERROR: return { ...state, success:"",error: ""};
        case USER_DELETE: return { ...state, success:"",error: ""};
        case USER_DELETE_SUCCESS: return { ...state, success:"",error: ""};
        case USER_DELETE_ERROR: return { ...state, success:"",error: ""};
        case USER_CHANGE_ROLE: return { ...state, success:"",error: ""};
        case USER_CHANGE_ROLE_SUCCESS:return { ...state, success:"",error: ""};
        case USER_CHANGE_ROLE_ERROR: return { ...state, success:"",error: ""};
        case USER_FINDONE: return { ...state, success:"",error: ""};
        case USER_FINDONE_SUCCESS: return { ...state, success:"",error: ""};
        case USER_FINDONE_ERROR: return { ...state, success:"",error: ""};
        case ROLE_FINDALL: return { ...state, success:"",error: ""};
        case ROLE_FINDALL_SUCCESS:
            let selectData = [];
            action.payload.params.forEach((item)=>{
                selectData.push({label:item.name, value:item.code, key:item.id});
            });
            return { ...state, loading: false,roles:selectData};

        case ROLE_FINDALL_ERROR: return { ...state, success:"",error: ""};
        case ROLE_CREATE: return { ...state, success:"",error: ""};
        case ROLE_CREATE_SUCCESS: return { ...state, success:"",error: ""};
        case ROLE_CREATE_ERROR: return { ...state, success:"",error: ""};
        case ROLE_DELETE: return { ...state, success:"",error: ""};
        case ROLE_DELETE_SUCCESS: return { ...state, success:"",error: ""};
        case ROLE_DELETE_ERROR: return { ...state, success:"",error: ""};
        default:return {...state}
    }
}