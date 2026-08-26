import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Main from "./components/Main";
import Home from "./pages/Home";

import getCurrentUser from "./features/getCurrentUser";
import { setUserdata } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();

        if (data) {
          dispatch(setUserdata(data));
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;