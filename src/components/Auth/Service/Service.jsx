import axios from "axios"
import { API_URL } from '@env';


export const signUpService= async(userDetails)=>{
    const res = await axios.post(`${API_URL}/signUp`,userDetails)
    return res;
}


export const signInService= async(userDetails)=>{
    const res = await axios.post(`${API_URL}/signIn`,userDetails)
    return res;
}


export const forgotPasswordService= async(email)=>{
    const res = await axios.post(`${API_URL}/forgotPassword`,email)
    return res;
}

export const resetPasswordService= async(userDetails,id,token)=>{
    const res = await axios.post(`${API_URL}/resetPassword/${id}/${token}`,userDetails)
    return res;
}

export const getEmailVerifyService = async (token) => {
    const res = await axios.get(`${API_URL}/verifyEmail/${token}`)
    return res;
}
