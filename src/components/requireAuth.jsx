import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { UrlState } from "@/context";

export const RequireAuth = ({children}) => {

    const {isAuthenticated, loading} = UrlState();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated && loading===false) navigate("/auth");
    }, [isAuthenticated, loading]);

    if(loading){
        return <BarLoader className='w-full' color='#ffffff' />
    }

    if(isAuthenticated){
        return children;
    }
}