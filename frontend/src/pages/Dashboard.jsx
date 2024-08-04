import { Navbar } from "../components/Navbar";
import { Balance } from "../components/Balance";
import { InputBox } from "../components/InputBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../components/User";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);
  return debouncedValue;
}

export const Dashboard = () => {
  const [balance, setBalance] = useState();
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const debouncedValue = useDebounce(filter, 500);

  useEffect(() => {
    async function fetchBalance() {
      const resp = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (resp.data.success) {
        setBalance(resp.data.balance);
      } else {
        alert(resp.data.message);
      }
    }
    fetchBalance();
  }, []);

  useEffect(() => {
    async function fetchAllUsers() {
      const resp = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${debouncedValue}`
      );
      console.log(resp);
      if (resp.data.success) {
        console.log(resp.data.users);
        setUsers(resp.data.users);
      } else {
        alert(resp.data.message);
      }
    }
    fetchAllUsers();
  }, [debouncedValue]);

  return (
    <div>
      <Navbar />
      <Balance balance={balance} />
      <div className="mx-6 text-lg">
        <InputBox
          onChange={(e) => setFilter(e.target.value)}
          label="Users"
          inputType="search"
          placeholder="Search users here..."
        />
        {users.length > 0 &&
          users.map((user) => {
            if (user._id !== localStorage.getItem("userId")) {
              return <User key={user._id} user={user} />; 
            }
          })}
      </div>
    </div>
  );
};
