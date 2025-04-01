const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


require("./src/produtoRoute")(app);  

app.use(express.static("./public"));
app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333...");
});
