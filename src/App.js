import { useState } from "react";
import summary_using_chatgpt from "./components/summary";
import chat_using_chatgpt from "./components/chatbot";
import "semantic-ui-css/semantic.min.css";
import MenuSecondaryPointing from "./components/Menu";

export default function Home() {
    // 요약 서비스
    const [sentence, setSentence] = useState("");
    const [summary, setSammary] = useState("");

    const inputSentence = (event) => setSentence(event.target.value);
    const onSummary = async (event) => {
        event.preventDefault();
        console.log(sentence);
        let summary_sentence = await summary_using_chatgpt(sentence);
        if (sentence === "") {
            return;
        }
        setSammary(summary_sentence);
        return;
    };

    // 챗봇 서비스
    const [answer, setAnswer] = useState([]);
    const [question, setQuestion] = useState([]);

    const addAnswer = (text, isUser = false) => {
        setAnswer((prevMessages) => [...prevMessages, { text, isUser }]);
    };

    const inputQuestion = (event) => setQuestion(event.target.value);
    const onChat = async (event) => {
        event.preventDefault();
        let chat_answer = await chat_using_chatgpt(question);
        if (question === "") {
            return;
        }
        addAnswer(question, true);
        if (question.trim() === "") return;
        addAnswer(chat_answer);
        setQuestion("");
        scrollToBottom();
        return;
    };

    // 스크롤을 아래로 이동하는 함수
    const scrollToBottom = () => {
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    return (
        <>
            <div className="app-container">
                <MenuSecondaryPointing />

                <br />
                <div className="input-box">
                    <form className="summary-form">
                        <input
                            onChange={inputSentence}
                            value={sentence}
                            type="text"
                            placeholder="요약 할 내용을 입력하세요."
                        ></input>
                        <button
                            className="ui secondary button"
                            variant="contained"
                            onClick={onSummary}
                        >
                            요약하기
                        </button>
                        <h3 className="">{summary}</h3>
                    </form>
                </div>

                <br />
                {answer.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.isUser ? "user" : "bot"}`}
                    >
                        {message.text}
                    </div>
                ))}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        value={question}
                        onChange={inputQuestion}
                    />
                    <button className="ui secondary button" onClick={onChat}>
                        보내기
                    </button>
                </div>
            </div>
        </>
    );
}
