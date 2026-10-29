#!/bin/bash

# AWS Exam Simulator - GitHub Pages Deployment Script
# This script helps you quickly deploy to GitHub Pages

echo "🚀 AWS Exam Simulator - GitHub Pages Deployment"
echo "================================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

# Check if already a git repository
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Prompt for GitHub username
echo ""
read -p "Enter your GitHub username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

# Prompt for repository name
echo ""
read -p "Enter repository name (default: aws-exam-simulator): " repo_name
repo_name=${repo_name:-aws-exam-simulator}

echo ""
echo "📋 Configuration:"
echo "   GitHub Username: $github_username"
echo "   Repository Name: $repo_name"
echo "   Repository URL: https://github.com/$github_username/$repo_name"
echo "   Live Site URL: https://$github_username.github.io/$repo_name/"
echo ""
read -p "Continue with deployment? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "❌ Deployment cancelled"
    exit 0
fi

# Add all files
echo ""
echo "📁 Adding files..."
git add .

# Commit
echo "💾 Committing files..."
git commit -m "Initial commit: AWS Solutions Architect Exam Simulator" || echo "No changes to commit"

# Check if remote already exists
if git remote get-url origin &> /dev/null; then
    echo "⚠️  Remote 'origin' already exists. Removing old remote..."
    git remote remove origin
fi

# Add remote
echo "🔗 Adding GitHub remote..."
git remote add origin "https://github.com/$github_username/$repo_name.git"

# Set main branch
echo "🌿 Setting up main branch..."
git branch -M main

echo ""
echo "⚠️  IMPORTANT: Before pushing, make sure you've created the repository on GitHub!"
echo "   1. Go to: https://github.com/new"
echo "   2. Repository name: $repo_name"
echo "   3. Make it PUBLIC (required for free GitHub Pages)"
echo "   4. Do NOT initialize with README, .gitignore, or license"
echo "   5. Click 'Create repository'"
echo ""
read -p "Have you created the repository on GitHub? (y/n): " created

if [ "$created" != "y" ]; then
    echo ""
    echo "⏸️  Pausing deployment. Complete these steps:"
    echo "   1. Create repository at: https://github.com/new"
    echo "   2. Run this script again"
    echo ""
    echo "Your git configuration has been saved. Next time just run:"
    echo "   git push -u origin main"
    exit 0
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Next Steps:"
    echo "================================================"
    echo "1. Go to: https://github.com/$github_username/$repo_name/settings/pages"
    echo "2. Under 'Source', select 'Deploy from a branch'"
    echo "3. Select branch 'main' and folder '/ (root)'"
    echo "4. Click 'Save'"
    echo ""
    echo "⏱️  Wait 1-2 minutes, then visit:"
    echo "   https://$github_username.github.io/$repo_name/"
    echo ""
    echo "📝 Don't forget to update the README with your live URL!"
    echo "================================================"
else
    echo ""
    echo "❌ Push failed. Common reasons:"
    echo "   1. Repository doesn't exist yet - create it at https://github.com/new"
    echo "   2. Authentication failed - you may need to:"
    echo "      - Set up SSH keys: https://docs.github.com/en/authentication"
    echo "      - Or use GitHub CLI: https://cli.github.com/"
    echo "   3. Repository name mismatch"
    echo ""
    echo "Try pushing manually with:"
    echo "   git push -u origin main"
fi

