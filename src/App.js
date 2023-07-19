import { useState } from "react";
import translate_text_using_chatgpt from "./components/translator";
import order from "./components/copywriter";

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
        setText("");
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
                <button onClick={onTranslate}>번역</button>
                <h3>{result}</h3>
            </div>
            <div className="copywriter">
                <h1>광고문구 작성 서비스</h1>
                <br />
                <form>
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
                <button onClick={onGenerateCopy}>광고문구 생성하기</button>
                <h3>{copy}</h3>
            </div>
        </>
    );
}
