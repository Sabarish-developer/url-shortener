import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export const getClicksForUrls = async(urlIds) => {

    const {data, error} = await supabase.from("clicks").select("*").in("url_id", urlIds);
    if(error) throw new Error("Unable to fetch clicks");
    return data;
}

const parser = new UAParser();
export const storeClicks = async({id, originalUrl}) => {

    try{
        // Getting the type of device using ua-parser-js library
        const result = parser.getResult();
        const device = result.type || 'desktop';
        
        // Getting the location of user from this api
        const response = await fetch("https://ipapi.co/json");
        const {city, country_name: country} = await response.json();

        // Inserting the data into clicks table in db
        await supabase.from("clicks").insert({
            url_id: id,
            city,
            country,
            device
        });
        
        // Redirecting the user to original_url
        window.location.href = originalUrl;
    }
    catch(e){
        throw new Error("Error in redirecting and storing clicks");
    }
}

export const getClicksForUrl = async(url_id) => {

    const {data, error} = await supabase
        .from("clicks")
        .select("*")
        .eq("url_id", url_id);

    if(error) throw new Error("Error fetching in stats of url");

    return data;
}