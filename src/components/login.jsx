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
import {login} from '../db/apiAuth';
import {useFetch} from '../hooks/useFetch';
import { useNavigate, useSearchParams } from "react-router-dom";

export const Login = () => {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const {fn: fnLogin, data, error, loading} = useFetch(login, formData);

    useEffect(()=>{

        if(error===null && data){
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }

    }, [error, data])

    const handleLogin = async () => {

        setErrors([]);  //Clear old errors before validating new data

        try{
            const schema = Yup.object().shape({
                email: Yup.string().email("Enter valid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required")
            });

            await schema.validate(formData, {abortEarly: false});  // abortEarly:false -> don't stop on first error get all errors
            await fnLogin()                                        // Calling the login function from apiFetch using useFetch hook

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
                    <CardTitle>Login</CardTitle>
                    <CardDescription>If you already have an account</CardDescription>
                    {error && <Error message={error.message}/>}
                </CardHeader>
                <CardContent className='space-y-2'>
                    <div className="space-y-1">
                        <Input name='email' type='email' placeholder='Enter email' onChange={handleInputChange}/>
                        {errors.email && <Error message={errors.email} />}
                    </div>
                    <div className="space-y-1">
                        <Input name='password' type='password' placeholder='Enter password' onChange={handleInputChange}/>
                        {errors.password && <Error message={errors.password} />}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleLogin} className='w-full cursor-pointer'>
                        {loading ? <PulseLoader size={10} color='#ffffff'/> : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}