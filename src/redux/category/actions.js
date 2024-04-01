import {
    CATEGORY_CREATE, CATEGORY_CREATE_ERROR,
    CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE, CATEGORY_DELETE_ERROR, CATEGORY_DELETE_SUCCESS,
    CATEGORY_FINDALL,
    CATEGORY_FINDALL_ERROR,
    CATEGORY_FINDALL_SUCCESS, CATEGORY_REMOVE_ERROR, CATEGORY_REMOVE_SUCCESS, CATEGORY_SORTTREE, REMOVE_ERROR
} from "../actions";

export const removeError = () => ({
    type: CATEGORY_REMOVE_ERROR,
});
export const removeSuccess = () => ({
    type: CATEGORY_REMOVE_SUCCESS,
});
export const findAll = (params,history) => ({
    type: CATEGORY_FINDALL,
    payload: { params, history }
});
export const findAllSuccess = (data) => ({
    type: CATEGORY_FINDALL_SUCCESS,
    payload: data
});
export const findAllError = (message) => ({
    type: CATEGORY_FINDALL_ERROR,
    payload: message
});
export const create = (params,history) => ({
    type: CATEGORY_CREATE,
    payload: { params, history }
});
export const createSuccess = (data,method,history) => ({
    type: CATEGORY_CREATE_SUCCESS,
    payload: { data,method, history }
});
export const createError = (params,history) => ({
    type: CATEGORY_CREATE_ERROR,
    payload: { params, history }
});
export const deleteById = (params,history) => ({
    type: CATEGORY_DELETE,
    payload: { params, history }
});
export const deleteByIdSuccess = (params,history) => ({
    type: CATEGORY_DELETE_SUCCESS,
    payload: { params, history }
});
export const deleteByIdError = (params,history) => ({
    type: CATEGORY_DELETE_ERROR,
    payload: { params, history }
});
export const sorttree = (params) => ({
    type: CATEGORY_SORTTREE,
    payload: {params}
});