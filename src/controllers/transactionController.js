import db from "../database.js";

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

export async function getTransaction(req, res) {
  const { session } = res.locals;

  try {
    const transaction = await db
      .collection("transactions")
      .find({ userId: session.userId })
      .toArray();
    res.status(200).send(transaction);
  } catch (error) {
    res.sendStatus(500);
  }
}
