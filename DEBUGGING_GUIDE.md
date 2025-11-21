# Debugging Guide - Events Booking Issue

## What I Fixed

1. **Updated API endpoint** in `render.yaml`:
   - Changed `NEXT_PUBLIC_API_BASE` from `https://booking-8.onrender.com` to `https://events-backend.onrender.com`
   - Added `https://events.onrender.com` to CORS origins

2. **Enhanced MongoDB connection handling**:
   - Increased timeout from 5s to 10s
   - Added connection event listeners for debugging
   - Server will fallback to in-memory store if MongoDB fails

3. **Added comprehensive logging**:
   - Health check endpoint now shows MongoDB status
   - Booking requests are logged with emojis for easy tracking
   - Connection status is logged on startup

## How to Check if MongoDB is the Issue

### Step 1: Check Render Logs

1. Go to your Render dashboard
2. Open the **events-backend** service
3. Click on **Logs** tab
4. Look for these messages:

**If MongoDB is working:**
```
✅ Successfully connected to MongoDB
🚀 Events backend running on port 8080
📊 Database status: MongoDB Connected
```

**If MongoDB is paused/failed:**
```
❌ MongoDB connection error: [error message]
⚠️  Continuing with in-memory store (data will be lost on restart)
🚀 Events backend running on port 8080
📊 Database status: In-Memory Store
```

### Step 2: Test the Health Endpoint

Open this URL in your browser (replace with your actual backend URL):
```
https://events-backend.onrender.com/api/health
```

You should see:
```json
{
  "ok": true,
  "mongodb": "connected",  // or "using-memory-store" if MongoDB failed
  "timestamp": "2024-11-21T13:29:00.000Z"
}
```

### Step 3: Test Booking Submission

When you submit a booking, check the logs for:
```
📝 Booking request received: { name: '...', email: '...', ... }
✅ Booking saved: [booking-id]
```

Or if there's an error:
```
❌ Booking error: [error message]
```

## Common Issues & Solutions

### Issue 1: MongoDB is Paused (M0 Free Tier)
**Symptom:** Logs show "MongoDB connection error"
**Solution:** 
1. Go to MongoDB Atlas dashboard
2. Check if cluster is paused
3. Resume the cluster
4. Redeploy on Render

### Issue 2: Wrong API URL
**Symptom:** "Failed to fetch" in browser console
**Solution:**
1. Verify actual Render URLs in dashboard
2. Update `render.yaml` line 33 with correct events-backend URL
3. Update `render.yaml` line 49 with correct events frontend URL
4. Push changes to git

### Issue 3: CORS Blocking
**Symptom:** CORS error in browser console
**Solution:**
- Make sure your events frontend URL is in the CORS_ORIGINS list (line 49 of render.yaml)

### Issue 4: Server Not Binding to Port
**Symptom:** Service fails to start
**Solution:**
- The server now binds to `0.0.0.0` which should work on Render
- Check if PORT environment variable is set correctly

## Next Steps

1. **Wait for Render to redeploy** (should happen automatically after git push)
2. **Check the logs** in Render dashboard for the startup messages
3. **Test the health endpoint** to verify MongoDB connection
4. **Try submitting a booking** and watch the logs
5. **Report back** what you see in the logs so we can fix any remaining issues

## Important URLs to Verify

Check your Render dashboard and confirm these URLs:
- Events Frontend: `https://events.onrender.com` (or your actual URL)
- Events Backend: `https://events-backend.onrender.com` (or your actual URL)

If they're different, update `render.yaml` accordingly.
