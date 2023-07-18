import { Configuration, OpenAIApi } from "openai";

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

export default async function translate_text_using_chatgpt(
    text,
    src_lang,
    trg_lang
) {
    console.log("번역을 위해 입력된 text : ", text);
    console.log("원본 언어 : ", src_lang, "번역될 언어 : ", trg_lang);
    const src_examples = parallel_example[src_lang];
    const trg_examples = parallel_example[trg_lang];

    let fewshot_messages = [];

    fewshot_messages.push({ role: "user", content: { src_examples } });
    fewshot_messages.push({ role: "assistant", content: { trg_examples } });

    const system_instruction = `assistant는 번역앱으로서 동작한다. ${src_lang}를 ${trg_lang}로 적절하게 번역하고 번역된 텍스트만 출력한다.
                                번역된 텍스트의 예시를 제공한다. 참고하길 바란다.
                                번역 예시 : ${fewshot_messages}`;

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
