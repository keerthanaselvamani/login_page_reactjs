import React, { useState } from "react";
// import emailIcon from "../img/email.svg";
// import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const [touched, setTouched] = useState({});

  const chaeckData = (obj) => {
    const { email, password } = obj;
    //   const urlApi = `http://localhost:8080/convertion/api/user/signup`;
    //   // const pushData = async () => {
    //   const responseA = (await axios.post(urlApi, data)).data;
    //   console.log('response.data q: ', responseA)
    //   if (true) {
    //     notify("You signed Up successfully", "success");
    //     history.push("/login");
    //   } else {
    //     notify("You have already registered, log in to your account", "warning");
    //   }
    // } catch (error) {
    //   console.log('EXCEPTION:', error);
    //   notify("Somthing error! please try again later", "error");
    // }

    const urlApi = `http://localhost:8080/convertion/api/user/login`;
    const api = axios
      .post(urlApi, obj)
      // .then((response) => {
      //   console.log('login res: ',response.data);
      // })
      .then((data) => {
        console.log('data.status ', data.status)
        if (data.status == 200) {
          notify("You login to your account successfully", "success")
          history.push("/dashboard");
        } else {
          notify("Your password or your email is wrong", "error")
        }
      });

    //  toast.promise(api, {
    //   pending: "Loading your data...",
    //   success: false,
    //   error: "Something went wrong!",
    // });
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
    event.preventDefault();
    chaeckData(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign In</h2>
        <div>
          <div>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            {/* <img src={emailIcon} alt="" /> */}
          </div>
        </div>
        <div>
          <div>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            {/* <img src={passwordIcon} alt="" /> */}
          </div>
        </div>

        <div>
          <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have a account? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
