import chat from '../assets/chat.png';

const Chat = ({ onClick }) => {
    return (
        <button className="w-[342px] h-[53.67px] rounded-[20px] border-solid border-2 border-black font-inter font-[300] text-[32px] flex justify-between items-center px-3">
        <h2>Chats</h2>
        <img
            src={chat}
            alt="Icon for chat"
            width={38}
            height={38}
            className="items-end"
        />
    </button>
    );
  };
  
  export default Chat;