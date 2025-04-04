import mongoose from 'mongoose';

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL,
            {
                dbname: "Chatbot",
            }
        )
        console.log("DB is connected ");
    }
    catch(err){
        console.log(err);
    }
}

export default connectDb;