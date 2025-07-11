import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import { UrlState } from "@/context";
import { Error } from "@/components/error";
import { LinkCard } from "@/components/link-card";

export const Dashboard = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const {user} = UrlState();

    const {loading, data: urls, error, fn: fnUrls} = useFetch(getUrls, user?.id);

    const {loading: loadingClicks, 
            data: clicks, 
            error: clickError, 
            fn: fnClicks} = useFetch(getClicksForUrls, urls?.map((url) => url.id));

    useEffect(()=>{
        fnUrls();
    }, []);

    useEffect(()=>{
        if(urls?.length)
            fnClicks();
    }, [urls?.length]);

    const filteredUrls = urls?.filter((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex flex-col gap-8 px-2 sm:px-4 md:px-6 mt-2">
            {(loading || loadingClicks) && <BarLoader width={"100%"} color="#000000" />}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                <CardHeader>
                    <CardTitle>Links created</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{urls?.length}</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Total clicks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{clicks?.length}</p>
                </CardContent>
                </Card>
            </div>
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold">My Links</h1>
                <Button className='cursor-pointer'>Create link</Button>
            </div>
            <div className="relative">
                <Input 
                    type='text'
                    placeholder = 'Filter urls..'
                    value = {searchQuery}
                    onChange = {(e) => setSearchQuery(e.target.value)}
                />
                <Filter className="absolute top-2 right-2 p-1"/>
            </div>
            {error && <Error message={error?.message} />}
            {
                (filteredUrls || []).map((url, i) => {
                    return <LinkCard key={i} url={url} fetchUrls={fnUrls} />
                })
            }
        </div>
    )
}