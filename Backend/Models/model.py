from dotenv import load_dotenv
load_dotenv()
from langchain_mistralai import ChatMistralAI
from fastapi import APIRouter ,Depends
from Authentication.authbearer import JWTbearer
from db import transaction_collection
from langchain_core.prompts import ChatPromptTemplate


assistantrouter = APIRouter()

model = ChatMistralAI(model_name="mistral-small-2506")

from langchain_core.prompts import ChatPromptTemplate

template = ChatPromptTemplate([
    (
        "system",
        """
        You are an intelligent financial assistant.

        All transaction amounts are in Indian Rupees (₹/INR).

        Never use dollars ($), euros (€), or any other currency.

        Always display monetary values in INR using the ₹ symbol.

        Example:
        ₹5,000
        ₹12,500

        Rules:

        1. If the user asks a specific question, answer only that question.

        2. If the user asks for analysis, insights, savings suggestions,
        spending patterns, overspending, summaries, or recommendations,
        analyze the transactions and provide detailed insights.

        3. Use the transaction data as the source of truth.

        4. All amounts are in INR.

        Keep responses concise but informative.
        """
    ),
    (
        "user",
        """
        Transaction Data:

        {transactions}

        User Question:

        {question}
        """
    )
])


@assistantrouter.post("/assistant")
def help(ask:str,user=Depends(JWTbearer())):

    transactions=[]
    docs = list(
        transaction_collection.find({
            "User_id": user["user_id"]
        })
    )
    if not docs:
        return {
            "message":
            "No transactions found."
    }   

    for doc in docs:
        doc["_id"] = str(doc["_id"])
        transactions.append({ 
            "date":doc["Date"],
            "amount_spend":doc["Spend"],
            "category":doc["For"]
            }
            
        )
        
    prompt = template.invoke({
    "transactions" : transactions,
    "question":ask
    })
    
    response = model.invoke(prompt)
    print(response.content)
    

    return response.content