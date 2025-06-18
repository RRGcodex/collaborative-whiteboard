import React from "react";
import { useState } from "react";

const ToolBar = ({
  color,
  setColor,
  penSize,
  setPenSize,
  isEraser,
  setIsEraser,
}) => {
  return (
    <div>
      <form>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="color"
        />
        <input
          min="1"
          max="10"
          value={penSize}
          onChange={(e) => setPenSize(e.target.value)}
          type="range"
        />
        <button type="button" onClick={() => setIsEraser(!isEraser)}>
          {isEraser ? "Pen" : "Eraser"}
        </button>
      </form>
    </div>
  );
};

export default ToolBar;
