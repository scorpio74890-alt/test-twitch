# Widget Chat Twitch pour Streamlabs OBS

Un widget de chat personnalisé pour Streamlabs OBS avec support complet des badges Twitch, emotes 7TV et emotes Twitch natives pour le canal **fugu_fps**.

## 🚀 Installation

### 1. Cloner le repository
```bash
git clone [URL_DU_REPOSITORY]
cd twitch
```

### 2. Structure des fichiers
Assurez-vous d'avoir **TOUS** les fichiers du dossier `twitch` :
- `chat-widget.html` (le fichier principal)
- Tous les fichiers `.png` des badges (80+ images)
- **⚠️ IMPORTANT : Ne pas renommer les fichiers .png !**

### 3. Ajouter le widget dans Streamlabs OBS

1. Ouvrez Streamlabs OBS
2. Allez dans **Sources** → **Ajouter** → **Navigateur**
3. Créez une nouvelle source navigateur
4. Dans **URL**, sélectionnez **Fichier local** et choisissez `chat-widget.html`
5. Configurez les dimensions recommandées :
   - **Largeur** : 400-600px
   - **Hauteur** : 800-1000px

## ✨ Fonctionnalités

### 🎯 Chat en temps réel
- Connexion directe au chat Twitch de **fugu_fps**
- Messages affichés au format `[pseudo] : message`
- Couleurs automatiques pour chaque utilisateur
- Animation d'arrivée des messages

### 🏆 Système de badges complet (80+ badges)
- **Badges de base** : Broadcaster, Moderator, VIP, Subscriber
- **Badges d'abonnement** : 1 mois à 2+ ans avec images personnalisées
- **Badges de prédictions** : Différents niveaux avec images custom
- **Badges de bits/cheers** : De 1 bit à 5M+ bits
- **Badges de sub gifts** : De 1 à 5000+ gifts
- **Badges spéciaux** : Events, TwitchCon, GameAwards, ZEvent, etc.
- **Badges Prime/Turbo/Verified**

### 😀 Support des emotes
- **Emotes Twitch natives** : Toutes les emotes officielles du chat
- **Emotes 7TV** : 301 emotes du canal + 43 emotes globales
- **Priorité** : Twitch → 7TV canal → 7TV global

## 🎨 Personnalisation

Le widget est **entièrement customizable** ! Vous pouvez modifier :

### 🖥️ Apparence générale
```css
/* Couleurs du texte */
.username { color: #00ff88; }
.message-content { color: #ffffff; }

/* Taille des polices */
.username { font-size: 20px; }
.message-content { font-size: 18px; }

/* Police personnalisée */
body { font-family: 'Votre Police', sans-serif; }
```

### 🎨 Couleurs des utilisateurs
```css
/* 10 couleurs prédéfinies */
.username.color-1 { color: #ff6b6b; }
.username.color-2 { color: #4ecdc4; }
/* Ajoutez vos propres couleurs */
```

### 🏷️ Taille des badges et emotes
```css
/* Badges */
.badge-image { 
    width: 18px; 
    height: 18px; 
}

/* Emotes */
.emote-7tv, .emote-twitch { 
    width: 28px; 
    height: 28px; 
}
```

### 📱 Mode responsive
```css
@media (max-width: 768px) {
    .username { font-size: 16px; }
    .message-content { font-size: 14px; }
}
```

## ⚙️ Configuration avancée

### Changer le nombre de messages affichés
```javascript
this.maxMessages = 50; // Modifier cette valeur
```

### Personnaliser les couleurs des rôles
```css
.moderator { color: #00ff00; }
.vip { color: #ff69b4; }
.subscriber { color: #9146ff; }
```

### Modifier les animations
```css
@keyframes slideIn {
    from { 
        opacity: 0; 
        transform: translateX(-20px); 
    }
    to { 
        opacity: 1; 
        transform: translateX(0); 
    }
}
```

## 📁 Structure des badges

Le widget utilise les images PNG suivantes (ne pas renommer !) :

```
badges/
├── 1-mois.png, 2-mois.png, ..., 2-ans.png (abonnements)
├── predi-1.png, predi-2.png (prédictions)
├── cheer-1.png à cheer-5000000.png (bits)
├── sub-gift-1.png à sub-gift-5000.png (gifts)
├── gifter-1.png, gifter-2.png, gifter-3.png (gift leaders)
├── clipe-1.png, clipe-2.png, clipe-3.png (clips)
├── prime.png, turbo.png, verified.png
├── game-award-2023.png, zevent-2024.png (événements)
└── ... (80+ autres badges)
```

## 🔧 Dépannage

### Les badges ne s'affichent pas
- Vérifiez que tous les fichiers `.png` sont présents
- Assurez-vous de ne pas avoir renommé les images
- Vérifiez que le fichier HTML est dans le même dossier que les images

### Les emotes ne fonctionnent pas
- Vérifiez votre connexion internet (7TV API)
- Regardez la console du navigateur pour les erreurs (F12)

### Le chat ne se connecte pas
- Le widget se connecte automatiquement au canal `fugu_fps`
- La reconnexion automatique se fait en cas de déconnexion

## 📝 Notes techniques

- **Connexion** : WebSocket direct au chat IRC Twitch
- **APIs utilisées** : 7TV API v3, Twitch CDN pour les emotes
- **Compatible** : Streamlabs OBS, OBS Studio (via source navigateur)
- **Performances** : Optimisé pour 50 messages max affichés

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez que tous les fichiers sont présents
2. Consultez la console du navigateur (F12)
3. Assurez-vous d'utiliser la dernière version du widget

---

**Créé pour le canal Twitch de fugu_fps** 🎮
