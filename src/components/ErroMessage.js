import './ErroMessage.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const ErrorMessage = () => {
    const {errorMessage,setErrorMessage,clearError} = useContext(AuthContext);
    return(
        <>
        {errorMessage && (
            <div className='errorMessage'>
            <p>{JSON.stringify(errorMessage)}</p>
            <span onClick={clearError}>X</span>
          </div>
          )}
        </>
    )
}

export default ErrorMessage;