import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-UaLK1XJ9fsXDUO8SYXy9INaf",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function chat_using_chatgpt(chatMessages) {
    let model = "gpt-3.5-turbo";
    let messages = [{ role: "user", content: chatMessages }];

    const response = await openai.createChatCompletion({
        model: model,
        messages: messages,
    });

    const chat_answer = response.data.choices[0].message.content;

    console.log("chat_answer", chat_answer);

    return chat_answer;
}
