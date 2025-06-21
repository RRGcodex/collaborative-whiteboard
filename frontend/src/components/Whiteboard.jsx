import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ToolBar from "./ToolBar";
import socket from "../socket";
import JoinRoom from "./JoinRoom";

const mockSocket = {
  id: 'demo-user-' + Math.random().toString(36).substr(2, 9),
  emit: (event, data) => console.log('Socket emit:', event, data),
  on: (event, callback) => console.log('Socket listening for:', event),
  off: (event) => console.log('Socket off:', event),
  disconnect: () => console.log('Socket disconnected')
};

const Whiteboard = () => {
  const [color, setColor] = useState("#000000");
  const [penSize, setPenSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [tool, setTool] = useState('pen');
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevPoint, setPrevPoint] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(1);
  const [startPoint, setStartPoint] = useState(null);

  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  useEffect(() => {
  if (!joined) return;

  const canvas = canvasRef.current;
  const overlayCanvas = overlayCanvasRef.current;

  if (!canvas || !overlayCanvas) return;

  const ctx = canvas.getContext("2d");
  const overlayCtx = overlayCanvas.getContext("2d");

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  overlayCtx.lineCap = "round";
  overlayCtx.lineJoin = "round";
}, [joined]);

  useEffect(() => {
  if (!joined) return;

  const canvas = canvasRef.current;
  const overlayCanvas = overlayCanvasRef.current;

  if (!canvas || !overlayCanvas) return;

  const handleResize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    overlayCanvas.width = rect.width;
    overlayCanvas.height = rect.height;
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [joined]);


  useEffect(() => {
    mockSocket.on("connect", () => {
      console.log(`Connected to socket ${mockSocket.id}`);
    });

    mockSocket.on("drawing", (data) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { from, to, color, penSize, isEraser, tool } = data;

      if (!from || !to) return;

      drawLine(ctx, from, to, color, penSize, isEraser);
    });

    mockSocket.on("clear", () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      mockSocket.disconnect();
      mockSocket.off("drawing");
      mockSocket.off("clear");
    };
  }, []);

  const drawLine = (ctx, from, to, strokeColor, strokeWidth, eraser) => {
    ctx.save();
    ctx.globalCompositeOperation = eraser ? 'destination-out' : 'source-over';
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = eraser ? strokeWidth * 2 : strokeWidth;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  };

  const drawShape = (ctx, start, end, shapeType, strokeColor, strokeWidth) => {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();

    switch (shapeType) {
      case 'circle':
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        break;
      case 'square':
        const width = end.x - start.x;
        const height = end.y - start.y;
        ctx.rect(start.x, start.y, width, height);
        break;
      case 'arrow':
        const headSize = 15;
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x - headSize * Math.cos(angle - Math.PI / 6), 
                   end.y - headSize * Math.sin(angle - Math.PI / 6));
        
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x - headSize * Math.cos(angle + Math.PI / 6), 
                   end.y - headSize * Math.sin(angle + Math.PI / 6));
        break;
    }
    ctx.stroke();
  };

  const handleMouseDown = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const point = { x, y };

    setIsDrawing(true);
    setStartPoint(point);

    if (tool === 'pen' || tool === 'eraser') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = isEraser ? penSize * 2 : penSize;
      ctx.beginPath();
      ctx.moveTo(x, y);
      setPrevPoint(point);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoint = { x, y };

    if (tool === 'pen' || tool === 'eraser') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (prevPoint) {
        drawLine(ctx, prevPoint, newPoint, color, penSize, isEraser);
        
        mockSocket.emit("drawing", {
          roomId,
          from: prevPoint,
          to: newPoint,
          color,
          penSize,
          isEraser,
          tool
        });
      }
      
      setPrevPoint(newPoint);
    } else {
      // Preview shapes on overlay canvas
      const overlayCanvas = overlayCanvasRef.current;
      const overlayCtx = overlayCanvas.getContext("2d");
      overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      
      if (startPoint) {
        drawShape(overlayCtx, startPoint, newPoint, tool, color, penSize);
      }
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    setPrevPoint(null);

    if (tool !== 'pen' && tool !== 'eraser' && startPoint) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const endPoint = { x, y };

      // Draw final shape on main canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      drawShape(ctx, startPoint, endPoint, tool, color, penSize);

      // Clear overlay
      const overlayCanvas = overlayCanvasRef.current;
      const overlayCtx = overlayCanvas.getContext("2d");
      overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      mockSocket.emit("shape", {
        roomId,
        start: startPoint,
        end: endPoint,
        color,
        penSize,
        tool
      });
    }

    setStartPoint(null);
  };

  const handleJoinRoom = (id) => {
    if (!id) return;
    mockSocket.emit("joinRoom", id);
    setRoomId(id);
    setJoined(true);
    setConnectedUsers(Math.floor(Math.random() * 5) + 1); // Mock users
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const overlayCtx = overlayCanvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    
    if (roomId) mockSocket.emit("clear", roomId);
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Collaborative Whiteboard</h1>
          {joined && (
            <p className="text-gray-600">
              Room: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{roomId}</span>
            </p>
          )}
        </header>

        {joined && (
          <ToolBar
            color={color}
            setColor={setColor}
            penSize={penSize}
            setPenSize={setPenSize}
            isEraser={isEraser}
            setIsEraser={setIsEraser}
            tool={tool}
            setTool={setTool}
            onClearCanvas={clearCanvas}
            onExportCanvas={exportCanvas}
            connectedUsers={connectedUsers}
          />
        )}

        {!joined && <JoinRoom onJoin={handleJoinRoom} />}

        {joined && (
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-[600px] cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 w-full h-[600px] cursor-crosshair pointer-events-none"
            />
            <div className="w-full h-[600px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Whiteboard;