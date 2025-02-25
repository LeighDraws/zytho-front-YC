# Zythologue - Frontend

## Description
Zythologue est une application frontend développée en React avec TypeScript qui permet d'afficher des bières et des brasseries grâce à une API REST. Ce projet fait suite à une API que j'avais développée, permettant d'afficher des bières, des brasseries et d'ajouter des bières en favoris.

## Fonctionnalités ✨

### Page listant toutes les bières
- Affichage des bières en grille avec :
  - Photo
  - Nom
  - Type
  - Catégorie
  - Aperçu rapide
- Lien permettant d’accéder à une fiche détaillée pour chaque bière.

### Fiche bière
- Affichage détaillé contenant :
  - Description
  - Ingrédients
  - Taux d’alcool
  - Origine
- Lien vers la brasserie. 

### Page listant toutes les brasseries
- Présentation des brasseries avec leurs informations principales :
  - Nom
  - Localisation
- Cliquer sur une brasserie mène vers sa page détail.

### Page affichant la brasserie en détail
- Informations sur la brasserie.
- Liste déroulante des bières de la brasserie.

### Recherche et filtres avancés
- Barre de recherche dynamique avec suggestions automatiques.
- Filtres par catégories.

### Favoris
- Une page permettant aux utilisateurs de consulter et gérer leurs bières favorites.
- Sur la page détail d'une bière le bouton "❤️" met en favoris la bière.

## Technologies et outils
- **React JS + TypeScript** pour la gestion de l’interface utilisateur.
- **React Router** pour la navigation entre les pages.
- **Axios** pour consommer l’API REST.
- **TailwindCSS** pour un design responsive et moderne.

## Installation et démarrage

### Prérequis
- Node.js installé (version recommandée : LTS)
- Un gestionnaire de paquets comme `npm` ou `yarn`

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/ton-projet/zythologue.git
cd zythologue

# Installer les dépendances
npm install
# ou
yarn install
```

### Démarrage du projet
```bash
npm run dev
# ou
yarn dev
```

### Application mise en ligne
- Base de données en Postgresql sur **Neon**
- API mise en ligne avec **Render**
- Front déployé en déploiement continu sur **Vercel** 
- [Site disponible ici](https://zytho-front-yc.vercel.app/)
