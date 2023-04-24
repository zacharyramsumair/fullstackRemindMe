import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'


type Props = {
    key: string | number | undefined;
    endpoint: string
}

interface IData {
    isLoading: boolean;
    error: {
        message: string
    };
    data: any;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>
}

export const useGetData = (props: Props) => {

    const { isLoading, error, data, refetch } = useQuery([props.key], () =>
        axios(`https://fakestoreapi.com/${props.endpoint}`), {
        refetchOnWindowFocus: true
    });




    return { isLoading, error, data, refetch } as IData

}