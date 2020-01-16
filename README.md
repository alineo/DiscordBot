# Table des matières
- [Sir Mondrian](#sir-mondrian)
    * [Avant de commencer](#avant-de-commencer)
- [Commandes](#commandes)
    * [Vue globale](#vue-globale)
    * [Descriptions détaillées](#descriptions-détaillées)
- [Améliorations](#améliorations)
- [Remerciements](#remerciements)


# Sir Mondrian

Projet de bot discord réalisé en Node.js permettant une myriade de commandes différentes pour les utilisateurs pour youtube ou pathfinder entre autre.

## Avant de commencer

Avant de pouvoir utiliser le bot, il est nécessaire d'effectuer les étapes suivantes.

### Prérequis

L'installation de ffmpeg sur le PC est nécessaire, vous pouvez trouvez un [tutoriel ici](https://www.youtube.com/watch?v=SW-iKrT_nJs).

Les modules suivants doivent être installés :
```nodejs
npm install discord.js
npm install ytdl-core
npm install ffmpeg-binaries
npm install node-opus
```

## Commandes

Voici la liste exhaustives des commandes supportées par Sir Mondrian

### Vue globale

|   Commande    |     Paramètres       |            Description            |
|:-------------:|:--------------------:|:---------------------------------:|
| !presentation | []                   | Humble présentation               |
| !dit          | [texte]              | Faire le perroquet                |
| !google       | [texte]              | Rechercher ce que vous voulez     |
| !add          | <[queue]> [playlist] | Ajouter la playlist à la queue    |
|               | <[queue]> [musique]  | Ajouter la musique à la queue     |
| !shuffle      | [queue]              | Mélange les musiques de la queue  |
|               | []                   | Mélange les musiques de la queue 0|
| !play         | [musique]            | Jouer la musique                  |
|               | <[queue]> [nombre]   | Jouer les musique de la queue     |
|               | <[queue]> []         | Jouer la musique 0 de la queue    |
| !queue        | [texte]              | Voir les musiques de la queue     |
|               | []                   | Voir la liste des queues          |
| !queuelist    | []                   | Voir la liste des queues          |
| !queueadd     | [texte]              | Créer une queue                   |
| !pause        | []                   | Mettre la musique en pause        |
| !resume       | []                   | Reprendre la musique en pause     |
| !stop         | []                   | Arrêter de jouer la musique       |
| !leave        | []                   | Quitter le channel vocal          |
| !pf           | [texte]              | Rechercher sur pathfinder         |
| !yt           | [texte]              | Rechercher sur youtube            |
| !ytplay       | [chiffre]            | Lancer musique cherchée par !yt   |
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
**Description** : Le bot ajoute la musique ou la playlist que vous lui passez à la queue précisée ou 'origine' par défaut  
**Syntaxe** : !add [queue] [playlist] ou !add [playlist] ou !add [queue] [musique] ou !add [musique]  
**Exemple** : !add Musique RPG https://www.youtube.com/watch?v=dQw4w9WgXcQ

#### !shuffle
**Description** : Le bot mélange les musiques de la queue précisée ou de la première queue par défaut  
**Syntaxe** : !shuffle [queue] ou !shuffle
**Exemple** : !shuffle Musique RPG

#### !play
**Description** : Le bot joue soit la musique passée, soit la musique correspondant à l'index ou 0 par défaut dans la queue précisée ou la première par défaut  
**Syntaxe** : !play [musique] ou !play [nombre] ou !play [queue] [nombre] ou !play [queue] ou !play  
**Exemples** :  
!play https://www.youtube.com/watch?v=dQw4w9WgXcQ  
!play Musiques RPG 5

#### !queue
**Description** : Affiche la liste des queues ou affiche les musiques d'une queue si un nom est précisé  
**Syntaxe** : !queue [texte] ou !queue  
**Exemple** : !queue nom de la queue

#### !queuelist
**Description** : Affiche la liste des queues  
**Syntaxe** : !queuelist  
**Exemple** : !queuelist

#### !queueadd
**Description** : Créer une nouvelle queue avec le nom qui suit la commande  
**Syntaxe** : !queueadd [texte]  
**Exemple** : !queueadd Musiques RPG

#### !queueremove
**Description** : Supprimer la queue dont le nom correspond au texte qui suit la commande  
**Syntaxe** : !queueremove [texte]  
**Exemple** : !queueremove Musiques RPG

#### !pause
**Description** : Le bot met la musique qu'il est en train de jouer, si il y en a une, en pause  
**Syntaxe** : !pause  
**Exemple** : !pause

#### !resume
**Description** : Le bot continue la musique mise en pause, si il y en a une  
**Syntaxe** : !resume  
**Exemple** : !resume

#### !volume
**Description** : Ajuster le volume de Sir Mondrian entre 0 et 200%  
**Syntaxe** : !volume [nombre]  
**Exemple** : !volume 87

#### !stop
**Description** : Le bot arrête de jouer des musiques, impossible de reprendre où il s'est arrêté  
**Syntaxe** : !stop  
**Exemple** : !stop

#### !leave
**Description** : Le bot quitte le channel vocal, stop la musique en cours si il y en a une  
**Syntaxe** : !leave  
**Exemple** : !leave

#### !pf
**Description** : Le bot effectue une recherche sur le site pathfinder  
**Syntaxe** : !pf [texte]  
**Exemple** : !pf boule de feu

#### !yt
**Description** : Le bot effectue une recherche youtube et retourne les 5 meilleurs résultats  
**Syntaxe** : !yt [texte]  
**Exemple** : !yt joueur du grenier

#### !ytplay
**Description** : Le bot lance la musique correspondant à une recherche '!yt' précédemment effectuée  
**Syntaxe** : !ytplay [chiffre]  
**Exemple** : !ytplay 2

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

#### !edt
**Description** : Affiche l'emploi du temps de cette semaine ou d'une semaine à venir en choississant le nombre de semaine de décalage  
**Syntaxe** : !edt [nombre] ou !edt  
**Exemple** : !edt 2


## Améliorations

Si vous avez des idées d'améliorations, ou simplement des remarques à faire sur le bot, vous pouvez créer une "issue" avec comme label 'enhancement' et je verrais ce qu'il est possible de faire.


## Remerciements

Je me remercie chaleureusement moi-même, sans qui ce projet n'aurait jamais vu le jour.
