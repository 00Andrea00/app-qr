import React, { useState } from "react"
import Seo from "../components/seo"
import Halt from "../components/header/halt"
import Footer from "../components/footer/Footer"
import ListUsers from "../components/listusers/listusers"
import BtnBack from "../components/buttons/BtnBack"

function ListaUsuarios() {
  return (
    <>
      <Halt></Halt>
      <ListUsers url="https://andreatandem.tandempatrimonionacional.eu/bd-appqr/v1/user/list-user.php"></ListUsers>
      <BtnBack></BtnBack>
      <Footer></Footer>
    </>
  )
}
export const Head = () => <Seo title="Lista de usuarios" />
export default ListaUsuarios