import { Configuration, OpenAIApi } from "openai";
import React, { Component } from "react";

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
        event.preventDefault();
        await this.chat();
    };

    // 스크롤을 아래로 이동하는 함수
    scrollToBottom = () => {
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };
    render() {
        const { chat_messages, question } = this.state;
        return (
            <>
                <div className="chat-container">
                    {chat_messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${
                                message.isUser ? "user" : "bot"
                            }`}
                        >
                            {message.text}
                        </div>
                    ))}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="메시지를 입력하세요..."
                            value={question}
                            onChange={this.inputQuestion}
                        />
                        <button
                            className="ui secondary button"
                            onClick={this.onChat}
                        >
                            보내기
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
