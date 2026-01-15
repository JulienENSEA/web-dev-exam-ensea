import { Router } from "express"
// On importe UNIQUEMENT depuis le contrôleur
import { 
    getRecipes, 
    getRecipeById, 
    createRecipe, 
    updateRecipe, 
    deleteRecipe,
    searchRecipes
} from "../controllers/recipesController.js"

const router = Router()

// Ordre important : les routes spécifiques (comme search) AVANT les routes dynamiques (:id)

// 1. Recherche (GET /api/recipes/search?search=...)
router.get("/search", searchRecipes)

// 2. Liste complète (GET /api/recipes)
router.get("/", getRecipes)

// 3. Une recette par ID (GET /api/recipes/123)
router.get("/:id", getRecipeById)

// 4. Création (POST /api/recipes)
router.post("/", createRecipe)

// 5. Mise à jour (PUT /api/recipes/123)
router.put("/:id", updateRecipe)

// 6. Suppression (DELETE /api/recipes/123)
router.delete("/:id", deleteRecipe)

export default router