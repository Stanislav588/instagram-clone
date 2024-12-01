import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import Layout from "./Layouts/PageLayout/Layout";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import AuthForm from "./components/AuthForm/AuthForm";
import { useSelector } from "react-redux";

export default function App() {
  const authUser = useSelector((state) => state.auth.userProfile);

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!authUser ? <AuthForm /> : <Navigate to="/" />}
          />
          <Route path={"/:username"} element={<ProfilePage />} />
        </Routes>
      </Layout>
    </>
  );
}
