import {
    POST_DELETE,
    POST_DELETE_ERROR,
    POST_DELETE_SUCCESS,
    POST_FINDALL,
    POST_FINDALL_ERROR,
    POST_FINDALL_SUCCESS
} from "../actions";

export const findAll = (params,history) => ({
    type: POST_FINDALL,
    payload: { params, history }
});
export const findAllSuccess = (params) => ({
    type: POST_FINDALL_SUCCESS,
    payload: params
});
export const findAllError = (params) => ({
    type: POST_FINDALL_ERROR,
    payload: params
});

export const deleteById = (params,history) => ({
    type: POST_DELETE,
    payload: { params, history }
});
export const deleteByIdSuccess = (params,history) => ({
    type: POST_DELETE_SUCCESS,
    payload: { params, history }
});
export const deleteByIdError = (params,history) => ({
    type: POST_DELETE_ERROR,
    payload: { params, history }
});
