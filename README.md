# recipes-app

Aplicação em React que simula um aplicativo de receitas. A manipulação do estado global da aplicação é feita usando Context API.

Passo a Passo para a instalção do projeto:

- Fork o repositório
- Clone o repositório: git clone git@github.com:Vitor8/recipes-app.git
- Entre na pasta: cd recipes-app
- Entre em uma outra pasta: cd recipes-app
- Instale as seguintes dependências:
	- npm install
- Rode a aplicação com: npm-start

O projeto foi pensado para ser uma aplicação em mobile. Logo, para uma melhor visualização,utilize a resolução 360 x 640.

O app faz diversas requisições a duas API´s de receitas:
  - 1: TheMealDB (https://www.themealdb.com/api.php)
  - 2: The CockTailDB (https://www.thecocktaildb.com/api.php)

O usuário pode realizar diferentes buscas por diversas telas de receitas de comidas e bebidas.

1 - Telas principais de Meals e Drinks

  - Nas telas iniciais de comidas e bebidas, no header, ao clicar no símbolo de buscar, o usuário pode buscar por nome do ingrediente, nome da receita e primeira
  letra da receita.
  - Ao clicar no card da receita, é renderizado uma página com os detalhes daquela receita.
  - Ao descer a tela, quando o usuário clica no botão 'Iniciar Receita' é renderizado uma nova página, com o passo a passo e as instruções para fazer a receita. 
    Ao clicar no checkbox dos ingredientes, a informação é salva no Local Storage. Logo, quando o usuário voltar para as direntes receitas de bebidas e comidas 
    inicializadas, o usuário começa de onde terminou.
  - Quando todos os CheckBoxs de Ingredientes estiverem completos, o botão 'Finalizar Receita' é habilitado. Ao ser clicado, é renderizado uma nova tela, onde
  o usuário pode ver todas as receitas feitas.
  
2 - Telas de Perfil

  - Ao navegar pela aplicação, toda vez que o usuário termina qualquer receita, é possível ver todas as receitas finalizadas indo até a tela de perfil, e clicando
  em 'Receitas Finalizadas'.
  - O usuário também pode favoritar e desfavoritar receitas. As receitas favoritadas também ficam na tela de perfil, ao clicar em 'Receitas Favoritadas'.
  
3 - Telas de Exploração

  - Por fim, quando o usuário não tiver certeza qual receita fazer, no 'Footer' da aplicação, ao clicar no ícone do meio, é possível ir para a sessão
  de explorar receitas. 
  - É possível escolher explorar tanto por comidas quanto por bebidas.
  - Em comidas, as opções de exploração são: 'Por Ingredientes', 'Por Local de Origem' e uma receita randômica na opção 'Me Surpreenda!'.
  - Em bebidas, devido a uma limitação da API de bebidas, as opções são apenas: 'Por Ingredientes' e 'Me Surpreenda'.





