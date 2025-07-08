import supabase from "./supabase";

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