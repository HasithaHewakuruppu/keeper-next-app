import User from "../../models/User";
import connectDB from "../../utils/db";
import withSession from "../../utils/session";

connectDB();

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const user = req.session.get("user");
      if (user) {
        const userId = user._id;
        const foundUser = await User.findById(userId);
        if (foundUser) {
          const days = foundUser.days;
          const dates = days.map(day => day.date);
          res.json({ dates });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else {
        res.status(401).json({ error: "Unauthorized access" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default withSession(handler);
