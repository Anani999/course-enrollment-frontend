import './styles/Home.css';
import SocialGather from '../assets/social-descussion.jpg';
import SocialDiscussion from '../assets/social-gather-2.webp';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

function Home(){
    const {logout} = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));

    return(
        <div className='home'>
            <div className='container-home'>
                <div className='greeting-home'>
                        <p>Hey! {user.name || 'Anani'} Welcome</p>
                </div>
                    <div className='things-to-do'>
                        <p>Things to Do !</p>
                        <div className='things-items'>
                            <div className='things-item'>
                                <span>Set Target</span>
                            </div>
                            <div className='things-item'>
                                <span>Set Timings</span>
                            </div>
                            <div className='things-item'>
                                <span>Quick Start</span>
                            </div>
                        </div>
                    </div>

                    <div className='explore-social'>
                        <p className='title'>Explore Social Forums</p>
                        <div className='social-forums'>
                            <div className='social-forum'>
                                <p>New was Discussions</p>
                                <img src={SocialDiscussion} alt='image'/>
                                <div className='join-button-social'>
                                    <span>JOIN</span>
                                </div>
                            </div>
                            <div className='social-forum'>
                                <p>New was Discussions</p>
                                <img src={SocialGather} alt='image'/>
                                <div className='join-button-social'>
                                    <span>JOIN</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    
            </div>
            <div className='profile'>
                        {user?.picture ?(
                            <img onClick={logout} src={user.picture} alt='profile-pic'/>)
                            : (
                                <p onClick={logout}>Loading Image</p>
                        )}
            </div>
        </div>
    );
}

export default Home;