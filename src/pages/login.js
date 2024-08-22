import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (response) => {
    onLogin();
    navigate("/jobs");
  };

  const handleGoogleLoginError = (error) => {
    setAlertMessage("Google login failed. Please try again.");
    setShowAlert(true);
  };
  const handleFacbookLoginSuccess = (response) => {
    onLogin();
    navigate("/jobs");
  };

  const handleFacbookLoginError = (error) => {
    setAlertMessage("Facebook login failed. Please try again.");
    setShowAlert(true);
  };

  const handleStaticLogin = (e) => {
    e.preventDefault();
    if (username === "johndoe" && password === "john") {
      onLogin();
      navigate("/jobs");
    } else {
      setAlertMessage("Invalid username or password.");
      setShowAlert(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        {showAlert && (
          <Alert color="danger" toggle={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        )}

        <form onSubmit={handleStaticLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="john"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#446ea1] text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <GoogleOAuthProvider clientId="732510236209-fpmapkvqb48e2pt4alcf1erlmp7voqco.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              width={"384"}
            />
          </GoogleOAuthProvider>

          <FacebookLogin
            appId="473489298976271"
            onSuccess={handleFacbookLoginSuccess}
            onFail={handleFacbookLoginError}
            style={{
              width: "100%",
              backgroundColor: "#4267b2",
              color: "#fff",
              fontSize: "16px",
              padding: "12px 24px",
              marginTop: "10px",
              border: "none",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
