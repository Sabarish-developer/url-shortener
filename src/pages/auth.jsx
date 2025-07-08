import {Login} from "../components/login";
import {Signup} from "../components/signup";

import {useEffect} from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UrlState } from "@/context";

export const Auth = () => {

    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const navigate = useNavigate();

    const {isAuthenticated, loading} = UrlState();

    useEffect(()=>{
        if(isAuthenticated && !loading){
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
    }, [isAuthenticated, loading]);

    return (
        <div className="flex flex-col items-center gap-10 mt-20">
            <h1 className="text-3xl font-bold p-2 text-center">
                {longLink ? "Hold up, let's login first!!!" : "Login / Signup"}
            </h1>
            <Tabs defaultValue="login" className="sm:w-[400px]">
                <TabsList className='grid grid-cols-2 w-full'>
                    <TabsTrigger value="login" className='cursor-pointer'>Login</TabsTrigger>
                    <TabsTrigger value="signup" className='cursor-pointer'>Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login"><Login /></TabsContent>
                <TabsContent value="signup"><Signup /></TabsContent>
            </Tabs>
        </div>
    )
}