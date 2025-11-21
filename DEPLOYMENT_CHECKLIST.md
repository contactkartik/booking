# Deployment Checklist

## Understanding the Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Your Application Architecture                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend (Vite + React)                                    │
│  ├─ Deployed on: Vercel                                     │
│  ├─ Domain: bookkaroindia.com                               │
│  └─ Needs: VITE_EVENTS_URL env var                          │
│       ↓                                                      │
│  Events Service (Next.js)                                   │
│  ├─ Deployed on: Render                                     │
│  ├─ URL: https://booking-12.onrender.com                    │
│  └─ Needs: NEXT_PUBLIC_API_BASE env var                     │
│       ↓                                                      │
│  Events Backend (Express)                                   │
│  ├─ Deployed on: Render                                     │
│  ├─ URL: https://booking-8.onrender.com                     │
│  └─ Needs: MONGO_URI, CORS_ORIGINS env vars                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Pre-Deployment Checklist

### 1. Environment Variables Setup

#### Vercel (Frontend)
- [ ] Go to Vercel Dashboard → Project → Settings → Environment Variables
- [ ] Add `VITE_EVENTS_URL` = `https://booking-12.onrender.com`
- [ ] Select all environments (Production, Preview, Development)
- [ ] Save and trigger redeploy

#### Render (Events Service)
- [ ] Service: `events` (Next.js)
- [ ] Environment Variables:
  - [ ] `NEXT_PUBLIC_API_BASE` = `https://booking-8.onrender.com`
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = (auto-set by Render)

#### Render (Events Backend)
- [ ] Service: `events-backend` (Express)
- [ ] Environment Variables:
  - [ ] `MONGO_URI` = `mongodb+srv://...`
  - [ ] `CORS_ORIGINS` = `https://booking-12.onrender.com, http://localhost:3000`

### 2. Build Configuration

#### Frontend (Vercel)
- [ ] Build Command: `bun run build` or `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `bun install` or `npm install`

#### Events Service (Render)
- [ ] Root Directory: `events`
- [ ] Build Command: `npm ci && npm run build`
- [ ] Start Command: `npm start`
- [ ] Verify `package.json` has: `"start": "next start -p $PORT"`

#### Events Backend (Render)
- [ ] Root Directory: `events-backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`

### 3. Code Verification

- [ ] `src/lib/config.ts` has correct fallback URL
- [ ] `events/package.json` uses `$PORT` not `${PORT:-3020}`
- [ ] `render.yaml` has correct service URLs
- [ ] No hardcoded localhost URLs in production code

## Deployment Order

**Important:** Deploy in this order to avoid broken dependencies

1. **Events Backend** (Deploy first)
   - [ ] Deploy and verify it's live
   - [ ] Note the URL (e.g., `https://booking-8.onrender.com`)
   - [ ] Test: `curl https://booking-8.onrender.com/health`

2. **Events Service** (Deploy second)
   - [ ] Update `NEXT_PUBLIC_API_BASE` with backend URL
   - [ ] Deploy and verify it's live
   - [ ] Note the URL (e.g., `https://booking-12.onrender.com`)
   - [ ] Test: Visit URL in browser

3. **Frontend** (Deploy last)
   - [ ] Update `VITE_EVENTS_URL` with events service URL
   - [ ] Commit and push changes
   - [ ] Verify Vercel auto-deploys
   - [ ] Test: Click Events button on main site

## Common Issues & Solutions

### Issue: "DEPLOYMENT_NOT_FOUND" Error

**Symptoms:**
- 404 error when clicking Events button
- Error ID like `bom1::rdw2k-1763706144103-1a0ff3fc733c`

**Root Cause:**
- Frontend was built with wrong/missing `VITE_EVENTS_URL`
- Fallback URL points to non-existent deployment

**Solution:**
1. Check `src/lib/config.ts` fallback URL is correct
2. Verify `VITE_EVENTS_URL` is set in Vercel
3. Trigger fresh deployment (not just redeploy)
4. Check browser console for warning: `⚠️ VITE_EVENTS_URL not set`

### Issue: "Port scan timeout" on Render

**Symptoms:**
- Build succeeds but deployment fails
- "No open ports detected" error

**Root Cause:**
- Start command not binding to `$PORT`
- Using `${PORT:-3020}` syntax (doesn't work in npm scripts)

**Solution:**
1. Update `package.json`: `"start": "next start -p $PORT"`
2. Ensure no `cd` commands in start command
3. Verify `rootDirectory` is set correctly

### Issue: CORS Errors

**Symptoms:**
- Events page loads but can't fetch data
- Browser console shows CORS error

**Root Cause:**
- Events backend `CORS_ORIGINS` doesn't include events frontend URL

**Solution:**
1. Update events-backend `CORS_ORIGINS` env var
2. Include: `https://booking-12.onrender.com`
3. Redeploy events-backend

### Issue: Environment Variable Not Updating

**Symptoms:**
- Changed env var but app still uses old value

**Root Cause:**
- Vite bakes env vars at build time
- Redeploying doesn't rebuild

**Solution:**
1. After changing env var, trigger NEW deployment
2. Or: Push a commit to force rebuild
3. Or: Clear build cache and redeploy

## Testing Checklist

### After Each Deployment

- [ ] Service shows "Live" status in dashboard
- [ ] No errors in deployment logs
- [ ] Health check endpoint responds (if applicable)
- [ ] Environment variables are set correctly

### End-to-End Testing

- [ ] Visit main website (bookkaroindia.com)
- [ ] Click "Events" button in navigation
- [ ] Verify redirects to events service
- [ ] Events page loads without errors
- [ ] Can view event listings
- [ ] Can submit booking form (if applicable)
- [ ] Check browser console for errors
- [ ] Test on mobile device

## Debugging Commands

```bash
# Check if events service is accessible
curl https://booking-12.onrender.com

# Check if events backend is accessible
curl https://booking-8.onrender.com/health

# Check environment variables in build (Vercel)
# Look for: "VITE_EVENTS_URL" in build logs

# Local testing
VITE_EVENTS_URL=https://booking-12.onrender.com npm run build
npm run preview
```

## Rollback Plan

If deployment fails:

1. **Vercel (Frontend)**
   - Go to Deployments tab
   - Find last working deployment
   - Click "⋯" → "Promote to Production"

2. **Render (Events/Backend)**
   - Go to service dashboard
   - Click "Manual Deploy" → Select previous commit
   - Or: Revert git commit and push

## Monitoring

### What to Monitor

- [ ] Vercel deployment status
- [ ] Render service health (all 3 services)
- [ ] Error rates in logs
- [ ] Response times
- [ ] CORS errors in browser console

### Where to Check

- **Vercel**: https://vercel.com/dashboard
- **Render**: https://dashboard.render.com
- **Browser Console**: F12 → Console tab
- **Network Tab**: F12 → Network tab (check failed requests)

## Best Practices Going Forward

1. **Always set env vars before deploying**
   - Don't rely on fallbacks for production

2. **Test locally with production URLs**
   ```bash
   VITE_EVENTS_URL=https://booking-12.onrender.com npm run dev
   ```

3. **Document all environment variables**
   - Keep this checklist updated
   - Add comments in code

4. **Use staging environment**
   - Test changes before production
   - Separate env vars for staging

5. **Monitor deployment logs**
   - Check for warnings
   - Verify env vars are loaded

6. **Version your deployments**
   - Tag releases in git
   - Easy to rollback if needed

## Quick Reference

| Service | Platform | URL | Env Vars Needed |
|---------|----------|-----|-----------------|
| Frontend | Vercel | bookkaroindia.com | `VITE_EVENTS_URL` |
| Events | Render | booking-12.onrender.com | `NEXT_PUBLIC_API_BASE`, `NODE_ENV` |
| Events Backend | Render | booking-8.onrender.com | `MONGO_URI`, `CORS_ORIGINS` |

## Emergency Contacts

- **Vercel Support**: https://vercel.com/help
- **Render Support**: https://render.com/support
- **Community**: Vercel Discord, Render Community Forum
