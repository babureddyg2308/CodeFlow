import { connect } from "mongoose";

const connectToDB = async (url) =>{
    try {
        await connect(url);
        console.log("sucessfully connected to db");
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB;