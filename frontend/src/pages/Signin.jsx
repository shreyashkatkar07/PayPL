import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const usernames = JSON.parse(localStorage.getItem("usernames")) || [];

  const handleSubmit = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );
      if (resp.data.success) {
        localStorage.setItem("token", resp.data.token);
        alert(resp.data.message);

        const resp2 = await axios.get(
          "http://localhost:3000/api/v1/user/info",
          {
            headers: {
              Authorization: `Bearer ${resp.data.token}`,
            },
          }
        );
        if (resp2.data.success) {
          localStorage.setItem("userId", resp2.data._id);
          localStorage.setItem("firstName", resp2.data.firstName);
          localStorage.setItem("lastName", resp2.data.lastName);
          localStorage.setItem("username", resp2.data.username);
          navigate("/dashboard");
        } else {
          alert(resp2.data.message);
          navigate("/signup");
        }
      } else {
        alert(resp.data.message);
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert(
        "Error during sign-in: " +
          (error.response?.data?.message || "An unknown error occurred")
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700">
      <div className="fixed max-w-[22rem] bg-white rounded-xl shadow-2xl">
        <Heading label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />
        <div className="mx-8">
          <InputBox
            list={"usernames"}
            htmlFor={"username"}
            label={"Email"}
            inputType={"email"}
            placeholder={"Enter your email here..."}
            onChange={(e) => setUserName(e.target.value)}
          />
          {
            <datalist id="usernames">
              {usernames &&
                usernames.map((username, index) => (
                  <option key={index} value={username} />
                ))}
            </datalist>
          }
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            inputType={"password"}
            placeholder={"Must have atleast 6 characters"}
          />
          <Button onClick={handleSubmit} label={"Sign in"} />
          <BottomWarning
            label="Don't have an account?"
            to="/signup"
            buttonText="Sign up"
          />
        </div>
      </div>
    </div>
  );
};
