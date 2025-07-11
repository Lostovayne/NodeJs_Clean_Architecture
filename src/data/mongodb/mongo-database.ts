import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log("MongoDb Connected");
    } catch (error) {
      console.log("MongoDb Connection Error");
      throw error;
    }
  }
}
