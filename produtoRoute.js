const produtoController = require("./produtoController");

module.exports = (app) => {
    app.post("/produto", produtoController.post);
    app.put("/produto/:id", produtoController.put);
    app.delete("/produto/:id", produtoController.delete);
    app.get("/produto", produtoController.get);
    app.get("/produto/:id", produtoController.getById);
}