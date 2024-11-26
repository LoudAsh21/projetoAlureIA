import 'dotenv/config';
import { ObjectId } from "mongodb";
import connect from "../config/database.js";

let connection = await connect(process.env.STRING_CONNECTION);

export default class Post {
  constructor() {
    this.database = connection.db("cursoalure");
    this.collection = this.database.collection("posts");
  }

  async getAllPosts() {
    return this.collection.find().toArray();
  }

  async insertOnePost(post) {
    return this.collection.insertOne(post);
  }

  async updateOnePost(id, post) {
    const objectId = ObjectId.createFromHexString(id);
    
    return this.collection.updateOne(
      { _id: new ObjectId(objectId) },
      { $set: post }
    );
  } 
}
