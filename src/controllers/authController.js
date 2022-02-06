import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import db from "../database.js";

export async function signUp(req, res) {
  const user = req.body;
  const passwordHashed = bcrypt.hashSync(user.password, 10);

  try {
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
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      res.sendStatus(401).send("Confira seus dados!");
      return;
    }
    const isAuthorized = bcrypt.compareSync(password, user.password);

    if (isAuthorized) {
      const token = uuid();
      await db.collection("sessions").insertOne({ token, userId: user._id });

      const name = user.name;

      res.status(200).send({ token, name });
      return;
    }
    res.sendStatus(401).send("Confira seus dados!");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// export async function signOut(req, res){
//   const { session } = res.locals

//   try {
//     await db.collection("sessions").deleteOne({token: session.token})

//     res.sendStatus(200)
//   } catch {
//     res.sendStatus(500)
//   }
// }
