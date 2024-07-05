import * as dotenv from "dotenv";

dotenv.config();

import { OpenAI } from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  project: process.env.OPENAI_ROJECT_ID,
  apiKey: process.env.OPENAI_API,
});

import express from "express";
import cors from "cors";
import { sleep } from "openai/core.mjs";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
  try {
    const cprompt = req.body.prompt;

    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: cprompt,
      n: 1,
      size: "1024x1024",
    });
    const image = aiResponse.data[0].url;
    res.send({ image });
  } catch (error) {
    console.log('openaierorrlog',error);
    res.status(500).send(error?.message || "Something went wrong");
  }
});
// app.get('/dream',async (req,res)=>{
//     // main();
//     console.log('xdd')
// })
app.listen(8080, () =>
  console.log("działa na http://localhost:8080/dream mordeczko")
);

// async function main() {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: "You are a helpful assistant." }],
//       model: "gpt-3.5-turbo",
//     });

//     console.log(completion.choices[0]);
//   }
