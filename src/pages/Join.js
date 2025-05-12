import './styles/Join.css';
import { AuthContext } from '../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import api from '../api';

function Join(){
    const [message,setMessage] = useState('');
    const {setErrorMessage} = useContext(AuthContext);
    const {validateToken} = useContext(AuthContext);
    const {login,setLoading} = useContext(AuthContext);
    const [email,setEmail] = useState('');

    useEffect(() => {
        initializeGoogle();
        handleGithubLogin();
    },[]);

    function initializeGoogle(){
        try{

        
        if (window.google){
            window.google.accounts.id.initialize({
                client_id:"82166518945-p065e13c5672bosshsmdjl6691anhr00.apps.googleusercontent.com",
                callback:callBackGoogle
            });

            window.google.accounts.id.renderButton(
                document.getElementById('google-div'),
                {theme:"outline",size:"large"}
            );

        } else {
            console.error("Google API not loaded");
        }
        }catch(error){
            setMessage(error.message);
            console.log('Error while initializing Google',error)
        }
    }

    function callBackGoogle(response){
        var userObject = jwtDecode(response.credential);
        login(userObject);
        
    }

const client_id = 'Ov23liJnkPY9YC5PgGdv';

const handleGithubLogin = async() => {
    try{

        const queryString = window.location.search;
        const urlPrams = new URLSearchParams(queryString);
        const code = urlPrams.get('code');

        if(code){
            setLoading(true);
            await api.get('/auth/git?code='+code).then((response) => {
                if(response.status === 200){
                    const token = response.data.token;
                    if(token){
                        localStorage.setItem('token',token);
                        validateToken();
                    }
                }else{
                    setMessage('Code was wrong or User already exist');
                }
            });
            setLoading(false);
        }else{
            console.log('Not got any code');
        }
    }catch(error){
            setErrorMessage(error.message)
            console.error('Error while Github Login : ', error.message)
        }
};

const loginWithGithub = async() => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${client_id}`);
}

const identifyType = (input) => {
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegx = /^[0-9+\-]+$/;

    if(emailRegx.test(input)){
        return 'email';
    }else if(numberRegx.test(input)){
        return 'number';
    }else{

        alert('Invalid Phone/Email');
        return 'invalid';
    }
}

const [showCode ,setShowCode] = useState(false);

const handleButtonClick = async() => {
    const inputType = identifyType(email);

    try{

    
    if(inputType === 'invalid'){
        return alert('Invalid input type')
    }
        setLoading(true);
        const response = await api.post('/auth/phone-mail',{
            email,inputType
        });
        setLoading(false)
        if(response.status === 200){
            setShowCode(true);
            
        }else{
            if(response.data.error){
                setMessage(response.data.error);
            }
        }
    }
    catch(error){
    setErrorMessage(error.message)
    console.error('Error while Button Click : ',error.message)
    }
}
    const [code,setCode] = useState(null);
    async function handleCodeValidate(){
        try{

            setLoading(true);
            const response = await api.post('/auth/verify-code',{code,username:email});
            setLoading(false)
    

            if(response.status === 200){
                localStorage.setItem('token',response.data.token);
                validateToken();
            }
        }catch(error){
            console.error('Error while validating code !');
            setErrorMessage(error.message);
        }
    }
    return(
        <div className="join">
            <div className="join-cont">
                <h1>Gateway</h1>
                <div className='phone-email-form'>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} name='phone-email' placeholder='Phone / Mail' />
                    <button onClick={handleButtonClick} className='action-form-join' >Enter</button>
                    {showCode && (
                        <>
                        <input type='number' value={code} onChange={(e) => setCode(e.target.value)} placeholder='Code' />
                        <button onClick={handleCodeValidate} className='action-form-join' >Validate</button>
                        </>
                    )}
                                    </div>
                <p>{message}</p>
                <div className='with-social-join'>
                    <div id='google-div'></div>
                    <button onClick={loginWithGithub} className='social-join github'>
                        <span>with GitHub</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Join;