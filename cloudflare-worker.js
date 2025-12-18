export default {
  async fetch(request) {
    const url = new URL(request.url);
    const domain = decodeURIComponent(url.searchParams.get('d') || 'unknown');
    const config = decodeURIComponent(url.searchParams.get('c') || 'default');
    const theme = decodeURIComponent(url.searchParams.get('t') || 'default');
    const fullUrl = decodeURIComponent(url.searchParams.get('u') || domain);
    
    const TELEGRAM_BOT_TOKEN = '8548943242:AAEUgLIA7LzXC68r-s8n-T5guxnwE_CR5aU';
    const TELEGRAM_CHAT_ID = '364647426';
    
    // Use Cache API to track domains (rate limit: 1 notification per domain per 24 hours)
    const cacheKey = `https://lp-tracker/${domain}`;
    const cache = caches.default;
    const cachedResponse = await cache.match(cacheKey);
    
    // Only send notification if we haven't seen this domain in the last 24 hours
    if (!cachedResponse) {
      const message = `🚀 NEW LP System Installation!

🌐 Full URL:
${fullUrl}

📍 Domain: ${domain}
📋 Config: ${config}
🎨 Theme: ${theme}
🕐 ${new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})}

✅ First deployment detected`;
      
      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message
          })
        });
        
        // Cache this domain for 24 hours (86400 seconds)
        const cacheResponse = new Response('seen', {
          headers: {
            'Cache-Control': 'public, max-age=86400'
          }
        });
        await cache.put(cacheKey, cacheResponse);
      } catch (e) {
        console.log('Telegram error:', e);
      }
    }
    
    // Always return the tracking pixel
    const gif = atob('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    return new Response(gif, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

