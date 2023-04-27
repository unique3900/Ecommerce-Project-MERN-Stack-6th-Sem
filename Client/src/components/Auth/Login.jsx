import axios from 'axios';
import React, {
    useState
} from 'react'
import {
    useNavigate,
    Link
} from 'react-router-dom';
import {
    toast
} from 'react-toastify';
import {
    useAuth
} from '../Context-State/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);


    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (!email || !password) {
            setError(true);
        } else {
            try {
                const fetchResponse = await axios.post('http://localhost:8080/api/v1/auth/login', {
                    email,
                    password
                });
                if (fetchResponse.data.success) {

                    toast.success(fetchResponse.data.message);
                    setAuth({
                        ...auth,
                        user: fetchResponse.data.user,
                        token: fetchResponse.data.token
                    });
                    localStorage.setItem("auth", JSON.stringify(fetchResponse.data));
                    // console.log( JSON.parse(localStorage.getItem("auth")).user);
                    navigate('/home');
                } else {
                    toast.error(fetchResponse.data.message);

                }

            } catch (error) {
                console.log(error)
            }

        }


    }
    return (
        <> {/* Boc */}
            <div className="flex flex-col justify-center items-center h-screen">

                <div className=" grid mt-0 grid-flow-row lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-fit   p-6 round-xl shadow-md shadow-slate-400">
                    <div className="relative justify-center place-content-center">
                        <img className='lg:w-fit lg:h-[500px] h-64' src="https://www.go.ooo/img/bg-img/Login.jpg" alt=""/>
                    </div>
                    <div className="">
                        <h1 className='text-center text-4xl lg:text-6xl py-5 '>Login</h1>

                        <div className="form grid grid-flow-row  gap-2  mt-5">


                            <div className="inputBox flex flex-col gap-1">
                                <label htmlFor="email">Email Address:</label>
                                <input type="email" name='email'
                                    value={email}
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    }
                                    className='outline-black border-b-2 px-2 rounded-md shadow-smpx-2'
                                    placeholder='Enter email address'/> {
                                error && !email ? <span className='bg-red-200 text-gray-500'>Email is Required</span> : ""
                            } </div>


                            <div className="inputBox flex flex-col gap-1">
                                <label htmlFor="password">Password:</label>

                                <input value={password}
                                    type="password"
                                    onChange={
                                        (e) => setPassword(e.target.value)
                                    }
                                    className='px-2'
                                    name='password'
                                    placeholder="Enter Password"/> {
                                error && !password ? <span className='bg-red-200 text-gray-500'>Password is Required</span> : ""
                            } </div>

                        </div>
                        <button className='mt-5 bg-blue-500 p-2 w-full text-white'
                            onClick={handleSubmit}>Login</button>
                        <div className='mt-3 text-center'>
                            <Link to={'/forgot-password'}
                                className='underline text-blue-500'>Forgot Password?</Link>
                        </div>


                    </div>
                </div>
            </div>


        </>
    )
}

export default Login
