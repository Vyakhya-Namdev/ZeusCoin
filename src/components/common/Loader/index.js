import React from 'react';
import { CircularProgress } from "@mui/material";
import "./styles.css";

function Loader() {
  return (
    <div className="load-container">
        <CircularProgress />
    </div>
  )
}

export default Loader