import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ToolBar from "./ToolBar";
import socket from "../socket";
import JoinRoom from "./JoinRoom";

const Whiteboard = () => {
  const [color, setColor] = useState("#000000");
  const [penSize, setPensize] = useState(2);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevPoint, setPrevPoint] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);


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

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to socket ${socket.id}`);
    });

    socket.on("drawing", (data) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const {from, to, color, penSize, isEraser} = data;

      if(!from || !to) return;

      ctx.strokeStyle = isEraser ? "white" : color;
      ctx.lineWidth = isEraser ? 40 : penSize;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });

    socket.on("clear", ()=>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [])

    return () => {
      socket.disconnect();
      socket.off("drawing");
      socket.off("clear");
    };
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
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const newPoint = { x, y };

    ctx.strokeStyle = isEraser ? "white" : color;
    ctx.lineWidth = isEraser ? 40 : penSize;

    ctx.beginPath();
    if (prevPoint) ctx.moveTo(prevPoint.x, prevPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    socket.emit("drawing", {
      roomId,
      from: prevPoint,
      to: newPoint,
      color,
      penSize,
      isEraser,
    });

    setPrevPoint(newPoint);
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
    setPrevPoint(null);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
  };

  const handleJoinRoom = (id) => {
    if(!id) return;
    socket.emit("joinRoom", id);
    setRoomId(id);
    setJoined(true);
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(roomId) socket.emit("clear", roomId);
  }

  const exportCanvas = () => {
    const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");


const tempCanvas = document.createElement("canvas");
tempCanvas.width = canvas.width;
tempCanvas.height = canvas.height;
const tempCtx = tempCanvas.getContext("2d");


tempCtx.fillStyle = "white";
tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);


tempCtx.drawImage(canvas, 0, 0);


const link = document.createElement("a");
link.download = `whiteboard-${roomId || "untitled"}.png`;
link.href = tempCanvas.toDataURL("image/png");
link.click();

  }

  return (
    <div className="p-10">
      <ToolBar
        color={color}
        setColor={setColor}
        penSize={penSize}
        setPenSize={setPensize}
        isEraser={isEraser}
        setIsEraser={setIsEraser}
        onClearCanvas={clearCanvas}
        onExportCanvas={exportCanvas}
      />
      {!joined && <JoinRoom onJoin = {handleJoinRoom} />}
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
