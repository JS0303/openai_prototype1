import { Configuration, OpenAIApi } from "openai";
import { Component } from "react";
import { Message, Icon } from "semantic-ui-react";
import "./Summary.css";

const configuration = new Configuration({
    organization: "org-UaLK1XJ9fsXDUO8SYXy9INaf",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function summary_using_chatgpt(full_text) {
    const system_instruction =
        "assistant는 user의 입력을 bullet point로 3줄 요약해준다. bullet point 이전에 개행한다.";
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
                <div className="supream">
                    <div className="summary-container">
                        <form className="summary-form">
                            <form className="ui form before">
                                <textarea
                                    class="ui form before"
                                    onChange={this.inputSentence}
                                    value={this.full_text}
                                    type="text"
                                    placeholder="요약 할 내용을 입력하세요."
                                ></textarea>
                            </form>
                            <div className="generate-button">
                                <button
                                    className="ui grey button generate-btn"
                                    onClick={this.onSummary}
                                >
                                    요약 &nbsp;&nbsp;
                                    <Icon name="list alternate outline" />
                                </button>
                            </div>
                            <div className="summary-result">
                                <h5>요약된 결과가 여기에 표시됩니다.</h5>
                                <Message className="result">
                                    {summary_result}
                                </Message>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
