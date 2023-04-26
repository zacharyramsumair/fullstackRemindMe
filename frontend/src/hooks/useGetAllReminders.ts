import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const postRequest = async (data) => {
	// const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
	// const headers = { Authorization: token };
	const response = await axios.post(
		`/api/users/login`,
		data
	);
	// const response = await axios.post(import { useDispatch } from 'react-redux';
	//  'https://api.example.com/endpoint', data, { headers });
	return response.data;
};

export const useGetAllReminders = (sort: string) => {

	const user = useSelector((state: RootState) => state.auth.user)
	const token = user?.token	
	let navigate = useNavigate()

	if(!localStorage.getItem("user")){
		navigate("/login")
	  }

	useEffect(()=>{
		if(!user || user == null || !localStorage.getItem("user")){
		  navigate("/login")
		}
	  }, [user])


	// 'oldest', 'lastUpdated', 'complete', 'incomplete'])
	let apiString = `/api/reminders`;
	if (sort == "lastUpdated") {
		// remains the same
		apiString = `/api/reminders`;
	} else if (sort == "oldest") {
		apiString = `/api/reminders?sort=oldest`;
	}
    else if (sort == "dueDate") {
		apiString = `/api/reminders?sort=dueDate`;
	}

    else if (sort == "complete") {
		apiString = `/api/reminders?completionState=complete`;
	} else if (sort == "incomplete") {
		apiString = `/api/reminders?completionState=incomplete`;
	}
	


	const headers = { Authorization: `Bearer ${token}` };
	const { isLoading, error, data, refetch } = useQuery(
		["allReminders"],
		() => axios(apiString, { headers }),
		{
			refetchOnWindowFocus: true,
		}
	);

	return { isLoading, error, data, refetch };
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
