# Horloge mondiale néon

Une horloge numérique personnalisable qui affiche l'heure de plusieurs villes, dont Lomé au Togo. Le projet est construit avec SvelteKit, Svelte 5 et TypeScript.

## Fonctionnalités

- Affichage de l'heure locale d'une ville, mis à jour chaque seconde.
- Sélection parmi plusieurs fuseaux horaires, avec mémorisation du dernier choix.
- Choix d'une palette de couleurs, également mémorisé.
- Interface responsive avec une animation de reflet et une ambiance néon.
- Prise en charge de la préférence système de réduction des animations.

## Prérequis

- Node.js compatible avec Vite 8.
- npm.

## Installation

```sh
npm install
```

## Développement

```sh
npm run dev
```

Vite affiche l'adresse locale à ouvrir dans le navigateur.

## Vérifications

```sh
npm run check
npm run build
```

Pour prévisualiser la compilation de production :

```sh
npm run preview
```

## Technologies

- SvelteKit
- Svelte 5
- TypeScript
- Vite

## Déploiement

Le projet utilise `adapter-auto`. La plateforme de déploiement doit être choisie et configurée avant de publier le site. La présence du code sur GitHub ne le déploie pas automatiquement.
