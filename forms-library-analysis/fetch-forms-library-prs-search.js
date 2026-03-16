#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

console.log('🔍 Fetching PRs from vets-website with "forms-library" label');
console.log('📅 Date range: April 1, 2025 - March 31, 2026\n');

const START_DATE = '2025-04-01';
const END_DATE = '2026-03-31';

async function searchPRs(page = 1) {
  return new Promise((resolve, reject) => {
    // Use GitHub search API with label filter
    const query = encodeURIComponent(
      `repo:department-of-veterans-affairs/vets-website is:pr label:forms-library created:${START_DATE}..${END_DATE}`
    );

    const options = {
      hostname: 'api.github.com',
      path: `/search/issues?q=${query}&per_page=100&page=${page}&sort=created&order=desc`,
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

async function getAllPRs() {
  const allPRs = [];
  let page = 1;
  let totalCount = 0;

  // First request to get total count
  console.log(`   Fetching page ${page}...`);
  const firstResult = await searchPRs(page);
  totalCount = firstResult.total_count;

  console.log(`   Found ${totalCount} total PRs matching criteria\n`);

  // Process first page
  firstResult.items.forEach(pr => {
    allPRs.push({
      number: pr.number,
      title: pr.title,
      created_at: pr.created_at,
      merged_at: pr.pull_request?.merged_at || null,
      closed_at: pr.closed_at,
      state: pr.state,
      author: pr.user.login,
      labels: pr.labels.map(l => l.name),
      url: pr.html_url,
      body: pr.body ? pr.body.substring(0, 500) : ''
    });
  });

  // Fetch remaining pages
  const totalPages = Math.ceil(totalCount / 100);

  for (let p = 2; p <= totalPages; p++) {
    console.log(`   Fetching page ${p}/${totalPages}...`);
    const result = await searchPRs(p);

    result.items.forEach(pr => {
      allPRs.push({
        number: pr.number,
        title: pr.title,
        created_at: pr.created_at,
        merged_at: pr.pull_request?.merged_at || null,
        closed_at: pr.closed_at,
        state: pr.state,
        author: pr.user.login,
        labels: pr.labels.map(l => l.name),
        url: pr.html_url,
        body: pr.body ? pr.body.substring(0, 500) : ''
      });
    });

    // Rate limiting - 30 requests per minute for search API
    await new Promise(resolve => setTimeout(resolve, 2500));
  }

  return allPRs;
}

(async () => {
  try {
    const prs = await getAllPRs();

    console.log(`\n✅ Found ${prs.length} PRs with "forms-library" label\n`);

    // Save to file
    fs.writeFileSync('forms-library-prs-2025-2026.json', JSON.stringify(prs, null, 2));
    console.log('📁 Saved to: forms-library-prs-2025-2026.json\n');

    // Quick summary
    const merged = prs.filter(pr => pr.merged_at).length;
    const open = prs.filter(pr => pr.state === 'open').length;
    const closed = prs.filter(pr => pr.state === 'closed' && !pr.merged_at).length;

    console.log('📊 Quick Summary:');
    console.log(`   Total PRs: ${prs.length}`);
    console.log(`   Merged: ${merged}`);
    console.log(`   Open: ${open}`);
    console.log(`   Closed (not merged): ${closed}`);
    if (prs.length > 0) {
      console.log(`   Merge Rate: ${((merged / prs.length) * 100).toFixed(1)}%`);
    }

    // Sample of labels used
    const allLabels = {};
    prs.forEach(pr => {
      pr.labels.forEach(label => {
        allLabels[label] = (allLabels[label] || 0) + 1;
      });
    });

    console.log('\n📋 Top Labels:');
    Object.entries(allLabels)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .forEach(([label, count]) => {
        console.log(`   ${label.padEnd(35)}: ${count} PRs`);
      });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
