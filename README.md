# event-registration

Système complet (backend + frontend) de gestion des émargements pour des évènements : gestion des évènements, des inscriptions aux évènements et des émargements (présences des participants).

Backend PocketBase (https://pocketbase.io).

Frontend développé en React (https://fr.react.dev/).

Environnement de développement :

- IDE utilisé lors du développement : Visual Studio Code (https://code.visualstudio.com/)
- Nécessaire pour compiler et lancer le Frontend : Node.js (https://nodejs.org/) et Yarn v1 (https://classic.yarnpkg.com/)

### 1 - Téléchargement et installation de PocketBase

- dans un terminal : `./init_app.sh`

### 2 - Lancement Backend + Frontend

- dans un terminal : `./launch_app.sh`

NB : le script fonctionne correctement sur MacOS mais pose parfois problème sur Windows, si le script échoue, exécuter dans 2 terminaux différents :

Backend : `cd back && ./pocketbase serve`
Frontend : `cd front && yarn start`

### 3 - Navigation vers le Frontend

Ouvrir `http://localhost:5173/` dans un navigateur web.
S'identifier avec le login `students@douze.info` (le mot de passe est le login).

### 4 - Administration backend

Il est possible de visualiser et modifier les données du backend en ouvrant `http://127.0.0.1:8090/_/` dans un navigateur web.
S'identifier avec le login `students@douze.info` (le mot de passe est le login)
