import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cuadrado from "../Cuadrado/cuadrado";
import ContactLink from "../modals/modalregistro/contactlink";
const RegisterForm = ({ register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleRegistro = async () => {
    try {
      const response = await fetch(
        "https://andreatandem.tandempatrimonionacional.eu/bdappqr/v1/user/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // No es necesario configurar el 'Access-Control-Allow-Origin' aquí; esto se debe hacer en el servidor
          },
          body: JSON.stringify({ name, email, password }),
          mode: "cors", // CORS necesita ser configurado en el servidor
        }
      );
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error registrando usuario", error);
      setMessage("Error en el registro");
    }
  };  
  const [styles, setStyles] = useState({
    length: "",
    number: "",
    special: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const validatePassword = () => {
      const capital = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
      const numbers = "123456789".split("");
      const special = "&@$%+#/*".split("");
      const stylGreen = {
        background: "rgba(102,255,102,0.2)",
        borderColor: "rgb(102,255,102)",
        color: "lightgreen",
      };
      const stylRed = {
        background: "rgba(231,76,60,0.2)",
        borderColor: "#E74C3C",
        color: "#FF3F34",
      };
      let lengthStyle = password.length >= 8 ? stylGreen : stylRed;
      let numberStyle = numbers.some((char) => password.includes(char))
        ? stylGreen
        : stylRed;
      let specialStyle = special.some((char) => password.includes(char))
        ? stylGreen
        : stylRed;
      setStyles({
        length: lengthStyle,
        number: numberStyle,
        special: specialStyle,
      });
    };
    validatePassword();
  }, [password]);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };
  const handleInputFocus = () => {
    setShowDropdown(true);
  };
  const handleInputBlur = () => {
    setShowDropdown(false);
  };
  return (
    <div className="form-register">
      <h1>Nuevo usuario</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Must be at least 3 characters")
            .required("Campo obligatorio"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Campo obligatorio"),
          password: Yup.string().required("Campo obligatorio"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
            .required("Campo obligatorio"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setName(values.name);
          setEmail(values.email);
          setPassword(values.password);
          await handleRegistro();
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, touched, errors }) => (
          <Form className="register-form">
            <div className="field-group">
              <div className="name-input-container">
                <label htmlFor="name" className="label-register">Nombre completo</label>
                <Field
                  className="input-registerr"
                  name="name"
                  type="text"
                  placeholder="Introduce tu nombre"
                  id="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setFieldValue("name", e.target.value);
                  }}
                />
                {touched.name && errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>
              <div className="email-input-container">
                <label htmlFor="email" className="label-register">Correo electrónico</label>
                <Field
                  className="input-registerr"
                  name="email"
                  type="email"
                  placeholder="Introduce tu email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldValue("email", e.target.value);
                  }}
                />
                {touched.email && errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="field-group">
              <div>
                <label htmlFor="password" className="label-register">Contraseña</label>
                <div className="password-input-container">
                  <Field
                    className="input-registerr"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Introduce tu Contraseña"
                    id="password"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldValue("password", e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    id="eye-input-register"
                    className="toggle-password-button"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? ":eye:​" : ":eye-in-speech-bubble:"}
                  </button>
                </div>
                {showDropdown && (
                  <div id="validacion-contraseña">
                    <span
                      style={{
                        ...styles.length,
                        display: "block",
                        padding: "5px",
                        color: "#4F4E4E",
                        fontWeight: "bold",
                      }}
                    >
                      Mínimo 8 caracteres
                    </span>
                    <span
                      style={{
                        ...styles.number,
                        display: "block",
                        padding: "5px",
                        color: "#4F4E4E",
                        fontWeight: "bold",
                      }}
                    >
                      Mínimo debe contener un número
                    </span>
                    <span
                      style={{
                        ...styles.special,
                        display: "block",
                        padding: "5px",
                        color: "#4F4E4E",
                        fontWeight: "bold",
                      }}
                    >
                      Mínimo debe contener un carácter especial
                    </span>
                  </div>
                )}
                {touched.password && errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
              <div className="confirmPassword-input-container">
                <label htmlFor="confirmPassword" className="label-register">Confirmar contraseña</label>
                <div className="password-input-container">
                  <Field
                    className="input-registerr"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repite tu contraseña"
                  />
                  <button
                    type="button"
                    id="eye-input-register-2"
                    className="toggle-password-button"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? ":eye:​" : ":eye-in-speech-bubble:"}
                  </button>
                </div>
              </div>
              <br></br>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="error-message-brook">{errors.confirmPassword}</div>
              )}
            </div>
            <br />
            <br />
            <Cuadrado />
            <br />
            <ContactLink />
            <br />
            <button type="submit" id="btn-enviar-registro">
              Enviar
            </button>
            {message && <p>{message}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterForm;