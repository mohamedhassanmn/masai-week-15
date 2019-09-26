from flask import Flask
from flask import request
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/dummy"
mongo = PyMongo(app)
flightData=[{
    "flightName":"IndiGo",
    "fromLoc":"banglore",
    "To":"new delhi",
    "fromTime":"09:00am",
    "toTime":"11:35am",
    "duration":"2hrs 35mins",
    "price":"8,090",
    "TaxAmount":"180"
},{
    "flightName":"GoAir",
    "fromLoc":"banglore",
    "To":"new delhi",
    "fromTime":"09:45am",
    "toTime":"12:15pm",
    "duration":"2hrs 40mins",
    "price":"10,000",
    "TaxAmount":"190"
},{
    "flightName":"Spicejet",
    "fromLoc":"banglore",
    "To":"new delhi",
    "fromTime":"10:00am",
    "toTime":"12:30pm",
    "duration":"2hrs 30mins",
    "price":"7,500",
    "TaxAmount":"205"
},{
    "flightName":"AirIndia",
    "fromLoc":"banglore",
    "To":"new delhi",
    "fromTime":"11:00am",
    "toTime":"01:45pm",
    "duration":"2hrs 45mins",
    "price":"6,000",
    "TaxAmount":"230"
},{
    "flightName":"Vistara",
    "fromLoc":"banglore",
    "To":"new delhi",
    "fromTime":"11:45am",
    "toTime":"02:55pm",
    "duration":"3hrs 05mins",
    "price":"9,950",
    "TaxAmount":"250"
},{
    "flightName":"AirAsia",
    "fromLoc":"new delhi",
    "To":"banglore",
    "fromTime":"05:00pm",
    "toTime":"07:45pm",
    "duration":"2hrs 45mins",
    "price":"10,050",
    "TaxAmount":"108"
},{
    "flightName":"Spicejet",
    "fromLoc":"new delhi",
    "To":"banglore",
    "fromTime":"05:30pm",
    "toTime":"08:00pm",
    "duration":"2hrs 30mins",
    "price":"11,290",
    "TaxAmount":"245"
},{
    "flightName":"AirAsia",
    "fromLoc":"new delhi",
    "To":"banglore",
    "fromTime":"05:45pm",
    "toTime":"09:00pm",
    "duration":"3hrs 15mins",
    "price":"13,005",
    "TaxAmount":"314"
},{
    "flightName":"Spicejet",
    "fromLoc":"new delhi",
    "To":"banglore",
    "fromTime":"06:35pm",
    "toTime":"09:00pm",
    "duration":"2hrs 35mins",
    "price":"6,950",
    "TaxAmount":"125"
}]
@app.route("/flights",methods=["POST"])
def showdata():
    filterData=[]
    fromLoc=request.json["from"]
    toLoc=request.json["to"]
    time=request.json["time"]
    for x in range(len(flightData)):
        if fromLoc==flightData[x]["fromLoc"]:
            filterData.append(flightData[x])    
    return json.dumps({"flights":filterData})
@app.route("/create",methods=["POST"])
def createdata():
    # userName=request.json["userName"]
    # flightName=request.json["flightName"]
    # flightTime=request.json["flightTime"]
    # flightPrice=request.json["price"]
    # status=request.json["status"]
    # file=open("userData.txt","a")
    # file.write(userName+" "+flightName+" "+flightTime+" "+flightPrice+" "+status+"\n")
    # file.close()
    # return json.dumps({"status":"Successfully Booked"})
    user = {}
    user['_id'] = ObjectId()
    user['userName'] = request.json['userName']
    user['flightName'] = request.json['flightName']
    user['flightTime'] = request.json['flightTime']
    user['flightPrice'] = request.json['price']
    user['status'] = request.json['status']
    mongo.db.users.insert(user)
    return dumps(user)
@app.route('/edit/<ObjectId:user_id>', methods=["POST"])
def editData(user_id):
    # new_file=[]
    # userName=request.json["userName"]
    # flightName=request.json["flightName"]
    # flightTime=request.json["flightTime"]
    # flightPrice=request.json["price"]
    # status=request.json["status"]
    # fl1=open("userData.txt")
    # currentLine=1
    # for ln in fl1:
    #     if currentLine==line_no:
    #         new_file.append(userName+" "+flightName+" "+flightTime+" "+flightPrice+" "+status+"\n")
    #     else:
    #         new_file.append(ln)
    #     currentLine=currentLine+1
    # fl1.close()
    # fl2=open("userData.txt","w")
    # for a in new_file:
    #     fl2.write(a)
    # fl2.close()
    # return json.dumps({"status":"Modified"})
    userName = request.json['userName']
    flightName=request.json["flightName"]
    flightTime=request.json["flightTime"]
    flightPrice=request.json["price"]
    status=request.json["status"]
    mongo.db.users.update({"_id":user_id}, {"$set": {"userName": userName, "flightName": flightName, "flightTime": flightTime, "flightPrice": flightPrice, "status": status}})
    return dumps({"userName": userName, "flightName": flightName, "flightTime": flightTime, "flightPrice": flightPrice, "status": status})
# @app.route("/delete/<int:line_no>")
# def deleteData(line_no):
#     new_file=[]
#     fl1=open("userData.txt")
#     currentLine=1
#     for ln in fl1:
#         if currentLine!=line_no:
#             new_file.append(ln)
#         currentLine=currentLine+1
#     fl1.close()
#     fl2=open("userData.txt","w")
#     for a in new_file:
#         fl2.write(a)
#     fl2.close()
#     return json.dumps({"status":"Deleted"})
@app.route('/delete/<ObjectId:user_id>')
def user_delete(user_id):
    mongo.db.users.remove({'_id': user_id})
    return dumps({"message": "User Deleted"})
@app.route("/show")
def showData():
    # userList=[]
    # userName=""
    # flightName=""
    # flightTime=""
    # flightPrice=""
    # status=""
    # fl=open("userData.txt")
    # for ln in fl:
    #     sep=ln.split(" ")
    #     userName=sep[0]
    #     flightName=sep[1]
    #     flightTime=sep[2]
    #     flightPrice=sep[3]
    #     status=sep[4]
    #     userList.append({"userName":userName,"flightName":flightName,"flightTime":flightTime,"flightPrice":flightPrice,"status":status})
    # return json.dumps({"bookingRecords":userList})
    users = mongo.db.users.find()
    return dumps(users)