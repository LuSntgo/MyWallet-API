import db from "../database.js";

export async function deposit(req, res) {
  const deposits = req.body;
  try {
    console.log(deposits);
    await db.collection("transactions").insertOne({ ...deposits });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function withdraw(req, res) {
  const withdraws = req.body;
  try {
    await db.collection("transactions").insertOne({ ...withdraws });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getTransaction(req, res) {
  const { user } = res.locals;

  try {
    const transaction = await db
      .collection("transactions")
      .find({ userId: user.userId })
      .toArray();
    res.status(200).send(transaction);
  } catch (error) {
    res.sendStatus(500);
  }
}
