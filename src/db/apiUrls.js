import supabase, { supabaseUrl } from "./supabase";

export const getUrls = async(user_id) => {

    const {data, error} = await supabase.from("urls").select("*").eq("user_id", user_id);
    if(error) throw new Error("Unable to fetch urls");
    return data;
}

export const deleteUrl = async(id) => {

    const {data, error} = await supabase.from("urls").delete().eq("id",id);
    if(error) throw new Error("Unable to delete url");
    return data;
}

export const createUrl = async({title, longUrl, customUrl, user_id}, qrCode) => {

    const short_url = Math.random().toString(36).substring(2,6);
    const fileName = `qr-${short_url}`;

    const {error: storageError} = await supabase.storage.from("qrs").upload(fileName, qrCode);
    if(storageError) throw new Error(storageError.message);

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    const {data, error} = await supabase.from("urls").insert([
        {
            title,
            original_url: longUrl,
            custom_url: customUrl || null,
            short_url,
            user_id,
            qr
        }
    ]).select();

    if(error) throw new Error("Error creating short url");

    return data;
}

export const getLongUrl = async(id) => {

    const {data, error} = await supabase
        .from("urls")
        .select("id, original_url")
        .or(`short_url.eq.${id}, custom_url.eq.${id}`)
        .single();

    if(error) throw new Error("Error fetching in long url");

    return data;
} 

export const getUrl = async({id, url_id}) => {

    const {data, error} = await supabase
        .from("urls")
        .select("*")
        .eq("id", id)
        .eq("user_id", user_id)
        .single();

    if(error) throw new Error("Error fetching the url");

    return data;
}