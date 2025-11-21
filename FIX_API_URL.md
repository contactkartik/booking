# Fix API URL Configuration

## The Problem
The booking form shows "unable to fetch" because the `NEXT_PUBLIC_API_BASE` environment variable in `render.yaml` is pointing to the wrong URL.

## How to Find the Correct URL

1. **Go to your Render Dashboard**: https://dashboard.render.com
2. **Find the `events-backend` service**
3. **Copy the service URL** - it will look like:
   - `https://events-backend-xxxx.onrender.com` (where xxxx is a random hash)

## How to Fix

### Option 1: Update render.yaml (Recommended)

1. Open `render.yaml`
2. Find line 32-33:
   ```yaml
   - key: NEXT_PUBLIC_API_BASE
     value: https://events-backend.onrender.com
   ```
3. Replace with your actual events-backend URL from Render dashboard:
   ```yaml
   - key: NEXT_PUBLIC_API_BASE
     value: https://events-backend-xxxx.onrender.com
   ```
4. Also update line 49 with your actual events frontend URL:
   ```yaml
   - key: CORS_ORIGINS
     value: https://booking-12.onrender.com, https://events-xxxx.onrender.com, http://localhost:3000, http://localhost:5173
   ```
5. Commit and push:
   ```bash
   git add render.yaml
   git commit -m "Fix API URL configuration"
   git push
   ```

### Option 2: Set Environment Variable in Render Dashboard

1. Go to your Render Dashboard
2. Open the `events` service (frontend)
3. Go to **Environment** tab
4. Add/Update environment variable:
   - Key: `NEXT_PUBLIC_API_BASE`
   - Value: Your actual events-backend URL (e.g., `https://events-backend-xxxx.onrender.com`)
5. Click **Save Changes**
6. Render will automatically redeploy

## Verify It's Working

After deployment completes:

1. **Test the health endpoint**: Visit `https://[your-events-backend-url]/api/health`
   - You should see: `{"ok":true,"mongodb":"connected","timestamp":"..."}`

2. **Check browser console**: 
   - Open your events site
   - Open browser DevTools (F12)
   - Go to Console tab
   - Try submitting a booking
   - Look for the actual URL being called

3. **Check Render logs**:
   - Go to events-backend service logs
   - Look for: `📝 Booking request received: {...}`
   - If you don't see this, the request isn't reaching the backend

## Common Issues

### Issue: Service name doesn't match
- Render generates URLs based on service name + random hash
- Make sure you're using the EXACT URL from your Render dashboard

### Issue: CORS error
- Make sure your events frontend URL is in the `CORS_ORIGINS` list
- Check events-backend logs for CORS errors

### Issue: MongoDB paused
- Check events-backend logs for: `❌ MongoDB connection error`
- Go to MongoDB Atlas and resume your cluster
- The backend will work with in-memory storage as fallback, but data won't persist
