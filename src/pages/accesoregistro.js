import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Halt2 from "../components/header/halt2"
import Footer from "../components/footer/Footer"
import "../components/css-pages/accesoregistro.css"
import Cuadrado from "../components/Cuadrado/cuadrado"

// Simulación de una llamada a API para el inicio de sesión
const login = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: "fake-jwt-token" });
    }, 500);
  });
};

// Simulación de una llamada a API para el registro
const register = async (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: "fake-jwt-token" });
    }, 500);
  });
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const [password, setPassword] = useState('');
  const [styles, setStyles] = useState({
    length: '',
    number: '',
    special: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowdropdown] = useState(false);
  
  const capital = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  const number = '123456789'.split('');
  const special = '&@$%+#/*'.split('');
  const small = capital.map(letter => letter.toLowerCase());
  
  const stylGreen = {
    background: 'rgba(102,255,102,0.2)',
    borderColor: 'rgb(102,255,102)',
    color: 'lightgreen'
  };
  
  const stylRed = {
    background: 'rgba(231,76,60,0.2)',
    borderColor: '#e74c3c',
    color: '#ff3f34'
  };
  
  useEffect(()=> {
    const validatePassword = () => {
      let c = 0;
      let s = 0;
  
      let lengthStyle = password.lenght >=5 ? stylGreen : stylRed;
      if (password.length >= 8) {
        lengthStyle = stylGreen;
      } else {
        lengthStyle = stylRed;
      }
  
      let numberStyle = stylRed;
      if (number.some(char => password.includes(char))) {
        numberStyle = stylGreen;
      }
  
      let specialStyle = stylRed;
      if (special.some(char => password.includes(char))) {
        specialStyle = stylGreen;
      }
  
      setStyles({
        length: lengthStyle,
        number: numberStyle,
        special: specialStyle
      });
    };
    validatePassword();
    }, [password]);
  
    const toggleShowPassword = () => {
      setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleInputFocus = () => {
      setShowdropdown(true);
    }

    const handleInputBlur = () => {
      setShowdropdown(false);
    }

  return (
    <>
    <Halt2></Halt2>
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <button onClick={toggleForm}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>

      {isLogin ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            login(values.email, values.password)
              .then((response) => {
                console.log("Login successful:", response);
                setSubmitting(false);
              })
              .catch((error) => {
                console.error("Login failed:", error);
                setSubmitting(false);
              });
          }}
        >
          <Form>
            <label htmlFor="email">Email Address</label>
            <input name="email" type="email" />
            <ErrorMessage name="email" />

            <label htmlFor="password">Password</label>
            <input name="password" type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={toggleShowPassword}>{showPassword ? 'ocultar' : 'Mostrar'}</button>
            <ErrorMessage name="password" />
            
            <br/>

            <Link to="/appsite">
            <button type="submit">Submit</button>
            </Link>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={{name:"", email: "", password: "", confirmPassword: "" }}
          validationSchema={Yup.object({
            name: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().required("Required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            register(values.name, values.email, values.password)
              .then((response) => {
                console.log("Registration successful:", response);
                setSubmitting(false);
              })
              .catch((error) => {
                console.error("Registration failed:", error);
                setSubmitting(false);
              });
          }}
        >
          <Form>
            <Cuadrado></Cuadrado>
            <label htmlFor="name">Name</label>
            <input name="name" type="text"/>
            <ErrorMessage name="name"/>

            <label htmlFor="email">Email Address</label>
            <input name="email" type="email" />
            <ErrorMessage name="email" />

            <label htmlFor="password">Password</label>
            <input name="password" type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={e => setPassword(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} />
            <button onClick={toggleShowPassword}>{showPassword ? 'ocultar' : 'Mostrar'}</button>
            {showDropdown && (
              <div id="donpatch">
                <span style={{ ...styles.length, display: 'block', padding: '5px' }}>
                  Mínimo 8 caracteres
                </span>
                <span style={{ ...styles.number, display: 'block', padding: '5px' }}>
                  Mínimo debe contener un número
                </span>
                <span style={{ ...styles.special, display: 'block', padding: '5px' }}>
                  Mínimo debe contener un carácter especial
                </span>
              </div>
            )}
            <ErrorMessage name="password" />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input name="confirmPassword" type="password" />
            <ErrorMessage name="confirmPassword" />

            <br/>

            <button type="submit">Enviar</button>
          </Form>
        </Formik>
      )}
    </div>
    <Footer></Footer>
    </>
  );
};

export default Auth;