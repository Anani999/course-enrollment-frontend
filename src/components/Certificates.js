import { useEffect, useState } from 'react';
import './Certificates.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import addbase from '../utils/addbase';

const Certificates = () => {
    const [certificates,setCertificates] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCertificates();
    },[]);

    const onCourseClick = (course_id) => {
        navigate('/home/courses/'+course_id);
    }

    const fetchCertificates = async(req,res) => {
        try{
            const response = await api.get('/certificates');
            if(response.status === 200){
                setCertificates(response.data.certificates);
            }else{
                console.log('Got another status while fetching certificates');
            }
        }catch(error){
            console.error('Error while fetching course : ',error.message)
        }
    }
    console.log('Certificates : ',certificates);
    return(
        <div className={certificates ? '' : 'block'}>
        
    <div className='h2-user-certificates flex flex-wrap gap-10'>
        {certificates?.map((certificate,index) => (
             <div className='h1-user-certificate' id={`certificate-${index}`}>
            <h2>Your Certificates</h2>
             <img width={200} height={140} src={certificate.course.thumbnail} alt='certifiate-img'/>
             <p>Course : <b>{certificate.course.title}</b></p>
             <button onClick={() => onCourseClick(certificate.course._id)}>Course Details</button>
             <a href={addbase()+certificate.certificate} ><button>View</button></a>
             <a href='' ><button>Share</button></a>
         </div>
        ))}
    </div></div>
    );
}

export default Certificates;