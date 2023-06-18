import passport from "passport";
import User from "../../models/User";
import connectDB from "../../utils/db";
import withSession from "../../utils/session";

connectDB();

async function handler(req, res) {

passport.initialize();
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  if (req.method === "POST") {
    
      const foundUser = await User.findOne({ username: req.body.username });

      if (!foundUser) {
        return res.json({ success: false, reason: "not_registered" });
      }

      let authenticated = false;

      await new Promise((resolve, reject) => {
        passport.authenticate("local", (err, user) => {
          if (err) {
            reject();
          } else if (!user) {
            authenticated = false;
            resolve();
          }
          else {
            authenticated = true;
            resolve();
          }
        })(req, res);
      });

      console.log(authenticated);
      if (authenticated) {
        req.session.set('user', {
          _id: foundUser._id,
        });
        await req.session.save();
        return res.json({ success: true });
      } else {
        console.log("Wrong password");
        return res.json({ success: false, reason: "wrong_password" });
      }

  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default withSession(handler);



