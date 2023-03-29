import { useEffect, useState } from 'react';
import './styles.css'


const Chat = ({ socket }) => {
// users should be in different rooms
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([])


    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                message: currentMessage,
                time: String(new Date(Date.now()).getHours()).padStart(2,0) + ":" + String(new Date(Date.now()).getMinutes()).padStart(2,0),
                you: true
            };

            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }
    
    useEffect(() => {
         socket.on('receive_message', (data) => {
            //console.log('receive message', data)
            setMessageList((list) => [...list, data]);
        })
        return function cleanup() {socket.off('receive_message')}
    }, [socket])

    console.log(messageList)
    return ( 
        <div className='contained'>
            <div className='chat-body'>
               {
                messageList.map((eachMessage) => {
                    return (

                        <div className={`${eachMessage.you ? 'you' : 'bot'}`}>
                            <p className='content'>{eachMessage.message}</p>
                            <p className='time'>
                                {eachMessage.time}
                            </p>
                        </div>
                        
                    )
                })
                
               } 
               
               
            </div>
            <div className="chat-footer">
                <input type='text' placeholder='send message' onChange={(e) => setCurrentMessage(e.target.value)}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
     );
}
 
export default Chat;