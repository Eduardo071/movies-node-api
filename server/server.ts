import express from "express";


const port = 2712;
const app = express();

// GET, POST, PUT, PATCH, DELETE

// LISTAR OS FILMES DISPONÍVEIS
// CADASTRAR UM FILME
// ATUALIZAR DADOS DE UM FILME
// REMOVER UM FILME
// FILTRAR FILMES POR UM GÊNERO

app.get("/movies", (req, res) => {
	res.send("Listagem de filmes");
});

app.post("/movies", (req, res) => {
	res.send("Inserção de um filme");
});

app.put("/movies/movie", (req, res) => {
	res.send("Atualizando dados do filme");
});

app.delete("/movies", (req, res) => {
	res.send("Removendo filme");
});

app.get("/movies/:gender", (req, res) => {
	res.send("Filmes filtrados pelo gênero");
});


app.listen(port, () => console.log(`Servidor em execução na porta ${port}`));
