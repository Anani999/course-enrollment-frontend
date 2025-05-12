import './styles/PublicPage.css';
import { useNavigate } from 'react-router-dom';


function PublicPage(){


const goTo = useNavigate();
const handleBegin = () => {
    goTo('/join');
}

    return(
       <div className='public-page'>
            <div className='up-public-card'>
                    <div>
                        <h1>Lets Innovate Together</h1>
                        <p>We are at the forefront to NextGet Education</p>
                    </div>
                    <div className='bigin-button' onClick={handleBegin}>
                        <span>BEGIN YOUR JOURNEY</span>
                    </div>
                </div>
                <div className='bg-image'>
                    
                </div>
       </div>
    );
}

export default PublicPage;