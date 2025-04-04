import { createContext , useContext, useEffect, useState } from "react";
import {toast,Toaster} from "react-hot-toast"
import axios from "axios"
import {server} from "../main"

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [btnLoading, setBtnLoading] = useState(false);

    async function loginUser(email, navigate) {
        setBtnLoading(true);
        try{
            // send email to server and register 
            const {data} = await axios.post(`${server}/api/user/login`, {email});
            console.log(data);
            toast.success(data.message);
            localStorage.setItem("verifyToken",data.verifyToken);
            navigate("/verify"); // Navigate to verify page
            setBtnLoading(false);
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || 
                               err.message || 
                               "Login failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setBtnLoading(false);
        }
    }

    //verify

    const [user, setUser] = useState([])
    const [isAuth, setIsAuth] = useState(false);

    async function verifyUser(otp, navigate, fetchChats) {
        const verifyToken = localStorage.getItem("verifyToken");

        if(!verifyToken) {
            return toast.error("Please give token");
        }

        setBtnLoading(true);
        try{
            // send email to server and register 
            const {data} = await axios.post(`${server}/api/user/verify`, {otp, verifyToken});
            toast.success(data.message);
            localStorage.clear();

            localStorage.setItem("token",data.token);
            navigate("/home"); // Navigate to verify page
            setBtnLoading(false);
            setIsAuth(true);
            setUser(data.user);
            fetchChats();
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || 
                               err.message || 
                               "Login failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setBtnLoading(false);
        }
    }

    // loading state handle
    const [isLoad, setIsLoad] = useState(true);

    // fetch data by token of user

    async function fetchUser() {
        try {
            const data = await axios.get(`${server}/api/user/me`, 
                {
                    headers:{
                        token: localStorage.getItem("token"),
                    }
                })
            setIsAuth(true);
            setUser(data);
            setIsLoad(false);
        } catch (error) {
            console.log(error);
            setIsAuth(false);
            setIsLoad(false);
        }
    }

    //logout
    const handleLogout = (navigate) => {
        if(confirm("Are you sure to logout ?")){
          localStorage.clear();
          setIsAuth(false)
          setUser([])
          navigate("/login");
          toast.success("Logout successfully");
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);    

    return (
        <UserContext.Provider value={{loginUser, btnLoading, isAuth, setIsAuth, user, verifyUser, isLoad, handleLogout}}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);



