import React from "react";
import preloader from "../../Images/preloaderImg.gif";

const Preloader = () => {
  return (
    <div>
      <img
        src={preloader}
        alt="Loading..."
        style={{ width: "100%", textAlign: "center" }}
      />
    </div>
  );
};

export default Preloader;
