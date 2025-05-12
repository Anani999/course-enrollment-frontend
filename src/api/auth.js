import api from '../api';

const loginMobile = async(email) => {
    try{
        // make the request
        let result = await api.post('/api/auth/mobile', {
            email,
            inputType:'phone'
        });

        return result.data;
        
    }catch(err){
        console.log(err);
        throw err;
    }
}