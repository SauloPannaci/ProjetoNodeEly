const modalCadastro = new bootstrap.Modal(document.getElementById('modalcadastro'));

function novo() {
    document.getElementById("nome").value = "";
    document.getElementById("preco").value = ""; 
    document.getElementById("categoria").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("idproduto").value = "";
    modalCadastro.show();
}

function salvar() {
    const nome = document.getElementById("nome").value.trim();
    const preco = document.getElementById("preco").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidade = document.getElementById("quantidade").value.trim();
    const id = document.getElementById("idproduto").value.trim();

    if (!nome || !preco || !categoria || !quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const produto = {
        idproduto: id,
        nome: nome,
        preco: parseFloat(preco),
        categoria: categoria,
        quantidade: parseInt(quantidade)
    };

    let url = "http://localhost:3333/produto";
    let method = "POST";

    if (id) {
        url += "/" + id;
        method = "PUT";
    }

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao salvar produto");
        }
        return response.text();  
    })
    .then(() => {
        listar();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalcadastro'));
        modal.hide();  
    })
    .catch(error => {
        console.error("Erro ao salvar produto:", error);
    });
}

function editar(id){    
    fetch("http://localhost:3333/produto/" + id)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar produto");
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("nome").value = data[0].nome;
        document.getElementById("preco").value = data[0].preco;
        document.getElementById("categoria").value = data[0].categoria;
        document.getElementById("quantidade").value = data[0].quantidade;
        document.getElementById("idproduto").value = data[0].idproduto;
        modalCadastro.show();
    })
    .catch(error => {
        console.error("Erro ao buscar produto:", error);
    });
}

function listar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "<tr><td colspan='6' class='text-center'>Carregando...</td></tr>";
    
    fetch("http://localhost:3333/produto")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar produtos");
            }
            return response.json();
        })
        .then(dados => mostrar(dados))
        .catch(error => {
            lista.innerHTML = `<tr><td colspan='6' class='text-danger text-center'>Erro ao carregar produtos</td></tr>`;
            console.error("Erro ao listar produtos:", error);
        });
}

function excluir(id){
    fetch("http://localhost:3333/produto/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao excluir produto");
        }
        return response.text();
    })
    .then(() => {
        listar();
    })
    .catch(error => {
        console.error("Erro ao excluir produto:", error);
    });
}

function mostrar(dados) {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let i = 0; i < dados.length; i++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${dados[i].idproduto}</td>
            <td>${dados[i].nome}</td>
            <td>${dados[i].preco}</td>
            <td>${dados[i].categoria}</td>
            <td>${dados[i].quantidade}</td>
            <td>
                <button class="btn btn-warning" onclick='editar(${dados[i].idproduto})'>Editar</button>
                <button class="btn btn-danger" onclick='excluir(${dados[i].idproduto})'>Excluir</button>
            </td>
        `;
        lista.appendChild(tr);
    }
}

listar();
