# Table des matières
- [Sir Mondrian](#sir-mondrian)
    * [Avant de commencer](#avant-de-commencer)
- [Commandes](#commandes)
    * [Vue globale](#vue-globale)
    * [Descriptions détaillées](#descriptions-détaillées)
- [Améliorations](#améliorations)
- [Remerciements](#remerciements)


# Sir Mondrian

Bienvenue pour la version 2.0, toute fraîche, du merveilleux Sir Mondrian !
Projet de bot discord réalisé en Node.js permettant une myriade de commandes différentes pour les utilisateurs pour youtube, pathfinder et plus encore !

## Avant de commencer

Avant de pouvoir utiliser le bot, il est nécessaire d'effectuer les étapes suivantes.

### Prérequis

L'installation de ffmpeg sur le PC est nécessaire, vous pouvez trouvez un [tutoriel ici](https://www.youtube.com/watch?v=SW-iKrT_nJs).

Les modules suivants doivent être installés :
```nodejs
npm i discord.js
npm i discordjs/Commando
npm i ytdl-core-discord
npm i discordjs/opus
```

## Commandes

Voici la liste exhaustives des commandes supportées par Sir Mondrian

### Vue globale

|   Commande    |     Paramètres       |            Description            |
|:-------------:|:--------------------:|:---------------------------------:|
| !presentation | []                   | Humble présentation               |
| !dit          | [texte]              | Faire le perroquet                |
| !google       | [texte]              | Rechercher ce que vous voulez     |
| !add          | <[playlist]> [lien]  | Ajouter la playlist ou vidéo      |
|               |                      | à la playlist cible ou défaut     |
| !play         | [musique]            | Jouer la musique                  |
|               | <[playlist]> [index] | Jouer les musique de la playlist  |
|               | <[playlist]> []      | Jouer la musique 0 de la playlist |
|               | [index]              | Jouer une musique Youtube cherchée|
| !playlist     | [nom]                | Voir les musiques de la playlist  |
|               | []                   | Voir la liste des playlists       |
| !pause        | []                   | Mettre la musique en pause        |
| !resume       | []                   | Reprendre la musique en pause     |
| !stop         | []                   | Arrêter de jouer la musique       |
| !volume       | [nombre]             | Change le volume des musiques     |
| !pf           | [texte]              | Rechercher sur pathfinder         |
| !yt           | [texte]              | Rechercher sur youtube            |
| !avatar       | [utilisateur]        | Affiche l'avatar de l'utilisateur |
|               | []                   | Affiche son avatar                |
| !delete       | [nombre]             | Supprime les derniers messages    |

### Descriptions détaillées

#### !presentation
**Description** : Le bot se présente à vous par une phrase d'introduction  
**Syntaxe** : !presentation  
**Exemple** : !presentation  

#### !dit
**Description** : Le bot répète votre phrase  
**Syntaxe** : !dit [texte]  
**Exemple** : !dit bonjour je suis un bot  

#### !google
**Description** : Le bot recherche votre phrase sur google et vous renvoie le lien  
**Syntaxe** : !google [texte]\  
**Exemple** : !google comment tuer quelqu'un sans laisser de traces

#### !add
**Description** : Le bot ajoute la musique ou la playlist que vous lui passez à la playlist précisée ou 'origine' par défaut  
**Syntaxe** : !add [playlist] [lien] ou !add [lien] ou !add [musique]  
**Exemple** : !add Musique RPG https://www.youtube.com/watch?v=dQw4w9WgXcQ

#### !play
**Description** : Le bot joue soit la musique passée, soit la musique correspondant à l'index ou 0 par défaut dans la playlist précisée ou la première par défaut  
**Syntaxe** : !play [musique] ou !play [nombre] ou !play [playlist] [index] ou !play [playlist] ou ou !play [index] !play  
**Exemples** :  
!play https://www.youtube.com/watch?v=dQw4w9WgXcQ  
!play Musiques RPG 5
!play 3

#### !playlist
**Description** : Affiche la liste des playlists ou affiche les musiques d'une playlist si un nom est précisé  
**Syntaxe** : !playlist [texte] ou !playlist  
**Exemple** : !playlist nom de la playlist

#### !pause
**Description** : Le bot met la musique qu'il est en train de jouer, si il y en a une, en pause  
**Syntaxe** : !pause  
**Exemple** : !pause

#### !resume
**Description** : Le bot continue la musique mise en pause, si il y en a une  
**Syntaxe** : !resume  
**Exemple** : !resume

#### !stop
**Description** : Le bot arrête de jouer des musiques, impossible de reprendre où il s'est arrêté  
**Syntaxe** : !stop  
**Exemple** : !stop

#### !volume
**Description** : Ajuster le volume de Sir Mondrian entre 0 et 200%  
**Syntaxe** : !volume [nombre]  
**Exemple** : !volume 87

#### !pf
**Description** : Le bot effectue une recherche sur le site pathfinder  
**Syntaxe** : !pf [texte]  
**Exemple** : !pf boule de feu

#### !yt
**Description** : Le bot effectue une recherche youtube et retourne les 5 meilleurs résultats  
**Syntaxe** : !yt [texte]  
**Exemple** : !yt joueur du grenier

#### !avatar
**Description** : Affiche son propre avatar ou celui de la personne désignée  
**Syntaxe** : !avatar [utilisateur] ou !avatar  
**Exemple** : !avatar @Sir Mondrian#0896

#### !delete
**Description** : Supprime les derniers message du channel  
**Syntaxe** : !delete [nombre]  
**Exemple** : !delete 25

#### !git
**Description** : Renvoie le lien du dépôt Git de Sir Mondrian  
**Syntaxe** : !git  
**Exemple** : !git


## Améliorations

Si vous avez des idées d'améliorations, ou simplement des remarques à faire sur le bot, vous pouvez créer une "issue" avec comme label 'enhancement' et je verrais ce qu'il est possible de faire.


## Remerciements

Je me remercie chaleureusement moi-même, sans qui ce projet n'aurait jamais vu le jour.
