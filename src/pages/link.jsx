import { UrlState } from "@/context";
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "@/hooks/useFetch";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import { getClicksForUrl } from "@/db/apiClicks";
import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import { LinkIcon, Copy, Download, Trash, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Link = () => {

    const {id} = useParams();
    const {user} = UrlState();
    const navigate = useNavigate();

    const {loading, data: url, fn: fnGetUrl, error} = useFetch(getUrl, {id, user_id: user?.id});
    const {loading: loadingStats, data: stats, fn: fnStats} = useFetch(getClicksForUrl, id);
    const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, id);

    useEffect(()=>{
        fnGetUrl();
    }, []);

    useEffect(()=>{
        if(!error && loading===false) fnStats();
    }, [loading, error]);

    //if(error) navigate("/dashboard");

    let link = "";
    if(url){
        link = url.custom_url || url.short_url;
    }

    const downloadImage = async() => {
        try{
            const imageUrl = url?.qr;
            const fileName = `${url?.title}.png`;

            // Fetching the qr using url from the server
            const response = await fetch(imageUrl);

            // Converting it into raw readable format for browsers(binary)
            const blob = await response.blob();

            // Giving temporary url to the blob which is in browser memory, to 
            // tell download this file instead of requesting download from server
            const blobUrl = URL.createObjectURL(blob);

            const anchor = document.createElement("a");
            anchor.href = blobUrl;
            anchor.download = fileName;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            URL.revokeObjectURL(blobUrl);
            toast.success("Downloaded successfully");
        }
        catch(e){
            console.log(e);
            toast.error("Download failed");
        }
    }

    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        const url = `https://dwindle.netlify.app/${link}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success("Copied successfully");
        setTimeout(()=>setCopied(false), 2000);
    }

    const handleDelete = ()=>{
        fnDelete().then(()=>{
            navigate("/dashboard");
            toast.success("Deleted successfully");
        })
    }


    return (
        <>
            {
                (loading || loadingStats) && 
                (<BarLoader className="mb-4" width={"100%"} color="#000000" />)
            }
            <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col items-start rounded-xl gap-8 p-4 sm:w-2/5 border ml-2">
                <span className="text-4xl sm:text-5xl font-bold hover:underline cursor-pointer">
                    {url?.title}
                </span>
                <a href={`https://dwindle.netlify.app/${link}`} target="_blank" className="text-2xl sm:text-3xl font-bold hover:underline cursor-pointer">
                    {`https://dwindle.netlify.app/${link}`}
                </a>
                <a href={url?.original_url} target="_blank" className="flex items-center gap-1 hover:underline cursor-pointer">
                    <LinkIcon className="p-1" />
                    {url?.original_url}
                </a>
                <span className="flex items-end">
                    {new Date(url?.created_at).toLocaleString()}
                </span>
                <div className="flex gap-2">
                    <Button className="cursor-pointer" onClick={handleCopy} title="Copy link">
                        {copied ? <Check/> : <Copy/>}
                    </Button>
                    <Button variant="secondary" className="cursor-pointer" onClick={downloadImage} title="Download">
                        <Download />
                    </Button>
                    <Button variant="destructive" className="cursor-pointer" onClick={handleDelete} title="Delete" disabled={loadingDelete}>
                        {loadingDelete ? <BeatLoader size={5} color="#ffffff"/> : <Trash/>}
                    </Button>
                </div>
                <img 
                    src={url?.qr}
                    alt="qr code"
                    className="object-contain ring p-1"
                />
            </div>

            <Card className="w-3/5">
                <CardHeader>
                    <CardTitle className='text-4xl font-bold'>Statistics</CardTitle>
                </CardHeader>
                {
                    (stats && stats.length)
                    ?
                    <CardContent>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total clicks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{stats?.length}</p>
                            </CardContent>
                        </Card>

                        <CardTitle>Location Stats</CardTitle>
                        <CardTitle>Device Stats</CardTitle>
                    </CardContent>
                    :
                    <CardContent>
                        {
                            loadingStats===false ? "No statistics yet" : "Loading..." 
                        }
                    </CardContent>
                }
                
            </Card>
            </div>
        </>
    )
}