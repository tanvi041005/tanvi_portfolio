# Deploying to Vercel

There are two main ways to deploy your portfolio to Vercel:

## Method 1: GitHub Integration (Recommended)

This is the easiest and most common method. It automatically deploys when you push to GitHub.

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd tanvi_portfolio
   git init
   ```

2. **Create a GitHub repository**:
   - Go to [github.com](https://github.com) and create a new repository
   - Name it something like `tanvi-portfolio` or `portfolio`
   - Don't initialize with README (since you already have files)

3. **Add and commit your files**:
   ```bash
   git add .
   git commit -m "Initial commit: Portfolio website"
   ```

4. **Connect to GitHub and push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name)

### Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in (you can use your GitHub account)

2. **Import your project**:
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

3. **Configure the project**:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `tanvi_portfolio` (if your repo is at the root) or leave blank if the Next.js app is at the root
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at a URL like `your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions

---

## Method 2: Vercel CLI

If you prefer using the command line:

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

1. **Navigate to your project**:
   ```bash
   cd tanvi_portfolio
   ```

2. **Run the deploy command**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Login to Vercel (if not already logged in)
   - Link to existing project or create new one
   - Confirm settings (usually defaults are fine)

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

---

## Automatic Deployments

Once connected via GitHub:
- **Every push to `main` branch** → Production deployment
- **Pull requests** → Preview deployments
- **Other branches** → Preview deployments

## Troubleshooting

### If build fails:

1. **Check the build logs** in Vercel dashboard
2. **Common issues**:
   - Make sure `package.json` has correct scripts
   - Ensure all dependencies are listed in `package.json`
   - Check that Node.js version is compatible (Vercel uses Node 18+ by default)

### If you need to change settings:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "General"
3. Update build settings, environment variables, etc.

### Root Directory Issue:

If your Next.js app is in a subdirectory (`tanvi_portfolio`), you need to:
1. Go to Vercel project settings
2. Set "Root Directory" to `tanvi_portfolio`
3. Or move all files to the repository root

---

## Quick Start Commands

```bash
# Initialize git (if needed)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# Then import to Vercel via web interface
```

Your portfolio will be live in minutes! 🚀

