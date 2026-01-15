// ============================================
// UI.JS - PRESENTATION LAYER
// ============================================
// Ce fichier contient toutes les fonctions de manipulation du DOM
// et de génération de HTML
//
// ==================================================================
// GÉNÉRER UNE CARD BOOTSTRAP POUR UNE RECETTE DANS LA PAGE D'ACCUEIL
// ==================================================================
/**
 * Génère le HTML d'une carte de recette avec Bootstrap
 * @param {Object} recipe - L'objet recette avec id, name, ingredients, instructions, prepTime
 * @returns {string} - Le HTML de la carte
 */
export const renderRecipeCard = (recipe) => {
    // Gestion de l'image (Défaut si vide)
    const imageSrc = recipe.image || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    // Formatage des ingrédients (3 premiers seulement)
    const ingredientsList = recipe.ingredients
        .filter((ing) => ing && ing.trim() !== "")
        .slice(0, 3)
        .map((ing) => `<li class="text-muted small">• ${ing.trim()}</li>`)
        .join("")

    // Calcul du reste
    const remainingIngredients = Math.max(0, recipe.ingredients.length - 3);

    // Instructions courtes
    const shortInstructions = recipe.instructions.length > 100
        ? recipe.instructions.substring(0, 100) + "..."
        : recipe.instructions

    // Couleur du badge temps
    let timeBadgeClass = "bg-success"
    if (recipe.prepTime > 45) timeBadgeClass = "bg-danger"
    else if (recipe.prepTime > 30) timeBadgeClass = "bg-warning"

    return `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm hover-shadow transition">
                <img src="${imageSrc}" class="card-img-top" alt="${recipe.name}" style="height: 200px; object-fit: cover;">
                
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <h5 class="card-title mb-0 flex-grow-1">${recipe.name}</h5>
                        <span class="badge ${timeBadgeClass} ms-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                            </svg>
                            ${recipe.prepTime} min
                        </span>
                    </div>
                    
                    <div class="mb-3">
                        <h6 class="text-muted mb-2">Ingrédients:</h6>
                        <ul class="list-unstyled mb-0">
                            ${ingredientsList}
                            ${remainingIngredients > 0 ? `<li class="text-muted small fst-italic">+ ${remainingIngredients} autre(s)...</li>` : ""}
                        </ul>
                    </div>
                    
                    <p class="card-text text-muted small mb-3 flex-grow-1">
                        ${shortInstructions}
                    </p>
                    
                    <div class="mt-auto">
                        <a href="recipe.html?id=${recipe.id}" class="btn btn-primary w-100">
                            Voir la recette
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
}

// ============================================
// VIDER LE CONTENEUR DE RECETTES
// ============================================
/**
 * Vide le contenu d'un conteneur HTML
 * @param {HTMLElement} container - L'élément DOM à vider
 */
export const clearRecipesList = (container) => {
	if (container) {
		container.innerHTML = ""
	}
}

// ============================================
// FONCTION UTILITAIRE - AFFICHER UN MESSAGE
// ============================================
/**
 * Affiche un message dans un conteneur (utile pour les états vides ou erreurs)
 * @param {HTMLElement} container - Le conteneur où afficher le message
 * @param {string} message - Le texte du message
 * @param {string} type - Le type d'alerte Bootstrap (info, warning, danger, success)
 */
export const displayMessage = (container, message, type = "info") => {
	const alertHTML = `
		<div class="col-12">
			<div class="alert alert-${type} text-center" role="alert">
				${message}
			</div>
		</div>
	`
	container.innerHTML = alertHTML
}

export const renderSingleRecipe = (recipe) => {
	return `
	<div class="row mb-3">
		<div class="col-12">
			<a href="index.html" class="btn btn-outline-secondary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-arrow-left me-1"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
					/>
				</svg>
				Retour
			</a>
		</div>
	</div>


	<div class="row">
		<div class="col-12">			
			<div class="card h-100 shadow-sm transition">
				<div class="card-header bg-primary text-white">
					<div class="d-flex justify-content-between align-items-center">
						<h2 class="mb-0" id="recipe-name">${recipe.name}</h2>
						<span
							class="badge bg-light text-dark fs-6"
							id="recipe-preptime"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-clock"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
								/>
								<path
									d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
								/>
							</svg>
							${recipe.prepTime} min
						</span>
					</div>
				</div>
			<img src="https://images.pexels.com/photos/5190684/pexels-photo-5190684.jpeg" class="card-img-top" alt="NOM DE LA RECETTE" style="max-height: 300px; object-fit: cover;">
			
			<div class="card-body p-4">
				<div class="row">
					<!-- Ingrédients -->
					<div class="col-md-5 mb-4">
						<h4 class="mb-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-list-ul me-2"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
								/>
							</svg>
							Ingrédients
						</h4>
						<div class="bg-light p-3 rounded">
							<ul class="list-unstyled mb-0">							
								${recipe.ingredients
									.map(
										(ingredient) =>
											`<li  class="text-muted small fst-italic">${ingredient}</li>`
									)
									.join("")}
									
									</ul>
						</div>
					</div>


					<div class="col-md-7 mb-4">
						<h4 class="mb-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-journal-text me-2"
								viewBox="0 0 16 16"
							>
								<path
									d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"
								/>
								<path
									d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"
								/>
								<path
									d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"
								/>
							</svg>
							Instructions
						</h4>
						<div class="bg-light p-3 rounded">
							<p class="mb-0 text-pre-wrap" id="recipe-instructions">${
								recipe.instructions
							}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`
}
