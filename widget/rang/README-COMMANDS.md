# 🎮 Système de Commandes - Widget Valorant Rank

Ce widget permet aux modérateurs et VIPs de contrôler la visibilité de l'overlay via des commandes Twitch.

## 🚀 Commandes Disponibles

### `!showrank`
- **Effet**: Affiche l'overlay du widget
- **Permissions**: Modérateurs et VIPs uniquement
- **Utilisation**: `!showrank`

### `!hiderank`
- **Effet**: Masque l'overlay du widget
- **Permissions**: Modérateurs et VIPs uniquement
- **Utilisation**: `!hiderank`

## 👑 Système de Permissions

### Modérateurs (26)
Les utilisateurs suivants ont accès aux commandes :
- `fugu_fps` (propriétaire de la chaîne)
- `wizebot`
- `wzbot`
- `emmamachou`
- `gamlno`
- `d3vilsfr`
- `pogo__fps`
- `babouille__`
- `spoutnik_le_puant`
- `z4apox`
- `kudji__`
- `kc_biolxzy`
- `silaaaxe`
- `streamelements`
- `nutelloush`
- `mustee___`
- `ze1sh`
- `vincent_maes12`
- `dragonk_fps`
- `chloedsx`
- `maeniiaaa`
- `g4li_fps`
- `xiress_gp`
- `prodigymarketing`
- `chaima_2808`
- `lea_ackermann`
- `darkoootv`

### VIPs (40)
Les utilisateurs suivants ont accès aux commandes :
- `souushyt`
- `kiinderyt`
- `hoani_b_`
- `estebang`
- `mathis_le_puant`
- `souenito`
- `ticoure`
- `abysskitsune`
- `emess__`
- `cmtrx`
- `t2kimchi`
- `tinmarrrrrrrrr`
- `speednsa`
- `2expensiv`
- `neyazr1`
- `zayto000`
- `wartek`
- `daiki_0`
- `curaaa_fps`
- `sadyfps_`
- `flashynm`
- `cesar_fch`
- `asso____`
- `astral_31`
- `karambit130`
- `ekino__`
- `maulckx`
- `narcooo__`
- `blastr_fps_`
- `nokun_fps`
- `oza_fps`
- `user_al_mawt`
- `neloooo`
- `keyz_fps`
- `zoutriv`
- `hawnie`
- `apo_akko`
- `sc0rpio74890`
- `shinjitoofast`
- `freezbi33`

### Blacklist
Les utilisateurs suivants sont ignorés même s'ils ont des permissions :
- `banned_user1`
- `banned_user2`

## 🔧 Configuration

### Modifier les listes d'utilisateurs

#### Via la console du navigateur :
```javascript
// Mettre à jour les modérateurs
window.valorantWidget.updateUserLists(
    ['fugu_fps', 'new_mod1', 'new_mod2'], // modérateurs
    null, // garder les VIPs actuels
    null  // garder la blacklist actuelle
);

// Mettre à jour les VIPs
window.valorantWidget.updateUserLists(
    null, // garder les modérateurs actuels
    ['vip1', 'vip2', 'new_vip3'], // VIPs
    null  // garder la blacklist actuelle
);

// Mettre à jour la blacklist
window.valorantWidget.updateUserLists(
    null, // garder les modérateurs actuels
    null, // garder les VIPs actuels
    ['banned_user1', 'banned_user2', 'new_banned'] // blacklist
);
```

#### Ajouter/Retirer des utilisateurs individuellement :
```javascript
// Modérateurs
window.valorantWidget.addModerator('new_mod');
window.valorantWidget.removeModerator('old_mod');

// VIPs
window.valorantWidget.addVIP('new_vip');
window.valorantWidget.removeVIP('old_vip');

// Blacklist
window.valorantWidget.addToBlacklist('trouble_user');
window.valorantWidget.removeFromBlacklist('reformed_user');
```

## 📝 Format des Messages Twitch

Le widget écoute les messages du chat Twitch et extrait automatiquement :
- Le nom d'utilisateur
- Les tags Twitch (modérateur, VIP, etc.)
- Le contenu du message

## 🎯 Détection des Permissions

Le système vérifie les permissions dans cet ordre :
1. **Blacklist** : Si l'utilisateur est blacklisté → ❌ Accès refusé
2. **Liste des modérateurs** : Si l'utilisateur est dans la liste → ✅ Accès accordé
3. **Liste des VIPs** : Si l'utilisateur est dans la liste → ✅ Accès accordé
4. **Tags Twitch** : Si l'utilisateur a les tags modérateur ou VIP → ✅ Accès accordé
5. **Par défaut** : ❌ Accès refusé

## 🔍 Débogage

### Vérifier l'état actuel :
```javascript
console.log('Modérateurs:', window.valorantWidget.moderators);
console.log('VIPs:', window.valorantWidget.vips);
console.log('Blacklist:', window.valorantWidget.blacklist);
console.log('Overlay visible:', window.valorantWidget.isOverlayVisible);
```

### Tester les commandes localement :
```javascript
// Simuler une commande
window.valorantWidget.parseChatCommand('test_user', '!showrank', 'moderator=1');
window.valorantWidget.parseChatCommand('test_user', '!hiderank', 'vip=1');
```

## 🚨 Sécurité

- Seuls les modérateurs et VIPs peuvent utiliser les commandes
- La blacklist a priorité sur toutes les autres permissions
- Toutes les tentatives d'utilisation non autorisée sont loggées
- Le système est insensible à la casse pour les noms d'utilisateurs

## 📱 Interface Utilisateur

- **Feedback visuel** : Messages de confirmation lors de l'utilisation des commandes
- **Animations** : Transitions fluides pour l'affichage/masquage
- **Logs** : Console détaillée pour le débogage
- **Responsive** : Fonctionne sur tous les appareils
