import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          firstName,
          lastName,
          username,
          password,
        }
      );
      console.log(resp.data.success);
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
        }
      } else {
        alert(resp.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert(
        "Error during signup: " +
          (error.response?.data?.message || "An unknown error occurred")
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700">
      <div className="fixed max-w-[22rem] bg-white rounded-xl shadow-2xl">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <div className="mx-7">
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            htmlFor="fname"
            label="First Name"
            inputType="text"
            placeholder="Enter your first name here..."
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            htmlFor="lname"
            label="Last Name"
            inputType="text"
            placeholder="Enter your last name here..."
          />
          <InputBox
            onChange={(e) => setUserName(e.target.value)}
            htmlFor="username"
            label="Email"
            inputType="email"
            placeholder="Enter your email here..."
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            htmlFor="password"
            label="Password"
            inputType="password"
            placeholder="Must have at least 6 characters"
          />
          <Button onClick={handleSubmit} label="Sign up" />
          <BottomWarning
            label="Already have an account?"
            to="/signin"
            buttonText="Sign in"
          />
        </div>
      </div>
    </div>
  );
};
