import { Configuration, OpenAIApi } from "openai";
import React, { Component } from "react";

const configuration = new Configuration({
    organization: "org-UaLK1XJ9fsXDUO8SYXy9INaf",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function slogan_generator_using_chapgpt(prompt) {
    const system_instruction =
        "assistant는 마케팅 문구 작성 도우미로 동작한다. user의 내용을 참고하여 마케팅 문구를 작성해라";
    let messages = [
        { role: "system", content: system_instruction },
        { role: "user", content: prompt },
    ];
    let model = "gpt-3.5-turbo";

    const response = await openai.createChatCompletion({
        model: model,
        messages: messages,
    });

    const ad_slogan = response.data.choices[0].message.content;
    console.log("ad_slogan : ", ad_slogan);
    return ad_slogan;
}

async function order(product, detail, mood) {
    let prompt = `제품 이름: ${product}\n주요 내용: ${detail}\n광고 문구의 스타일: ${mood} 위 내용을 참고하여 마케팅 문구를 만들어라.`;
    console.log("prompt : ", prompt);
    const result = await slogan_generator_using_chapgpt(prompt);
    console.log("result : ", result);
    return result;
}

export default class Copywriter extends Component {
    state = {
        product: "",
        detail: "",
        mood: "",
        copy: "",
    };
    copywrite = async () => {
        const { product, detail, mood } = this.state;

        let copywrited = await order(product, detail, mood);
        if (product === "" || detail === "" || mood === "") {
            return;
        }
        this.setState({ copy: copywrited });
    };

    inputProduct = (event) => this.setState({ product: event.target.value });
    inputDetail = (event) => this.setState({ detail: event.target.value });
    inputMood = (event) => this.setState({ mood: event.target.value });
    onGenerateCopy = async (event) => {
        event.preventDefault();
        await this.copywrite();
    };
    render() {
        const { copy } = this.state;
        return (
            <>
                <div className="copywriter-container">
                    <form id="copywriter-form" className="input-form">
                        <div className="input-field">
                            <label htmlFor="product">제품명</label>
                            <input
                                onChange={this.inputProduct}
                                value={this.product}
                                type="text"
                                id="product"
                                placeholder="제품명을 입력하세요"
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="detail">주요 내용</label>
                            <input
                                onChange={this.inputDetail}
                                value={this.detail}
                                type="text"
                                id="detail"
                                placeholder="광고할 문구의 주된 내용을 입력하세요"
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="mood">광고 문구의 스타일</label>
                            <input
                                onChange={this.inputMood}
                                value={this.mood}
                                type="text"
                                id="mood"
                                placeholder="광고 문구의 스타일을 입력하세요"
                            />
                        </div>
                    </form>
                    <div className="generate-button">
                        <button
                            className="ui secondary button"
                            variant="contained"
                            onClick={this.onGenerateCopy}
                        >
                            광고문구 생성하기
                        </button>
                    </div>
                    <div className="copy-result">
                        <h3 className="result">{copy}</h3>
                    </div>
                </div>
            </>
        );
    }
}
