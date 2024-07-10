import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Cuadrado from "../Cuadrado/cuadrado"
import ContactLink from "../modals/modalregistro/contactlink"

const RegisterForm = ({ register }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleName = e => setName(e.target.value)
  const handleEmail = e => setEmail(e.target.value)
  const handlePassword = e => setPassword(e.target.value)

  const handleRegistro = async () => {
    try {
      const response = await fetch(
        "http://localhost/bd-appqr/v1/user/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password}),
        }
      )
      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      console.error("Error registrando usuario", error)
      setMessage("Error en el registro")
    }
  }

  const [styles, setStyles] = useState({
    length: "",
    number: "",
    special: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const capital = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")
  const numbers = "123456789".split("")
  const special = "&@$%+#/*".split("")

  const stylGreen = {
    background: "rgba(102,255,102,0.2)",
    borderColor: "rgb(102,255,102)",
    color: "lightgreen",
  }

  const stylRed = {
    background: "rgba(231,76,60,0.2)",
    borderColor: "#e74c3c",
    color: "#ff3f34",
  }

  useEffect(() => {
    const validatePassword = () => {
      let lengthStyle = password.length >= 8 ? stylGreen : stylRed
      let numberStyle = numbers.some(char => password.includes(char))
        ? stylGreen
        : stylRed
      let specialStyle = special.some(char => password.includes(char))
        ? stylGreen
        : stylRed

      setStyles({
        length: lengthStyle,
        number: numberStyle,
        special: specialStyle,
      })
    }
    validatePassword()
  }, [password])

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const toggleShowConfirmPassword = () => {
    // Nueva función
    setShowConfirmPassword(prevShowPassword => !prevShowPassword)
  }

  const handleInputFocus = () => {
    setShowDropdown(true)
  }

  const handleInputBlur = () => {
    setShowDropdown(false)
  }

  return (
    <div className="form-container">
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
      >
        {({ setFieldValue, touched, errors }) => (
          <Form className="register-form">
            <div className="field-group">
              <div className="name-input-container">
                <label htmlFor="name">Nombre completo</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Introduce tu nombre"
                  id="Name"
                  value={name}
                  onChange={handleName}
                />
                {touched.name && errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>
              <div className="email-input-container">
                <label htmlFor="email">Correo electrónico</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Introduce tu email"
                  id="email"
                  value={email}
                  onChange={handleEmail}
                />
                {touched.email && errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="field-group">
              <div>
                <label htmlFor="password">Contraseña</label>
                <div className="password-input-container">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Introduce tu Contraseña"
                    id="password"
                    value={password}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={e => {
                      setPassword(e.target.value)
                      setFieldValue("password", e.target.value)
                      handlePassword(e)
                    }}
                  />
                  <button
                    type="button"
                    id="chopper"
                    className="toggle-password-button"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? "👁️​" : "👁️‍🗨️"}
                  </button>
                </div>
                {showDropdown && (
                  <div id="donpatch">
                    <span
                      style={{
                        ...styles.length,
                        display: "block",
                        padding: "5px",
                        color: "#4f4e4e",
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
                        color: "#4f4e4e",
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
                        color: "#4f4e4e",
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
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                />
                <button
                  type="button"
                  className="toggle-password-button fixed-position"
                  onClick={toggleShowConfirmPassword}
                >
                  {showConfirmPassword ? "👁️​" : "👁️‍🗨️"}
                </button>
              </div>
              <br></br>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="error-message-brook">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <br />
            <br />

            <Cuadrado />

            <br />

            <ContactLink />

            <br />

            <button type="submit" id="trucutrucu" onClick={handleRegistro}>
              Enviar
            </button>
            {message && <p>{message}</p>}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegisterForm
