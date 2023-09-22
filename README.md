# Projet Vue 3 avec Vite pour manager.one

Ce projet est une application météo développée avec Vue 3 et Vite pour manager.one. Elle permet aux utilisateurs de rechercher la météo actuelle et prévue pour plusieurs jours dans différentes villes, de sauvegarder des villes favorites, et bien plus encore.

## Fonctionnalités Principales

- Recherche de la météo actuelle pour une ville spécifique.
- Affichage de la météo détaillée pour la ville sélectionnée.
- Possibilité de sauvegarder des villes aux favoris et d'accéder rapidement à leur météo.
- Intégration de cartes grâce à MapBox pour une expérience visuelle améliorée.
- Utilisation de l'API OpenWeather pour récupérer les données météorologiques.
- Interface utilisateur moderne et conviviale grâce à Tailwind CSS.
- Gestion des requêtes HTTP avec Axios.
- Carrousels interactifs d'images grâce à Swiper.

## Captures d'Écran

![Capture d'écran de la météo actuelle](https://image.noelshack.com/fichiers/2023/38/5/1695347181-capture-d-ecran-2023-09-22-a-03-42-16.png)

*Recherche de météo pour une ville*

![Capture d'écran de la météo détaillée](https://image.noelshack.com/fichiers/2023/38/5/1695374820-capture-d-ecran-2023-09-22-a-11-24-18.png)

*Vue détaillée de la météo (Actuelle, sur plusieurs jours)*

![Capture d'écran des villes favorites](https://image.noelshack.com/fichiers/2023/38/5/1695347181-capture-d-ecran-2023-09-22-a-03-42-00.png)

*Gestion des villes favorites*

## Bibliothèques Utilisées

Ce projet utilise les bibliothèques suivantes :

- [MapBox](https://www.mapbox.com/) - Intégration de cartes interactives.
- [OpenWeather](https://openweathermap.org/) - Récupération de données météorologiques.
- [Axios](https://axios-http.com/) - Gestion des requêtes HTTP.
- [Swiper](https://swiperjs.com/) - Création de carrousels interactifs.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire.

## Configuration du Projet

Assurez-vous d'avoir Node.js installé. Si ce n'est pas le cas, téléchargez-le depuis [le site officiel](https://nodejs.org/).

### Installation des Dépendances

Exécutez la commande suivante pour installer les dépendances du projet :

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
# test-front-manager.one
