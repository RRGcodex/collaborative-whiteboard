import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import {createServer} from 'http';


const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors:{
        origin:"*",
        methods: ["POST", "GET"], 
    }
})

io.on("connection", (socket)=>{
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId)=>{
        socket.join(roomId);
        console.log(`${socket.id} joined the room ${roomId}`);
    });

    socket.on("drawing", ({roomId, ...drawingData}) => {
        if(!roomId) return;
        socket.to(roomId).emit("drawing", drawingData);
    });

    socket.on("clear", (roomId)=>{
        socket.to(roomId).emit("clear");
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected:", socket.id)
    })
})


app.get('/', (req, res) => {
    res.send("hello world");
})

server.listen(PORT, ()=>{
    console.log("Server running on port:", PORT);
})