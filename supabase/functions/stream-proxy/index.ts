import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, range',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const streamUrl = url.searchParams.get('url');

    if (!streamUrl) {
      return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate URL format
    let targetUrl: URL;
    try {
      targetUrl = new URL(streamUrl);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid URL format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Forward range headers for video streaming
    const headers: HeadersInit = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    };
    
    const rangeHeader = req.headers.get('range');
    if (rangeHeader) {
      headers['Range'] = rangeHeader;
    }

    // Fetch the stream
    const response = await fetch(streamUrl, { headers });

    // Determine content type
    let contentType = response.headers.get('content-type') || 'application/octet-stream';
    if (streamUrl.endsWith('.m3u8')) {
      contentType = 'application/vnd.apple.mpegurl';
    } else if (streamUrl.endsWith('.ts')) {
      contentType = 'video/mp2t';
    }

    // For m3u8 playlists, we need to rewrite internal URLs
    if (streamUrl.endsWith('.m3u8')) {
      const text = await response.text();
      const baseUrl = streamUrl.substring(0, streamUrl.lastIndexOf('/') + 1);
      
      // Rewrite relative URLs to go through proxy
      const rewrittenPlaylist = text.split('\n').map(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          // This is a URL line
          if (trimmed.startsWith('http')) {
            // Absolute URL - proxy it
            return `/functions/v1/stream-proxy?url=${encodeURIComponent(trimmed)}`;
          } else {
            // Relative URL - make absolute and proxy
            const absoluteUrl = baseUrl + trimmed;
            return `/functions/v1/stream-proxy?url=${encodeURIComponent(absoluteUrl)}`;
          }
        }
        return line;
      }).join('\n');

      return new Response(rewrittenPlaylist, {
        status: response.status,
        headers: {
          ...corsHeaders,
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
        },
      });
    }

    // For .ts segments, stream directly
    const responseHeaders: HeadersInit = {
      ...corsHeaders,
      'Content-Type': contentType,
    };

    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      responseHeaders['Content-Length'] = contentLength;
    }

    const contentRange = response.headers.get('content-range');
    if (contentRange) {
      responseHeaders['Content-Range'] = contentRange;
    }

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Stream proxy error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch stream', details: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
