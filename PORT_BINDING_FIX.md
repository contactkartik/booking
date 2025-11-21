# Port Binding Fix - Render Deployment

## Problem
```
==> Port scan timeout reached, no open ports detected. 
Bind your service to at least one port.
```

## Root Cause
The `events/package.json` start script was using `${PORT:-3020}` syntax, which doesn't work correctly in npm scripts on Render's Linux environment.

## Solution Applied ✅

### Changed: events/package.json
```json
// Before (❌ Broken)
"start": "next start -p ${PORT:-3020}"

// After (✅ Fixed)
"start": "next start -p $PORT"
```

## Why This Works
- Render automatically provides the `PORT` environment variable
- Next.js needs to bind to this specific port for health checks
- The `$PORT` syntax works correctly in npm scripts
- No fallback needed - Render always sets PORT

## Next Steps

1. **Commit and push the fix:**
```bash
git add events/package.json
git commit -m "fix: correct PORT variable syntax for Render deployment"
git push origin master
```

2. **Render will auto-redeploy** and the service should start successfully

## Expected Success Output
```
==> Running 'npm start'
> next start -p 10000
✓ Ready on http://0.0.0.0:10000
==> Port 10000 detected
==> Service is live ✓
```

## Verification
After deployment:
- ✅ Build completes successfully
- ✅ Server starts and binds to PORT
- ✅ Health checks pass
- ✅ Service shows "Live" status in Render dashboard
