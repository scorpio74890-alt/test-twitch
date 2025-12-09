# 🎮 Widget Rank Valorant - Paramètres URL

Ce document décrit tous les paramètres URL disponibles pour personnaliser le widget de rang Valorant.

## 📋 Paramètres de base

### Configuration du joueur
| Paramètre | Description | Valeur par défaut | Exemple |
|-----------|-------------|-------------------|---------|
| `name` | Nom du joueur Valorant | `ANAKINSKYWALKER` | `?name=MonJoueur` |
| `tag` | Tag du joueur Valorant | `HARR` | `?tag=MonTag` |

## 🔑 Configuration API

### Clé et région
| Paramètre | Description | Valeur par défaut | Exemple |
|-----------|-------------|-------------------|---------|
| `api_key` | Clé API pour l'API Henrik.Dev | `HDEV-6e8ce2b6-0be9-4653-81f6-ee2f4faf32a4` | `?api_key=MA_CLE_API` |
| `region` | Région du serveur Valorant | `eu` | `?region=na` |
| `platform` | Plateforme de jeu | `pc` | `?platform=pc` |

**Régions disponibles :**
- `eu` - Europe
- `na` - Amérique du Nord
- `ap` - Asie-Pacifique
- `kr` - Corée
- `br` - Brésil
- `latam` - Amérique Latine

## ⏰ Configuration de mise à jour

| Paramètre | Description | Valeur par défaut | Exemple |
|-----------|-------------|-------------------|---------|
| `update_interval` | Intervalle de mise à jour en millisecondes | `60000` (1 minute) | `?update_interval=30000` |

**Intervalles recommandés :**
- `30000` - 30 secondes (mise à jour rapide)
- `60000` - 1 minute (défaut)
- `120000` - 2 minutes (économie de ressources)
- `300000` - 5 minutes (économie maximale)

## 📺 Configuration Twitch

| Paramètre | Description | Valeur par défaut | Exemple |
|-----------|-------------|-------------------|---------|
| `channel` | Nom du canal Twitch | `fugu_fps` | `?channel=mon_canal` |
| `nick` | Nom d'utilisateur pour la connexion IRC | `justinfan12345` | `?nick=mon_utilisateur` |
| `pass` | Mot de passe pour la connexion IRC | `SCHMOOPIIE` | `?pass=mon_mot_de_passe` |

## 👮 Configuration des permissions

### Gestion des utilisateurs
| Paramètre | Description | Format | Exemple |
|-----------|-------------|--------|---------|
| `moderators` | Liste des modérateurs | `user1,user2,user3` | `?moderators=user1,user2` |
| `vips` | Liste des VIPs | `user1,user2,user3` | `?vips=user1,user2` |
| `blacklist` | Liste des utilisateurs bannis | `user1,user2,user3` | `?blacklist=spam_user` |

**Format :** Utilisez des virgules pour séparer plusieurs utilisateurs. Les noms sont automatiquement convertis en minuscules.

## 📝 Exemples d'utilisation

### Configuration minimale
```
rank-widget.html?name=MonJoueur&tag=MonTag
```

### Configuration avec API personnalisée
```
rank-widget.html?name=MonJoueur&tag=MonTag&api_key=MA_CLE_API&region=na
```

### Configuration complète
```
rank-widget.html?name=MonJoueur&tag=MonTag&api_key=MA_CLE_API&region=eu&platform=pc&channel=mon_canal&nick=mon_utilisateur&pass=mon_mot_de_passe&moderators=user1,user2&vips=user1,user3&update_interval=30000
```

## 🔧 Commandes de test

Une fois le widget chargé, vous pouvez utiliser ces commandes dans la console du navigateur :

### Tests de base
- `window.valorantWidget.testCommandPermissions('username')` - Teste les permissions d'un utilisateur
- `window.valorantWidget.testRefreshRank()` - Déclenche un refresh manuel

### Gestion de la configuration
- `window.valorantWidget.reloadConfiguration()` - Recharge la configuration depuis les paramètres URL
- `window.valorantWidget.generateConfigURL()` - Génère l'URL de configuration actuelle

### Gestion des utilisateurs
- `window.valorantWidget.addModerator('username')` - Ajoute un modérateur
- `window.valorantWidget.removeModerator('username')` - Retire un modérateur
- `window.valorantWidget.addVIP('username')` - Ajoute un VIP
- `window.valorantWidget.removeVIP('username')` - Retire un VIP
- `window.valorantWidget.addToBlacklist('username')` - Ajoute à la blacklist
- `window.valorantWidget.removeFromBlacklist('username')` - Retire de la blacklist

## 🚀 Utilisation dans OBS

1. **Ajouter une source navigateur** dans OBS
2. **URL :** `file:///chemin/vers/rank-widget.html?name=MonJoueur&tag=MonTag`
3. **Largeur :** `400` (ou selon vos besoins)
4. **Hauteur :** `100` (ou selon vos besoins)

## ⚠️ Notes importantes

- **Clé API :** Remplacez toujours `YOUR_API_KEY` par votre vraie clé API
- **Sécurité :** Évitez de partager publiquement des URLs contenant des mots de passe
- **Performance :** Des intervalles de mise à jour trop courts peuvent surcharger l'API
- **Régions :** Assurez-vous que la région correspond à celle de votre compte Valorant

## 🔗 Liens utiles

- [Exemples d'utilisation](rank-widget-examples.html) - Page avec des exemples interactifs
- [API Henrik.Dev](https://henrik.dev/) - Documentation de l'API Valorant
- [Widget principal](rank-widget.html) - Fichier principal du widget

## 📞 Support

Pour toute question ou problème, consultez la console du navigateur pour les logs détaillés et utilisez les commandes de test disponibles.
