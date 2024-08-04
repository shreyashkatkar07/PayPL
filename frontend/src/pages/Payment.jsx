import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export const Payment = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const resp = await axios.put(
      "http://localhost:3000/api/v1/account/transfer",
      {
        amount: amount,
        to: searchParams.get("id"),
      },
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
      alert(resp.data.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700">
      <div className="fixed min-w-[23rem] bg-white rounded-xl shadow-2xl">
        <Heading label="Transfer Money" />
        <div className="flex items-center justify-center gap-2">
          <p className="font-medium">To : </p>
          <p className="max-w-12 px-3 py-2 bg-gray-900 rounded-full hover:cursor-pointer text-white">
            {searchParams.get("firstName")[0].toUpperCase()}
            {searchParams.get("lastName")[0].toUpperCase()}
          </p>
          <p className="font-medium">
            {searchParams.get("firstName") + " " + searchParams.get("lastName")}
          </p>
        </div>
        <div className="mx-8">
          <InputBox
            htmlFor={"amount"}
            onChange={(e) => setAmount(e.target.value)}
            label={"Amount (in Rs.)"}
            inputType={"number"}
            placeholder={"Enter amount here..."}
          />
          <Button onClick={handleSubmit} label={"Click here to transfer"} />
          <BottomWarning
            label="Do you want to cancel the money transfer?"
            buttonText="Go back"
            to="/dashboard"
          />
        </div>
      </div>
    </div>
  );
};
