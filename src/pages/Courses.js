import './Courses.css';
import basic_mern from '../assets/basics_mern.png';
import double_left from '../assets/icons/double_left.png';
import double_right from '../assets/icons/double_right.png';
import {Routes,Route, useNavigate} from 'react-router-dom';
import LearnCourse from './LearnCourse';
import { useContext, useEffect, useState } from 'react';
import api from '../api';
import CourseInfo from './Course/CourseInfo';
import { AuthContext } from '../Context/AuthContext';

function Courses(){
    
    return(
        <Routes>
            <Route path='/' Component={CourseNavigator} />
            <Route path='/learn' Component={LearnCourse}/>
            <Route path='/list' Component={CoursesList} />
            <Route path='/:id' Component={CourseInfo} />
        </Routes>
    );
}


function CourseNavigator() {
    const navigate = useNavigate();
    const { userCourse } = useContext(AuthContext);

    useEffect(() => {
        console.log('User course : ',userCourse);
        if (userCourse?.completed == false) {
            navigate(`learn?id=${userCourse.course}`);
        } else {
            navigate('list');
        }
    }, [userCourse]); // Add `navigate` as a dependency

    return null; // This component doesn't render anything directly
}

function CoursesList(){
    const [userCompleted,setUserCompleted] = useState(false);
    const [courses,setCourses] = useState(null);
    useEffect(() => {
        fetchCourses();
    },[])
    const fetchCourses = async() => {
        const response = await api.get('/courses');
        console.log(response.data.courses);
        setCourses(response.data.courses);
        setUserCompleted(response.data.completedCourses);
        console.log('complete courses : ',response.data.completedCourses);
    }

    const navigate = useNavigate();
    const  CourseHandle = (id) => {
        navigate(`/home/courses/${id}`);
    }

    return(
       <div className="courses-container">
            <div className="sort-cont" style={{display:'none'}}>
                <div className="sort-one" >
                    <p>Sort By : </p>
                    <select>
                        <option>High Demand</option>
                        <option>Most Trending</option>
                        <option>Active Hiring</option>
                        </select>
                </div>
                <div className="devider"></div>
                <div className="category">
                    <p>Category : </p>
                    <select>
                        <option>Technology</option>
                        <option>Creative</option>
                        <option>Space</option>
                        <option>HealthCare</option>
                    </select>
                </div>
            </div>

            <div className="courses-connt">
                <div className="course-courasel">
                    <h2>COURSES</h2>
                    <div className="courses">
                        {courses?.map((course) => (
                            <div  onClick={!userCompleted.some(cc => cc.course === course._id) ? () => CourseHandle(course._id) : () => console.log('Course was not clicable')} className="courosal-course">
                                <div className="img-cont">
                                    <img className="img-main" src={course.thumbnail} alt="image"/>
                                    <div className="course-duration"><span>{course.duration}</span></div>
                                </div>
                                <p className="course-title">{course.title}</p>
                                <div className="extra-things-course">
                                    <div className="item-extra">
                                        <div className="circle-highlight"></div>
                                        <span>{course.experienceLevel}</span>
                                    </div>
                                    <div className="item-extra">
                                        <div className="circle-highlight"></div>
                                        <span>{course.duration}</span>
                                    </div>
                                    {console.log('Course id :',course._id)}
                                    {userCompleted?.some(cc => cc.course === course._id) && (
  <div className="item-extra">
    <div className="circle-highlight"></div>
    <span>Course Completed</span>
  </div>
)}

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="course-courasal-movers" style={{display:'none'}}>
                        <span><img src={double_left} alt="move-left" /></span>
                        <span><img src={double_right} alt="move-right" /></span>
                    </div>
                </div>
                <div className="course-courasel" style={{display:'none'}}>
                    <h2>VIDEO EDITING</h2>
                    <div className="courses">
                        <div className="courosal-course">
                                <div className="img-cont">
                                    <img className="img-main" src={basic_mern} alt="image"/>
                                    <div className="course-duration"><span>1 Week</span></div>
                                </div>
                                <p className="course-title">INtroduction to Web Development || How website work</p>
                                <div className="extra-things-course">
                                    <div className="item-extra">
                                        <div className="circle-highlight"></div>
                                        <span>Beginner</span>
                                    </div>
                                    <div className="item-extra">
                                        <div className="circle-highlight"></div>
                                        <span>10 Sessions</span>
                                    </div>
                                </div>
                        </div>
                        <div className="courosal-course">
                                <div className="img-cont">
                                    <img className="img-main" src={basic_mern} alt="image"/>
                                    <div className="course-duration"><span>1 Week</span></div>
                                </div>
                                <p className="course-title">Introduction to Web Development || How website work</p>
                                <div className="extra-things-course">
                                    <div className="item-extra">
                                        <div className="circle-highlight"></div>
                                        <span>Beginner</span>
                                    </div>
                                    <div className="item-extra">
                                        <div className="circle-highlight"></div>
                                        <span>10 Sessions</span>
                                    </div>
                                </div>
                        </div>
                        <div className="courosal-course">
                                <div className="img-cont">
                                    <img className="img-main" src={basic_mern} alt="image"/>
                                    <div className="course-duration"><span>1 Week</span></div>
                                </div>
                                <p className="course-title">INtroduction to Web Development || How website work</p>
                                <div className="extra-things-course">
                                    <div className="item-extra">
                                        <div className="circle-highlight"></div>
                                        <span>Beginner</span>
                                    </div>
                                    <div className="item-extra">
                                        <div className="circle-highlight"></div>
                                        <span>10 Sessions</span>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="course-courasal-movers" >
                        <span><img src={double_left} alt="move-left" /></span>
                        <span><img src={double_right} alt="move-right" /></span>
                    </div>
                </div>
            </div>
       </div>
    );
}

export default Courses;