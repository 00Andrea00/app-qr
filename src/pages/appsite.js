import React, { useState, useRef, useEffect } from "react"
import Seo from "../components/seo"
import Halt from "../components/header/halt"
import "../components/css-pages/appsite.css"
import Footer from "../components/footer/Footer"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import BtnPrimary from "../components/buttons/BtnPrimary"
import BtnSecondary from "../components/buttons/BtnSecondary"

function AppSite() {
  return (
    <>
      <Halt></Halt>
      <section class="appSiteSelection animationFundido">
        <div class="ColumnSite1">
          <StaticImage 
          src="../images/appsite/CrearQR.png"
          alt="Crear QR"
          height={245}
          />
          <h2>Entra aqui para crear tus QR</h2>
          <Link to="/crearqr">
          <BtnPrimary className="btnLarge">Crear QR</BtnPrimary>
          </Link>
        </div>
        <div class="ColumnSite2">
        <StaticImage 
          src="../images/appsite/ListaQR.png"
          alt="Listar QR"
          height={245}
          />
          <h2>Entra aqui para ver tus QR</h2>
          <Link to="#">
          <BtnSecondary className="btnLarge">Lista QR</BtnSecondary>
          </Link>
        </div>
      </section>
      <Footer></Footer>
    </>
  )
}

export const Head = () => <Seo title="Inicio" />
export default AppSite