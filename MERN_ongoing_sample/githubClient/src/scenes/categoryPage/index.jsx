import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "state";
import { Box } from "@mui/material";
import LowerBar from "scenes/lowerBar";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);


  const getAllCategories = async () => {
    const response = await fetch("http://localhost:3001/category/", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setCategories({ categories: data }));
  };


  if(!categories){
    getAllCategories();
  }

//   useEffect(() => {
//    getAllCategories();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <LowerBar />
      {categories.map(
        ({
          _id,
          name, 
          description,
          otherDetails,
        }) => (
          <Box key= {_id}>
            {description}
          </Box>
        )
      )}
    </>
  );
};

export default Categories;
