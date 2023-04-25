import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const postRequest = async (data) => {
    // const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
    // const headers = { Authorization: token };
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users/login`, data,);
    // const response = await axios.post(import { useDispatch } from 'react-redux';
    //  'https://api.example.com/endpoint', data, { headers });
    return response.data;
};




export const useGetAllReminders = () => {
    const token = useSelector((state: RootState) => state.auth.user.token)

    const headers = { Authorization: `Bearer ${token}` };
    const { isLoading, error, data, refetch } = useQuery(["allReminders"], () =>
        axios(`${import.meta.env.VITE_BASEURL}/reminders`, { headers })
        , {
            refetchOnWindowFocus: true
        });




    return { isLoading, error, data, refetch }

}







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
//             const response = await axios.get(`${import.meta.env.VITE_BASEURL}/reminders`, {
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
//     const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users/login`, data);
//     return response.data;
// };
