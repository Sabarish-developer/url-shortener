import supabase, { supabaseUrl } from "./supabase";

export const login = async ({email, password}) => {

    const {data,error} = await supabase.auth.signInWithPassword({email, password});

    if(error) throw new Error(error.message);

    return data;
}

export const getCurrentUser = async() => {

    const {data, error} = await supabase.auth.getSession();

    if(!data.session) return null;    // User is not logged in
    if(error) throw new Error(error.message);

    return data.session?.user;        //If data.session exists return data.session.user
}

export const signup = async({name, email, password, profile_pic}) => {

    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
    const {error: storageError} = await supabase.storage.from("profile-pic").upload(fileName, profile_pic);

    if(storageError) throw new Error(storageError.message);

    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data:{
                name,
                profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`
            }
        }
    });

    if(error) throw new Error(error.messgae);

    return data;
}

export const logout = async() => {
    const {error} = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
}