import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export const useGetOneReminder = (id: string) => {

	const user = useSelector((state: RootState) => state.auth.user)
	let navigate = useNavigate()
	useEffect(()=>{
		if(!user || user == null){
		  navigate("/login")
		}
	  }, [user])


	// 'oldest', 'lastUpdated', 'complete', 'incomplete'])
	let apiString = `/api/reminders/${id}`;
	
	const token = useSelector((state: RootState) => state.auth.user.token);

	const headers = { Authorization: `Bearer ${token}` };
	const { isLoading:LoadingOneReminder, error:ErrorOneReminder, data:OneReminderData, refetch } = useQuery(
		["oneReminder"],
		() => axios(apiString, { headers }),
		{
			refetchOnWindowFocus: true,
		}
	);

	return { LoadingOneReminder, ErrorOneReminder, OneReminderData, refetch };
};

// import { useQuery } from '@tanstack/react-query';
// import axios, { AxiosResponse } from 'axios';
// import { useSelector } from 'react-redux';
// import { RootState } from '../app/store';

// export const useGetAllReminders = () => {
//     const token = useSelector((state: RootState) => state.auth.user.token);

//     const headers = { Authorization: `Bearer ${token}` };

//     const { isLoading, error, data, refetch } = useQuery(
//         ["allReminders"],
//         async () => {
//             const response = await axios.get(`/api/reminders`, {
//                 headers
//             });

//             const transformedData = response.data.map((item: any) => {
//                 // transform the data as needed
//                 return item;
//             });

//             return transformedData;
//         },
//         {
//             refetchOnWindowFocus: true
//         }
//     );

//     return { isLoading, error, data, refetch };
// };

// const postRequest = async (data) => {
//     const response = await axios.post(`/api/users/login`, data);
//     return response.data;import { useNavigate } from 'react-router-dom';

// };
