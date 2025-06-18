import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ToolBar from "./ToolBar";

const Whiteboard = () => {
  const [color, setColor] = useState("#000000");
  const [penSize, setPensize] = useState(2);
  const [isEraser, setIsEraser] = useState(false);

  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = isEraser ? "white" : color;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = isEraser ? "white" : color;
    ctx.lineWidth = isEraser ? 40 : penSize;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
  };

  return (
    <div className="p-10">
      <ToolBar
        color={color}
        setColor={setColor}
        penSize={penSize}
        setPenSize={setPensize}
        isEraser={isEraser}
        setIsEraser={setIsEraser}
      />
      <canvas
        className=" w-full h-[70vh] border border-gray-900"
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseLeave={(e) => handleMouseUp(e)}
        ref={canvasRef}
      />
    </div>
  );
};

export default Whiteboard;
