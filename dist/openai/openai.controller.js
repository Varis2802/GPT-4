"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiController = void 0;
const common_1 = require("@nestjs/common");
const openai_service_1 = require("./openai.service");
const fs = require("fs");
const readline = require("readline");
let OpenaiController = class OpenaiController {
    constructor(openaiService) {
        this.openaiService = openaiService;
        this.outputData = '';
    }
    async getHello(prompt) {
        var _a, e_1, _b, _c;
        let initialPrompt = prompt;
        const fileStream = fs.createReadStream('output.txt');
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        const results = [];
        try {
            for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), _a = rl_1_1.done, !_a;) {
                _c = rl_1_1.value;
                _d = false;
                try {
                    const line = _c;
                    let inputPrompt = `I will give you root to node path of my decision tree           ${line}        i have generate 6 level successfully now i want to continue this tree till 11th level   Analyse this root to node path and generate next  level  this is my main prompt refer this and generate next 5 level  Please generate a comprehensive decision tree for diagnosing the cause of the chief complaint as Back Pain using the Breadth First Search method. The decision tree should have a depth of only 10-11 levels, starting from the first question and covering all possible option mappings. The decision tree should consider factors such as patient demographics, medical history, diet, lifestyle, medications, and symptoms. Use a format that begins with basic questions and gradually moves on to more specific and medically-based questions. At each level, provide multiple options for users to choose from, and ensure that all options are explored in a BFS manner, maintaining a depth of only 10-11 levels for each path. If an option leads to a question with the same text and options as a previous question, reuse the previous question ID instead of creating a new one. After exploring all paths, provide a final diagnosis at the end of each path once the only 10-11 levels are reached. The response should adhere to the specified format without any additional explanations or context. Generate the response without spaces, and use the following format for the decision tree: { queid: "qID", question : "text", options : { "op1Text":"nextqID", "op2Text":"nextqID",...}, level:"7"}. Please Generate only next 5 levels. Do not give me any other text without my structure. If any option have same question then do not create same question with different QID initiated attach same question_id. After completing 10th level give me diagnosis on the basis of  analysing  root to leaf path from level 1 to level  10. For diagnosis follow this format:- { queid: "qID", question : "QueText", options : { "Op1Text":["Diagnosis Array"], "Op2Text":["Diagnosis Array"],...}, level:"11"}`;
                    console.log(inputPrompt);
                    try {
                        const completion = await this.openaiService.createChatCompletion("gpt-3.5-turbo", [{ role: "user", content: inputPrompt }]);
                        const modelResponse = completion.data.choices[0].message.content;
                        this.outputData += modelResponse + '\n';
                        if (completion && completion.data) {
                            fs.appendFile('AllPaths.txt', this.outputData, (err) => {
                                if (err) {
                                    console.error('Error writing text file:', err);
                                }
                                else {
                                    console.log('Data successfully appended to AllPaths.txt');
                                }
                            });
                            var outputResponse = completion.data.choices[0];
                            console.log(completion.data.usage);
                            var ii = 5;
                            console.log(ii++);
                            results.push(outputResponse);
                        }
                    }
                    catch (error) {
                        console.error('Error with openaiService.createChatCompletion:', error);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = rl_1.return)) await _b.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    }
};
__decorate([
    (0, common_1.Get)("getMM"),
    __param(0, (0, common_1.Query)("prompt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpenaiController.prototype, "getHello", null);
OpenaiController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [openai_service_1.OpenaiService])
], OpenaiController);
exports.OpenaiController = OpenaiController;
//# sourceMappingURL=openai.controller.js.map