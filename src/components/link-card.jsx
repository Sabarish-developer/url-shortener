import {Link} from 'react-router-dom';
import { LinkIcon, Copy, Download, Trash, Check } from 'lucide-react';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import {toast} from 'react-hot-toast';
import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { deleteUrl } from '@/db/apiUrls';

export const LinkCard = ({url=[], fetchUrls}) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const copyUrl = `https://dwindle.netlify.app/${url?.custom_url || url?.short_url}`;
        navigator.clipboard.writeText(copyUrl);
        setCopied(true);
        toast.success("Link copied!");
        setTimeout(()=>setCopied(false), 2000);
    }

    const handleDelete = () => {
        fnDelete().then(()=>{
            fetchUrls();
            toast.success("Deleted successfully");
        })
    }

    const downloadImage = async() => {

        try{
            const imageUrl = url?.qr;
            const filename = `${url?.title}.png`;

            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const blobUrl = URL.createObjectURL(blob);

            const anchor = document.createElement("a");
            anchor.href = blobUrl;
            anchor.download = filename;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            URL.revokeObjectURL(blobUrl);
            toast.success("Downloaded successfully");
        }
        catch(e){
            console.log(e);
            toast.error("Download failed")
        }
    }

    const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url.id);

    return (
        <div className='flex flex-col md:flex-row gap-5 p-4 border rounded-lg overflow-x-auto'>
            <img className='h-32 object-contain ring self-start' src={url?.qr} alt="qr code" />
            <Link to={`/link/${url?.id}`}className='flex flex-col flex-1'>
                <span className='text-3xl font-bold hover:underline cursor-pointer'>
                    {url?.title}
                </span>
                <span className='text-2xl font-bold hover:underline cursor-pointer'>
                    https://dwindle.netlify.app/{url?.custom_url ? url?.custom_url : url?.short_url}
                </span>
                <span className='flex items-center gap-1 hover:underline cursor-pointer'>
                    <LinkIcon className='p-1' />
                    {url?.original_url}
                </span>
                <span className='flex items-end font-extralight text-sm flex-1'>
                    {new Date(url?.created_at).toLocaleString()}
                </span>
            </Link>
            <div className='flex gap-2'>
                <Button className='cursor-pointer' onClick = {handleCopy} title='Copy link'>
                    {copied ? <Check /> : <Copy />}
                </Button>
                <Button variant="secondary" className='cursor-pointer' onClick={downloadImage} title='Download'>
                    <Download />
                </Button>
                <Button variant="destructive" className='cursor-pointer' disabled={loadingDelete} onClick={handleDelete} title='Delete'>
                    {loadingDelete ? <BeatLoader size-={5} color="#ffffff"/> : <Trash />}
                </Button>
            </div>
        </div>
    );
}