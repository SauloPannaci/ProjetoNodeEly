async function connect() {
    if(global.connection && global.connection.state != "disconnect"){
        return global.connection;
    }

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: '54.91.193.137', user: 'libertas',
            password: '123456', database: 'libertas5per'
        }
    );
    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    const conn = await connect();
    const sql = "INSERT INTO produto (nome, preco, categoria, quantidade) VALUES (? ,? ,? ,?)";
    const values = [req.body.nome, req.body.preco, req.body.categoria, req.body.quantidade];
    await conn.query(sql, values);

    res.status(201).send("OK");
}

exports.put = async (req, res, next) => {
    const conn = await connect();
    const sql = "UPDATE produto SET nome = ?, preco = ?, categoria = ?, quantidade = ? WHERE idproduto = ?";
    const values = [req.body.nome, req.body.preco, req.body.categoria, req.body.quantidade, req.params.id];
    await conn.query(sql, values);
    res.status(201).send("OK");
}

exports.delete = async (req, res, next) => {
    const conn = await connect();
    const sql = "DELETE FROM produto WHERE idproduto = ?";
    const values = [req.params.id];
    await conn.query(sql, values);
    res.status(200).send("OK");
}

exports.get = async (req, res, next) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM produto");
    res.status(200).send(rows);
}

exports.getById = async (req, res, next) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM produto WHERE idproduto = " + req.params.id);

    if (rows == null || rows.length == 0) {
        res.status(404).send("Not Found");
    } else {
        res.status(200).send(rows);
    }
}
