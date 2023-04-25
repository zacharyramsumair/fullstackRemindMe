import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { queryClient } from '../main';


interface IaddReminder {
    reminder: string;
    dueDate: Date|number;
    isCompleted: boolean;
}
const postRequest = async (data: {
    data: IaddReminder, token: string
}) => {
    // const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
    const headers = { Authorization: `Bearer ${data.token}` };
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/reminders`, { ...data.data, text: data.data.reminder }, { headers });
    // const response = await axios.post(import { useDispatch } from 'react-redux';
    //  'https://api.example.com/endpoint', data, { headers });
    return response.data;
};




export const useAddReminder = () => {

    const { mutate: addReminder, isLoading, isError, isSuccess, data, error } = useMutation(postRequest, {
        onSuccess: () => queryClient.invalidateQueries(["allReminders"])
    });
    return { addReminder, error, data, isError, isLoading, isSuccess }
}