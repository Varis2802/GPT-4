import { ConfigService } from "@nestjs/config";
export declare class OpenaiService {
    private readonly configService;
    private openai;
    constructor(configService: ConfigService);
    createChatCompletion(model: string, conversation: any[]): Promise<any>;
}
