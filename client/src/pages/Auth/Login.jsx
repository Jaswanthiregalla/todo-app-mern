import React, { useState } from "react";
import styles from "./Login.module.css";
import login from "../../assets/login.png";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/authServices";
import { getErrorMessage } from "../../util/GetError";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Login");
    try {
      setLoading(true);
      let data = {
        username,
        password,
      };
      const response = await AuthServices.loginUser(data);
      console.log(response.data);
      localStorage.setItem("toDoAppUser", JSON.stringify(response.data));
      message.success("Logged in Successfully");
      setTimeout(() => {
        navigate("/to-do-list");
      }, 1000);
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.login__card}>
        <img src={login} alt=".." />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.input__wrapper}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.input__wrapper}>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.input__info}>
            New User? <Link to="/register">Register</Link>
          </div>
          <Button
            loading={loading}
            type="primary"
            size="large"
            disabled={!username || !password}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
