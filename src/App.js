import { useState } from "react";
import translate_text_using_chatgpt from "./components/translator";
import order from "./components/copywriter";
import summary_using_chatgpt from "./components/summary";
import chat_using_chatgpt from "./components/chatbot";

export default function Home() {
    // 번역 서비스
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [srcLang, setSrcLang] = useState("한국어");
    const [trgLang, setTrgLang] = useState("한국어");

    const inputText = (event) => setText(event.target.value);
    const selectSrc = (event) => setSrcLang(event.target.value);
    const selectTrg = (event) => setTrgLang(event.target.value);
    const onTranslate = async (event) => {
        event.preventDefault();
        let translated = await translate_text_using_chatgpt(
            text,
            srcLang,
            trgLang
        );
        if (text === "") {
            return;
        }
        setResult(translated);
        // setText("");
        return;
    };

    // 광고문구 작성 서비스
    const [product, setProduct] = useState("");
    const [copy, setCopy] = useState("");
    const [detail, setDetail] = useState("");
    const [mood, setMood] = useState("");

    const inputProduct = (event) => setProduct(event.target.value);
    const inputDetail = (event) => setDetail(event.target.value);
    const inputMood = (event) => setMood(event.target.value);
    const onGenerateCopy = async (event) => {
        event.preventDefault();
        console.log(product, detail, mood);
        let slogan = await order(product, detail, mood);
        if (product === "" || detail === "" || mood === "") {
            return;
        }
        setCopy(slogan);
        return;
    };

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
            <div className="translator">
                <title>번역서비스</title>
                <h1>번역서비스</h1>
                <br />
                <form id="translate-form">
                    <input
                        onChange={inputText}
                        value={text}
                        type="text"
                        placeholder="번역할 텍스트를 입력하세요"
                    ></input>
                    <br />
                    <label>
                        원본 언어&nbsp;&nbsp;&nbsp;
                        <select id="src_lang" onChange={selectSrc}>
                            <option value="한국어">한국어</option>
                            <option value="영어">영어</option>
                            <option value="일본어">일본어</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        목표 언어&nbsp;&nbsp;&nbsp;
                        <select id="trg_lang" onChange={selectTrg}>
                            <option value="한국어">한국어</option>
                            <option value="영어">영어</option>
                            <option value="일본어">일본어</option>
                        </select>
                    </label>
                </form>
                <button variant="contained" onClick={onTranslate}>
                    번역
                </button>
                <h3>{result}</h3>
            </div>

            <div className="copywriter">
                <h1>광고문구 작성 서비스</h1>
                <br />
                <form id="copywriter-form">
                    {/* 제품 이름: ${product}\n주요 내용: ${detail}\n광고 문구의 스타일: ${mood} */}
                    <input
                        onChange={inputProduct}
                        value={product}
                        type="text"
                        placeholder="제품명을 입력하세요"
                    ></input>
                    <input
                        onChange={inputDetail}
                        value={detail}
                        type="text"
                        placeholder="광고할 문구의 주된 내용을 입력하세요"
                    ></input>
                    <input
                        onChange={inputMood}
                        value={mood}
                        type="text"
                        placeholder="광고 문구의 스타일을 입력하세요"
                    ></input>
                </form>
                <button variant="contained" onClick={onGenerateCopy}>
                    광고문구 생성하기
                </button>
                <h3>{copy}</h3>
            </div>

            <div className="summary">
                <h1>요약 서비스</h1>
                <br />
                <form className="summary-form">
                    <input
                        onChange={inputSentence}
                        value={sentence}
                        type="text"
                        placeholder="요약 할 내용을 입력하세요."
                    ></input>
                    <button variant="contained" onClick={onSummary}>
                        요약하기
                    </button>
                    <h3>{summary}</h3>
                </form>
            </div>

            <div className="chat">
                <h1>챗봇 서비스</h1>
                <br />
                {/* <h3>{question}</h3>
                <h3>{answer}</h3>
                <input
                    value={question}
                    onChange={inputQuestion}
                    placeholder="메세지를 입력하세요"
                ></input>
                <button variant="contained" onClick={onChat}>
                    보내기
                </button> */}
                {answer.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.isUser ? "user" : "bot"}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    value={question}
                    onChange={inputQuestion}
                />
                <button onClick={onChat}>보내기</button>
            </div>
        </>
    );
}
