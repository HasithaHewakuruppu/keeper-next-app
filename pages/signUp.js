import React, { useState } from "react";
import Layout from "../components/layout";
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2'


function SignUp() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

  try {
    setLoading(true); 
    const response = await fetch("api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await response.json();
    setLoading(false); 

    if (data.registered) {
      // Registration successful
      Swal.fire({title:"Registration successful",background: '#fdcb6e',confirmButtonColor:'black'});
      window.location.href = "/"; 
    } else {
      // Registration failed
      Swal.fire({title:data.error.message,background: '#fdcb6e',confirmButtonColor:'black'});
    }

  } catch (error) {
    // Handle network errors or other exceptions
    console.log(error);
    Swal.fire({title:data.error.message,background: '#fdcb6e',confirmButtonColor:'black'});
  }
 
  };

  return (
    <Layout>
      <div className="heading signUp">
        <h1>Register Below</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="form-control typeSpace"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
            <input
              type="text"
              className="form-control typeSpace"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <input
              type="email"
              id="inputEmail"
              className="form-control typeSpace"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control typeSpace"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {isLoading ? (
            <div className="spinner-container">
              <PulseLoader color="#fdcb6e" loading={true}/>
            </div>
          ) : (
            <button className="btn btn-sm btn-primary btn-block myButton btn-outline-dark" type="submit">
            Register
            </button>
          )}

        </form>
      </div>

      <br />
      <p>or</p>

      <div className="heading">
        <a className="btn btn-block" href="/" role="button">
          <i className="fab fa-google"></i>
          <span> </span>Sign Up with Google
        </a>
      </div>
    </Layout>
  );
}

export default SignUp;
