import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

const SigninPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // const { signedUp } = state;
  const [isLogged, setIsLogged] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [isSignedUp, setIsSignedUp] = useState(
    state?.signedUp ? state.signedUp : false
  );

  const [isEmailNotFound, setIsEmailNotFound] = useState(false);

  const userSchema = yup.object().shape({
    email: yup.string().email("Enter a proper email").required(),
    password: yup.string().required(),
  });

  // form validation react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  useEffect(() => {
    if (isLogged) navigate("/", { state: { loggedIn: true } });
  });

  // api end point for backend
  const url = 
    "http://localhost:5000/user/signin";


  const submitHandler = async (data) => {
    setIsEmailNotFound(false);
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    try {
      const { data } = await axios.post(url, requestBody);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);
      setIsLogged(true);
      navigate("/");
      // window.location.reload();
    } catch (err) {
        console.log(err)
      setIsEmailNotFound(true);
    }
  };

  return (
    <>
      
      <main>
        <div>
          <p>
            Login
          </p>
        </div>
        <div >
          <div >
            <form
              onSubmit={handleSubmit(submitHandler)}>
                <label>Email</label>
              <input
                id="email"
                label="email address"
                {...register("email")}
              />
              <label>Password</label>
              <input
                id="password"
                label="password"
                {...register("password")}
                type="password"
              />
              <button type="submit">
                Login
              </button>
              <div>
                <Link to="/signup">Don't have an account?, Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default SigninPage;
