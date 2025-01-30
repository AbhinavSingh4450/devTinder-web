import React from 'react'

const Card = ({user}) => {
    const {firstName, lastName, photoUrl, skills, about, age, gender }= user;
  return (
    <div className="card bg-base-200 w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName+ " "+ lastName}</h2>
      <p>{age + ", " + gender}</p>
      <p>{skills}</p>
      <p>{about}</p>
      <div className="card-actions  my-4 mx-4 flex justify-center">
        <button className="btn btn-primary ">Ignore</button>
        <button className="btn btn-secondary ">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default Card
