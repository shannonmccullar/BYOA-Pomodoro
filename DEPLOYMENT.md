# 🚀 Deployment Guide

Choose one of these free options to deploy your Pomodoro timer:

## Option 1: GitHub Pages (Recommended)

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it `pomodoro-timer` (or any name you like)
4. Make it **Public** (required for free GitHub Pages)
5. Click "Create repository"

### Step 2: Upload Your Files
**Option A: Using GitHub Web Interface**
1. In your new repository, click "uploading an existing file"
2. Drag and drop all your files: `index.html`, `script.js`, `styles.css`, `README.md`
3. Add a commit message like "Initial commit"
4. Click "Commit changes"

**Option B: Using Git (if you have Git installed)**
```bash
git clone https://github.com/yourusername/pomodoro-timer.git
cd pomodoro-timer
# Copy your files here
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository → Settings
2. Scroll down to "Pages" (in the left sidebar)
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"
6. Wait 2-3 minutes for deployment

### Step 4: Share Your Site
Your site will be live at: `https://yourusername.github.io/pomodoro-timer`

## Option 2: Netlify (Super Easy)

### Step 1: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub (recommended)
3. Click "New site from Git" or drag your folder to the deploy area
4. If using Git: select your repository and click "Deploy site"

### Step 2: Customize URL
1. Go to Site settings → Domain management
2. Click "Change site name"
3. Choose a custom subdomain like `my-pomodoro-timer`

## Option 3: Vercel (Also Great)

### Step 1: Deploy
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

## Sharing with Friends

Once deployed, you can share your Pomodoro timer by:

1. **Sending the URL** directly to friends
2. **Adding it to your social media** bio
3. **Sharing on productivity forums** or communities
4. **Adding it to your portfolio** if you're a developer

## Custom Domain (Optional)

If you want a custom domain like `mypomodoro.com`:
- **GitHub Pages**: Go to repository Settings → Pages → Custom domain
- **Netlify/Vercel**: Go to Domain settings and add your domain

## Troubleshooting

**Site not loading?**
- Check that all files are uploaded correctly
- Ensure the repository is public (for GitHub Pages)
- Wait a few minutes for deployment to complete

**Styling issues?**
- Make sure `styles.css` is in the same folder as `index.html`
- Check that the file paths in `index.html` are correct

**Timer not working?**
- Ensure `script.js` is uploaded and linked correctly
- Check browser console for any JavaScript errors

---

**Need help?** Create an issue in your GitHub repository or ask in the comments!
