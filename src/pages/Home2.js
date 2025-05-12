import './Home2.css';
import profile_image from '../assets/arjuna_profile.jpeg';
import meeting_icon from '../assets/icons/Meeting Time.png';
import task_icon from '../assets/icons/Task.png';
import next_page from '../assets/icons/Next page.png';
import quote_left from '../assets/icons/Quote Left.png';
import quote_right from '../assets/icons/Get Quote.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Certificates from '../components/Certificates';

function Home2(){
    const navigate = useNavigate();
    const [course,setCourse] = useState(null);
    const [videos,setVideos] = useState(null);
    const {userCourse,authState} = useContext(AuthContext);
    
    console.log('User Course from Home : ',userCourse);
    const fetchCourse = async() => {
            const response = await api.get('/courses/get/'+userCourse?.course);
            setCourse(response.data.course);
            setVideos(response.data.courseVideos);
      
        
    }

    useEffect(() => {
        if(userCourse?.course){
            fetchCourse();
        }
        
    },[userCourse]);
    const percentage_completed = (userCourse?.completedVideos / videos?.length) * 100;
    console.log('Percentage completed :',percentage_completed);
    const width = `${percentage_completed}%`;
    return(
        <div className="home2-cont">
            <div className="sub-profile sub-div">
                <div className='home2-profile'>
                    <div className='left-profile'>
                        <img src={authState.user?.picture} alt='profile' />
                        <div className='text-info'>
                            <span className='bold-name'>{authState.user?.username}</span>
                            <div className='profession'>
                                <span className='green-circle'></span>
                                <p>Web Developer , UI & UX</p>
                            </div>
                        </div>
                    </div>
                    <div className='right-profile'>
                        <div className='tasks-complete'>
                            <p>#<span className='blue'>121</span> Tasks Completed <img src={task_icon} alt='task' /></p>
                            <p>#<span className='blue'>900</span> Hours Spent <img src={meeting_icon} alt='time' /></p>
                        </div>
                    </div>
                </div>
            </div>
            {userCourse && (

            <div className="present-dev sub-div">
            <div className="content-present-dev">
                <p className="content-present-heading">{course?.title}</p>
                <div className="progress-div">
                    <div className="progress-bar">
                        <div style={{width}} className="progressed-bar"></div>
                    </div>
                    <div className="progress-info">
                        <div className="progress-info-item">
                            <div className="progress-color"></div>
                           {userCourse && course && (
                                <span>{userCourse?.completedVideos}/{videos?.length} Videos</span>
                           )}
                        </div>
                        <div className="progress-info-item">
                            <div className="progress-color"></div>
                            <span>#{videos?.length - (userCourse?.completedVideos || 0)} Days Left</span>
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate('courses/learn?id='+userCourse?.course)} className="skill-cta">
                    <div className="cta-item">
                         <span >Continue</span>
                        <img className="cta-item-icon" alt="move" src={next_page} />
                    </div>
                </div>
            </div>
        </div>
            )}
           <Certificates/>
            <div className="quote-profile sub-div">
                <div className="quote-cont">
                    <p className="quote-container-heading">Words from 16 Years Success!</p>
                    <div className="quote">
                        <p className="main-info">With a Positive Though & Consistency , you will get compounding Focus , Energy , All you Fuel to make Imposible to Posible  , Just do Your’s Dharma </p>
                        <img className="quote-left" alt="quote" src={quote_left} />
                        <img className="quote-right" alt="quote-right" src={quote_right}/>
                    </div>
                </div>
            </div>
            <div className="home2 sub-div"></div>
        </div>
    );
}

export default Home2;