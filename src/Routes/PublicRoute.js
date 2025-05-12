import React,{useContext} from "react";
import { AuthContext } from "../Context/AuthContext";
import { Route,Navigate } from "react-router-dom";

const PublicRoute = ({children}) => {
    const {authState} = useContext(AuthContext);
    return authState.isAuthenticated ? <Navigate to="/home" /> : children ;
}

export default PublicRoute;