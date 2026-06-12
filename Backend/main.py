from fastapi import FastAPI,Depends
from Routes.SignUp import signuprouter
from Routes.login import loginrouter
from Routes.profile import profilerouter
from Authentication.authbearer import JWTbearer
from Routes.transactions import transactionrouter
from fastapi.middleware.cors import CORSMiddleware
from db import users_collection
from Authentication.authbearer import JWTbearer
from Models.model import assistantrouter


app=FastAPI()
app.include_router(router=signuprouter)
app.include_router(router=loginrouter)
app.include_router(router=transactionrouter)
app.include_router(router=profilerouter)
app.include_router(router=assistantrouter)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def star():
    return{
        "message ": "Server is working"
    }

@app.get('/test')
def test(user=Depends(JWTbearer())):
    return{
        "message":"Working",
        "User_id": user["user_id"]
    }






