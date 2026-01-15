// ============================================
// API.JS - SERVICE LAYER (DATA ACCESS)
// ============================================
const API_BASE_URL = "http://localhost:3000/api/recipes"

// ============================================
// GET ALL RECIPES
// ============================================
export const getAllRecipes = async () => {
    try {
        const response = await fetch(API_BASE_URL)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error)
        throw error
    }
}

// ============================================
// CREATE A NEW RECIPE
// ============================================
export const createRecipe = async (recipeData) => {
    try {
        // 1. Configuration de la requête POST
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData), // On transforme l'objet JS en texte JSON
        }

        // 2. Appel fetch
        const response = await fetch(API_BASE_URL, options)

        // 3. Vérification erreur
        if (!response.ok) {
            throw new Error(`Erreur création: ${response.status}`)
        }

        // 4. Retour de la réponse (la recette créée)
        return await response.json()
    } catch (error) {
        console.error("Erreur lors de la création de la recette:", error)
        throw error
    }
}

// ============================================
// GET ONE RECIPE
// ============================================
export const getOneRecipe = async (recipeId) => {
    try {
        const url = `${API_BASE_URL}/${recipeId}`
        
        // 1. Configuration (GET est le défaut, mais on peut le préciser)
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }

        // 2. Appel fetch
        const response = await fetch(url, options)

        // 3. Vérification erreur (ex: 404 si non trouvé)
        if (!response.ok) {
            throw new Error(`Erreur récupération: ${response.status}`)
        }

        // 4. Retour de la recette
        return await response.json()
    } catch (error) {
        console.error("Erreur lors de la récupération de la recette:", error)
        throw error
    }
}

// ============================================
// DELETE RECIPE
// ============================================
export const deleteRecipe = async (recipeId) => {
    try {
        const url = `${API_BASE_URL}/${recipeId}`

        // 1. Configuration DELETE
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }

        // 2. Appel fetch
        const response = await fetch(url, options)

        // 3. Vérification erreur
        if (!response.ok) {
            throw new Error(`Erreur suppression: ${response.status}`)
        }

        // 4. Retour de la confirmation
        return await response.json()
    } catch (error) {
        console.error("Erreur lors de la suppression de la recette:", error)
        throw error
    }
}

// ============================================
// UPDATE RECIPE (Si besoin pour l'examen)
// ============================================
export const updateRecipe = async (recipeId, recipeData) => {
    try {
        const url = `${API_BASE_URL}/${recipeId}`
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipeData)
        }
        
        const response = await fetch(url, options)
        
        if (!response.ok) throw new Error(`Erreur modification: ${response.status}`)
        
        return await response.json()
    } catch (error) {
        console.error("Erreur lors de la modification:", error)
        throw error
    }
}