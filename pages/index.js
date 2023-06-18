import React, { useState } from "react";
import Layout from "../components/layout";
import Link from "next/link";
import { useRouter } from "next/router"; 

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Sign-in successful");
        router.push("/list");
      } else {
        // Sign-in failed
        if (data.reason === "not_registered") {
          alert("Sign-in failed: User not registered");
        } else if (data.reason === "wrong_password") {
          alert("Sign-in failed: Wrong password");
        } else {
          alert("Sign-in failed: Internal Error");
        }
      }

    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <div className="heading signIn">
        <h1>Welcome!</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="inputEmail"
              className="form-control typeSpace"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control typeSpace"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-sm btn-primary btn-block myButton btn-outline-dark"
            type="submit"
          >
            LogIn
          </button>
        </form>
      </div>

      <br />
      <p>or</p>

      <div className="heading">
        <Link className="btn btn-block" href="/list" role="button">
          <i className="fab fa-google"></i>
          <span> </span>Login with Google
        </Link>
      </div>

      <div className="heading">
        <Link className="btn btn-block" href="/signUp" role="button">
          New? Sign Up Now !!
        </Link>
      </div>
    </Layout>
  );
}

export default SignIn;
