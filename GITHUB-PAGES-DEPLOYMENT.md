# GitHub Pages Deployment Guide - Dial a Driver Hermanus

## Prerequisites

1. **GitHub Account**: If you don't have one, create one at https://github.com
2. **Git Installed**: Download from https://git-scm.com/download/win
3. **Repository Ready**: Your GitHub username will be used in the URLs below

## Step-by-Step Deployment

### 1. **Initialize Git Repository (if not already done)**

```bash
cd c:\Users\User-PC\Desktop\folder
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2. **Create a New Repository on GitHub**

- Go to https://github.com/new
- Repository name: `dial-a-driver-hermanus`
- Description: "Professional Chauffeur & Shuttle Services in Hermanus"
- Make it **Public** (required for free GitHub Pages)
- Click "Create repository"

### 3. **Add Remote and Initial Commit**

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/dial-a-driver-hermanus.git
git add .
git commit -m "Initial commit: Dial a Driver website"
git branch -M main
git push -u origin main
```

### 4. **Enable GitHub Pages**

- Go to your repository on GitHub
- Click **Settings** → **Pages**
- Under "Build and deployment":
  - Source: Select **Deploy from a branch**
  - Branch: Select **gh-pages** and **/root**
  - Click **Save**

### 5. **Deploy Your Website**

```bash
npm run build
npm run deploy
```

This will:
- Build your optimized site
- Create a `gh-pages` branch
- Push the built files to GitHub Pages

### 6. **Access Your Website**

Your website will be live at:
```
https://YOUR_USERNAME.github.io/dial-a-driver-hermanus/
```

Example: `https://john-doe.github.io/dial-a-driver-hermanus/`

---

## Using a Custom Domain (Optional)

To use your own domain (e.g., dialadriverhermanus.co.za):

### 1. **Add CNAME File**

Create a file named `CNAME` in the `public` folder with your domain:

```
dialadriverhermanus.co.za
```

### 2. **Configure Domain DNS**

Add these DNS records at your domain registrar:
- Type: `A` Record, Value: `185.199.108.153`
- Type: `A` Record, Value: `185.199.109.153`
- Type: `A` Record, Value: `185.199.110.153`
- Type: `A` Record, Value: `185.199.111.153`

Or create a `CNAME` record pointing to:
```
YOUR_USERNAME.github.io
```

### 3. **Update Settings in GitHub**

- Go to repository Settings → Pages
- Under "Custom domain", enter your domain
- GitHub will verify and enable HTTPS automatically

---

## Troubleshooting

### Website shows 404 error
- Ensure the `gh-pages` branch exists in your repository
- Check that Settings → Pages shows the correct source
- Wait a few minutes for GitHub Pages to rebuild

### Base path issues
The vite.config.js is already configured with:
```javascript
base: '/dial-a-driver-hermanus/',
```

This is correct for GitHub Pages. If using a custom domain, you can change it to:
```javascript
base: '/',
```

### Deployment script fails
- Ensure Git is configured: `git config user.name` and `git config user.email`
- Check that you've pushed to main branch first
- Try manual steps if script fails

---

## Future Updates

After initial deployment, to update your website:

```bash
# Make your changes
git add .
git commit -m "Update: [describe changes]"
git push origin main

# Deploy changes
npm run deploy
```

---

## Useful Commands

```bash
# Development (local testing)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Check git status
git status

# View git log
git log --oneline
```

---

## Support & Resources

- **GitHub Pages Docs**: https://pages.github.com/
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html#github-pages
- **Git Documentation**: https://git-scm.com/doc

---

## What's Deployed

Your website includes:
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Full-width carousel with Hermanus attractions
- ✅ Professional booking system
- ✅ Contact information and map
- ✅ Fleet gallery with all vehicles
- ✅ Activities and attractions guide
- ✅ SEO optimization
- ✅ 24/7 availability message
- ✅ Professional branding

Live at: `https://YOUR_USERNAME.github.io/dial-a-driver-hermanus/`
