import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "state";
import { Box } from "@mui/material";
import LowerBar from "scenes/lowerBar";

const Recipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  const getAllRecipes = async () => {
    const response = await fetch("http://localhost:3001/recipes/", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    dispatch(setRecipes({ recipes: data }));
  };


    if(!recipes){
        getAllRecipes();
    }


//   useEffect(() => {
//     getAllRecipes();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <LowerBar />
      {recipes.map(
        ({
          _id,
          recipeName,
          description,
          preparationSteps,
        }) => (
          <Box key= {_id}>
            {recipeName}
          </Box>
        )
      )}
    </>
  );
};

export default Recipes;
