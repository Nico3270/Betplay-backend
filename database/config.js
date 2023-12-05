const mongoose = require("mongoose");


const dbConnection = async() =>{
    try{
        await mongoose.connect("mongodb+srv://mern_user:mKH9nmDGUl6laLvU@atlascluster.cdwyflp.mongodb.net/apuestas");
        console.log("DB Online");

    } catch(error){
        console.log(error);
        throw new Error("Error a la hora de inicializar DB")
    }
}



module.exports = {dbConnection}