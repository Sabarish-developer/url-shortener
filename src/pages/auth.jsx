import {Login} from "../components/login";
import {Signup} from "../components/signup";

import {useState} from 'react';
import { useSearchParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const Auth = () => {

    const [searchParams] = useSearchParams();

    return (
        <div className="flex flex-col items-center gap-10 mt-26">
            <h1 className="text-3xl font-bold">
                {searchParams.get("createNew") ? "Hold up, let's login first!!!" : "Login / Signup"}
            </h1>
            <Tabs defaultValue="login" className="sm:w-[400px]">
                <TabsList className='grid grid-cols-2 w-full'>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login"><Login /></TabsContent>
                <TabsContent value="signup"><Signup /></TabsContent>
            </Tabs>
        </div>
    )
}