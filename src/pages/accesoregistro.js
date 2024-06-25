import React, { useEffect, useState } from "react";
import Seo from "../components/seo";
import { Link } from "gatsby";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Halt2 from "../components/header/halt2";
import Footer from "../components/footer/Footer";
import "../components/css-pages/accesoregistro.css";
import Cuadrado from "../components/Cuadrado/cuadrado";

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
  const [password, setPassword] = useState('');
  const [styles, setStyles] = useState({
    length: '',
    number: '',
    special: ''
  });

  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

  useEffect(() => {
    const validatePassword = () => {
      let lengthStyle = password.length >= 8 ? stylGreen : stylRed;
      let numberStyle = number.some(char => password.includes(char)) ? stylGreen : stylRed;
      let specialStyle = special.some(char => password.includes(char)) ? stylGreen : stylRed;

      setStyles({
        length: lengthStyle,
        number: numberStyle,
        special: specialStyle
      });
    };
    validatePassword();
  }, [password]);

  const toggleShowPasswordLogin = () => {
    setShowPasswordLogin(prevShowPassword => !prevShowPassword);
  };

  const toggleShowPasswordRegister = () => {
    setShowPasswordRegister(prevShowPassword => !prevShowPassword);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  }

  const handleInputBlur = () => {
    setShowDropdown(false);
  }

  return (
    <>
      <Halt2 />
      <div className="auth-container">
        <div className="form-container-grandBlue">
          <h1>Login</h1>
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
              <div className="email-input-container">
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
              </div>

              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <Field name="password" type={showPasswordLogin ? 'text' : 'password'} />
                <button type="button" id="franky" className="toggle-password-button" onClick={toggleShowPasswordLogin}>
                  {showPasswordLogin ? '👁️​' : '👁️‍🗨️'}
                </button>
              </div>
              <ErrorMessage name="password" />

              <br/>

              <Link to="/appsite">
                <button type="submit">Submit</button>
              </Link>
            </Form>
          </Formik>
        </div>

        <div className="form-container">
          <h1>Register</h1>
          <Formik
            initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
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
            <Form className="register-form">
              <div className="field-group">
                <div className="name-input-container">
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" />
                  <ErrorMessage name="name" />
                </div>
                <div className="email-input-container">
                  <label htmlFor="email">Email Address</label>
                  <Field name="email" type="email" />
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label htmlFor="password">Password</label>
                  <div className="password-input-container">
                    <Field name="password" type={showPasswordRegister ? 'text' : 'password'} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                    <button type="button" id="chopper" className="toggle-password-button" onClick={toggleShowPasswordRegister}>
                      {showPasswordRegister ? '👁️​' : '👁️‍🗨️'}
                    </button>
                  </div>
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
                </div>
                <div className="confirmPassword-input-container">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>

              <br/>
              <br/>

              <Cuadrado />

              <br/>

              <button type="submit">Enviar</button>
            </Form>
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const Head = () => <Seo title="Login/Registro" />
export default Auth;