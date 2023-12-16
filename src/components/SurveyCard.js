import React from 'react'

const SurveyCard = ({survey}) => {
  return (
    <div>
        <h2>{survey.name}</h2>
        <p>{survey.age}</p>
        <p>{survey.firstDoze ? "First Doze taken" : "First Doze not taken" }</p>
        <p>{survey.secondDoze ? "Second Doze taken" : "Second Doze not taken"}</p>
        <p>{survey.thirdDoze ? "Third Doze taken" : "Third Doze not taken"}</p>
    </div>
  )
}

export default SurveyCard