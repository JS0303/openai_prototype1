import { useState } from "react";
import translate_text_using_chatgpt from "./components/translator";

export default function Home() {
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
        setText("");
        return;
    };

    return (
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
            <button onClick={onTranslate}>번역</button>
            <h3>{result}</h3>
        </div>
    );
}
