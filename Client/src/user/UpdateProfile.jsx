import axios from 'axios';
import React, {
    useEffect,
    useState
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../components/Context-State/auth';

const UpdateProfile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [initialId, setInitialId] = useState(params._id);
    const [user, setUser] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/auth/get-user-by-id/${initialId}`);
            setUser(data);
            setName(data.user.name);
            setEmail(data.user.email);
            setAddress(data.user.address);
            setPhone(data.user.phone);
            setGender(data.user.gender);
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        try {
            const {data} = await axios.put(`http://localhost:8080/api/v1/auth/update-user/${initialId}`, { name, email, phone, address, gender });
            if (data.success) {
                toast.success("User Updated Successfully");

                setAuth({...auth, user: data.user});
                navigate('/home');
            }
            localStorage.setItem("auth", JSON.stringify(auth));
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">

                <div className=" grid mt-0 grid-flow-row gap-3 lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-fit   p-6 round-xl shadow-md shadow-slate-400 overflow-x-auto">
                    <div className="relative justify-center place-content-center">
                        <img className='lg:w-full lg:h-[500px] h-60' src="https://niceillustrations.com/wp-content/uploads/2020/09/Person-With-Shopping-Cart.png" alt=""/>
                    </div>
                    <div className="">
                        <h1 className='text-center text-4xl lg:text-6xl py-5 '>Update Profile</h1>

                        <div className="form grid grid-flow-row  lg:grid-cols-2   gap-2  mt-5">

                            <div className="inputBox flex flex-col gap-1">
                                <label htmlFor="Name">Full Name:</label>
                                <input value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }} type="text" name='name' required className='outline-black border-b-2 px-2 rounded-md shadow-sm' placeholder='Enter Your Name'/> {/* Throw error if Empty */} </div>

                            <div className="inputBox flex flex-col gap-1">
                                <label htmlFor="email">Email Address:</label>
                                <input value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} type="email" name='email' required className='outline-black border-b-2 px-2 rounded-md shadow-sm' placeholder='Enter email address'/></div>

                            <div className="inputBox flex flex-col gap-1">
                                <label htmlFor="address">Address:</label>
                                <input value={address} onChange={(e) => {
                                    setAddress(e.target.value)
                                }} type='location' name='address' required className='outline-black border-b-2 px-2 rounded-md shadow-sm' placeholder='Enter email address'/>
                            </div>

                            <div className="inputBox flex flex-col gap-1">
                                <label htmlFor="phone">Phone:</label>

                                <input value={phone} onChange={(e) => {
                                    setPhone(e.target.value)
                                }} type="text" required name='phone' placeholder="Enter phone number"/></div>
                           
                            <div className="inputBox flex flex-col gap-1">
                                <label htmlFor="gender">Gender:</label>
                                <div className="flex gap-4 justify-around">
                                    <div className="flex">
                                        <label htmlFor="male">Male:</label>
                                        <input type="radio"
                                            value={'male'}
                                            onChange={
                                                (e) => setGender(e.target.value)
                                            }
                                            name="gender"
                                            id=""/>
                                    </div>
                                    <div className="flex">
                                        <label htmlFor="female">Female:</label>
                                        <input type="radio"
                                               onChange={
                                                (e) => setGender(e.target.value)
                                            }
                                            value={'female'}
                                            name="gender"
                                            id=""/>
                                    </div>
                                    <div className="flex">
                                        <label htmlFor="Others">Others:</label>
                                        <input type="radio"
                                               onChange={
                                                (e) => setGender(e.target.value)
                                            }
                                            value={'others'}
                                            name="gender"
                                            id=""/>
                                    </div>
                                </div>


                            </div>


                        </div>
                        <button onClick={handleUpdate} className='mt-1 bg-blue-500 p-2 w-full text-white'>Update</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdateProfile