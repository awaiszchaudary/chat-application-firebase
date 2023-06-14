import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {collection, addDoc} from '@firebase/firestore';
import bcrypt from 'bcryptjs';
import Loader from '../Loader/Loader';
import { db } from '../../Firebase-Config';
import './SignupPage.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const SignupPage = () => {

    const userCollectionRef = collection(db, "users");
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };



    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const hashedPassword = bcrypt.hashSync(password, 10);
        setIsLoading(true);
        await addDoc(userCollectionRef, {user: {id: crypto.randomUUID(), username, email, password: hashedPassword}}).then(() => {
            setIsLoading(false);
        }).catch((error) => {
            console.log(error.message);
        }); 
        navigate('/');
        setIsLoading(false);
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            {
                isLoading === true ? <Loader /> : <div className='container-fluid' style={{ backgroundColor: 'white' }}>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5074&q=80" style={{ clipPath: "polygon(0 0, 100% 0, 86% 100%, 1% 100%)", objectFit: 'cover' }} width={'649px'} height={'980px'} />
                    </div>
                    <div className='offset-md-2 col-md-6' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h1 style={{ marginBottom: '50px', paddingBottom: '100px', paddingLeft: '100px' }}>Signup</h1>
                        <form onSubmit={formSubmitHandler}>
                            <div className='col-md-12' style={{ marginBottom: '30px' }} >
                                <label style={{ marginRight: '30px' }}>Username</label>
                                <input className='input' onChange={usernameChangeHandler} value={username} placeholder='Username' />
                            </div>
                            <div className='col-md-12' style={{ marginBottom: '30px' }} >
                                <label style={{ marginRight: '60px' }}>Email</label>
                                <input className='input' onChange={emailChangeHandler} type='email' value={email} placeholder='Email' />
                            </div>
                            <div className='col-md-12'>
                                <label style={{ marginRight: '30px' }}>Password</label>
                                <input className='input' onChange={passwordChangeHandler} type='password' value={password} placeholder='Password' />
                            </div>
                            <div style={{ marginLeft: '140px', marginTop: '50px' }}>
                                <button className='button'>Signup</button>
                            </div>
    
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default SignupPage;