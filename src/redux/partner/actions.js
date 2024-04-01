import {
    PARTNER_CREATE, PARTNER_CREATE_ERROR,
    PARTNER_CREATE_SUCCESS, PARTNER_DELETE, PARTNER_DELETE_ERROR, PARTNER_DELETE_SUCCESS,
    PARTNER_FINDALL,
    PARTNER_FINDALL_ERROR,
    PARTNER_FINDALL_SUCCESS
} from "../actions";

export const findAll = (params,history) => ({
    type: PARTNER_FINDALL,
    payload: { params, history }
});
export const findAllSuccess = (params) => ({
    type: PARTNER_FINDALL_SUCCESS,
    payload: params
});
export const findAllError = (params) => ({
    type: PARTNER_FINDALL_ERROR,
    payload: params
});
export const save = (params,history) => ({
    type: PARTNER_CREATE,
    payload: { params, history }
});
export const saveSuccess = (params) => ({
    type: PARTNER_CREATE_SUCCESS,
    payload: params
});
export const saveError = (params) => ({
    type: PARTNER_CREATE_ERROR,
    payload: params
});
export const deleteById = (params,history) => ({
    type: PARTNER_DELETE,
    payload: { params, history }
});
export const deleteByIdSuccess = (params) => ({
    type: PARTNER_DELETE_SUCCESS,
    payload: params
});
export const deleteByIdError = (params) => ({
    type: PARTNER_DELETE_ERROR,
    payload: params
});
