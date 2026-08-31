const fs = require("fs");
const path = require("path");

const users = [
  "prasath-vijaykumar",
  // Add more GitHub usernames here:
  // "sanjaim25",
  // "muhil-06",
  // "Abinandhana16",
];

const apiUrl = "https://api.github.com/users/";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function makeBadge(username, repoCount) {
  const label = "GitHub Repos";
  const value = String(repoCount);
  const valueWidth = Math.max(45, value.length * 8 + 22);
  const labelWidth = 90;
  const totalWidth = labelWidth + valueWidth;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${escapeXml(label)}: ${escapeXml(value)}">
  <title>${escapeXml(label)}: ${escapeXml(value)}</title>
  <rect width="${labelWidth}" height="20" fill="#555"/>
  <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="#007ec6"/>
  <text x="${labelWidth / 2}" y="14" fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">${escapeXml(label)}</text>
  <text x="${labelWidth + valueWidth / 2}" y="14" fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">${escapeXml(value)}</text>
</svg>
`;
}

async function updateBadge(username) {
  const response = await fetch(apiUrl + encodeURIComponent(username), {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {})
    }
  });

  if (!response.ok) {
    throw new Error(`${username}: GitHub API returned ${response.status}`);
  }

  const user = await response.json();

  if (typeof user.public_repos !== "number") {
    throw new Error(`${username}: public repository count was not returned`);
  }

  const output = path.join(__dirname, "badges", `${username}.svg`);
  fs.writeFileSync(output, makeBadge(username, user.public_repos));

  console.log(`${username}: ${user.public_repos} public repos -> ${output}`);
}

async function main() {
  fs.mkdirSync(path.join(__dirname, "badges"), { recursive: true });

  for (const username of users) {
    try {
      await updateBadge(username);
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}

main();
