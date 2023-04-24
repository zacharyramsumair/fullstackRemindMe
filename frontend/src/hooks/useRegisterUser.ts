
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQuery } from '@tanstack/react-query'

import axios from 'axios';

const postRequest = async (data) => {
    // const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
    // const headers = { Authorization: token };
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users`, data);
    // const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users`, data, { headers });
    return response.data;
};


export const useRegisterUser = (props) => {

    const { isLoading, error, mutate } = useMutation([props.key], postRequest(props.data));






    return { isLoading, error, data }

}