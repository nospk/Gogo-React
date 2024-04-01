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

export const toggleModal = () => ({
    type: IMAGE_TOGGLE_MODAL,
});
export const findAll = (params,history) => ({
    type: IMAGE_FINDALL,
    payload: { params, history }
});
export const findAllSuccess = (data,history) => ({
    type: IMAGE_FINDALL_SUCCESS,
    payload: { data, history }
});
export const findAllError = (message,history) => ({
    type: IMAGE_FINDALL_ERROR,
    payload: { message, history }
});
export const upload = (params,history) => ({
    type: IMAGE_UPLOAD,
    payload: { params, history }
});
export const uploadSuccess = (data) => ({
    type: IMAGE_UPLOAD_SUCCESS,
    payload: data
});
export const uploadError = (message) => ({
    type: IMAGE_UPLOAD_ERROR,
    payload: message
});
export const uploadZip = (params,history) => ({
    type: IMAGE_ZIP_UPLOAD,
    payload: { params, history }
});
export const uploadZipSuccess = (data,method,history) => ({
    type: IMAGE_ZIP_UPLOAD_SUCCESS,
    payload: { data,method, history }
});
export const uploadZipError = (params,history) => ({
    type: IMAGE_ZIP_UPLOAD_ERROR,
    payload: { params, history }
});
export const deleteById = (params,history) => ({
    type: IMAGE_DELETE,
    payload: { params, history }
});
export const deleteByIdSuccess = (id) => ({
    type: IMAGE_DELETE_SUCCESS,
    payload: id
});
export const deleteByIdError = (params,history) => ({
    type: IMAGE_DELETE_ERROR,
    payload: { params, history }
});