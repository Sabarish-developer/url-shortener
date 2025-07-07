import {use, useState} from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export const Landing = () => {

    const [longUrl, setLongUrl] = useState("");
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();
        if(longUrl) navigate(`/auth?createNew=${longUrl}`);
    }

    return (
        <div className='flex flex-col items-center'>
            <h2 className='px-2 my-10 sm:my-16 text-2xl sm:text-3xl lg:text-5xl font-bold text-center'>
                The only URL Shortener you will ever need 👇
            </h2>
            <form onSubmit={handleShorten} className='px-2 sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
                <Input 
                    type = "url"
                    placeholder = "Enter your long url"
                    value = {longUrl}
                    onChange = {(e)=>setLongUrl(e.target.value)}
                    className='h-full flex-1 p-4'
                />
                <Button type="submit" className='h-full sm:w-28 cursor-pointer'>
                    Shorten
                </Button>
            </form>
            <img src="public\url-shortener-landing.jpg" alt="url-shortener image" 
                className='w-full my-11 p-2 md:px-11 sm:h-[300px] sm:w-[600px] md:h-[400px] md:w-[800px]'>
            </img>
            <Accordion type="multiple" collapsible className="px-2 md:px-11 w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        How does the Trimrr URL shortener works?
                    </AccordionTrigger>
                    <AccordionContent>
                        When you enter a long URL, our system generates a shorter version of
                        that URL. This shortened URL redirects to the original long URL when
                        accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Do I need an account to use the app?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. Creating an account allows you to manage your URLs, view
                        analytics, and customize your short URLs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        What analytics are available for my shortened URLs?
                    </AccordionTrigger>
                    <AccordionContent>
                        You can view the number of clicks, geolocation data of the clicks
                        and device types (mobile/desktop) for each of your shortened URLs.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}