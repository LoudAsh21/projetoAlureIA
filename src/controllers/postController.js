import Post from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function allPosts(request, response) {
  const post = new Post();
  try {
    const posts = await post.getAllPosts();

    return response.status(200).send(posts);
  } catch (error) {
    console.error("Ocorre um erro ao buscar todos os posts!\n", error);
    return response.status(500).send({ error: "Falha na requisição!" });
  }
}

export async function insertPost(request, response) {
  const newPost = {
    descricao: request.body.description,
    imgUrl: request.body.imgUrl,
    alt: request.body.alt,
  };
  try {
    const post = new Post();
    const result = await post.insertOnePost(newPost);

    return response.status(200).send(result);
  } catch (error) {
    console.error("Ocorreu um erro ao inserir o post!\n", error);
    return response.status(500).send({ error: "Falha na requisição!" });
  }
}

export async function uploadImage(request, response) {
  const newPost = {
    descricao: "",
    imgUrl: request.file.originalname,
    alt: "",
  };
  try {
    const post = new Post();
    const result = await post.insertOnePost(newPost);

    const newImagePath = `uploads/${result.insertedId}.png`;
    fs.renameSync(request.file.path, newImagePath);

    return response.status(200).send(result);
  } catch (error) {
    console.error("Ocorreu um erro ao fazer upload da imagem!\n", error);
    return response.status(500).send({ error: "Falha na requisição!" });
  }
}

export async function updateNewPost(request, response) {
  const id = request.params.id;
  const urlImg = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await gerarDescricaoComGemini(imageBuffer);

    const newPost = {
      imgUrl: urlImg,
      descricao: description,
      alt: request.body.alt,
    };

    const post = new Post();
    const result = await post.updateOnePost(id, newPost);

    return response.status(200).send(result);
  } catch (error) {
    console.error("Ocorreu um erro ao atualizar o post!\n", error);
    return response.status(500).send({ error: "Falha na requisição!" });
  }
}
