const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.renderChatbot = (req, res) => {
  res.render("chatbot");
};

exports.handleChatbot = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    });

    const reply = completion.choices?.[0]?.message?.content || "Sorry, I couldn't get a reply.";
    res.json({ reply });

  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again later." });
  }
};