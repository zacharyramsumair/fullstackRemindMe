import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { queryClient } from '../main';
import { successToast } from '../components/toastFunctions';

interface IData {
    token: string,
    id: string,
}

const deleteRequest = async (data: IData) => {
    // const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
    const headers = { Authorization: `Bearer ${data.token}` };
    const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/reminders/${data.id}`, { headers });
    // const response = await axios.post(import { useDispatch } from 'react-redux';
    //  'https://api.example.com/endpoint', data, { headers });
    return response.data;
};




export const useDeleteReminder = () => {

    const { mutate: deleteReminder, isLoading, isError, isSuccess, data, error } = useMutation(deleteRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allReminders"])
            successToast("Reminder Deleted!")
        }
    });
    return { deleteReminder, error, data, isError, isLoading, isSuccess }
}