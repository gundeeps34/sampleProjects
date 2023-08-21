import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
// import LowerBar from "scenes/lowerBar";
// import { useMemo } from "react";
import { useSelector } from "react-redux";
import Categories from "scenes/categoryPage";
import Recipes from "scenes/recipePage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/category"
              element={<Categories />}
            />
            <Route
              path="/recipes"
              element={<Recipes />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



// {/* <Route
//   path="/profile/:userId"
//   element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
// /> */}