import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignupPage = () => {
  //navigation
  const navigate = useNavigate();

  const [isLogged] = useState(Boolean(localStorage.getItem("token")));

  const [emailExist, setEmailExist] = useState(false);

  //api end-point of backend
  const url =
    "http://localhost:5000/user/signup";

  // user schema for form validation
  const userSchema = yup.object().shape({
    email: yup.string().email("Enter a proper email").required(),
    password: yup
      .string()
      .min(8)
      .max(50)
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password should match"),
  });

  //form validation ko lagi react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  useEffect(() => {
    if (isLogged) navigate("/");
  });

  const submitHandler = async (data) => {
    setEmailExist(false);
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    try {
      await axios.post(url, requestBody);
      console.log("SIGN UP REACHED")
      navigate("/signin", { state: { signedUp: true } });
    } catch (err) {
    console.log(err)
      setEmailExist(true);
      reset({
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <>
    
      <main>
        <div >
          <h2 >
            Signup Page
          </h2>
        </div>
        <div>
          <div>
            <form
              onSubmit={handleSubmit(submitHandler)}>
                <label>Email</label>
              <input
                type="email"
                label="email address"
                autoFocus
                {...register("email")}
              />
            <label>Password</label>
              <input
                type="password"
                label="password"
                name = "password"
                {...register("password")}
              />
            <label>Confirm Password</label>
              <input
                name="confirmPassword"
                label="confirm password"
                type="password"
                {...register("confirmPassword")}
              />
              <button type="submit">
                Sign Up
              </button>
                <Link to="/signin">Already have an accout?, Login</Link>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
