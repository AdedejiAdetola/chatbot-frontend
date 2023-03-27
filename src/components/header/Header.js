import chatbot from '../../images/chatbot-image.png';
import './styles.css';
const Header = () => {
    return ( 
        <div className='container'>
            <h1>sphinX's chatbot</h1>
            <img className='image-bot' src={chatbot} alt='chatbot' />
        </div>
     );
}
 
export default Header;