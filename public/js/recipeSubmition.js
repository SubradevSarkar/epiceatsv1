"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let ingredientList = selector(".ingredientList");
  let ingredientDiv = allSelector(".ingredientDiv")[0];
  let addIngredientsBtn = elementId("addIngredientsBtn");
  const recipeForm = elementId("recipe-submit-form");
  const recipeImage = elementId("recipe-image");

  // add ingredients items at recipe submit =================================================================
  if (addIngredientsBtn) {
    addIngredientsBtn.addEventListener("click", function () {
      let newIngredients = ingredientDiv.cloneNode(true);
      let input = newIngredients.getElementsByTagName("input")[0];
      input.value = "";
      ingredientList.appendChild(newIngredients);
    });
  }

  // handel recipe submit =================================================================
  if (recipeForm) {
    recipeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(recipeForm);

      loader.show();
      try {
        const res = await fetch(`${baseUrl}/submit-recipe`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message);
        }
        loader.hide();
        redirect("/submit-recipe");
      } catch (error) {
        loader.hide();
        redirect("/submit-recipe");
      }
    });
  }
});
