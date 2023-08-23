import { Configuration, OpenAIApi } from "openai";
import { Component } from "react";

const configuration = new Configuration({
    organization: "org-UaLK1XJ9fsXDUO8SYXy9INaf",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function summary_using_chatgpt(full_text) {
    const system_instruction =
        "assistant는 user의 입력을 bullet point로 3줄 요약해준다.";
    let messages = [
        { role: "system", content: system_instruction },
        { role: "user", content: full_text },
    ];
    let model = "gpt-3.5-turbo";

    const response = await openai.createChatCompletion({
        model: model,
        messages: messages,
    });

    const summary_result = response.data.choices[0].message.content;

    console.log("summary_result", summary_result);

    return summary_result;
}

export default class Summary extends Component {
    state = {
        full_text: "",
        summary_result: "",
    };
    summary = async () => {
        const { full_text } = this.state;

        let summarized = await summary_using_chatgpt(full_text);
        if (full_text === "") {
            return;
        }
        this.setState({ summary_result: summarized });
    };

    inputSentence = (event) => this.setState({ full_text: event.target.value });
    onSummary = async (event) => {
        event.preventDefault();
        await this.summary();
    };
    render() {
        const { summary_result } = this.state;
        return (
            <>
                <div className="input-box">
                    <form className="summary-form">
                        <input
                            onChange={this.inputSentence}
                            value={this.full_text}
                            type="text"
                            placeholder="요약 할 내용을 입력하세요."
                        ></input>
                        <button
                            className="ui secondary button"
                            variant="contained"
                            onClick={this.onSummary}
                        >
                            요약하기
                        </button>
                        <h3 className="">{summary_result}</h3>
                    </form>
                </div>
            </>
        );
    }
}
