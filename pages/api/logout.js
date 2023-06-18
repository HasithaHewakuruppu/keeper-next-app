// pages/api/logout.js

import withSession from "../../utils/session";

async function handler(req, res) {
  if (req.method === "POST") {
    req.session.destroy();
    res.json({ success: true });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default withSession(handler);
