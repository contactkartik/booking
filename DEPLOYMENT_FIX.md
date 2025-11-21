# Events Page Deployment Fix

## Issues Fixed

### 1. Next.js Configuration
✅ Added `output: 'standalone'` to `events/next.config.js` for proper Render deployment.

### 2. Render.yaml Configuration
✅ Updated service configuration with proper structure.
✅ Added `rootDirectory` property for each service (required for monorepo deployments).
✅ Removed `cd` commands from build/start commands.

## Required Manual Steps

### Step 1: Update Service URLs in render.yaml

After deploying each service on Render, you'll get unique URLs. Update these in `render.yaml`:

1. **Deploy events-backend first** and get its URL (e.g., `https://events-backend-abc123.onrender.com`)
2. **Deploy events service** and get its URL (e.g., `https://events-xyz789.onrender.com`)
3. **Update render.yaml** with actual URLs:

```yaml
# Line 8: Update VITE_EVENTS_URL for frontend
- key: VITE_EVENTS_URL
  value: https://events-xyz789.onrender.com  # Your actual events service URL

# Line 31: Update NEXT_PUBLIC_API_BASE for events service
- key: NEXT_PUBLIC_API_BASE
  value: https://events-backend-abc123.onrender.com  # Your actual events-backend URL

# Line 44: Update CORS_ORIGINS for events-backend
- key: CORS_ORIGINS
  value: https://events-xyz789.onrender.com, http://localhost:3000, http://localhost:5173
```

### Step 2: Redeploy Services in Order

1. **events-backend** - Deploy first
2. **events** - Deploy after updating NEXT_PUBLIC_API_BASE
3. **frontend** - Deploy after updating VITE_EVENTS_URL

### Step 3: Verify Environment Variables in Render Dashboard

For each service, verify in Render dashboard:

**events-backend:**
- `MONGO_URI` - MongoDB connection string
- `CORS_ORIGINS` - Include your events frontend URL

**events:**
- `NEXT_PUBLIC_API_BASE` - Points to events-backend URL
- `PORT` - Automatically set by Render

**frontend:**
- `VITE_EVENTS_URL` - Points to events service URL

## Common Issues & Solutions

### Issue: Events page shows 404 or blank
**Solution:** Check that `VITE_EVENTS_URL` in frontend points to the correct events service URL.

### Issue: Events page can't fetch data
**Solution:** 
1. Verify `NEXT_PUBLIC_API_BASE` in events service points to events-backend
2. Check CORS settings in events-backend include the events frontend URL

### Issue: Build fails on Render
**Solution:** 
1. Ensure all dependencies are in package.json (not just devDependencies)
2. Check build logs for specific errors
3. Verify Node version compatibility

### Issue: Port Binding
**Solution:** Use `$PORT` environment variable in start command.

## Deployment Fix for Render - Port Binding Issue

## Issue
The Next.js events service deployment is failing with:
```
==> Port scan timeout reached, no open ports detected. 
Bind your service to at least one port.
```

## Root Cause Analysis

The error occurs because Render expects web services to:
1. **Complete the build** (✓ Working - Next.js builds successfully)
2. **Start a server** that binds to the `PORT` environment variable
3. **Respond to health checks** on that port

The issue was in the `package.json` start script using `${PORT:-3020}` syntax, which doesn't work correctly in npm scripts on Render's environment.

## Solution Applied

### Fixed: events/package.json
Changed the start command to properly use Render's PORT variable:
```json
"scripts": {
  "start": "next start -p $PORT"
}
```
**Why this works:**
- Render automatically sets the `PORT` environment variable
- Next.js `next start` command needs to bind to this port
- The `-p $PORT` flag tells Next.js to use Render's assigned port
- No fallback needed - Render always provides PORT

## Current Configuration

### render.yaml (events service)
```yaml
- type: web
  name: events
  env: node
  region: oregon
  plan: free
  rootDirectory: events
  buildCommand: npm ci && npm run build
  startCommand: npm start
  envVars:
    - key: NEXT_PUBLIC_API_BASE
      value: https://booking-8.onrender.com
    - key: NODE_ENV
      value: production
```

### next.config.js
```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',  // Correct for Render deployment
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};
```

## Deployment Steps

1. **Commit the fix:**
   ```bash
   git add events/package.json
   git commit -m "fix: Update Next.js start command for Render port binding"
   git push origin master
   ```

2. **Render will auto-deploy:**
   - Build phase: `npm ci && npm run build` 
   - Start phase: `npm start` (runs `next start -p $PORT`)
   - Server binds to Render's PORT
   - Health check passes 

## Expected Deployment Flow

```
==> Building...
Compiled successfully
Generating static pages
Build successful

==> Deploying...
==> Running 'npm start'
> next start -p 10000
Ready on http://0.0.0.0:10000
==> Port 10000 detected
==> Service is live
```

## Verification Checklist

After deployment succeeds:
- [ ] Build logs show "Build successful "
- [ ] Deploy logs show "Ready on http://0.0.0.0:[PORT]"
- [ ] Service status shows "Live" (green)
- [ ] Health check endpoint responds
- [ ] Application is accessible at the Render URL

## Additional Notes

### Other Services Status
- **frontend** (static site): Vite app - deploys to `/dist`
- **backend**: Node.js API server
- **events-backend**: Express server with MongoDB

### Common Render Deployment Issues
1. **Port binding**: Always use `$PORT` environment variable
2. **Build vs Start**: Build creates artifacts, Start runs the server
3. **Health checks**: Render pings your app to verify it's running
4. **Timeouts**: Free tier has 15-minute build timeout

## Troubleshooting

If deployment still fails:

1. **Check build logs** for compilation errors
2. **Verify PORT usage** in start command
3. **Test locally** with: `PORT=3000 npm start`
4. **Check Render dashboard** for service-specific errors
5. **Review environment variables** in Render dashboard

## Vercel Deployment (Frontend Only)

The `vercel.json` is configured for the main frontend. The events service should remain on Render as it's a Next.js SSR app.

Current vercel.json configuration:
- Proxies `/api/*` requests to backend on Render
- Handles SPA routing for the main frontend

## Testing Deployment

1. **Test events-backend:** `curl https://your-events-backend.onrender.com/health`
2. **Test events frontend:** Visit `https://your-events.onrender.com`
3. **Test main frontend:** Visit your Vercel URL and click "Events" link

## Notes

- Render free tier services may spin down after inactivity (cold starts)
- First request after cold start may take 30-60 seconds
- Consider upgrading to paid tier for production use
