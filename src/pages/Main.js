import {Route,Routes} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Home2 from './Home2';
import Courses from './Courses';
import Jobs from './Jobs';

const Main = () => {
    return(
        <div className='home2 l-container'>
            <Navbar/>
            <div className='home2-content'>
                <Routes>
                    <Route path='/' Component={Home2} />
                    <Route path='/courses/*' Component={Courses} />
                    <Route path='/jobs' Component={Jobs} />
                </Routes>
            </div>
        </div>
    );
}

export default Main;