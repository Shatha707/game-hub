//welcome-page
import { faBorderStyle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function Signin() {
  const [activeColor, setActiveColor] = useState("");
  // here type string check it again
  const handleColorChange = (color: string) => {
    document.body.style.background = color;
    setActiveColor(color);
  };

  //array of object for each coloe. and map it
  const colors = [
    { color: "#68a6e8" },
    { color: "#ff3636" },
    { color: "#466b53" },
    { color: "#fa8eb2" },
    { color: "#faad5a" },
  ];
  const borderStyle = { borderColor: activeColor };

  return (
    <>
      <div className="login">
        <h2 style={borderStyle}> Welcome .. </h2>
        <div className="inputBox">
          <input type="text" placeholder=" Username" />
        </div>
        <div className="inputBox">
          <input type="password" placeholder=" Password" />
        </div>
        <div className="inputBox">
          <input
            type="button"
            value="Login"
            id="btn"
            style={{ background: activeColor }}
          />
        </div>

        <div className="group">
          <a href="#">Forgot Password!</a>
        </div>
      </div>
      <div className="colors">
        {colors.map(({ color }) => (
          <span
            key={color}
            className={activeColor === color ? "active" : ""}
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
          ></span>
        ))}
      </div>
    </>
  );
}
export default Signin;
