from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import json

with open('reponses.json', 'r') as file:
    responses = json.load(file)

model_name = "gpt2" 
tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token='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')
model = AutoModelForCausalLM.from_pretrained(model_name)

chatbot = pipeline('text-generation', model=model, tokenizer=tokenizer)

def get_response(intent, user_input):
    if intent in responses:
        response = responses[intent]
        return response[0] 
    else:
        return responses["default"][0]

def main():
    print("Hello! I'm here to assist you with the Smart Entry Test Proctor system. Type 'quit' to exit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'quit':
            print("ChatBot: Goodbye! Have a great day!")
            break
        
        if 'register' in user_input.lower():
            intent = 'ask_course_registration'
        elif 'admit card' in user_input.lower():
            intent = 'ask_admit_card_generation'
        elif 'security' in user_input.lower():
            intent = 'ask_exam_security'
        elif 'result' in user_input.lower():
            intent = 'ask_result_generation'
        elif 'attendance' in user_input.lower():
            intent = 'ask_attendance_tracking'
        elif 'thank you' in user_input.lower() or 'thanks' in user_input.lower():
            intent = 'thank_you'
        elif 'bye' in user_input.lower() or 'goodbye' in user_input.lower():
            intent = 'goodbye'
        elif 'exam modules' in user_input.lower():
            intent = 'ask_exam_modules'
        elif 'cheating percentage' in user_input.lower():
            intent = 'ask_cheating_percentage'
        elif 'post exam analysis' in user_input.lower():
            intent = 'ask_post_exam_analysis'
        elif 'system features' in user_input.lower():
            intent = 'ask_system_features'
        elif 'security measures' in user_input.lower():
            intent = 'ask_security_measures'
        elif 'registration issues' in user_input.lower():
            intent = 'ask_registration_issues'
        elif 'admit card issues' in user_input.lower():
            intent = 'ask_admit_card_issues'
        elif 'exam schedule' in user_input.lower():
            intent = 'ask_exam_schedule'
        elif 'exam format' in user_input.lower():
            intent = 'ask_exam_format'
        elif 'support contact' in user_input.lower():
            intent = 'ask_support_contact'
        elif 'data privacy' in user_input.lower():
            intent = 'ask_data_privacy'
        elif 'feedback' in user_input.lower():
            intent = 'ask_feedback'
        else:
            intent = 'default'
        
        response = get_response(intent, user_input)
        print(f"ChatBot: {response}")

if __name__ == "__main__":
    main()
