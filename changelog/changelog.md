# Changelog – Chat Widget Streamlabs

## [1.0.0] – 2025-07-24

### Ajout
- Création du widget de chat en HTML/CSS/JS minimaliste.
- Connexion directe au chat Twitch via WebSocket IRC (canal `fugu_fps`).
- Support des emotes 7TV (globales et du canal) avec chargement dynamique via l’API 7TV.
- Support des emotes Twitch natives (remplacement automatique dans les messages).
- Affichage des badges Twitch (modérateur, VIP, sub, bits, prime, turbo, etc.) avec images personnalisées locales ou Twitch CDN.
- Attribution de couleurs personnalisées pour les pseudos (couleur Twitch ou fallback palette).
- Nettoyage automatique des messages IRC (suppression des caractères de contrôle, gestion des actions).
- Animation d’apparition des messages (slide-in).
- Responsive design pour l’affichage sur mobile et desktop.
- Limitation du nombre de messages affichés (max 50).
- Gestion automatique de la reconnexion en cas de perte de connexion WebSocket.
- Fallback Streamlabs/StreamElements pour compatibilité avec d’autres plateformes d’alertes.

### Améliorations
- Augmentation de la taille de la police pour une meilleure lisibilité (pseudos, messages, badges, séparateur).
- Proportions améliorées pour les emotes 7TV (max-width, max-height, object-fit).
- Synchronisation de la couleur des pseudos avec la couleur Twitch réelle si disponible.
- Affichage des badges d’abonnement personnalisés selon la durée (1 mois, 2 mois, 1 an, etc.).
- Support des badges spéciaux/événementiels (Game Awards, ZEvent, etc.).
- Nettoyage des messages IRC pour supprimer les commandes /me et autres artefacts.

### Corrections
- Correction du bug d’affichage des emotes 7TV et Twitch qui se chevauchaient.
- Correction du bug de persistance des couleurs utilisateurs.
- Correction de la gestion des badges pour éviter les doublons ou les erreurs d’image.
- Correction de la gestion des caractères spéciaux dans les messages IRC.

---

## Instructions de déploiement

- Ajoutez l’URL du widget dans OBS ou votre logiciel de streaming comme source navigateur.

---

## Historique

- Toutes les fonctionnalités principales sont en place et validées.
- Prêt pour une utilisation en production sur Twitch.