import mongoose from "mongoose";

const connectDb = async () => {
    try{
        const connection = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log("Database connection successfull at host :-", connection.connection.host)
    }
    catch(error){
        console.error("Database connection failed", error)
        process.exit(-1)
    }
}

export default connectDb