"use client"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { logOutAsync, selectLoggedInUser} from "@/Redux/slices/authSlice";

function LogOut() {
    const dispatch = useDispatch()

    const user = useSelector(selectLoggedInUser)

    useEffect(() => {
        dispatch(logOutAsync())
    })
    return ( 
        <>
            {!user && <Navigate to="/login" replace={true} ></Navigate>}
        </>
     );
}

export default LogOut;