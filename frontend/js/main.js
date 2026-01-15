// ============================================
// IMPORTS
// ============================================
import { getAllRecipes, createRecipe } from "./api.js"
import { renderRecipeCard, clearRecipesList } from "./ui.js"

// ============================================
// INITIALISATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    loadRecipes()
    setupEventListeners()
})

// ============================================
// CHARGEMENT LISTE
// ============================================
const loadRecipes = async () => {
    const container = document.getElementById("recipes-container")
    try {
        const recipes = await getAllRecipes()
        clearRecipesList(container)

        if (recipes.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        Aucune recette disponible. Ajoutez-en une !
                    </div>
                </div>`
            return
        }

        const recipesHTML = recipes.map(recipe => renderRecipeCard(recipe)).join('')
        container.innerHTML = recipesHTML

    } catch (error) {
        console.error("Erreur chargement:", error)
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    Impossible de charger les recettes. Vérifiez que le serveur tourne.
                </div>
            </div>`
    }
}

// ============================================
// GESTION AJOUT
// ============================================
const setupEventListeners = () => {
    const addRecipeForm = document.getElementById("addRecipeForm")
    if (addRecipeForm) {
        addRecipeForm.addEventListener("submit", handleAddRecipe)
    }
}

export const handleAddRecipe = async (event) => {
    event.preventDefault()
    try {
        const name = document.getElementById('recipeName').value
        const instructions = document.getElementById('recipeInstructions').value
        const prepTime = parseInt(document.getElementById('recipePrepTime').value)
        const imageUrl = document.getElementById('imageUrl')?.value || ""
        
        const ingredients = document.getElementById('recipeIngredients').value
            .split('\n').map(i => i.trim()).filter(i => i !== "")

        const newRecipe = { name, ingredients, instructions, prepTime, image: imageUrl }

        await createRecipe(newRecipe)

        const modalEl = document.getElementById('addRecipeModal')
        const modal = bootstrap.Modal.getInstance(modalEl)
        modal.hide()
        
        event.target.reset()
        alert('Recette ajoutée !')
        loadRecipes()

    } catch (error) {
        console.error(error)
        alert("Erreur lors de l'ajout.")
    }
}