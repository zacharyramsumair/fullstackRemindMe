import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { queryClient } from '../main';


interface IUpdateReminder {
    id: string;
    token:string,
    reminderInfo:{
        data: {

            reminder?:string,
            dueDate?:string,
            isCompleted?:boolean,
        }

    }  
}
const putRequest = async (data:IUpdateReminder) => {

    let body = {...data.reminderInfo.data}
    if (data.reminderInfo.data.reminder){
        body = {...data.reminderInfo.data, text:data.reminderInfo.data.reminder }
    }
    
    // const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
    const headers = { Authorization: `Bearer ${data.token}` };
    const response = await axios.put(`/api/reminders/${data.id}`, body, { headers });
    // const response = await axios.post(import { useDispatch } from 'react-redux';
    //  'https://api.example.com/endpoint', data, { headers });
    return response.data;
};




export const useUpdateReminder = () => {

    const { mutate: updateReminder, isLoading, isError, isSuccess, data, error } = useMutation(putRequest, {
        onSuccess: () => queryClient.invalidateQueries(["allReminders"])
    });
    return { updateReminder, error, data, isError, isLoading, isSuccess }
}