import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const postRequest = async (data) => {
    // const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
    // const headers = { Authorization: token };
    const response = await axios.post(`/api/users/login`, data,);
    // const response = await axios.post(import { useDispatch } from 'react-redux';
    //  'https://api.example.com/endpoint', data, { headers });
    return response.data;
};





type Props = {}

export const useLoginUser = () => {
    const { mutate: loginAccount, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);
    let dispatch = useDispatch()
    return { loginAccount, error, data, isError, isLoading, isSuccess }
}