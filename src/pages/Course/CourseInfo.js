import { useNavigate, useParams } from 'react-router-dom';
import './CourseInfo.css';
import { useEffect, useState } from 'react';
import api from '../../api';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';

const CourseInfo = () => {

    const {id} = useParams();

    const {setErrorMessage} = useContext(AuthContext);

    const navigate = useNavigate();

    const  clickHandle = async() => {
        const response  = await api.get(`/courses/start/${id}`);
        if(response.status === 200){
            navigate(`/home/courses/learn?id=${id}`);
            
        }else{
            setErrorMessage("Error while Starting course");
        }
    };

    useEffect(() => {
        try{
            fetchCourse();
        }catch(err){
            setErrorMessage('Error while Fetching course');
        }
        
    },[]);

    
    async function fetchCourse(){
        const response = await api.get(`/courses/get/${id}`);
        setCourse(response.data.course);
        setVideos(response.data.courseVideos);
        setCompletedCourse(response.data.userCompleted);
        
    }

    const [course,setCourse] = useState(null);
    const [videos,setVideos] = useState(null);
    const [completedCourse,setCompletedCourse] = useState(false);

    return (
        <div className='course-info'>
            <h1>{course?.title}</h1>
            <div className='course-info-content'>
                <img src={course?.thumbnail} alt='thumbnail' />
                <div className='info-content-shortcuts'>
                    <div className='line-info-content'>
                        <div className='circle-button'></div>
                        <span>{course?.experienceLevel}</span>
                    </div>
                    <div className='line-info-content'>
                        <div className='circle-button'></div>
                        <span>{videos?.length} sessions</span>
                    </div>
                    <div className='line-info-content'>
                        <div className='circle-button'></div>
                        <span>{course?.duration}</span>
                    </div>
                    {completedCourse &&  (
                    <div className='line-info-content'>
                        <div className='circle-button'></div>
                        <span>Completed Course</span>
                        <button>Download Certificate</button>
                    </div>
                    )}
                </div>
            </div>
            <div className='course-info-description'>
                <p>{course?.description}</p>
            </div>
            {!completedCourse && (
                <button onClick={clickHandle} className='action-button-course-info'>Start Course</button>
            )}
        </div>
    );
};

export default CourseInfo;
