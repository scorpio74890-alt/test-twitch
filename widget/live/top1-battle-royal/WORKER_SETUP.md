# Configuration du Cloudflare Worker

## Déploiement du Worker

1. Allez sur le Cloudflare Dashboard
2. Créez un nouveau Worker
3. Copiez le contenu de `worker-top1.js` dans l'éditeur
4. Déployez le worker

## Configuration du KV Namespace

1. Dans le dashboard Cloudflare, allez dans **Workers & Pages** > **KV**
2. Créez un nouveau namespace nommé `top1-battle-royal` (ou un autre nom de votre choix)
3. Retournez dans votre Worker
4. Allez dans **Settings** > **Variables**
5. Ajoutez une **Variable d'environnement** :
   - **Variable name**: `top1_battle_royal` (ou `TOP1_BATTLE_ROYAL` ou `top1-battle-royal`)
   - **Type**: KV Namespace Binding
   - **KV Namespace**: Sélectionnez le namespace créé précédemment

## URL du Worker

L'URL du worker doit être : `https://overlay-concept.jaysonpasquier-contact.workers.dev`

Si vous utilisez une autre URL, modifiez la variable `workerUrl` dans :
- `overlay-v4.html`
- `control-panel.html`

## Endpoints disponibles

- `GET /state` - Récupère l'état actuel
- `POST /state` - Met à jour l'état (body: JSON)

## Test

Vous pouvez tester le worker avec :

```bash
# Récupérer l'état
curl https://overlay-concept.jaysonpasquier-contact.workers.dev/state

# Mettre à jour l'état
curl -X POST https://overlay-concept.jaysonpasquier-contact.workers.dev/state \
  -H "Content-Type: application/json" \
  -d '{"partiesCount": 1, "topCount": 1, "currentGame": null, "gameStates": {}, "gameTimers": {}, "totalStartTime": null}'
```

