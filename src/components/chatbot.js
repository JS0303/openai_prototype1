import { Configuration, OpenAIApi } from "openai";
import React, { Component } from "react";
import { Icon, Message } from "semantic-ui-react";
import "./Chatbot.css";

const configuration = new Configuration({
    organization: "org-UaLK1XJ9fsXDUO8SYXy9INaf",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function chat_using_chatgpt(chatMessages) {
    let model = "gpt-3.5-turbo";
    let messages = [{ role: "user", content: chatMessages }];

    const response = await openai.createChatCompletion({
        model: model,
        messages: messages,
    });

    const chat_answer = response.data.choices[0].message.content;

    return chat_answer;
}

export default class Chatbot extends Component {
    state = {
        chat_messages: [],
        question: "",
    };
    // 챗봇 서비스
    chat = async () => {
        const { chat_messages, question } = this.state;

        if (question.trim() === "") {
            return;
        }

        this.setState({
            chat_messages: [...chat_messages, { text: question, isUser: true }],
            question: "", // 질문 내용 초기화
        });

        let chatted = await chat_using_chatgpt(question);

        this.setState((prevState) => ({
            chat_messages: [
                ...prevState.chat_messages,
                { text: chatted, isUser: false },
            ],
        }));
        this.scrollToBottom();
    };
    inputQuestion = (event) => this.setState({ question: event.target.value });

    onChat = async (event) => {
        await this.chat();
    };

    // 스크롤을 아래로 이동하는 함수
    constructor(props) {
        super(props);
        this.messageContainerRef = React.createRef(); // ref 생성
    }

    scrollToBottom = () => {
        if (this.messageContainerRef.current) {
            const chatContainer = this.messageContainerRef.current;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    // 엔터 키 처리 함수
    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.onChat();
        }
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const { chat_messages, question } = this.state;
        return (
            <>
                <div className="chat-container">
                    <div
                        className="message-container"
                        ref={this.messageContainerRef}
                    >
                        {chat_messages.map((message, index) => (
                            <Message
                                key={index}
                                className={`message ${
                                    message.isUser
                                        ? "user ui violet chatbot message"
                                        : "bot ui teal chatbot message"
                                }`}
                            >
                                {message.isUser
                                    ? `사용자 : ${message.text}`
                                    : `봇 : ${message.text}`}
                            </Message>
                        ))}
                    </div>

                    <div className="input-box chatbot">
                        <div className="ui fluid action input">
                            <input
                                type="text"
                                placeholder="메시지를 입력하세요..."
                                value={question}
                                onChange={this.inputQuestion}
                                onKeyPress={this.handleKeyPress} // 엔터 키 처리
                            />

                            <button
                                className="ui grey button"
                                onClick={this.onChat}
                            >
                                <Icon name="paper plane" />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
