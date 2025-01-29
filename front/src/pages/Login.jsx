import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, Register } from "../Action/userAction";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [account, setAccount] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandle = async (e) => {
    e.preventDefault();
    setName("");
    setPassword("");

    dispatch(login(email, password));
    navigate("/");
  };

  const registerHandle = (e) => {
    e.preventDefault();
    setName("");
    setPassword("");
    console.log(name, email, password);
    dispatch(Register(name, email, password));
    navigate("/");
  };

  const ToggleTo = () => {
    setAccount(account === "login" ? "register" : "login");
  };

  return (
    <div className="LoginPage h-screen w-screen flex justify-center items-center bg-gradient-to-br from-[#432004] to-[#654321]">
      <div className="LoginForm w-[350px] p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20">
        <h1 className="text-center pb-6 text-3xl font-bold text-[#E5C09F]">
          {account === "login" ? "Login" : "Register"}
        </h1>

        <form className="flex flex-col gap-5" onSubmit={account === "login" ? loginHandle : registerHandle}>
          {account === "register" && (
            <input
              type="text"
              className="p-3 text-lg bg-[#5C3A1E]/50 rounded-md border border-[#E5C09F]/40 placeholder-[#E5C09F] focus:outline-none focus:ring-2 focus:ring-[#E5C09F]"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            className="p-3 text-lg bg-[#5C3A1E]/50 rounded-md border border-[#E5C09F]/40 placeholder-[#E5C09F] focus:outline-none focus:ring-2 focus:ring-[#E5C09F]"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-3 text-lg bg-[#5C3A1E]/50 rounded-md border border-[#E5C09F]/40 placeholder-[#E5C09F] focus:outline-none focus:ring-2 focus:ring-[#E5C09F]"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="py-3 bg-[#E5C09F] text-[#432004] rounded-md text-lg font-semibold hover:bg-[#C9A07A] transition duration-300">
            {account === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-[#E5C09F]">
          {account === "login" ? "Don't have an account?" : "Already have an account?"}
          <span className="text-[#FFC97E] cursor-pointer underline ml-2" onClick={ToggleTo}>
            {account === "login" ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
