import React, { useEffect, useState } from "react";
import socket from "../services/socket/socket";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

export const Chat = () => {
    // const name = useSelector((state: any) => state.register);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const name = localStorage.getItem('name');
    const roomId = localStorage.getItem('roomId');
    
    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentMessage(e.target.value);

  const sendMessage = async () => {
    try {
        if (currentMessage !== "") {
            const messageData = {
                room: Number(roomId),
                author: name,
                message: currentMessage,
                time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };

            socket.emit("send_message", messageData);
            //   setMessageList((list) => [...list, messageData]);
            //   setCurrentMessage("");
            }
    } catch(error: any) {
        console.log(error.message);
    }
    
  };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageList((list) => [...list, data]);
//     });
//   }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {/* <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={name === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom> */}
      </div>
      <div className="chat-footer">
        <input
          type="text"
        //   value={currentMessage}
          placeholder="Write here..."
          onChange={ handleMessage }
        //   onKeyPress={(event) => {
        //     event.key === "Enter" && sendMessage();
        //   }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}