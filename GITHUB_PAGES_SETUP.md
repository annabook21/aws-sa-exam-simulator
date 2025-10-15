# 🚀 Deploy to GitHub Pages

Your exam simulator is **100% compatible** with GitHub Pages! Here's how to deploy it.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Your exam simulator files ready

## 🎯 Quick Deploy (5 minutes)

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Name it: `aws-exam-simulator` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Click **"Create repository"**

### Step 2: Push Your Files

```bash
cd /Users/annabooker/Desktop/SA_exam

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AWS Solutions Architect Exam Simulator"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aws-exam-simulator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select branch: **main**
6. Select folder: **/ (root)**
7. Click **"Save"**

### Step 4: Access Your Exam Simulator

Within 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/aws-exam-simulator/exam_simulator.html
```

Or make it the default page by renaming the file:
```bash
mv exam_simulator.html index.html
git add .
git commit -m "Rename to index.html for default page"
git push
```

Then access at:
```
https://YOUR_USERNAME.github.io/aws-exam-simulator/
```

---

## 🎨 Custom Domain (Optional)

Want to use your own domain like `exam.yourdomain.com`?

1. In repository Settings → Pages
2. Add your custom domain
3. Update your DNS records:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
4. Enable **"Enforce HTTPS"** (automatically provided by GitHub)

---

## 📁 Files to Include

**Required files for GitHub Pages:**
```
✅ exam_simulator.html   (or rename to index.html)
✅ exam_data.js          (the questions)
✅ README.md             (documentation)
```

**Optional files:**
```
✅ QUICK_START.md
✅ SOLUTION_EXPLAINED.md
✅ GITHUB_PAGES_SETUP.md (this file)
❌ sa_exam.json (not needed - data is in exam_data.js)
```

---

## 🔐 Privacy Considerations

### What's Public:
- ✅ Your HTML/CSS/JavaScript code
- ✅ All 640 exam questions and answers
- ✅ Anyone can access and use the simulator

### What's Private:
- ✅ User exam results (stored only in browser, never sent anywhere)
- ✅ No tracking or analytics
- ✅ No data collection

### If You Want to Keep Questions Private:
If you don't want the questions public, consider:
1. **Private repository** - Requires GitHub Pro ($4/month)
2. **Password protection** - Add authentication layer
3. **Self-hosting** - Host on your own server instead

---

## 🛠️ Maintenance & Updates

### Update Questions:
```bash
# Edit sa_exam.json with new questions
# Regenerate exam_data.js
echo "const EXAM_DATA = " > exam_data.js
cat sa_exam.json >> exam_data.js
echo ";" >> exam_data.js

# Commit and push
git add exam_data.js
git commit -m "Update exam questions"
git push
```

Changes appear on GitHub Pages within 1-2 minutes!

### Update Simulator:
```bash
# Edit exam_simulator.html
git add exam_simulator.html
git commit -m "Update simulator features"
git push
```

---

## 🌐 Example Repository Structure

```
aws-exam-simulator/
├── index.html              (renamed from exam_simulator.html)
├── exam_data.js            (required)
├── README.md               (shows on GitHub)
├── .gitignore             (ignore system files)
└── docs/
    ├── QUICK_START.md
    ├── SOLUTION_EXPLAINED.md
    └── GITHUB_PAGES_SETUP.md
```

---

## ✨ Pro Tips

### 1. Use index.html
Rename `exam_simulator.html` to `index.html` so users don't need to type the full filename:
```bash
mv exam_simulator.html index.html
```

### 2. Add a Custom README
Create an attractive README.md for your GitHub repository:
```markdown
# 🎓 AWS Solutions Architect Exam Simulator

Professional practice exam environment for AWS Solutions Architect certification.

## 🚀 Live Demo
[Take the Practice Exam](https://YOUR_USERNAME.github.io/aws-exam-simulator/)

## ✨ Features
- 640+ practice questions
- Timer and progress tracking
- Detailed results with explanations
- Mobile-friendly interface
```

### 3. Enable HTTPS
GitHub Pages automatically provides HTTPS - just check the box in Settings!

### 4. Track Usage (Optional)
Add Google Analytics if you want to see how many people use it:
```html
<!-- Add before </head> in your HTML -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
```

---

## 🔧 Troubleshooting

**Problem**: Site shows 404
- **Solution**: Wait 2-3 minutes after enabling Pages, then hard refresh (Ctrl+Shift+R)

**Problem**: Questions not loading
- **Solution**: Ensure `exam_data.js` is in the same directory and pushed to GitHub

**Problem**: Changes not appearing
- **Solution**: GitHub Pages has a small cache. Wait 1-2 minutes or force refresh

---

## 📊 Performance

GitHub Pages provides:
- ✅ **CDN** - Content delivered from edge locations worldwide
- ✅ **Fast loading** - Static files load instantly
- ✅ **Unlimited bandwidth** - No traffic limits for public repos
- ✅ **99.9% uptime** - Reliable hosting

---

## 🎯 Next Steps

1. **Create GitHub repository** (2 minutes)
2. **Push your files** (1 minute)
3. **Enable GitHub Pages** (1 minute)
4. **Share the link** with study partners! 🎉

**Your live URL will be:**
```
https://YOUR_USERNAME.github.io/aws-exam-simulator/
```

---

## 💡 Alternative: GitHub Pages from Branch

You can also use a `gh-pages` branch:
```bash
git checkout -b gh-pages
git push -u origin gh-pages
```

Then in Settings → Pages, select the `gh-pages` branch.

---

**Ready to go live? Follow Step 1 above! 🚀**

