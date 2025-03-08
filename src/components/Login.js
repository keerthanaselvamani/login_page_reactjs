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
  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  const chaeckData = async (obj, event) => {
    const { email, password } = obj;
    console.log('intial data', data, obj)
    event.preventDefault();
    console.log('errorserrors: ', email, password)
    if (email != "" && email != null && password != "" && password != null) {
      const urlApi = `http://localhost:8080/convertion/api/user/login`;
      const api = axios
        .post(urlApi, data)
        // .then((response) => {
        //   console.log('login res: ',response.data);
        // })
        .then((data) => {
          console.log('data.status ', data.status)
          if (data.status == 200) {
            notify("You login to your account successfully", "success")
            // history.push("/dashboard");
            const formData = {
              name: "John Doe",
              email: "john@example.com",
            };
            history.push("/dashboard", { formData });
          } else {
            notify("Your password or your email is wrong", "error")
          }
        });

      //  toast.promise(api, {
      //   pending: "Loading your data...",
      //   success: false,
      //   error: "Something went wrong!",
      // });
    } else {
      notify("Please Check fileds again", "error");
      setTouched({
        password: true,
        email: true
      });
    }
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
    chaeckData(data, event);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign In</h2>
        <div>
          <div>
            <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : !errors.email && touched.email ? styles.completed : undefined}>
              <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            </div>
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
