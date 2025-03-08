import React, { useState } from "react";
// import emailIcon from "../img/email.svg";
// import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const [touched, setTouched] = useState({});

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
    <div className={styles.formLogin}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{ fontSize: "15px", backgroundColor: "#91cba4" }} onClick={submitHandler} type="logout">Logout</button>
      </div>
      {/* <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off"> */}
      <h2>Dashboard</h2>



      <div>
        {/* <div>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
          </div> */}
      </div>
      <div>
        {/* <div>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
          </div> */}
      </div>

      <div>
        {/* <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have a account? <Link to="/signup">Create account</Link>
          </span> */}
      </div>
      {/* </form> */}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
