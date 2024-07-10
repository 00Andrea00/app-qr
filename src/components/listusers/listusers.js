import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"
import "./listusers.css"
import Buscador from "../buscador/buscador"

const ListUsers = ({ url }) => {
  const [users, setUsers] = useState([])
  const [menssage, setMenssage] = useState("")
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data.users)
        setMenssage(data.menssage)
      } catch (error) {
        console.error("Error al buscar la lista de usuarios", error)
      }
    }
    fetchUser()
  }, [url])
  return (
    <>
      <h1 className="h1User">{menssage}</h1>
      <Buscador></Buscador>
      <div className="listado">
        {users.map(user => (
          <div key={user.id}>
            <div className="personal">
              <StaticImage
                className="btnProfile icon-perfil img-personal"
                src="../../images/icons/profile-2.svg"
                alt="Perfil"
              />
              <button>+ info</button>
              <p>{user.name}</p>
              <p>{user.role}</p>
              <button>Modificar</button>
              <button>Cambiar rol</button>
              <button>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ListUsers
