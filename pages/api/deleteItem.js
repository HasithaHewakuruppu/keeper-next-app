import User from "../../models/User";
import connectDB from "../../utils/db";
import withSession from "../../utils/session";

connectDB();

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (req.session.get("user")) {
        const userId = req.session.get("user")._id;
        const itemId = req.body.itemId;
        const date = req.body.date;

        const updateQuery = {
          $pull: {
            "days.$[day].list": { _id: itemId }
          }
        };

        const updateOptions = {
          arrayFilters: [
            { "day.date": date }
          ]
        };

        const updatedUser = await User.findByIdAndUpdate(userId, updateQuery, updateOptions);

        if (updatedUser) {
  
          const foundDay = updatedUser.days.find(day => day.date === date);
          
          if (foundDay.list.length === 1) {
            updatedUser.days.pull(foundDay);
          }

          await updatedUser.save();

          console.log("Successfully Deleted");
          
          res.status(200).json({ message: "Successfully Deleted" });
        } else {
          res.status(404).json({ error: "Item not found" });
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
