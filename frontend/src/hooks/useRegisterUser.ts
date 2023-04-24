import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const postRequest = async (data) => {
	// const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
	// const headers = { Authorization: token };
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users`, data,);
    // const response = await axios.post( 'https://api.example.com/endpoint', data, { headers });
    return response.data;
};





type Props = {}

export const useRegisterUser = () => {
    const { mutate: registerUser, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);
    return { registerUser, error, data, isError, isLoading, isSuccess }
}