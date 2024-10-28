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
    PRODUCT_FINDPICKER, PRODUCT_FINDPICKER_ERROR, PRODUCT_FINDPICKER_SUCCESS,
    PRODUCT_REMOVE_MESSAGE, PRODUCT_SEARCHPICKER,
    PRODUCT_UPDATETOPFLAG_ERROR,PRODUCT_UPDATETOPFLAG_SUCCESS,PRODUCT_UPDATETOPFLAG,
    PRODUCT_UPDATEKEYWORD, PRODUCT_UPDATEKEYWORD_SUCCESS,
} from "../actions";
export const updateFlag = (params) => ({
    type: PRODUCT_UPDATETOPFLAG,
    payload: { params }
});
export const updateFlagSuccess = (params) => ({
    type: PRODUCT_UPDATETOPFLAG_SUCCESS,
    payload: { params }
});
export const updateFlagError = (params) => ({
    type: PRODUCT_UPDATETOPFLAG_ERROR,
    payload: { params }
});
export const updateKeyWord = (params) => ({
    type: PRODUCT_UPDATEKEYWORD,
    payload: {params}
});
export const updateKeyWordSucess = (params) => ({
    type: PRODUCT_UPDATEKEYWORD_SUCCESS,
    payload: {params}
});
export const searchPicker = (params,history) => ({
    type: PRODUCT_SEARCHPICKER,
    payload: { params, history }
});
export const findPicker = (params,history) => ({
    type: PRODUCT_FINDPICKER,
    payload: { params, history }
});
export const findPickerSuccess = (params,history) => ({
    type: PRODUCT_FINDPICKER_SUCCESS,
    payload: { params, history }
});
export const findPickerError = (params,history) => ({
    type: PRODUCT_FINDPICKER_ERROR,
    payload: { params, history }
});
export const removeMessage = () => ({
    type: PRODUCT_REMOVE_MESSAGE,
});
export const findAll = (params,history) => ({
    type: PRODUCT_FINDALL,
    payload: { params, history }
});
export const findAllSuccess = (params,history) => ({
    type: PRODUCT_FINDALL_SUCCESS,
    payload: { params, history }
});
export const findAllError = (params,history) => ({
    type: PRODUCT_FINDALL_ERROR,
    payload: { params, history }
});
export const findById = (params,history) => ({
    type: PRODUCT_FINDBYID,
    payload: { params, history }
});
export const findByIdSuccess = (params,history) => ({
    type: PRODUCT_FINDBYID_SUCCESS,
    payload: { params, history }
});
export const findByIdError = (params,history) => ({
    type: PRODUCT_FINDBYID_ERROR,
    payload: { params, history }
});

export const create = (params,history) => ({
    type: PRODUCT_CREATE_UPDATE,
    payload: { params, history }
});
export const createSuccess = (params,history) => ({
    type: PRODUCT_CREATE_UPDATE_SUCCESS,
    payload: { params, history }
});
export const createError = (params,history) => ({
    type: PRODUCT_CREATE_UPDATE_ERROR,
    payload: { params, history }
});
export const deleteById = (params,history) => ({
    type: PRODUCT_DELETE,
    payload: { params, history }
});
export const deleteByIdSuccess = (params,history) => ({
    type: PRODUCT_DELETE_SUCCESS,
    payload: { params, history }
});
export const deleteByIdError = (params,history) => ({
    type: PRODUCT_DELETE_ERROR,
    payload: { params, history }
});
