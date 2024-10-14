import React from "react"
import "../../assets/css/main.scss"
import recipe from "../../assets/img/recipe.svg"

export default function RecipeIcon(props: { style?: React.CSSProperties }) {
    return <img src={recipe} alt="" style={{ width: "2.75em", marginLeft: "0.5rem" }} />
}
