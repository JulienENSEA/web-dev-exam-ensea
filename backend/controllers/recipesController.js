import path from "path"
import { readRecipes, writeRecipes } from "../helpers/index.js"

const recipesPath = path.resolve("./data/recipes.json")

// ============================================
// GET ALL RECIPES
// ============================================
export const getRecipes = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        res.json(recipes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

// ============================================
// GET ONE RECIPE BY ID
// ============================================
export const getRecipeById = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const id = parseInt(req.params.id)
        const recipe = recipes.find(r => r.id === id)

        if (recipe) {
            res.json(recipe)
        } else {
            res.status(404).json({ message: "Recette non trouvée" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

// ============================================
// CREATE A NEW RECIPE
// ============================================
export const createRecipe = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)

        // Génération ID (Date.now() comme demandé dans l'énoncé, ou Max ID + 1)
        // L'énoncé suggère Date.now(), c'est plus simple :
        const newRecipe = {
            id: Date.now(), 
            ...req.body
        }

        recipes.push(newRecipe)

        // CORRECTION ICI : Inversion des paramètres (recipes d'abord, path ensuite)
        writeRecipes(recipes, recipesPath) 

        res.status(201).json(newRecipe)
    } catch (error) {
        console.error("Erreur Create:", error) // Affiche l'erreur dans le terminal
        res.status(500).json({ error: error.message })
    }
}

// ============================================
// UPDATE A RECIPE
// ============================================
export const updateRecipe = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const id = parseInt(req.params.id)
        const index = recipes.findIndex(r => r.id === id)

        if (index === -1) {
            return res.status(404).json({ message: "Recette non trouvée" })
        }

        recipes[index] = { 
            ...recipes[index], 
            ...req.body,       
            id: id             
        }

        // CORRECTION ICI AUSSI
        writeRecipes(recipes, recipesPath)

        res.json(recipes[index])
    } catch (error) {
        console.error("Erreur Update:", error)
        res.status(500).json({ error: error.message })
    }
}

// ============================================
// DELETE A RECIPE
// ============================================
export const deleteRecipe = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const id = parseInt(req.params.id)
        const index = recipes.findIndex(r => r.id === id)

        if (index === -1) {
            return res.status(404).json({ message: "Recette non trouvée" })
        }

        const newRecipes = recipes.filter(r => r.id !== id)

        // CORRECTION ICI AUSSI (Attention, on sauvegarde newRecipes)
        writeRecipes(newRecipes, recipesPath)

        res.status(200).json({ message: "Recette supprimée avec succès" })
    } catch (error) {
        console.error("Erreur Delete:", error)
        res.status(500).json({ error: error.message })
    }
}

// ============================================
// BONUS: SEARCH RECIPES
// ============================================
export const searchRecipes = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const { search } = req.query

        if (!search) {
            return res.json(recipes)
        }

        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(search.toLowerCase())
        )

        res.json(filteredRecipes)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}