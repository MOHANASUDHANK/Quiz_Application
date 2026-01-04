import {Navigate, Outlet} from "react-router-dom"

export default function ProductedRoute = () => {

        const token  = localStorage.getItem("token");

        if(!token){
                return <Navigate path = "/login" />
        }

        return <Outlet/>

}