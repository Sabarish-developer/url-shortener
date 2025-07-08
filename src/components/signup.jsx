import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {Input} from './ui/input';
import {Button} from './ui/button';
import { PulseLoader } from "react-spinners";
import {Error} from '../components/error';
import {useState, useEffect} from 'react';
import * as Yup from 'yup';
import {signup} from '../db/apiAuth';
import {useFetch} from '../hooks/useFetch';
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

export const Signup = () => {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: null
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const {name, value, files} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const {fn: fnSignup, data, error, loading} = useFetch(signup, formData);
    const {fetchUser} = UrlState();

    useEffect(()=>{

        if(error===null && data){
            fetchUser();
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }

    }, [error, data])

    const handleSignup = async () => {

        setErrors([]);  //Clear old errors before validating new data

        try{
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string().email("Enter valid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
                profile_pic: Yup.mixed().required("Profile pic is required")
            });

            await schema.validate(formData, {abortEarly: false});  // abortEarly:false -> don't stop on first error get all errors
            await fnSignup();                                        // Calling the login function from apiFetch using useFetch hook

        }catch(e){
            const newErrors = {};

            e?.inner?.forEach((err) => {                //Optional chaining
                newErrors[err.path] = err.message;    
            });
            setErrors(newErrors);
        }
    }
    
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>If you don't have an account</CardDescription>
                    {error && <Error message={error.message}/>}
                </CardHeader>
                <CardContent className='space-y-2'>
                    <div className="space-y-1">
                        <Input name='name' type='text' placeholder='Enter name' onChange={handleInputChange}/>
                        {errors.name && <Error message={errors.name} />}
                    </div>
                    <div className="space-y-1">
                        <Input name='email' type='email' placeholder='Enter email' onChange={handleInputChange}/>
                        {errors.email && <Error message={errors.email} />}
                    </div>
                    <div className="space-y-1">
                        <Input name='password' type='password' placeholder='Enter password' onChange={handleInputChange}/>
                        {errors.password && <Error message={errors.password} />}
                    </div>
                    <div className="space-y-1">
                        <Input name='profile_pic' type='file' accept='image/*' onChange={handleInputChange} className='cursor-pointer'/>
                        {errors.profile_pic && <Error message={errors.profile_pic} />}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSignup} className='w-full cursor-pointer'>
                        {loading ? <PulseLoader size={10} color='#ffffff'/> : "Create account"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}