import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import MainLayout from "./components/layouts/main-layout";
import HomePage from "./pages/home";
import IceCreamPage from "./pages/icecream";
import SignupPage from "./pages/auth/signup-page";
import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route path="icecream" element={<IceCreamPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Provider>
  );
}

export default App;
