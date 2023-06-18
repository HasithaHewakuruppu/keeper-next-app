// pages/api/addItem.js

import User from "../../models/User";
import {Item} from "../../models/Item";
import connectDB from "../../utils/db";
import withSession from "../../utils/session";

connectDB();

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (req.session.get("user")) {
        const userId = req.session.get("user")._id;
        const newItem = new Item({
          name: req.body.data,
        });

        const foundUser = await User.findById(userId);

        if (foundUser) {
        
          const foundDay = foundUser.days.find((day) => day.date === req.body.date);
          console.log(foundDay);
          if (foundDay) {
            foundDay.list.push(newItem);
          } else {
            const newDay = { date: req.body.date, list: [newItem] };
            foundUser.days.push(newDay);
          }

          await foundUser.save();
          res.json(newItem);

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
