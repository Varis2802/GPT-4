import { OpenaiService } from "./openai.service";
export declare class OpenaiController {
    private readonly openaiService;
    constructor(openaiService: OpenaiService);
    private outputData;
    getHello(prompt: string): Promise<string[]>;
}
