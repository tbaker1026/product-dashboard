#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

console.log('🔍 Fetching PRs from vets-design-system-documentation');
console.log('📅 Date range: April 1, 2025 - March 31, 2026\n');

const START_DATE = new Date('2025-04-01');
const END_DATE = new Date('2026-03-31T23:59:59');

async function fetchPRs(page = 1) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/department-of-veterans-affairs/vets-design-system-documentation/pulls?state=all&per_page=100&page=${page}`,
      headers: {
        'User-Agent': 'Node.js PR Analyzer',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function getAllPRsInDateRange() {
  const allPRs = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    console.log(`   Fetching page ${page}...`);
    const prs = await fetchPRs(page);

    if (prs.length === 0) {
      hasMore = false;
      break;
    }

    for (const pr of prs) {
      const createdAt = new Date(pr.created_at);

      // Stop if we've gone past our date range
      if (createdAt < START_DATE) {
        hasMore = false;
        break;
      }

      // Add if within range
      if (createdAt >= START_DATE && createdAt <= END_DATE) {
        allPRs.push({
          number: pr.number,
          title: pr.title,
          created_at: pr.created_at,
          merged_at: pr.merged_at,
          closed_at: pr.closed_at,
          state: pr.state,
          author: pr.user.login,
          labels: pr.labels.map(l => l.name),
          url: pr.html_url,
          body: pr.body ? pr.body.substring(0, 500) : ''
        });
      }
    }

    page++;

    // Rate limiting - be nice to GitHub API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return allPRs;
}

(async () => {
  try {
    const prs = await getAllPRsInDateRange();

    console.log(`\n✅ Found ${prs.length} PRs in date range\n`);

    // Save to file
    fs.writeFileSync('prs-2025-2026.json', JSON.stringify(prs, null, 2));
    console.log('📁 Saved to: prs-2025-2026.json\n');

    // Quick summary
    const merged = prs.filter(pr => pr.merged_at).length;
    const open = prs.filter(pr => pr.state === 'open').length;
    const closed = prs.filter(pr => pr.state === 'closed' && !pr.merged_at).length;

    console.log('📊 Quick Summary:');
    console.log(`   Total PRs: ${prs.length}`);
    console.log(`   Merged: ${merged}`);
    console.log(`   Open: ${open}`);
    console.log(`   Closed (not merged): ${closed}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
