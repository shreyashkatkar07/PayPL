import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function login() {
      try {
        const resp = await axios.post(
          "http://localhost:3000/api/v1/user/login",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (resp.data.success) {
          alert(resp.data.message);
          navigate("/dashboard");
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Error while logging in");
        navigate("/signin");
      }
    }

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("usernames");

    if (token) {
      login();
    } else if (username) {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  return <div></div>;
};
