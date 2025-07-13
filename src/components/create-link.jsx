import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { UrlState } from "@/context";
import * as yup from 'yup';
import { createUrl } from "@/db/apiUrls";
import { useFetch } from "@/hooks/useFetch";
import { QRCode } from "react-qrcode-logo";
import { Error } from "./error";

export const CreateLink = () => {

    const {user} = UrlState();

    const navigate = useNavigate();
    const ref = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("CreateNew");

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: ""
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup.string().url("Enter valid URL").required("URL is required"),
        customUrl: yup.string()
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value
        });
    };

    const {loading, error, data, fn: fnCreateUrl} = useFetch(createUrl, {...formValues, user_id: user.id});

    useEffect(()=>{
        if(error===null && data)
            navigate(`/link/${data[0].id}`);
    }, [error, data])

    const createNewLink = async() => {
        setErrors({});
        try{
            await schema.validate(formValues, {abortEarly: false});
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));
            await fnCreateUrl(blob);
        }
        catch(e){
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path]= err.message
            });
            setErrors(newErrors);
        }
    }

    return (
        <Dialog defaultOpen={longLink} onOpenChange={(isOpen) => {if(!isOpen) setSearchParams({})}}>
            <DialogTrigger className='cursor-pointer bg-black rounded-md text-white  font-medium px-3'>
                Create URL
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-bold text-2xl'>Create New URL</DialogTitle>
                </DialogHeader>
                {formValues?.longUrl && (<QRCode ref={ref} size={200} value={formValues?.longUrl || ""} />)}
                <Input id="title" placeholder="Enter URL title" onChange={handleChange} value={formValues.title}/>
                {errors.title && <Error message={errors.title} />}
                <Input id="longUrl" placeholder="Enter long URL" onChange={handleChange} value={formValues.longUrl}/>
                {errors.longUrl && <Error message={errors.longUrl} />}
                <div className="flex items-center gap-2">
                    <Card className='p-2'>dwindle.netlify.app</Card>
                    /
                    <Input placeholder="Enter custom URL (optional)" />
                </div>
                {errors && <Error message={errors.message} />}
                <DialogFooter>
                    <Button className='cursor-pointer' onClick={createNewLink} disabled={loading}>
                        {loading ? <BeatLoader size={10} color="white"/> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}