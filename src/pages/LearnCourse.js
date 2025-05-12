import './LeanCourse.css';
import upload_png from '../assets/icons/Upload.png';
import basic_mern from '../assets/basics_mern.png';
import lock_image from '../assets/icons/Privacy.png';
import back_image from '../assets/icons/Share.png';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import api from '../api';
import {AuthContext} from '../Context/AuthContext';


const LearnCourse = () => {
    const {setLoading} = useContext(AuthContext)
    const [video,setVideo] = useState(null);
    const navigate = useNavigate();
    const [userCourse,setUserCourse] = useState(null);
    const [course,setCourse] = useState(null);
    const [videos,setVideos] = useState(null);
    const queryString = window.location.search;
    const urlPrams = new URLSearchParams(queryString);
    const course_id = urlPrams.get('id');
    const taskfile = useRef(null);
    const [reload,setReload] = useState(0);
    const [fileText,setFileText] = useState(null);

    useEffect(() => {
        fetchCourse();
    },[reload]);

    const fetchCourse = async() => {
        setLoading(true);
        const response = await api.get('/courses/get/'+course_id);
        setLoading(false);
        setCourse(response.data.course);
        setVideo(response.data.courseVideos[0]);
        setVideos(response.data.courseVideos);
        const response2 = await api.get('/courses/user/info');
        setUserCourse(response2.data?.info);
    }
    const backNavigate = () => {
        navigate(-1);
    }

    const clickMiniVideo = (video,index) => {
        if(index<= userCourse?.completedVideos){
            setVideo(video);
        }
    }

    const handleTaskChange = async(event) => {
        const file = event.target.files[0];
        
        if(file){

            const reader = new FileReader();

            reader.onload = async function (e) {
                const content = e.target.result; // File content as a string
                setFileText(content);
            
    
            const formData = new FormData();
            formData.append('file',file);
            formData.append('fileContent',content);
            console.log('User code : ',fileText);
            formData.append('course_id',course._id);
            formData.append('video_id',video._id);

            try{
            
                setLoading(true);
                const response = await api.post('/courses/task-upload',formData,{
                    headers:{
                        'Content-Type':'multipart/form-data',
                    },
                });
                setLoading(false);
                if(response.status === 200){
                    alert("Success Upload file : ",response.data);
                    fetchCourse();
                }else if(response.status === 400){
                    alert("Validation was failed correct the code");
                }

            }catch(err){
                    console.log('Error while Validating the task',err);
                    alert('The task was not correct try again');
                    setLoading(false);
            };


        };

        reader.readAsText(file);
        }
    };

    const pickFile = () => {
        taskfile.current.click();
    }
    return(
        <div className="learn-course">
            <div className="left-learn-course">
                <div className="header-left-course">
                    <h2>{course?.title}</h2>
                    <div className="back-header-absolute">
                        <img onClick={backNavigate} src={back_image} alt="back" />
                    </div>
                </div>
                    <div className="main-video-cont">
                        <video controls autoplay loop  src={video?.video} >Browser not supported</video>
                        <div className="video-footer-left">
                            <p>{video?.title}</p>
                            <div className="video-footer-infographic">
                                <div className="inforgraphic-video-footer">
                                    <div className="circle-infographic"></div>
                                    <span>Session 1</span>
                                </div>
                                <div className="inforgraphic-video-footer">
                                    <div className="circle-infographic"></div>
                                    <span>Day #1</span>
                                </div>
                            </div>
                        </div>
                        <div className="task-video">
                            <p>Session Task</p>
                            <div className="tast-session">
                                <p>{video?.task}</p>
                                <div className="upload-seperate-div" onClick={pickFile}>
                                    <img src={upload_png} alt="upload-logo"/>
                                    <input type='file' ref={taskfile} accept='.js,.html,.css,.txt' onChange={handleTaskChange} style={{display:'none'}} />
                                    <p>Upload File</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="right-learn-course">
                <p className="little-heading">Next Sessions</p>
                <div className="next-video-sessions">
                    {videos?.map((video,index) => (
                         <div  className={index <= userCourse?.completedVideos ? "video-session video-session-visible" : "video-session"} onClick={() => clickMiniVideo(video,index)}>
                         <div className="thumbnail-section">
                             <img src={video.thumbnail} alt="thumbnail"></img>
                         </div>
                             <div className="info-video">
                                 <p>{video.title}</p>
                                 <div className="video-action-absolute">
                                     <div className="circlen-action"></div>
                                     <span>Day1</span>
                                 </div>
                             </div>
                         <div className="locked-div">
                             <img src={lock_image} alt="logcked"/>
                         </div>
                     </div>
                    ))}
            </div>
            {userCourse?.completed && (
            <div className='user-learn-course-completed'>
                <h2 style={{color:'gold'}}>Course Completed</h2>
                <p>Congratulations! you have successfully completed tasks and completed this course, so we had issued the course completion certificate </p>
                <a href={userCourse?.certificate} download>
    <button style={{ background: 'gold', color: 'black' }}>Download Certificate</button>
</a>
<a href={userCourse?.certificate} target="_blank" rel="noopener noreferrer">
    <button>View Certificate</button>
</a>

            </div>
            )}
        </div></div>

    );
}

 export default LearnCourse;