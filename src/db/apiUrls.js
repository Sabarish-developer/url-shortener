import supabase from "./supabase";

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