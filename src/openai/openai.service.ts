import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi } from "openai";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OpenaiService {
  private openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const apiKey = "";
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  async createChatCompletion(
    model: string,
    conversation: any[]
  ): Promise<any> {
    return await this.openai.createChatCompletion({
      model,
      messages: conversation
    });
  }
}
