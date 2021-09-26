import React from "react";
import preloader from "../../Images/preloaderImg.gif";

const Preloader = () => {
  return (
    <div>
      <img src={preloader} alt="Loading..." style={{width:"500px"}}/>
    </div>
  );
};

export default Preloader;
