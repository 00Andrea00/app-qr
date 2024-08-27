import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cuadrado from "../Cuadrado/cuadrado";
import ContactLink from "../modals/modalregistro/contactlink";
const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const handleRegistro = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        "https://andreatandem.tandempatrimonionacional.eu/bdappqr/v1/user/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error registrando usuario", error);
      setMessage("Error en el registro");
    }
    setSubmitting(false);
  };
  const [styles, setStyles] = useState({
    length: "",
    number: "",
    special: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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
  useEffect(() => {
    const validatePassword = () => {
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
            .min(3, "Debe tener al menos 3 caracteres")
            .required("Campo obligatorio"),
          email: Yup.string()
            .email("Dirección de correo electrónico inválida")
            .required("Campo obligatorio"),
          password: Yup.string()
            .min(8, "Debe tener al menos 8 caracteres")
            .required("Campo obligatorio"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
            .required("Campo obligatorio"),
        })}
        onSubmit={handleRegistro}
      >
        {({ setFieldValue, touched, errors, handleSubmit, isSubmitting }) => (
          <Form className="register-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <div className="name-input-container">
                <label htmlFor="name" className="label-register">Nombre completo</label>
                <Field
                  className="input-registerr"
                  name="name"
                  type="text"
                  placeholder="Introduce tu nombre"
                  id="Name"
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
              <div className="email-input-container">
                <label htmlFor="email" className="label-register">Correo electrónico</label>
                <Field
                  className="input-registerr"
                  name="email"
                  type="email"
                  placeholder="Introduce tu email"
                  id="email"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
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
                      setFieldValue("password", e.target.value);
                      handlePassword(e);
                    }}
                  />
                  <button
                    type="button"
                    id="eye-input-register"
                    className="toggle-password-button"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? ":ojo:​" : ":ojo-en-globo-de-texto:"}
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
                <ErrorMessage name="password" component="div" className="error-message" />
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
                    {showConfirmPassword ? ":ojo:​" : ":ojo-en-globo-de-texto:"}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="error-message-brook" />
              </div>
            </div>
            <Cuadrado />
            <ContactLink />
            <button type="submit" id="btn-enviar-registro" disabled={isSubmitting}>
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