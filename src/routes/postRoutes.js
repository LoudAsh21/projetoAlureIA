import express from "express";
import multer from "multer";
import cors from "cors"
import {
  allPosts,
  insertPost,
  uploadImage,
  updateNewPost,
} from "../controllers/postController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, "uploads/"); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
  },
});
const upload = multer({ storage: storage });


const routes = (app) => {
  
  app.use(express.json());
  app.use(cors(corsOptions));


  app.get("/posts", allPosts);

  app.post("/posts", insertPost);

  app.post("/upload", upload.single("image"), uploadImage);

  app.put("/upload/:id", updateNewPost);
};

export default routes;
