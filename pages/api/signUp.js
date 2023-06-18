// pages/api/signup.js
import {Item} from "../../models/Item";
import User from "../../models/User";
import {List} from "../../models/List";
import connectDB from "../../utils/db"
import withSession from "../../utils/session";

connectDB();

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, firstName, lastName } = req.body;

    const newItem = new Item({
      name: "click item to remove...",
    });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 since months are zero-based
    const day = currentDate.getDate();
    
    const newList = new List({
      date: new Date(year, month - 1, day).toLocaleDateString("en-GB"), // Converting to string in "YYYY-MM-DD" format
      list: [newItem]
    });
    

    try {
      const newUser = new User({ username: email, firstName, lastName, days:[newList] });
      
      await User.register(newUser, password, (err) => {
        if (err) {
          console.log(err);
          return res.json({registered:false, error:err});
        } else {
          return res.json({registered:true});
        }
      });

    } catch (err) {
      console.log(err);
      res.json({ registered:false, error:err});
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default withSession(handler);
