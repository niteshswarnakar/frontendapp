import React, { useEffect, useState } from 'react'
import SurveyCard from '../components/SurveyCard';
import axios from "axios"
import Header from '../components/Header';

const SurveyPage = () => {
  let url = "http://localhost:5000/survey/all"


  const [surveys, setSurveys] = useState([])

  async function fetchData(urlpath){
    try{
      const {data} = await axios.get(urlpath);
      setSurveys(data)
    }catch(err){
      console.log(err)
      setSurveys([]) 
    }
  }

  useEffect(()=>{
    fetchData(url)
  },[])

  return (
      <>
      <Header />
        <div>SurveyPage</div>
        <ul>
          {surveys.map((s) => {
            return <li key = {s._id}><SurveyCard survey = {s} /></li>
          })}
        </ul>

      </>
  )
}

export default SurveyPage