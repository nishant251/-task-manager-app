# Vercel Deployment Guide

## 🚀 Vercel Frontend Deployment Steps

### 1. Update Your Vercel Domain
Replace `https://your-vercel-domain.vercel.app` in the backend CORS with your actual Vercel domain.

### 2. Backend CORS Update
Update the backend server.js CORS origins:
```javascript
origin: [
  'https://your-actual-vercel-domain.vercel.app',  // Replace this
  'http://localhost:3000', 
  'http://localhost:5173'
]
```

### 3. Deploy Backend Changes
```bash
cd task-manager-backend
git add .
git commit -m "Updated CORS for Vercel"
git push origin main
```

### 4. Deploy Frontend to Vercel
```bash
cd task-manager-frontend
vercel --prod
```

### 5. Test the Deployment
1. Visit your Vercel frontend URL
2. Try to add a task
3. Check browser console (F12) for errors

## 🔍 Common Issues & Solutions

### Issue: CORS Error
**Problem:** "Access to fetch at '...' has been blocked by CORS policy"

**Solution:**
1. Update backend CORS with your exact Vercel domain
2. Redeploy backend to Render
3. Wait 2-3 minutes for changes to propagate

### Issue: API Not Found
**Problem:** 404 errors when calling API

**Solution:**
1. Check if backend URL is correct
2. Verify backend is running on Render
3. Test API directly: `https://task-manager-app-w0ax.onrender.com/api/tasks`

### Issue: Tasks Not Adding
**Problem:** No error but tasks don't appear

**Solution:**
1. Check browser Network tab (F12)
2. Look for failed API requests
3. Verify user headers are being sent

## 🧪 Testing Checklist

### Before Deployment
- [ ] Backend works locally
- [ ] Frontend works locally  
- [ ] API calls work with localhost

### After Deployment
- [ ] Frontend loads on Vercel
- [ ] Can fetch existing tasks
- [ ] Can add new tasks
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] User tracking works

## 🌐 Environment Variables

### Frontend (Vercel)
- `NODE_ENV=production` (automatically set)

### Backend (Render)
- `MYSQL_PUBLIC_URL` (Railway SQL connection)
- `NODE_ENV=production`

## 📞 Debug Steps

1. **Check Browser Console:**
   ```javascript
   // Open browser console (F12)
   // Look for CORS or network errors
   ```

2. **Check Network Tab:**
   ```javascript
   // Check API requests in Network tab
   // Verify status codes and responses
   ```

3. **Test Backend Directly:**
   ```bash
   curl https://task-manager-app-w0ax.onrender.com/api/tasks
   ```

4. **Check Render Logs:**
   - Go to Render dashboard
   - Check backend service logs
   - Look for database connection errors

## 🎯 Quick Fix

If tasks still don't work after deployment:

1. **Update CORS with exact Vercel domain**
2. **Redeploy backend to Render**
3. **Clear browser cache**
4. **Test again**

The most common issue is CORS configuration not matching the exact Vercel domain.
