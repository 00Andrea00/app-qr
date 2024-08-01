import React from "react"
import "./changedatauser.css"

const ChangeUserData = () => {
  return (
    <>
      <p>Indique su nuevo nombre o contraseña:</p>
      <label htmlFor="changeNameInput" className="changeName">
        Nombre completo*
        <input
          type="text"
          name="usernamechange"
          id="changeNameInput"
          className="changeNameInput"
          placeholder="Nombre completo"
          title="Debes poner tu nombre actual o tu nuevo nombre"
          required
        />
      </label>
      <label htmlFor="changePasswordInput" className="changePassword">
        Contraseña*   
        <input
          type="text"
          name="userpasswordchange"
          id="changePasswordInput"
          className="changePasswordInput"
          placeholder="Contraseña"
          title="Debes poner tu contraseña actual o tu nueva contraseña"
          required
        />
      </label>
    </>
  )
}

export default ChangeUserData
