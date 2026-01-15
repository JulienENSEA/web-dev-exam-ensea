import express from "express"
import recipesRouter from "./routes/recipes.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes API (AVANT les fichiers statiques)
app.use("/api/recipes", recipesRouter)

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, "..", "frontend")))

// Route pour servir index.html sur la racine
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "index.html"))
})

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
