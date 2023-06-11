import { useState, useEffect } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { BsFillTrash3Fill } from "react-icons/bs";
import { db } from '../Firebase-Config';
import {collection, getDocs, addDoc, doc, deleteDoc} from '@firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatPage.css';


const ChatPage = () => {

    const [messagesStack, setMessageStack] = useState([]);
    const [text, setText] = useState('');
    const [toggleState, setToggleState] = useState(false);
    const [person, setPerson] = useState('sender');
    const [refresh, setRefresh] = useState(false);
    const [messageDelete, setMessageDelete] = useState();
    const [show, setShow] = useState(false);
    const messageCollectionRef =  collection(db, "usermessages");

    const onChangeTextHandler = (e) => {
        setText(e.target.value);
        
    }

    const addMessageHandler = async(e) => {
        e.preventDefault();
        var t = new Date();
        var h = t.getHours();
        var m = t.getMinutes();
        console.log(`Hourse ${h} and min ${m}`);
        //setMessageStack([...messagesStack, { id: messagesStack.length + 1, message: text, hours: h, min: m, person: person }])
        await addDoc(messageCollectionRef, {messages: {id: crypto.randomUUID(), message: text, hours: h, min: m, person: person}});
        {refresh === true ? setRefresh(false) : setRefresh(true)}
    };

    const onChangeToggleState = () => {
        toggleState ? setToggleState(false) : setToggleState(true);
        
    };

    const deleteShowHandler = (mid) => {
        var mexist = messagesStack.find((m) => mid == m.id);
        setMessageDelete(mexist.id);
        {show === false ? setShow(true) : setShow(false)}
    };

    const deleteMessageHandler = async (mid) => {
        const mesgDoc = doc(db, "usermessages", mid);
        console.log(mesgDoc);
        await deleteDoc(mesgDoc);

    }; 

    useEffect(() => {
        const getMessages = async () => {
            const data = await getDocs(messageCollectionRef);
            const mesdata = data.docs.map((doc) => {doc.data()});
            //console.log(mesdata);
            const mesa = mesdata.map((mdata) => mdata.messages);
            setMessageStack(mesa);
        };

        getMessages();

    }, []);

    useEffect(() => {
        {toggleState === false ? setPerson('sender') : setPerson('reciever')}
    });

    useEffect(() => {
        {toggleState === false ? setPerson('sender') : setPerson('reciever')}
    }, [refresh])

    

    return (
        <div>
            <div className='row'>
                <div className='offset-md-1 col-md-2 px-4 py-4'>
                    <BootstrapSwitchButton onlabel='ON' offlabel='OFF' size="sm" width={100} checked={toggleState} onChange={onChangeToggleState} />
                </div>
                <div className='offset-md-2 col-md-3 py-4'>
                    <h2 className='heading'>CHATBOX</h2>
                </div>
            </div>
            <ul className="chat-thread">
                {messagesStack.length === 0 ? <p style={{color: '#0AD5C1', textAlign: 'center', fontSize: '18px'}} >Start your chat</p> : messagesStack.map((mes, index) => {
                    return <div className={`${mes.person==='sender' ? 'messdir' : 'mesdir'}`}>
                        <li className='li_background' key={index} onClick={() => {deleteShowHandler(mes.id)}}>
                            {mes.message}
                            <br />
                            <div className='span_time'>{mes.hours}:{mes.min}</div>
                            { messageDelete==mes.id && show===true && <BsFillTrash3Fill onClick={() => deleteMessageHandler(mes.id)} />}
                        </li>
                    </div>
                })}
            </ul>

            <form className="chat-window" onSubmit={addMessageHandler} style={{ display: 'flex', flexDirection: 'row' }}>
                <input className="chat-window-message input_field" onChange={onChangeTextHandler} placeholder='Type Message' name="chat-window-message" type="text" autocomplete="off" autofocus />
                <button type='submit' className='btn'>Send</button>
            </form>
        </div>
    );

};

export default ChatPage;