from fastapi import HTTPException,APIRouter,Depends
from Authentication.authbearer import JWTbearer
from db import users_collection
from Schema.User import Usercreate
from db import users_collection
from bson import ObjectId
from Authentication.HashHelper import HashPass


profilerouter=APIRouter()


@profilerouter.get("/profile")
def profile(user=Depends(JWTbearer())):
    exist = users_collection.find_one({
        "_id":ObjectId(user["user_id"])
    })

    return{
        "F_Name":exist["First_Name"],
        "L_Name":exist["Last_Name"],
        "Email":exist["Email"]
    }
    
@profilerouter.patch("/updateprofile")
def update(id:str,up:Usercreate,user=Depends(JWTbearer())):
    exist = users_collection.find_one({
        "_id": ObjectId(id)
    })
    if not exist:
        raise HTTPException(
            status_code=404,
            detail="Profile Not Found"
        )
    if (exist["Email"]!=user["Email"]):
        raise HTTPException(
            status_code=403,
            detail="Forbidden Action"
        )
    
    users_collection.update_one({
        "_id":ObjectId(id)
    },
    {
        "$set":{
            "First_Name":up.F_Name,
            "Last_Name":up.L_Name,
            "Email":up.Email,
            "Hashed_pass": HashPass.hashpass(up.Pass)

        }
    }
    
    )
    
    pass