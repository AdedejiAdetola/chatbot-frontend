import { useEffect, useState } from 'react';


const Chat = ({ socket }) => {
// users should be in different rooms
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([])


    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData.message]);
        }
    }
    
    useEffect(() => {
         socket.on('receive_message', (data) => {
            //console.log('receive message', data)
            setMessageList((list) => [...list, data]);
        })
    }, [socket])
    console.log(messageList)
    return ( 
        <div>
            <div className='chat-body'>
               {
                messageList.map((eachMessage) => {
                    return <h1 key={messageList.indexOf(eachMessage)}>{eachMessage}</h1>
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