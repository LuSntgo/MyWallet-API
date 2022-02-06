import db from "../database.js";

export async function transaction(req, res) {
  try {
    await db.collection("transactions").insertOne(value);
    res.status(201).send(transaction);
  } catch {
    res.sendStatus(500);
  }
}

export async function deposit(req, res) {
  try {
    await db.collection("transactions").insertOne(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function withdraw(req, res) {
  try {
    await db.collection("transactions").insertOne(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
