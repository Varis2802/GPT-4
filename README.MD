## AIServiceForChiefComplaints

##### This repository will be used to generate and update Cheif complaints database by using OpenAI APIs.

### Endpoints:
##### The API has a single endpoint, /ChatGPT/complete, which accepts GET requests and requires a String prompt payload in the request body with the following format:
##### { "prompt": "Your question here" }
##### question: A string that represents the question or prompt you want the API to complete.
##### model: In this service we use chatgpt advanced model "GPT-3.5 torbo"

### Environment Variables:
##### The API requires the following environment variables to be set:
##### OPENAI_API_KEY: Your OpenAI API key.


### Running the API:
##### To run the API locally, follow these steps:
##### The API will be available at http://localhost:5000/.
