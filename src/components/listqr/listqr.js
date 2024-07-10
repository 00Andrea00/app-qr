import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"
import "./listqr.css"
import Buscador from "../buscador/buscador"

const ListQr = ({ url }) => {
  const [qrs, setQrs] = useState([])
  const [menssage, setMenssage] = useState("")
  useEffect(() => {
    const fetchQrs = async () => {
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
        setQrs(data.qrs)
        setMenssage(data.menssage)
      } catch (error) {
        console.error("Error al buscar la lista de usuarios", error)
      }
    }
    fetchQrs()
  }, [url])
  return (
    <>
      <h1 className="h1Qr">{menssage}</h1>
      <Buscador></Buscador>
      <div className="listado-qr">
        {qrs.map(qrs => (
          <div key={qrs.id}>
            <div className="tarjeta-qr">
              <StaticImage
                className="btnProfile icon-perfil img-personal"
                src="../../images/icons/profile-2.svg"
                alt="Perfil"
              />
              <button>+ info</button>
              <p>{qrs.name_qr}</p>
              <button>Modificar</button>
              <button>Descargar</button>
              <button>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ListQr
