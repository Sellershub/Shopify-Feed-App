import { useNavigate } from "@shopify/app-bridge-react";
import React, { useEffect, useState } from "react";
import Lottie from 'react-lottie'
import animationData from '../lotties/success.json'

import classes from "../style/sucess.module.css";

export default function Success() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate("/AlbomeSetup");
    }, 3000);
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className={classes.container}>
      <Lottie options={defaultOptions} height={400} width='100%' />
    </div>
  );
}
