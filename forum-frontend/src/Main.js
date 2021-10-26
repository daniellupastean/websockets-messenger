import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";

const socket = io("http://localhost:3002");

const Main = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const messagesEndRef = useRef(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      const today = new Date();
      const sendTime =
        today.getHours() +
        ":" +
        (today.getMinutes() < 10 ? "0" : "") +
        today.getMinutes();
      socket.emit("message", { name, message, sendTime });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("message", (incomingMessage) => {
      setChat((prevChat) => [...prevChat, incomingMessage]);
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const renderChat = () => {
    return (
      chat.length > 0 && (
        <>
          {chat.map((item, index) => (
            <StyledMessage
              key={index}
              mine={item.name === name}
              same={index > 0 && chat[index - 1].name === item.name}
            >
              {index > 0 && chat[index - 1].name === item.name ? (
                ""
              ) : (
                <StyledMessageAuthor>{item.name}</StyledMessageAuthor>
              )}
              {item.message}
              <StyledMessageTime>{item.sendTime}</StyledMessageTime>
            </StyledMessage>
          ))}
        </>
      )
    );
  };

  return (
    <Container>
      <StyledTitle>Messenger</StyledTitle>
      <InnerContainer>
        <StyledChatLog>
          {renderChat()}
          <div ref={messagesEndRef} />
        </StyledChatLog>
        <StyledInputSection
          onSubmit={handleMessageSubmit}
          autoComplete="off"
          spellCheck="false"
        >
          <div>
            <StyledNameInput
              type="text"
              onChange={handleNameChange}
              value={name}
              id="name-input"
              placeholder="Name"
            />
            <StyledMessageInput
              type="text"
              onChange={handleMessageChange}
              value={message}
              id="message-input"
              placeholder="Message..."
            />
            <StyledButton>
              <IoMdSend />
            </StyledButton>
          </div>
        </StyledInputSection>
      </InnerContainer>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(
    335deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(5, 5, 25, 1) 67%,
    rgba(8, 46, 69, 1) 100%
  );
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 85vh;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(1000px);
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fa8166;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  color: white;
  font-weight: 500;
  padding: 10px;
  text-transform: uppercase;
  &:hover {
    background: #fe5932;
  }
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: grey;
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 20px;
`;

const StyledNameInput = styled.input`
  width: 100%;
  max-width: 150px;
`;
const StyledMessageInput = styled.input`
  flex: 1 1;
  margin: 0 15px;
`;

const StyledChatLog = styled.div`
  user-select: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
`;

const StyledInputSection = styled.form`
  user-select: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  div {
    margin: 10px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledMessage = styled.h3`
  background: ${(p) => (p.mine ? "lightgrey" : "#fa8166")};
  padding: 8px;
  font-weight: 500;

  border-radius: ${(p) =>
    p.same ? "15px" : p.mine ? "15px 0px 15px 15px" : "0px 15px 15px 15px"};
  align-self: ${(p) => p.mine && "flex-end"};
  margin: 2px;
  margin-left: ${(p) => p.mine && "20%"};
  margin-right: ${(p) => !p.mine && "20%"};
  margin-top: ${(p) => (p.same ? "1px" : "5px")};
  min-width: 70px;
`;

const StyledMessageTime = styled.div`
  text-align: right;
  margin-top: 2px;
  margin-right: 2px;
  font-size: 8px;
  opacity: 0.7;
`;

const StyledMessageAuthor = styled.div`
  text-align: left;
  margin-bottom: 2px;
  font-size: 12px;
  opacity: 0.7;
`;
