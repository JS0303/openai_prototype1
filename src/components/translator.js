import { Configuration, OpenAIApi } from "openai";
import React, { Component } from "react";

const configuration = new Configuration({
    organization: "org-UaLK1XJ9fsXDUO8SYXy9INaf",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const parallel_example = {
    한국어: ["오늘 날씨 어때", "딥러닝 기반의 AI 기술이 인기를 끌고 있다"],
    영어: [
        "How is the weather today",
        "AI technology based on deep learning is gaining popularity",
    ],
    일본어: [
        "今日の天気はどうですか",
        "ディープラーニングベースのAI技術が人気を集めている",
    ],
};

async function translate_text_using_chatgpt(text, src_lang, trg_lang) {
    console.log("번역을 위해 입력된 text : ", text);
    console.log("원본 언어 : ", src_lang, "번역될 언어 : ", trg_lang);
    const src_examples = parallel_example[src_lang];
    const trg_examples = parallel_example[trg_lang];

    let fewshot_messages = [];

    fewshot_messages.push({ role: "user", content: { src_examples } });
    fewshot_messages.push({ role: "assistant", content: { trg_examples } });

    const system_instruction = `assistant는 번역 예시를 참고하여 ${src_lang}를 ${trg_lang}로 적절하게 번역하여 결과를 출력한다. 
                                번역 예시 : ${fewshot_messages}
                                번역 외에 다른 설명이나 응답은 하지 않는다.
                                `;

    let messages = [
        { role: "system", content: system_instruction },
        { role: "user", content: text },
    ];

    let model = "gpt-3.5-turbo";

    const response = await openai.createChatCompletion({
        model: model,
        messages: messages,
    });

    const translated_text = response.data.choices[0].message.content;

    console.log("translated_text", translated_text);

    return translated_text;
}

export default class Translator extends Component {
    state = {
        text: "",
        result: "",
        srcLang: "한국어",
        trgLang: "한국어",
    };
    translate = async () => {
        const { text, srcLang, trgLang } = this.state;

        // translate_text_using_chatgpt 함수 호출 및 결과 처리
        let translated = await translate_text_using_chatgpt(
            text,
            srcLang,
            trgLang
        );
        if (text === "") {
            return;
        }
        this.setState({ result: translated });
    };
    inputText = (event) => this.setState({ text: event.target.value });
    selectSrc = (event) => this.setState({ srcLang: event.target.value });
    selectTrg = (event) => this.setState({ trgLang: event.target.value });
    onTranslate = async (event) => {
        event.preventDefault();
        await this.translate();
    };
    render() {
        const { result } = this.state;
        return (
            <>
                <title>번역서비스</title>
                <br />
                <div className="input-box">
                    <form id="translate-form">
                        <label>
                            원본 언어&nbsp;&nbsp;&nbsp;
                            <select id="src_lang" onChange={this.selectSrc}>
                                <option value="한국어">한국어</option>
                                <option value="영어">영어</option>
                                <option value="일본어">일본어</option>
                            </select>
                        </label>
                        <label>
                            목표 언어&nbsp;&nbsp;&nbsp;
                            <select id="trg_lang" onChange={this.selectTrg}>
                                <option value="한국어">한국어</option>
                                <option value="영어">영어</option>
                                <option value="일본어">일본어</option>
                            </select>
                        </label>
                        <br />
                        <div class="ui input">
                            <input
                                onChange={this.inputText}
                                value={this.translate.text}
                                type="text"
                                placeholder="번역할 텍스트를 입력하세요"
                            ></input>
                        </div>
                    </form>
                    <button
                        className="ui secondary button"
                        variant="contained"
                        onClick={this.onTranslate}
                    >
                        번역
                    </button>
                    <h3 className="result">{result}</h3>
                </div>
            </>
        );
    }
}
