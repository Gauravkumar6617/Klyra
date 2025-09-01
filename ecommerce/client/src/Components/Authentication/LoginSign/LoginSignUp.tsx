import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../App/store";
import { loginUser, registerUser } from "../../../Features/Auth/authSlice";
import { toast } from "react-toastify";
const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, error  } = useAppSelector((state) => state.auth);

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email: loginEmail, password: loginPassword }))
      .unwrap()
      toast.success("User Login successfully! 🎉");
      navigate("/");
      
    } catch (error) {
      const errorMessage = String(error) || "Login failed. Please try again.";
      toast.error(errorMessage);
    }

  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await dispatch(registerUser({ name: registerName, email: registerEmail, password: registerPassword })).unwrap();
        toast.success("User registered successfully! 🎉");
        navigate("/");
    } catch (error) {
        const errorMessage = String(error) || "Registration failed. Please try again.";
        toast.error(errorMessage);
    }
  };
  return (
    <div className="loginSignUpSection">
      <div className="loginSignUpContainer">
        <div className="loginSignUpTabs">
          <p
            onClick={() => setActiveTab("tabButton1")}
            className={activeTab === "tabButton1" ? "active" : ""}
          >
            Login
          </p>
          <p
            onClick={() => setActiveTab("tabButton2")}
            className={activeTab === "tabButton2" ? "active" : ""}
          >
            Register
          </p>
        </div>

        <div className="loginSignUpTabsContent">
          {/* Login */}
          {activeTab === "tabButton1" && (
            <div className="loginSignUpTabsContentLogin">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email address *"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password *"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <div className="loginSignUpForgetPass">
                  <label>
                    <input type="checkbox" className="brandRadio" />
                    <p>Remember me</p>
                  </label>
                  <p>
                    <Link to="/resetPassword">Lost password?</Link>
                  </p>
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          )}

          {/* Register */}
          {activeTab === "tabButton2" && (
            <div className="loginSignUpTabsContentRegister">
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Username *"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email address *"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password *"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
                <p>
                  Your personal data will be used to support your experience...
                </p>
                <button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
