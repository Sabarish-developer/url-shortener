import { getLongUrl } from "@/db/apiUrls";
import { storeClicks } from "@/db/apiClicks";
import { useFetch } from "@/hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

export const RedirectLink = () => {

    const {id} = useParams();

    const {loading, data, fn: fnGelLongUrl} = useFetch(getLongUrl, id);
    const {loading: loadingClicks, data: clickData, fn: fnStoreClicks} = useFetch(storeClicks, {
        id: data?.id,
        originalUrl: data?.original_url
    });

    useEffect(()=>{
        fnGelLongUrl();
    }, []);

    useEffect(()=>{
        if(!loading && data){
            fnStoreClicks();
        }
    }, [loading]);

    if(loading || loadingClicks){
        return (
            <div>
                <BarLoader width={"100%"} color="#ffffff" />
                <br />
                Redirecting....
            </div>
        )
    }

    return null;
}