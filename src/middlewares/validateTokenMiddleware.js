import db from "../database.js";

export async function validateTokenMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  try {
    const session = await db.collection("session").findOne({ token });

    if (!session) {
      console.log("esse erro de session");
      return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
      return res.sendStatus(401);
    }
    delete user.password;

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
