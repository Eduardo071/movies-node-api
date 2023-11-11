import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
const prisma = new PrismaClient();


const port = 2712;
const app = express();

// GET, POST, PUT, PATCH, DELETE

// LISTAR OS FILMES DISPONÍVEIS - FEITO
// CADASTRAR UM FILME - FEITO
// ATUALIZAR DADOS DE UM FILME - FEITO
// REMOVER UM FILME - FEITO
// FILTRAR FILMES POR UM GÊNERO - FEITO

app.use((_, res, next) => { 
	res.header("Access-Control-Allow-Origin", "*");
	app.use(cors());
	next();
});

app.get("/movies", async (_, res) => {
	const movies = await prisma.movie.findMany({
		orderBy: {
			name: "asc",
		}
	});
	res.json(movies);
});

app.get("/movies/id/:movieId", async (req, res) => {
	const movieId = parseInt(req.params.movieId);
	const movie = await prisma.movie.findUnique({where: {id: movieId}});

	if(movie){
		res.json(movie);
	}else{
		res.status(404).json({error: "filme não encontrado"});
	}
});

app.use(express.json());

app.post("/movies", async (req, res) => {
	const {name,
		tomato_rate,
		oscar_count,
		release_date,
		duration,
		language,
		file_path,
		genres,
		external_id} = req.body;
	try{

		const movieWithSameTitle = await prisma.movie.findFirst({
			where: {
				name: {
					equals: name, mode: "insensitive",
				}
			}
		});

		if(movieWithSameTitle) return res.status(409).send({message: "Já existe um filme com esse título!"});

		await prisma.movie.create({
			data: {
				name: name,
				tomato_rate: tomato_rate,
				oscar_count: oscar_count,
				release_date: new Date(release_date),
				duration: duration,
				language: language,
				file_path: file_path,
				genres: genres,
				external_id: external_id
			}
		});
	}catch(err){
		res.status(500).send({message: "Ocorreu um erro inesperado ao tentar inserir o filme!"});
	}
	
	res.status(201).send();
});


app.put("/movies/id/:movieId", async (req, res) => {
	const movieId = parseInt(req.params.movieId);
	try{
		await prisma.movie.update({
			where: {id: movieId},
			data: {
				file_path: "/1Kj3ayj8JTgFQjD3Ou_cd6ltMSqcOQX0u/preview"
			}
		});
	}catch(err){
		res.send({message: "Ocorreu um erro inesperado ao tentar inserir o filme!"});
	}
	res.status(204).send();
});

app.delete("/movies/id/:movieId", async (req, res) => {
	const movieId = parseInt(req.params.movieId);
	try{
		await prisma.movie.delete({
			where: {
				id: movieId
			}
		});
	}catch(err){
		res.send({message: "Ocorreu um erro inesperado ao tentar atualizar os dados o filme!"});
	}
	res.status(200).send();
});

app.get("/movies/genre/:genre", async (req, res) => {
	const genre = req.params.genre;
	try{
		const movies = await prisma.movie.findMany({
			where: {
				genres: {
					contains: genre,
					mode: "insensitive"	
				}
			}
		});
		res.json(movies);
	}catch(err){
		res.send({message: "Ocorreu um erro inesperado ao buscar!"});
	}
	res.status(200).send();
});


app.listen(port, () => console.log(`Servidor em execução na porta ${port}`));