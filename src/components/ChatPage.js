import { useState, useEffect } from 'react';
import { BsFillTrash3Fill } from "react-icons/bs";
import { db } from '../Firebase-Config';
import { collection, getDocs, addDoc, doc, deleteDoc } from '@firebase/firestore';
import './ChatPage.css';


const ChatPage = () => {
    const messageCollectionRef = collection(db, "usermessages");
    const [messagesStack, setMessageStack] = useState([]);
    const [text, setText] = useState('');
    const [toggleState, setToggleState] = useState(false);
    const [person, setPerson] = useState('sender');
    const [messageDelete, setMessageDelete] = useState();
    const [show, setShow] = useState(false);
    

    const onChangeTextHandler = (e) => {
        setText(e.target.value);

    }

    const addMessageHandler = async (e) => {
        e.preventDefault();
        var date = new Date();
        // console.log(`Hourse ${h} and min ${m}`);
        //setMessageStack([...messagesStack, { id: messagesStack.length + 1, message: text, hours: h, min: m, person: person }])
        await addDoc(messageCollectionRef, { messages: { id: crypto.randomUUID(), message: text, createdAt: date, person: person } });
        getMessages();
        setText('');
    };

    const onChangeToggleState = () => {
        toggleState ? setToggleState(false) : setToggleState(true);

    };

    const deleteShowHandler = (mid) => {
        var mexist = messagesStack.find((m) => mid == m.messages.id);
        setMessageDelete(mexist.messages.id);
        { show === false ? setShow(true) : setShow(false) }
    };

    const deleteMessageHandler = async (did) => {
        const mesgDoc = doc(db, "usermessages", did);
        console.log(mesgDoc);
        await deleteDoc(mesgDoc);

    };

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        const data = await getDocs(messageCollectionRef);
        //const mesdata = data.docs.map((doc) => doc.data());
        let mesdata = [];
        data.docs.forEach((doc) => {
            mesdata.push({...doc.data(), did: doc.id});
        })
        console.log(mesdata);
        //const mesa = mesdata.map((mdata) => mdata.messages);
        const mesa = mesdata.map((mdata) => mdata);
        setMessageStack(mesa);
        console.log(messagesStack);
    };

    useEffect(() => {
        { toggleState === false ? setPerson('sender') : setPerson('reciever') }
    }, [])

    const renderTimeOfMessage = (datetime) => {
        const milliseconds = datetime?.seconds * 1000;
        const date = new Date(milliseconds);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${year}-${month}-${day}, at ${hour}:${minute}:${second}`;
    }



    return (
        <div>
            <div className='row'>
                <div className='offset-md-1 col-md-2 px-4 py-4'>
                    <input type='checkbox' checked={toggleState} onChange={onChangeToggleState} /> 
                </div>
                <div className='offset-md-2 col-md-3 py-4'>
                    <h2 className='heading'>CHATBOX</h2>
                </div>
            </div>
            <ul className="chat-thread">
                {messagesStack.length === 0 ? <p style={{ color: '#0AD5C1', textAlign: 'center', fontSize: '18px' }} >Start your chat</p> : messagesStack.map((mes, index) => {
                    return <div className={`${mes.messages.person === 'sender' ? 'messdir' : 'mesdir'}`}>
                        <li className='li_background' key={index} onClick={() => { deleteShowHandler(mes.messages.id) }}>
                            {mes.messages.message}
                            <br />
                            <div className='span_time'>{renderTimeOfMessage(mes.messages?.createdAt)}</div>
                            {messageDelete == mes.messages.id && show === true && <BsFillTrash3Fill onClick={() => deleteMessageHandler(mes.did)} />}
                        </li>
                    </div>
                })}
            </ul>

            <form className="chat-window" onSubmit={addMessageHandler} style={{ display: 'flex', flexDirection: 'row' }}>
                <input className="chat-window-message input_field" onChange={onChangeTextHandler} placeholder='Type Message' name="chat-window-message" type="text" autocomplete="off" value={text} autofocus />
                <button type='submit' className='btn'>Send</button>
            </form>
        </div>
    );

};

export default ChatPage;

//{messageDelete == mes.messages.id && show === true && <BsFillTrash3Fill onClick={() => deleteMessageHandler(mes.did)} />}