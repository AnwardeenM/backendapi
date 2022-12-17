import fetch from "node-fetch";

import mongoose from "mongoose";

// import axios from "axios";

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/UMS");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:Object,
        required:true
    },
    gender:{
        type:String,
        required:false
    },
    location:{
        type:Object,
        required:true
    },
   picture:{
        type:Object,
        required:false
    }
})

const Users = mongoose.model("Post",userSchema);

async function getUsers(){
    
    const users = await fetch("https://randomuser.me/api/?results=50")
    const response = await users.json();
    const sized = response.results;

    // const usersdata = axios.get("https://randomuser.me/api/?results=50")
    // .then((res)=>res.json())
    // .catch((err)=>{console.log(err)})
    // console.log(usersdata);
    // const sized = usersdata.results;
    // console.log(sized);

    for(let i=0;i<sized.length;i++){
        console.log(sized[i]["name"]);

       const user = new Users({
            email:sized[i]["email"],
            name:sized[i]["name"],
             gender:sized[i]["gender"],
            location:sized[i]["location"],
            picture:sized[i]["picture"]
        })
       user.save();        
    }
}

getUsers();

async function deleteUsers(){
    await Users.deleteMany()
}

// if("delete"){
//    alert("The datas are going to be erased");
//     deleteUsers()
// }
// else{
//    alert("Nothing to delete");
// }