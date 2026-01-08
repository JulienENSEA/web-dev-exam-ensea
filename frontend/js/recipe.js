// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getOneRecipe } from "./api.js"
import { renderRecipeCard } from "./ui.js"

const loadRecipe = async (recipeId) => {
	try {
		// 1. Appeler l'API pour récupérer la recette par son ID
		// const recipe = await getOneRecipe(recipeId)

        // Mock de recette pour test sans backend
        // TODO: Supprimer cette ligne quand l'API sera fonctionnelle
		const recipe = {
			id: 1,
			name: "Ratatouille Provençale",
			cuisine: "Française",
			difficulty: "Moyen",
			prepTime: 45,
			servings: 4,
			ingredients: [
				"2 aubergines",
				"2 courgettes",
				"2 poivrons rouges",
				"4 tomates",
				"1 oignon",
				"3 gousses d'ail",
				"Huile d'olive",
				"Herbes de Provence",
				"Sel et poivre",
			],
			instructions:
				"Couper tous les légumes en dés. Faire revenir l'oignon et l'ail dans l'huile d'olive. Ajouter les aubergines, puis les courgettes, les poivrons et enfin les tomates. Assaisonner avec les herbes de Provence, sel et poivre. Laisser mijoter 30 minutes à feu doux.",
			image:
				"https://images.pexels.com/photos/5190684/pexels-photo-5190684.jpeg",
		}

		// 2. Afficher la recette dans la grid
		//renderRecipeCard(recipe)
	} catch (error) {
		console.error("Erreur lors du chargement de la recette:", error)
		alert(
			"Impossible de charger la recette. Vérifiez que le serveur est demarré."
		)
	}
}

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================
// Cette fonction est appelée automatiquement au chargement de la page
// Elle charge et affiche toutes les recettes

const setupEventListeners = () => {
	const loader = document.getElementById("loading-spinner")
	const recipeDetail = document.getElementById("recipe-detail")
	const deleteButton = document.getElementById("delete-recipe-btn")

	if (loader) {
		loader.classList.add("d-none")
	}
	if (recipeDetail) {
		recipeDetail.classList.remove("d-none")
	}

	if (deleteButton) {
		deleteButton.addEventListener("click", () => {
			alert("Fonction de suppression non implémentée.")
		})
	}
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("Application chargée")
	loadRecipe("1")
	setupEventListeners()
})
