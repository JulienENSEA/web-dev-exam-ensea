import express from "express"

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
	res.json({
		message: "Welcome To EPITA'S Exam !",
	})
})

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
