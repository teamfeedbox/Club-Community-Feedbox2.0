const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors"); 
const compression = require('compression');
const helmet = require('helmet');
const post = require("./routes/Post");
const auth = require('./routes/auth')
const event = require('./routes/Event')
const resource = require('./routes/Resource')
const college = require('./routes/College')
const bodyParser = require('body-parser')

const port = 8000;
const app = express();

mongoose.set("strictQuery", false);

const db = "mongodb+srv://Khushi:Khushi@cluster0.6b9gc.mongodb.net/FeedBox-Club";
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connection successful 😎😎")
}).catch((err)=>console.log(err))

// const db = mongoose.connect("mongodb://localhost:27017/ClubCommunity");

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(compression())


//helmet
app.use(helmet());
app.use(helmet.xssFilter(),
helmet.noSniff(),
helmet.frameguard({
  action:"deny",
}),
helmet.referrerPolicy({
  policy:"no-referrer",
}),
helmet.contentSecurityPolicy({
  directives:{
    scriptSrc:["'self'"],
    styleSrc:["'self'"]
  },
})
);








app.use("/", auth);
app.use("/", post);
app.use("/", event);
app.use("/", resource);
app.use("/", college);

app.listen(port, console.log(`server is listening on the port: ${port}`));

