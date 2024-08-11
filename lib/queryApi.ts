import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    const res = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }).then((res) => res.choices[0].message.content)
        .catch((err) => console.error("Chat Gpt was unable to answer with error " + err));

    return res;
}
export default query;