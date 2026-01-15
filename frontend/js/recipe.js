// ============================================
// IMPORTS
// ============================================
import { getOneRecipe, deleteRecipe } from "./api.js"
import { renderSingleRecipe } from "./ui.js"

// ============================================
// INITIALISATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Récupérer l'ID dans l'URL (ex: recipe.html?id=123)
    const urlParams = new URLSearchParams(window.location.search)
    const recipeId = urlParams.get("id")
    
    // 2. Lancer le chargement ou afficher une erreur
    if (recipeId) {
        loadRecipe(recipeId)
    } else {
        alert("Aucun ID de recette fourni.")
    }

    setupEventListeners()
})

// ============================================
// LOGIQUE DE CHARGEMENT
// ============================================
const loadRecipe = async (id) => {
    try {
        const recipeDetail = document.getElementById("recipe-detail")
        const spinner = document.getElementById("loading-spinner")

        // Appel API
        const recipe = await getOneRecipe(id)
        
        // Affichage
        if (spinner) spinner.classList.add("d-none")
        if (recipeDetail) {
            recipeDetail.innerHTML = renderSingleRecipe(recipe)
            recipeDetail.classList.remove("d-none")
        }

        // Brancher le bouton supprimer (maintenant qu'il existe dans le DOM)
        setupDeleteButton(id)

    } catch (error) {
        console.error("Erreur chargement:", error)
        const errorDiv = document.getElementById("error-message")
        if (errorDiv) {
            errorDiv.classList.remove("d-none")
            document.getElementById("loading-spinner").classList.add("d-none")
            document.getElementById("error-text").textContent = "Impossible de charger la recette."
        }
    }
}

// ============================================
// GESTION SUPPRESSION
// ============================================
const setupDeleteButton = (id) => {
    const deleteBtn = document.getElementById("delete-recipe-btn")
    if (deleteBtn) {
        deleteBtn.addEventListener("click", async () => {
            if (confirm("Voulez-vous vraiment supprimer cette recette ?")) {
                try {
                    await deleteRecipe(id)
                    alert("Recette supprimée !")
                    window.location.href = "index.html"
                } catch (error) {
                    alert("Erreur lors de la suppression.")
                }
            }
        })
    }
}

const setupEventListeners = () => {
    // Placeholder pour d'autres écouteurs si nécessaire
}