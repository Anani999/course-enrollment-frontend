import React,{useContext} from "react";
import { Route,Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
    const {authState} = useContext(AuthContext);
    return authState.isAuthenticated ? children : <Navigate to="/join" />;
}

export default PrivateRoute;