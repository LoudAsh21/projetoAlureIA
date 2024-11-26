import { MongoClient } from "mongodb";

let mongoClient;

export default async function connect(string_connection) {
  try{
    mongoClient = new MongoClient(string_connection);
    await mongoClient.connect();
    return mongoClient;

  }catch(error){
    console.error("Ocorreu um erro ao conectar ao banco de dados!\n" , error);
    process.exit();
  }
}