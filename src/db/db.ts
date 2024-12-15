import mongoose from "mongoose";

const connect = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_DB_URL!)
         const connection = mongoose.connection
         connection.on('connected',()=>{
            console.log("Database connection successfull")
         })
         connection.on('error',(err)=>{
            console.log("Error occured while connecting to database")
            console.log(err)
            process.exit()
         })
    } catch (error) {
        console.log("Somwting went wrong")   
    }
}

export default connect