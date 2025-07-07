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
import {useState} from 'react';
import * as Yup from 'yup';

export const Login = () => {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async () => {

        setErrors([]);  //Clear old errors before validating new data

        try{
            const schema = Yup.object().shape({
                email: Yup.string().email("Enter valid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required")
            });

            await schema.validate(formData, {abortEarly: false});  // abortEarly:false -> don't stop on first error get all errors
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
                    <Button onClick={handleLogin}>
                        {true ? <PulseLoader size={10} color='#ffffff'/> : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}