import React from "react";
import { useState } from "react";

const ToolBar = ({
  color,
  setColor,
  penSize,
  setPenSize,
  isEraser,
  setIsEraser,
  onClearCanvas,
  onExportCanvas,
}) => {
  return (
    <div>
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
      <button
        onClick={onClearCanvas}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Clear
      </button>
      <button onClick={onExportCanvas} className="bg-blue-500 text-white px-3 py-1 rounded">Export</button>
    </div>
  );
};

export default ToolBar;
