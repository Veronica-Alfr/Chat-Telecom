import React, { useEffect, useState } from "react";
import socket from "../services/socket/socket";
import ScrollToBottom from "react-scroll-to-bottom";
import { useAppDispatch } from "../store/store";
import { chat } from "../store/features/chat";
import { chatData } from "../services/user";
import { IChat } from "../interfaces/IChat";

export const Chat = () => {
    const room = localStorage.getItem('roomId');
    const roomId = Number(room);
    const socketRoom = socket.emit("join_room", roomId);

    const dispatch = useAppDispatch();

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState<IChat[]>([]);

    const name = localStorage.getItem('name');
    
    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentMessage(e.target.value);

  const sendMessage = async () => {
        if (currentMessage !== '') {
            const time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();

            dispatch(chat({ name, roomId, message: currentMessage, time }))

            const dataChat = await chatData({ name, roomId, message: currentMessage, time });

            socketRoom.emit("send_message", dataChat);

            setMessageList((list) => [...list, dataChat]);
        }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={name === messageContent.name ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
            type="text"
            value={currentMessage}
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