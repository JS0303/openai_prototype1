import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-UaLK1XJ9fsXDUO8SYXy9INaf",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function summary_using_chatgpt(full_text) {
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
