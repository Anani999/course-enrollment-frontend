import { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import api from '../../api';
import {AuthContext} from '../../Context/AuthContext';
import logout_icon from '../../assets/icons/Logout Rounded.png';
import plus_icon from '../../assets/icons/Plus.png';
import pencil_icon from '../../assets/icons/Edit.png';
import delete_icon from '../../assets/icons/Delete.png';
import {Routes,Route, useNavigate} from 'react-router-dom';
import CreateCourse from './CreateCourse';

const Dashboard = () => {
    return(
        <Routes>
            <Route path='/' Component={DashboardPage}/>
            <Route path='/create-course' element={<CreateCourse itsCourse={null} Course={null}/>} />
        </Routes>
    );
}

const HiPage = () => {
    return (<h1>Hello world </h1>);
}
const DashboardPage = () => {
    const navigate = useNavigate();
    const {setErrorMessage} = useContext(AuthContext);
    const [courses,setCourses] = useState([]);

    const fetchCourses = async() => {
        try{
            const response = await api.get('/courses');
            setCourses(response.data.courses);
        }catch(error){
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        fetchCourses();
    },[])
    return(
        <div className='admin-dashboard'>
            <div className='content-dashboard'>
                <div className='up-dashboard'></div>
                <div className='low-dashboard'>
                    <div className='low-left-dashboard'></div>
                    <div className='low-right-dashboard'>

                        <div className='course-righd'>
                            <p>Courses</p>
                            <img onClick={() => navigate('create-course')} src={plus_icon} alt='plus' />
                        </div>
                        <div className='list-courses'>
                            {courses?.map((course,index) => (
                            <div className='course-in-list'>
                                <img className='course-bg' alt='bg course' src={course.thumbnail} />
                                <div className='hover-course-div'>
                                    <div className='hover-cont-cont'>
                                        <img className='icon-hover-cont' alt='pencil' src={pencil_icon}/>
                                        <img className='icon-hover-cont' alt='delete' src={delete_icon}/>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='back-dashboard'>
                <img src={logout_icon} alt='back' />
            </div>
        </div>
    )
}

export default Dashboard;