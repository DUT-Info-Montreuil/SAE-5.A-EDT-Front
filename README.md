<div align="center">

# Gestionnaire EDT

**Un site web d'édition d'emploi du temps pour IUT.**<br />
Réalisé dans le cadré d'une SAÉ ([Situation d'apprentissage et d'évaluation)](https://fr.wikipedia.org/wiki/Situation_d%27apprentissage_et_d%27%C3%A9valuation), ce projet à pour but de faciliter la planification et la création des cours tout en donnant un air.<br />
Ce projet est découpé en trois repositories, un front-end, une API et une database, toutes trois sous forme de conteneurs docker.

</div>

## Technologies

[Angular CLI](https://github.com/angular/angular-cli) version 16.2.11 <br />
[Tailwind](https://github.com/tailwindlabs/tailwindcss) version 3.4.1

## Execution

### Environnement Local

Pour build et lancer l'application localement : `ng serve` ou `npm run start` <br />

### Environnement Docker

Pour build et lancer l'application docker : <br />
`docker build -t my angular` <br />
`docker run -p 8080:80 my-angular`

L'url de l'application : `http://localhost:4200/`.

## Test

## Architecture

### Versioning

Notre projet utilise une stratégie de versionnement sémantique (SemVer) automatisée via notre pipeline CI/CD pour assurer une gestion cohérente et prévisible des versions.

#### Processus de Versionnement

Snapshots (Versions Instantanées) : À chaque fois qu'une nouvelle fonctionnalité (feature) est poussée dans le repository, le fichier package.json est mis à jour automatiquement pour refléter une nouvelle version snapshot. Cette version snapshot est identifiée par un incrément du numéro de version avec un suffixe (par exemple, 1.0.0-snapshot.1). Un tag Git correspondant à cette version snapshot est également créé automatiquement.

Versions de Développement : Lorsqu'un changement est poussé sur la branche develop, la version dans package.json est mise à jour pour refléter une nouvelle version de développement en suivant le format 0.0.x. Cette mise à jour est également automatisée via notre pipeline. Un nouveau tag Git est créé pour chaque version de développement, ce qui facilite le suivi des versions et la gestion des releases.

### Git Flow

Utilisation de branches feature, develop, release, et master.

## Ressources

-   **Illustrations svg** : https://www.svgrepo.com/
-   **Icons svg** : https://iconscout.com/

## Participants

-   [@Aldriculteur](https://github.com/Aldriculteur) - Aldric CLAUDE
-   [@Lony027](https://github.com/Lony027) - Hugo COHEN
-   [@adil93s](https://github.com/adil93s) - Adil CHETOUANI
-   [@MehediT](https://github.com/MehediT) - Mehedi TOURE
-   [@bseydi](https://github.com/bseydi) - Boulaye SEYD

## Liens

-   **Repo EDT Principal** : https://github.com/DUT-Info-Montreuil/SAE-5.A-EDT

## Documentation

[GitFlow](https://danielkummer.github.io/git-flow-cheatsheet/index.fr_FR.html) <br />
[Tailwind](https://tailwindcss.com/docs/installation) <br />
[Angular](https://angular.io/docs) <br />
