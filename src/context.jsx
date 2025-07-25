import { createContext, useContext, useEffect } from "react";
import { getCurrentUser } from "./db/apiAuth";
import { useFetch } from "./hooks/useFetch";

const UrlContext = createContext();

export const UrlProvider = ({children}) => {

    const {data: user, error, loading, fn: fetchUser} = useFetch(getCurrentUser);

    const isAuthenticated = user?.role === "authenticated";

    useEffect(()=>{
        fetchUser();
    }, []);

    return (
        <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>
            {children}
        </UrlContext.Provider>
    );
}

export const UrlState = () => {
    return useContext(UrlContext);
}