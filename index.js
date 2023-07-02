const express = require("express");
const app = express();
let port = process.env.PORT || 3000;
var cors = require("cors");
const InclinePrep = require("./routes/InclinePrep");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const Document = require("./models/Document");
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    transport: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true
});

const dbname = "inclinePrep";
const password = process.env.DB_URI_PASSWORD;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

mongoose
  .connect(
    process.env.DATABASE_URL ||
      `mongodb+srv://Ben:${password}@cluster0.qtjn2.mongodb.net/${dbname}?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on('connection', async (socket) => {
  console.log('a user connected');
  socket.on('get-document', async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(delta.document).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      console.log('save')
      console.log(data)
      await Document.findByIdAndUpdate(documentId, { data } );
    });
  });
});

app.use("/InclinePrep", InclinePrep);

const findOrCreateDocument = async (id) => {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: "" });
}

server.listen(process.env.PORT || 3001, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
