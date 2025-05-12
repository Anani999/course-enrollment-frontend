import './loadingPage.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const LoadingPage = () => {
    const {loading} = useContext(AuthContext);
    return(
        loading && (
         
        <div className="loading-cont">
            <div className="loading-div">
                <div className="loading-animate"></div>
            </div>
            <p style={{marginTop:'20px',color:'white',fontSize:'20px'}}>Loading Please wait ...</p>
        </div>
           
        )
    );
}

export default LoadingPage;