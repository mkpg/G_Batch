# GitHub Repo Badges

This repository generates a badge showing the number of public GitHub repositories for selected GitHub usernames.

## 1. Add a username

Edit `update-badges.js`:

```js
const users = [
  "prasath-vijaykumar",
  "sanjaim25",
  "muhil-06",
  "Abinandhana16",
];
```

The GitHub Action updates the badges automatically once per day.

You can also run it manually from:

**Actions → Update GitHub Repo Badges → Run workflow**

## 2. Use a badge in another repository

If this repository is:

`YOUR_USERNAME/github-badges`

and the student's GitHub username is:

`prasath-vijaykumar`

use:

```markdown
[![](https://raw.githubusercontent.com/YOUR_USERNAME/github-badges/main/badges/prasath-vijaykumar.svg)](https://github.com/prasath-vijaykumar)
```

The student does NOT need to fork this repository.

## 3. Important

Replace `YOUR_USERNAME` with the username of the account that owns this badge repository.

The badge is generated from GitHub's public user API and only shows the user's public repository count.
