import express, { json } from "express";
import cors from "cors";
import { Db, MongoClient, ObjectId } from "mongodb";
import joi from "joi";
import dotenv from "dotenv";
import { v4 as uuid} from uuid;
dotenv.config();

const server = express();
server.use(cors());
server.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("mywallet");
});





server.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});
