import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
// import LowerBar from "scenes/lowerBar";
// import { useMemo } from "react";
// import { useSelector } from "react-redux";

function App() {
  // const mode = useSelector((state) => state.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //const isAuth = Boolean(useSelector((state) => state.token));
  const isAuth = true;

  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
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