// Cloudflare Worker for Top 1 Battle Royal Overlay
// Store state in KV namespace

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle OPTIONS request
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // Get KV namespace
        const kvNamespace = env.TOP1_BATTLE_ROYAL || env.top1_battle_royal || env['top1-battle-royal'];

        if (!kvNamespace) {
            console.error('❌ KV namespace non configuré');
            return new Response(JSON.stringify({
                error: 'KV namespace non configuré',
                message: 'Le namespace top1_battle_royal n\'est pas disponible. Vérifiez la configuration du worker.'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Route: GET /state - Get current state
        if (path === '/state' && request.method === 'GET') {
            try {
                const url = new URL(request.url);
                const requestedVersion = url.searchParams.get('version');

                const state = await kvNamespace.get('top1-state', 'json');

                if (!state) {
                    // Return default state if none exists
                    const defaultState = {
                        partiesCount: 0,
                        topCount: 0,
                        currentGame: null,
                        gameStates: {},
                        gameTimers: {},
                        totalStartTime: null,
                        version: Date.now()
                    };
                    return new Response(JSON.stringify(defaultState), {
                        status: 200,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }

                // Add version to state if not present
                if (!state.version) {
                    state.version = Date.now();
                }

                // If version matches, return 304 Not Modified (but we'll return the state anyway for simplicity)
                // The client will check the version and skip update if same
                if (requestedVersion && state.version && requestedVersion === String(state.version)) {
                    // State hasn't changed, but we return it anyway with a special flag
                    return new Response(JSON.stringify({ ...state, unchanged: true }), {
                        status: 200,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }

                return new Response(JSON.stringify(state), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                console.error('❌ Erreur lors de la récupération:', error);
                return new Response(JSON.stringify({
                    error: 'Erreur lors de la récupération',
                    message: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Route: POST /state - Update state
        if (path === '/state' && request.method === 'POST') {
            try {
                const state = await request.json();

                // Validate state structure
                if (typeof state !== 'object') {
                    return new Response(JSON.stringify({
                        error: 'Format invalide',
                        message: 'Le state doit être un objet JSON'
                    }), {
                        status: 400,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }

                // Add version timestamp to track changes
                state.version = Date.now();
                state.lastModified = Date.now();

                // Save to KV
                await kvNamespace.put('top1-state', JSON.stringify(state));

                // Store notification timestamp for quick polling
                await kvNamespace.put('top1-notification', JSON.stringify({
                    timestamp: Date.now(),
                    version: state.version
                }));

                return new Response(JSON.stringify({
                    success: true,
                    message: 'État mis à jour avec succès',
                    version: state.version
                }), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                console.error('❌ Erreur lors de la sauvegarde:', error);
                return new Response(JSON.stringify({
                    error: 'Erreur lors de la sauvegarde',
                    message: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Route: GET /events - SSE endpoint for real-time updates
        if (path === '/events' && request.method === 'GET') {
            try {
                const url = new URL(request.url);
                const clientVersion = url.searchParams.get('version') || '0';

                // Create SSE stream
                const { readable, writable } = new TransformStream();
                const writer = writable.getWriter();
                const encoder = new TextEncoder();

                // Send initial connection event
                const sendEvent = async (event, data) => {
                    const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
                    await writer.write(encoder.encode(message));
                };

                // Start SSE stream
                (async () => {
                    try {
                        await sendEvent('connected', { message: 'Connected to SSE stream' });

                        // Check for updates every 2 seconds
                        const checkInterval = 2000;
                        let lastVersion = clientVersion;
                        const startTime = Date.now();
                        const maxDuration = 55000; // Close after 55 seconds to force reconnect

                        while (Date.now() - startTime < maxDuration) {
                            // Check if state changed
                            const notification = await kvNamespace.get('top1-notification', 'json');

                            if (notification && notification.version && String(notification.version) !== lastVersion) {
                                // State changed, send update event
                                await sendEvent('update', {
                                    version: notification.version,
                                    timestamp: notification.timestamp
                                });
                                lastVersion = String(notification.version);
                            } else {
                                // Send heartbeat to keep connection alive
                                await sendEvent('heartbeat', { timestamp: Date.now() });
                            }

                            // Wait before next check
                            await new Promise(resolve => setTimeout(resolve, checkInterval));
                        }

                        // Close connection after max duration
                        await sendEvent('close', { message: 'Connection timeout, please reconnect' });
                        await writer.close();
                    } catch (error) {
                        console.error('SSE error:', error);
                        try {
                            await writer.close();
                        } catch (e) {
                            // Ignore close errors
                        }
                    }
                })();

                return new Response(readable, {
                    headers: {
                        'Content-Type': 'text/event-stream',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            } catch (error) {
                console.error('❌ Erreur SSE:', error);
                return new Response(JSON.stringify({
                    error: 'Erreur SSE',
                    message: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Route: GET /notification - Check if state has changed (lightweight, fallback)
        if (path === '/notification' && request.method === 'GET') {
            try {
                const url = new URL(request.url);
                const requestedVersion = url.searchParams.get('version');

                const notification = await kvNamespace.get('top1-notification', 'json');

                if (!notification) {
                    return new Response(JSON.stringify({
                        hasUpdate: false,
                        version: null
                    }), {
                        status: 200,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }

                // Check if version changed
                const hasUpdate = !requestedVersion || requestedVersion !== String(notification.version);

                return new Response(JSON.stringify({
                    hasUpdate: hasUpdate,
                    version: notification.version,
                    timestamp: notification.timestamp
                }), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                console.error('❌ Erreur lors de la vérification:', error);
                return new Response(JSON.stringify({
                    error: 'Erreur lors de la vérification',
                    message: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Default route - return API info
        return new Response(JSON.stringify({
            message: 'Top 1 Battle Royal Overlay API',
            endpoints: {
                'GET /state': 'Récupérer l\'état actuel',
                'POST /state': 'Mettre à jour l\'état',
                'GET /events': 'Stream SSE pour mises à jour temps réel',
                'GET /notification': 'Vérifier si l\'état a changé (fallback)'
            }
        }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
};

