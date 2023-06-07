// import { Controller, Get, Query } from "@nestjs/common";
// import { OpenaiService } from "./openai.service";
// import * as fs from "fs";
// import * as readline from 'readline';

// @Controller()
// export class OpenaiController {
//   constructor(private readonly openaiService: OpenaiService) {}

//   private outputData: string = '';

//   @Get("getMM")
//   async getHello(@Query("prompt") prompt: string): Promise<string[]> {
//     let initialPrompt = prompt;
//         initialPrompt='I will give you root to node path of my decision tree           $output.text        i have generate 6 level successfully now i want to continue this tree till 11th level   Analyse this root to node path and generate next  level  this is my main prompt refer this and generate next 5 level  Please generate a comprehensive decision tree for diagnosing the cause of the chief complaint as Back Pain using the Breadth First Search method. The decision tree should have a depth of only 10-11 levels, starting from the first question and covering all possible option mappings. The decision tree should consider factors such as patient demographics, medical history, diet, lifestyle, medications, and symptoms. Use a format that begins with basic questions and gradually moves on to more specific and medically-based questions. At each level, provide multiple options for users to choose from, and ensure that all options are explored in a BFS manner, maintaining a depth of only 10-11 levels for each path. If an option leads to a question with the same text and options as a previous question, reuse the previous question ID instead of creating a new one. After exploring all paths, provide a final diagnosis at the end of each path once the only 10-11 levels are reached. The response should adhere to the specified format without any additional explanations or context. Generate the response without spaces, and use the following format for the decision tree: { queid: "qID", question : "text", options : { "op1Text":"nextqID", "op2Text":"nextqID",...}, level:"7"}. Please Generate only next 5 levels. Do not give me any other text without my structure. If any option have same question then do not create same question with different QID initiated attach same question_id. After completing 10th level give me diagnosis on the basis of  analysing  root to leaf path from level 1 to level  10. For diagnosis follow this format:- { queid: "qID", question : "QueText", options : { "Op1Text":["Diagnosis Array"], "Op2Text":["Diagnosis Array"],...}, level:"11"}';
//     // create a readline interface for reading file line by line
//     const fileStream = fs.createReadStream('output1.txt');
//     const rl = readline.createInterface({
//       input: fileStream,
//       crlfDelay: Infinity
//     });

//     const results = [];

//     // read each line
//     for await (const line of rl) {
//       let inputPrompt = `${initialPrompt}\n${line}`;

//       const completion = await this.openaiService.createChatCompletion(
//         "gpt-4",
//         [{ role: "user", content: inputPrompt }]
//       );

//       // Add model message to conversation history
//       // const modelResponse = completion.data.choices[0].message.content;
//       // results.push(modelResponse);

//       // Save outputData to a text file
//       fs.appendFile('AllPaths.txt', this.outputData, (err) => {
//         if (err) {
//           console.error('Error writing text file:', err);
//         } else {
//           console.log('Data successfully appended to AllPaths.txt');
//         }
//       });
//       var outoutResponse = completion.data.choices[0].
//       console.log(completion.data.usage);
//     }

//     return outoutResponse;
//   }
// }


import { Controller, Get, Query } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import * as fs from "fs";
import * as readline from 'readline';

@Controller()
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  private outputData: string = '';

  @Get("getMM")
  async getHello(@Query("prompt") prompt: string): Promise<string[]> {
         let initialPrompt = prompt;
    const fileStream = fs.createReadStream('output.txt');
    const rl = readline.createInterface({
      input: fileStream,
       crlfDelay: Infinity
     });

    const results = [];

    for await (const line of rl) {
      //let inputPrompt = `${initialPrompt}\n${line}`;
      let inputPrompt = `I will give you root to node path of my decision tree           ${line}        i have generate 6 level successfully now i want to continue this tree till 11th level   Analyse this root to node path and generate next  level  this is my main prompt refer this and generate next 5 level  Please generate a comprehensive decision tree for diagnosing the cause of the chief complaint as Back Pain using the Breadth First Search method. The decision tree should have a depth of only 10-11 levels, starting from the first question and covering all possible option mappings. The decision tree should consider factors such as patient demographics, medical history, diet, lifestyle, medications, and symptoms. Use a format that begins with basic questions and gradually moves on to more specific and medically-based questions. At each level, provide multiple options for users to choose from, and ensure that all options are explored in a BFS manner, maintaining a depth of only 10-11 levels for each path. If an option leads to a question with the same text and options as a previous question, reuse the previous question ID instead of creating a new one. After exploring all paths, provide a final diagnosis at the end of each path once the only 10-11 levels are reached. The response should adhere to the specified format without any additional explanations or context. Generate the response without spaces, and use the following format for the decision tree: { queid: "qID", question : "text", options : { "op1Text":"nextqID", "op2Text":"nextqID",...}, level:"7"}. Please Generate only next 5 levels. Do not give me any other text without my structure. If any option have same question then do not create same question with different QID initiated attach same question_id. After completing 10th level give me diagnosis on the basis of  analysing  root to leaf path from level 1 to level  10. For diagnosis follow this format:- { queid: "qID", question : "QueText", options : { "Op1Text":["Diagnosis Array"], "Op2Text":["Diagnosis Array"],...}, level:"11"}`;
      console.log(inputPrompt);
      
      try {
        const completion = await this.openaiService.createChatCompletion(
          "gpt-3.5-turbo",
          [{ role: "user", content: inputPrompt }]
        );

        const modelResponse = completion.data.choices[0].message.content;
     // this.conversation.push({ role: "assistant", content: modelResponse });

      // Remove objects with indexes 2, 3, 4, 5, and 6 from the conversation array
      //if (this.conversation.length > 4) this.conversation.splice(0, 2); // start from index 2 and remove 5 elements

      // Append generated data to outputData string
    this.outputData += modelResponse + '\n';

        if (completion && completion.data) {
          // Save outputData to a text file
          fs.appendFile('AllPaths.txt', this.outputData, (err) => {
            if (err) {
              console.error('Error writing text file:', err);
            } else {
              console.log('Data successfully appended to AllPaths.txt');
            }
          });
          
          var outputResponse = completion.data.choices[0];
          console.log(completion.data.usage);
          //console.log(completion.data.choices[0].message);
          var ii=5;
          console.log(ii++);
          
          results.push(outputResponse);
        }
      } catch (error) {
        console.error('Error with openaiService.createChatCompletion:', error);
      }
    }

    return results;
  }
}
