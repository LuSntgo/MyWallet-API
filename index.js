import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
dotenv.config();

const server = express();
server.use(cors());
server.use(json());

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

const valueSchema = joi.object({
  addValue: joi
    .string()
    .pattern(/^[\d,.?!]+$/)
    .required(),
  description: joi.string().required(),
});

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("mywallet");
});

server.post("/auth/sign-up", async (req, res) => {
  //name, email, password
  const user = req.body;
  const validation = userSchema.validate(user);
  if (validation.error) {
    return res.sendStatus(422);
  }

  try {
    const passwordHashed = bcrypt.hashSync(user.password, 10);
    const email = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (email) {
      res.sendStatus(409);
      return;
    }

    await db
      .collection("users")
      .insertOne({ ...user, password: passwordHashed });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const validation = loginSchema.validate({ email, password });

  if (validation.error) {
    return res.sendStatus(422);
  }
  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      res.sendStatus(401);
      return;
    }
    const isAuthorized = bcrypt.compareSync(password, user.password);
    if (isAuthorized) {
      const token = uuid();
      res.status(200).send({ token });
      return;
    }
    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.post("/home/deposit", async (req, res) => {
  const validation = valueSchema.validate(req.body);

  if (validation.error) {
    res
      .status(422)
      .send(validation.error.details.map((error) => error.message));
    return;
  }

  try {
    await db.collection("deposit").insertOne(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.post("/home/withdraw", async (req, res) => {
  const validation = valueSchema.validate(req.body);

  if (validation.error) {
    res
      .status(422)
      .send(validation.error.details.map((error) => error.message));
    return;
  }

  try {
    await db.collection("withdraw").insertOne(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});
