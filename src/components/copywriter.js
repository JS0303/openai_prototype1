import { Configuration, OpenAIApi } from "openai";

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

export default async function order(product, detail, mood) {
    let prompt = `제품 이름: ${product}\n주요 내용: ${detail}\n광고 문구의 스타일: ${mood} 위 내용을 참고하여 마케팅 문구를 만들어라.`;
    console.log("prompt : ", prompt);
    const result = await slogan_generator_using_chapgpt(prompt);
    console.log("result : ", result);
    return result;
}
