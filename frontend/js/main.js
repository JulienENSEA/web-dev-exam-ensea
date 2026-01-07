// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getAllRecipes, createRecipe } from "./api.js"
import { renderRecipeCard, clearRecipesList } from "./ui.js"

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================
// Cette fonction est appelée automatiquement au chargement de la page
// Elle charge et affiche toutes les recettes

document.addEventListener("DOMContentLoaded", () => {
	console.log("Application chargée")
	loadRecipes()
	setupEventListeners()
})

// ============================================
// CHARGER ET AFFICHER LES RECETTES
// ============================================
// Cette fonction est fournie comme EXEMPLE de référence
// Étudiez-la pour comprendre le pattern async/await et le flow de données

const loadRecipes = async () => {
	try {
		// 1. Appeler l'API pour récupérer toutes les recettes
		const recipes = await getAllRecipes()

		// 2. Afficher les recettes dans la grid
		displayRecipes(recipes)
	} catch (error) {
		console.error("Erreur lors du chargement des recettes:", error)
		alert(
			"Impossible de charger les recettes. Vérifiez que le serveur est démarré."
		)
	}
}

// ============================================
// AFFICHER LES RECETTES DANS LA GRID
// ============================================
// Fonction fournie - génère le HTML pour toutes les recettes

const displayRecipes = (recipes) => {
	// Récupérer le conteneur où afficher les recettes
	const recipesContainer = document.getElementById("recipes-container")

	// Vider le conteneur avant d'ajouter les nouvelles recettes
	clearRecipesList(recipesContainer)

	// Si aucune recette, afficher un message
	if (recipes.length === 0) {
		recipesContainer.innerHTML = `
			<div class="col-12">
				<div class="alert alert-info text-center" role="alert">
					Aucune recette disponible. Ajoutez-en une !
				</div>
			</div>
		`
		return
	}

	// Générer et afficher chaque recette
	recipes.forEach((recipe) => {
		const cardHTML = renderRecipeCard(recipe)
		recipesContainer.innerHTML += cardHTML
	})
}

// ============================================
// CONFIGURATION DES EVENT LISTENERS
// ============================================

const setupEventListeners = () => {
	// Event listener pour le formulaire d'ajout de recette
	const addRecipeForm = document.getElementById("addRecipeForm")

	if (addRecipeForm) {
		addRecipeForm.addEventListener("submit", handleAddRecipe)
	}
}

// ============================================
// AJOUTER UNE NOUVELLE RECETTE
// ============================================
// TODO: Compléter cette fonction pour gérer l'ajout d'une recette
// Cette fonction est appelée quand l'utilisateur soumet le formulaire dans le modal

const handleAddRecipe = async (event) => {
	// TODO 1: Empêcher le rechargement de la page
	// Conseil: utilisez event.preventDefault()

	try {
		// TODO 2: Récupérer les valeurs des champs du formulaire
		// Les IDs des champs sont: recipeName, recipeIngredients, recipeInstructions, recipePrepTime
		// Conseil: utilisez document.getElementById('id').value

		const name = "" // TODO: récupérer la valeur du champ recipeName
		const ingredients = "" // TODO: récupérer la valeur du champ recipeIngredients
		const instructions = "" // TODO: récupérer la valeur du champ recipeInstructions
		const prepTime = "" // TODO: récupérer la valeur du champ recipePrepTime (convertir en nombre avec parseInt)

		// TODO 3: Créer un objet recette avec les données récupérées
		const newRecipe = {
			// TODO: ajouter les propriétés name, ingredients, instructions, prepTime
		}

		// TODO 4: Appeler l'API pour créer la recette
		// Conseil: utilisez await createRecipe(newRecipe)

		// TODO 5: Fermer le modal après la création
		// Conseil: Bootstrap fournit une instance de modal accessible via:
		// const modal = bootstrap.Modal.getInstance(document.getElementById('addRecipeModal'))
		// modal.hide()

		// TODO 6: Afficher un message de succès
		// Conseil: utilisez alert('Recette ajoutée avec succès!')

		// TODO 7: Recharger la liste des recettes pour afficher la nouvelle
		// Conseil: appelez la fonction loadRecipes()

		// TODO 8: Réinitialiser le formulaire
		// Conseil: utilisez event.target.reset()
	} catch (error) {
		console.error("Erreur lors de l'ajout de la recette:", error)
		alert("Erreur lors de l'ajout de la recette. Veuillez réessayer.")
	}
}

// ============================================
// NOTES POUR LES ÉTUDIANTS
// ============================================
/*
STRUCTURE D'UNE FONCTION ASYNC TYPIQUE:

const maFonction = async (parametre) => {
	try {
		// 1. Appel API
		const data = await monServiceAPI(parametre)
		
		// 2. Traitement des données
		console.log(data)
		
		// 3. Mise à jour de l'interface
		afficherResultat(data)
		
		// 4. Feedback utilisateur
		alert('Succès!')
		
	} catch (error) {
		console.error('Erreur:', error)
		alert('Une erreur est survenue')
	}
}

RÉCUPÉRATION DES DONNÉES D'UN FORMULAIRE:

Option 1 - Élément par élément:
const value = document.getElementById('inputId').value

Option 2 - FormData (plus avancé):
const formData = new FormData(event.target)
const value = formData.get('inputName')

GESTION DU MODAL BOOTSTRAP:

Fermer un modal:
const modalElement = document.getElementById('monModal')
const modal = bootstrap.Modal.getInstance(modalElement)
modal.hide()

Ouvrir un modal (si nécessaire):
const modal = new bootstrap.Modal(modalElement)
modal.show()

PATTERN DE RAFRAÎCHISSEMENT:

Après une modification (ajout, suppression, modification):
1. L'opération API réussit
2. Afficher un message de succès
3. Recharger les données (loadRecipes())
4. Fermer le modal si nécessaire
5. Réinitialiser le formulaire

DEBUGGING:

Si quelque chose ne fonctionne pas:
1. Vérifiez la console (F12) pour les erreurs
2. Vérifiez que le serveur backend est démarré
3. Vérifiez que les IDs dans le HTML correspondent à ceux dans le JS
4. Utilisez console.log() pour voir les valeurs des variables
5. Testez d'abord avec Postman que l'API fonctionne
*/
