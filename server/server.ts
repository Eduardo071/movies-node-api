import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();


const port = 2712;
const app = express();

// GET, POST, PUT, PATCH, DELETE

// LISTAR OS FILMES DISPONÍVEIS
// CADASTRAR UM FILME
// ATUALIZAR DADOS DE UM FILME
// REMOVER UM FILME
// FILTRAR FILMES POR UM GÊNERO

app.get("/movies", async (req, res) => {
	const movies = await prisma.movies.findMany();
	res.json(movies);
});

app.get("/movies/:movieId", async (req, res) => {
	const movieId = parseInt(req.params.movieId);
	const movie = await prisma.movies.findUnique({where: {id: movieId}});

	if(movie){
		res.json(movie);
	}else{
		res.status(404).json({error: "filme não encontrado"});
	}
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
