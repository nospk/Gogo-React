import {
    ORDER_ADD_TO_TRASH,
    ORDER_ADD_TO_TRASH_ERROR,
    ORDER_ADD_TO_TRASH_SUCCESS,
    ORDER_CHANGE_STATUS,
    ORDER_CHANGE_STATUS_ERROR,
    ORDER_CHANGE_STATUS_SUCCESS,
    ORDER_CREATE,
    ORDER_CREATE_ERROR,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE,
    ORDER_DELETE_ERROR,
    ORDER_DELETE_SUCCESS,
    ORDER_FINDALL,
    ORDER_FINDALL_ERROR,
    ORDER_FINDALL_SUCCESS,
    PARTNER_CREATE, PARTNER_CREATE_ERROR,
    PARTNER_CREATE_SUCCESS, PARTNER_DELETE, PARTNER_DELETE_ERROR, PARTNER_DELETE_SUCCESS,
    PARTNER_FINDALL,
    PARTNER_FINDALL_ERROR,
    PARTNER_FINDALL_SUCCESS
} from "../actions";


const INIT_STATE = {
    list: [],
    success:"",
    error:"",

};
export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case PARTNER_FINDALL: return { ...state, success:"",error: ""};
        case PARTNER_FINDALL_SUCCESS:
            return { ...state, list: action.payload,success:"",error: ""};
        case PARTNER_FINDALL_ERROR: return { ...state, success:"",error: ""};
        case PARTNER_CREATE: return { ...state, success:"",error: ""};
        case PARTNER_CREATE_SUCCESS:
            let list = [...state.list]
            if (action.payload.type==='create'){
                list.push(action.payload.data)
            }else {
                list = list.map((value => {
                    if (value.id===action.payload.data.id){
                        value = action.payload.data;
                    }
                    return value;
                }))
            }
            return { ...state,list:list, success:"",error: ""};
        case PARTNER_CREATE_ERROR: return { ...state, success:"",error: ""};
        case PARTNER_DELETE: return { ...state, success:"",error: ""};
        case PARTNER_DELETE_SUCCESS: return { ...state, success:"",error: ""};
        case PARTNER_DELETE_ERROR: return { ...state, success:"",error: ""};
        default:return {...state}
    }
}