import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import axios from "axios";
import Header from "../components/Header";

const Survey = () => {

  const userSchema = yup.object().shape({
    username: yup.string().required(),
    age: yup.number().required(),
    firstDoze: yup.bool(),
    secondDoze: yup.bool(),
    thirdDoze: yup.bool(),

  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });


  let navigate = useNavigate();
  const submitHandler = async (data) => {
    const surveyData = {
      username: data.username,
      age: data.age,
      firstDoze: data.firstDoze,
      secondDoze: data.secondDoze,
      thirdDoze: data.thirdDoze,
    };

    console.log({surveyData})

    try {
      const { data } = await axios.post(
        "http://localhost:5000/survey/form",
        surveyData
      );

      console.log({ data });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Header />
      <div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1>Survey </h1>
          <div>
            <p id="username">Name</p>
            <input id="username" {...register("username")} placeholder="eg. David Walker" type="text" />
          </div>
          <div>
            <p>Age</p>
            <input placeholder="" id="age" {...register("age")} type="text" />
          </div>
          <div>
            <p>FirstDoze</p>
            <input placeholder="firstDoze" id="firstDoze" {...register("firstDoze")} type="checkbox"></input>
          </div>
          <div>
            <p>Second Doze</p>
            <input
              placeholder="secondDoze"
              type="checkbox"
              id="secondDoze" {...register("secondDoze")}
              ></input>
          </div>
          <div>
            <p>Third Doze</p>
            <input placeholder="thirdDoze" id="thirdDoze" {...register("thirdDoze")} type="checkbox" ></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Survey;
