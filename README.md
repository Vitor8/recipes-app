# recipes-app

React application that simulates a recipe application. The manipulation of the application's global state is done using the Context API.

Link for GitHub Pages: vitor8.github.io/recipes-app/explorar

Step by step to install the project:

- Clone the repository: `git clone git@github.com:Vitor8/recipes-app.git`
- Enter the other folder: cd recipes-app
- Install the following dependencies:
- `npm install`
- Run the application with: `npm-start`

For better viewing, use 360 x 640 resolution.

The app uses two recipes api´s:
  - 1: TheMealDB (https://www.themealdb.com/api.php)
  - 2: The CockTailDB (https://www.thecocktaildb.com/api.php)

The user can perform different searches through different food and drink recipe screens.

1 - Meals and Drinks main screens

- On the home screens of food and drinks, in the header, when clicking on the search symbol, the user can search by ingredient name, recipe name and first letter of the recipe.

![Captura de tela de 2021-08-25 13-57-38](https://user-images.githubusercontent.com/24492328/130833312-b8389ea5-97d0-4e8b-a043-67b515ad111b.png)

- When clicking on the recipe card, a page with the details of that recipe is rendered.

![Captura de tela de 2021-08-25 14-00-09](https://user-images.githubusercontent.com/24492328/130833701-0e45c543-2321-425e-9d9f-fbcebcb071ad.png)

    - When scrolling down, when the user clicks on the 'Start Recipe' button, a new page is rendered, with the step-by-step instructions for making the recipe.
  
    - By clicking on the ingredients checkbox, the information is saved in Local Storage. So, when the user returns to the different initialized food and beverage recipes, the user starts where he left off.
  
![Captura de tela de 2021-08-25 14-03-01](https://user-images.githubusercontent.com/24492328/130834075-a81b1d8a-9440-4fff-a7af-cf9c2fda4946.png)

    - When all Ingredient CheckBoxes are complete, the 'Finish Recipe' button is enabled. When clicked, a new screen is rendered, where the user can see all the recipes made.
 
 ![Captura de tela de 2021-08-25 14-04-00](https://user-images.githubusercontent.com/24492328/130834206-6d9f3402-f57b-4a7d-9d74-47236d93ce1b.png)
  
2 - Profile Screens

![Captura de tela de 2021-08-25 14-05-11](https://user-images.githubusercontent.com/24492328/130834326-68817848-b856-4de1-b8e8-17df81b4cf1a.png)

  - When browsing the application, every time the user finishes any recipe, it is possible to see all the finished recipes by going to the profile screen, and clicking on 'Finished Recipes'.

  - User can also favorite and unfavorite recipes. Favorite recipes are also displayed on the profile screen by clicking on 'Favorite Recipes'.
  
3 - Exploration Screens

![Captura de tela de 2021-08-25 14-05-55](https://user-images.githubusercontent.com/24492328/130834424-c148d712-e5d4-49d9-ab52-f850f9bd29e5.png)

   - Finally, when the user is not sure which recipe to make, in the 'Footer' of the application, by clicking on the middle icon, it is possible to go to the section to explore recipes.
  - You can choose to explore both for food and drinks.
  - In food, the exploration options are: 'By Ingredients', 'By Place of Origin' and a random recipe in the 'Surprise Me!' option.
  - In drinks, due to a limitation of the drinks API, the options are only: 'By Ingredients' and 'Surprise Me'.





