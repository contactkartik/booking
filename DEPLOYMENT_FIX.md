# Events Page Deployment Fix

## Issues Fixed

### 1. Next.js Configuration
✅ Added `output: 'standalone'` to `events/next.config.js` for proper Render deployment.

### 2. Render.yaml Configuration
✅ Updated service configuration with proper structure.

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
