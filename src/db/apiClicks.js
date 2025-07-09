import supabase from "./supabase";

export const getClicksForUrls = async(urlIds) => {

    const {data, error} = await supabase.from("clicks").select("*").in("url_id", urlIds);
    if(error) throw new Error("Unable to fetch clicks");
    return data;
}