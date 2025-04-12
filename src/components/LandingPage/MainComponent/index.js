import React from 'react';
import { motion } from "framer-motion";  // Import motion from framer-motion
import "./styles.css";
import Button from "../../Button/index.js";

function MainComponent() {
  return (
    <div className="flex-info">
      <div className="left-component">
        <motion.h1 
          className="zeuscoin-heading"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Track ZeusCoin
        </motion.h1>
        <motion.h1 className="real-time-heading"
         initial={{ opacity: 0, x: 50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5, delay: 0.5 }}
         >Real Time</motion.h1>
        <motion.p className="info-text"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}>
          Stay ahead in the crypto game with real-time tracking powered by a public API. <br/><br/>
          Dive into the ZeusCoin dashboard and watch the market unfold live!
        </motion.p>

        <div className="btn-flex">
          <Button text={"Dashboard"} />
          <Button className="share-btn" text={"Share"} outlined={true} />
        </div>
      </div>
      <div className="container">
        {/* Add content here if needed */}
      </div>
    </div>
  );
}

export default MainComponent;
