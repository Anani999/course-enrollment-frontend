import React,{createContext, useEffect, useState} from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated:false,
        user:null,
    });
    const [errorMessage,setErrorMessage] = useState(null);
    const [loading,setLoading] = useState(false);
    const [userCourse,setUserCourse] = useState(null);

    useEffect(() => {
        validateToken();
        localStorage.setItem('token','testing213213123');
        let token = localStorage.getItem('token');
        console.log('Token set : ',token);
    },[]);

    const clearError = () => {
        setErrorMessage(null);
    }

    const validateToken = async() => {
        const token = localStorage.getItem('token');
        try{
        if(!token){
            return setAuthState({
                isAuthenticated:false,user:null
            });
        };

        setLoading(true);
        const response = await api.post('/user/',{
            token
        });
        setLoading(false);

        console.log('Status code from backend : ',response.status);
        if(response.status === 200){
            
            setAuthState({isAuthenticated:true,
                user:response.data
            });
            checkUserCourse();
        }else if(response.status === 401){
            setLoading(false);
            setErrorMessage('Token expired !');
            console.log('Error while Authenticating user');
            
        }else if(response.status === 500){
            setLoading(false);
            setErrorMessage('Server was busy !');
            console.log('Error while Authenticating user');
            
        }
    }catch(error){
        setLoading(false);
        // localStorage.removeItem('token');
        setErrorMessage(error.message)
        console.error('Erro while validating user ',error.message);
    }
    
    }

    const login = async(user) => {
        
        try{
            setLoading(true);
            const response = await api.post('/auth/google',{
                user
            });
            setLoading(false);

            if(response.status === 200){
                const token = response.data.token;
                localStorage.setItem('token',token);
                validateToken();
            }
        }catch (err){
            setErrorMessage(err.message);
            console.error(err);
        }
    };
    const logout = () => {
        try{

        }catch(error){
            setErrorMessage(error.message);
            console.error('Error while logging our user : ',error);
        }
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuthState({isAuthenticated:false,user:null});
    }

    async function checkUserCourse(){
        try{
            const response = await api.get('/courses/user/info');
            if(response.status === 200){
                const userCourse = response.data.info;
                console.log('User Course : ',userCourse);
                setUserCourse(userCourse);
            }
        }catch(error){
            console.error('Error while getting user Course : ',error.message);
        }
        
    }

    return(
        <AuthContext.Provider value={
            {authState,
                errorMessage,
                setErrorMessage,
                validateToken,
                login,clearError,
                logout,
                setLoading,
                loading,
                userCourse,
            }
            }>
            {children}
        </AuthContext.Provider>
    );
};