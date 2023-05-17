import { Image } from "@shopify/polaris"
import React from "react"
import { success } from "../../assets/home"

const SuccessModal = () =>{

    return  <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Image source={success} alt={""} />
                <h3 style={{width: "81px",
                        height: "22px",
fontFamily: 'Inter',
fontStyle: "normal",
fontWeight: 700,
fontSize: "18px",
lineHeight: "22px"}}>Success</h3>
            </div>
}

export default SuccessModal