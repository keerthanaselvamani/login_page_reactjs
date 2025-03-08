import React, { useEffect, useState } from "react";

// import emailIcon from "../img/email.svg";
// import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const formData = location.state?.formData;
  const history = useHistory();

  const [touched, setTouched] = useState({});

  useEffect(() => {
    console.log('propsprops: ', formData)
  });

  const chaeckData = (obj) => {
    const { email, password } = obj;
    const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${email.toLowerCase()}&password=${password}`;
    const api = axios
      .get(urlApi)
      .then((response) => response.data)
      .then((data) => (data.ok ? notify("You login to your account successfully", "success") : notify("Your password or your email is wrong", "error")));
    toast.promise(api, {
      pending: "Loading your data...",
      success: false,
      error: "Something went wrong!",
    });
  };

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    // event.preventDefault();
    //chaeckData(data);
    console.log(event)
    history.push("/login");

  };

  return (
    <div className={styles.container}>
      <div className={styles.formLogin}>
        <h2>Dashboard</h2>
        <h2>Welcome to {formData.name}</h2>
        <button onClick={submitHandler} type="submit">Logout</button>
        <div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
