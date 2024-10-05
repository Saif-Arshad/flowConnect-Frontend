import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface registerProps {
    email: string;
    userName: string;
    password: string;
}
export const useUser = () => {
    const [loading, SetLoading] = useState(false)
    const navigate = useNavigate()

    const registerUser = async (data: registerProps, action: any, Image: string, randomBannerLink: string) => {
        const payload = {
            ...data,
            profileImage: Image,
            bannerImage: randomBannerLink
        }
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/register", payload)
            if (res) {
                toast.success("User registered successfully")
                navigate("/chat")
                action.resetForm()
                localStorage.setItem("pingMe_token", res.data.token)
            }
        } catch (error: any) {
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
        } finally {
            SetLoading(false)

        }
    }
    const loginUser = async (data: any, action: any) => {
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/login", data)
            if (res) {
                toast.success("Login successfully")
                action.resetForm()
                localStorage.setItem("pingMe_token", res.data.token)
                // navigate("/")
                navigate(0);
            }
        } catch (error: any) {
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
        } finally {
            SetLoading(false)

        }
    }
    const logOutUser = async () => {
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/log-out")
            if (res) {
                toast.success("Logout successfully")
                localStorage.removeItem("pingMe_token")
                navigate("/")
                window.location.reload()
            }
        } catch (error: any) {
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
        }
    }

    return {
        registerUser,
        loading,
        loginUser,
        logOutUser
    }
}
