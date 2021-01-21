import React from "react"

function Recipe({title, calories, image, ingredients, link}) {
    return(
        <div className="recipe">
            <h1>{title}</h1>
            <img src={image} alt=""></img>
            <ul>
                {ingredients.map(row => (
                    <li className="short-text">{row}</li>
                ))}
            </ul>
            <a href={link} target="_blank" rel="noreferrer">Recipe Link</a>
            <p>Calories: {Math.round(calories)}</p>
        </div>
    )
}

export default Recipe;
