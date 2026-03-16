#!/usr/bin/env node

const fs = require('fs');
const https = require('https');

console.log('🏷️  Analyzing Forms Library PRs by Labels\n');
console.log('='.repeat(80) + '\n');

const prs = JSON.parse(fs.readFileSync('forms-library-prs-2025-2026.json', 'utf8'));

// Extract issue numbers from PR body
function extractLinkedIssues(body) {
  if (!body) return [];

  const patterns = [
    /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)/gi,
    /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+https:\/\/github\.com\/[^\/]+\/[^\/]+\/issues\/(\d+)/gi,
    /#(\d+)/g  // Any issue reference
  ];

  const issues = new Set();
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(body)) !== null) {
      issues.add(match[1]);
    }
  });

  return Array.from(issues);
}

// Analyze PR labels
console.log('📊 LABEL ANALYSIS\n');

const labelStats = {};
prs.forEach(pr => {
  pr.labels.forEach(label => {
    if (!labelStats[label]) {
      labelStats[label] = {
        count: 0,
        merged: 0,
        prs: []
      };
    }
    labelStats[label].count++;
    if (pr.merged_at) labelStats[label].merged++;
    labelStats[label].prs.push(pr);
  });
});

// Sort labels by count
const sortedLabels = Object.entries(labelStats)
  .map(([label, stats]) => ({
    label,
    count: stats.count,
    merged: stats.merged,
    mergeRate: ((stats.merged / stats.count) * 100).toFixed(1),
    prs: stats.prs
  }))
  .sort((a, b) => b.count - a.count);

console.log('Top Labels by PR Count:\n');
console.log('Rank | Label | PRs | Merged | Merge Rate');
console.log('-'.repeat(80));

sortedLabels.slice(0, 30).forEach((item, index) => {
  console.log(
    `${String(index + 1).padStart(2)} | ` +
    `${item.label.padEnd(40)} | ` +
    `${String(item.count).padStart(3)} | ` +
    `${String(item.merged).padStart(6)} | ` +
    `${String(item.mergeRate + '%').padStart(10)}`
  );
});

console.log('\n' + '='.repeat(80) + '\n');

// Categorize labels into themes
const labelCategories = {
  'Form Teams': {
    labels: [],
    pattern: /benefits|claims|health|pension|burial|education|dependents|caregivers|income/i,
    prs: new Set()
  },
  'Form Types': {
    labels: [],
    pattern: /\d{2,3}[A-Z]?-\d{2,4}[A-Z]?/,
    prs: new Set()
  },
  'Component Types': {
    labels: [],
    pattern: /component|field|input|button|radio|checkbox|select|date|file/i,
    prs: new Set()
  },
  'Technical Domains': {
    labels: [],
    pattern: /frontend|backend|platform|infrastructure|deployment|api/i,
    prs: new Set()
  },
  'Work Types': {
    labels: [],
    pattern: /bug|enhancement|documentation|refactor|chore|feature/i,
    prs: new Set()
  },
  'Blockers & Status': {
    labels: [],
    pattern: /do not merge|blocked|in progress|ready|stale|needs/i,
    prs: new Set()
  },
  'Quality & Testing': {
    labels: [],
    pattern: /test|quality|accessibility|a11y|508|wcag|performance/i,
    prs: new Set()
  },
  'Other': {
    labels: [],
    pattern: null,
    prs: new Set()
  }
};

// Categorize each label
sortedLabels.forEach(item => {
  let categorized = false;

  for (const [category, config] of Object.entries(labelCategories)) {
    if (config.pattern && config.pattern.test(item.label)) {
      config.labels.push(item);
      item.prs.forEach(pr => config.prs.add(pr.number));
      categorized = true;
      break;
    }
  }

  if (!categorized) {
    labelCategories['Other'].labels.push(item);
    item.prs.forEach(pr => labelCategories['Other'].prs.add(pr.number));
  }
});

console.log('📁 LABEL CATEGORIES\n');

Object.entries(labelCategories)
  .filter(([_, config]) => config.labels.length > 0)
  .sort((a, b) => b[1].prs.size - a[1].prs.size)
  .forEach(([category, config]) => {
    console.log(`\n${category}:`);
    console.log(`   Unique PRs: ${config.prs.size}`);
    console.log(`   Labels: ${config.labels.length}`);
    console.log(`   Top labels:`);

    config.labels.slice(0, 8).forEach(item => {
      console.log(`      - ${item.label.padEnd(40)}: ${item.count} PRs (${item.mergeRate}% merged)`);
    });
  });

console.log('\n' + '='.repeat(80) + '\n');

// Analyze linked issues
console.log('🔗 LINKED ISSUES ANALYSIS\n');

const linkedIssueStats = {
  total: 0,
  withLinkedIssues: 0,
  withoutLinkedIssues: 0,
  issueNumbers: []
};

prs.forEach(pr => {
  const issues = extractLinkedIssues(pr.body);
  if (issues.length > 0) {
    linkedIssueStats.withLinkedIssues++;
    linkedIssueStats.issueNumbers.push(...issues);
  } else {
    linkedIssueStats.withoutLinkedIssues++;
  }
});

linkedIssueStats.total = prs.length;

console.log(`Total PRs: ${linkedIssueStats.total}`);
console.log(`PRs with linked issues: ${linkedIssueStats.withLinkedIssues} (${((linkedIssueStats.withLinkedIssues / linkedIssueStats.total) * 100).toFixed(1)}%)`);
console.log(`PRs without linked issues: ${linkedIssueStats.withoutLinkedIssues} (${((linkedIssueStats.withoutLinkedIssues / linkedIssueStats.total) * 100).toFixed(1)}%)`);
console.log(`Total linked issues: ${linkedIssueStats.issueNumbers.length}`);
console.log(`Unique issues: ${new Set(linkedIssueStats.issueNumbers).size}`);

console.log('\n' + '='.repeat(80) + '\n');

// Multi-label analysis (PRs with multiple labels)
console.log('🏷️  MULTI-LABEL ANALYSIS\n');

const labelCombinations = {};
prs.forEach(pr => {
  const relevantLabels = pr.labels.filter(l => l !== 'forms-library').sort();
  if (relevantLabels.length > 1) {
    const combo = relevantLabels.join(' + ');
    if (!labelCombinations[combo]) {
      labelCombinations[combo] = {
        count: 0,
        merged: 0,
        prs: []
      };
    }
    labelCombinations[combo].count++;
    if (pr.merged_at) labelCombinations[combo].merged++;
    labelCombinations[combo].prs.push(pr);
  }
});

const sortedCombos = Object.entries(labelCombinations)
  .map(([combo, stats]) => ({
    combo,
    count: stats.count,
    merged: stats.merged,
    mergeRate: ((stats.merged / stats.count) * 100).toFixed(1)
  }))
  .filter(item => item.count >= 2)
  .sort((a, b) => b.count - a.count);

console.log('Common Label Combinations (2+ PRs):\n');
if (sortedCombos.length > 0) {
  sortedCombos.slice(0, 15).forEach(item => {
    console.log(`   ${item.combo}`);
    console.log(`      Count: ${item.count} PRs | Merged: ${item.merged} | Rate: ${item.mergeRate}%`);
  });
} else {
  console.log('   No common label combinations found');
}

console.log('\n' + '='.repeat(80) + '\n');

// Merge rate by label
console.log('📈 LABELS WITH CONCERNING MERGE RATES\n');

const concerningLabels = sortedLabels
  .filter(item => item.count >= 3) // At least 3 PRs
  .filter(item => parseFloat(item.mergeRate) < 70) // Below 70% merge rate
  .sort((a, b) => parseFloat(a.mergeRate) - parseFloat(b.mergeRate));

if (concerningLabels.length > 0) {
  console.log('Labels with <70% merge rate (3+ PRs):\n');
  concerningLabels.forEach(item => {
    console.log(`   ${item.label.padEnd(40)}: ${item.count} PRs, ${item.mergeRate}% merged ⚠️`);
  });
} else {
  console.log('   No concerning merge rates found');
}

console.log('\n' + '='.repeat(80) + '\n');

// Save analysis
const analysis = {
  summary: {
    totalPRs: prs.length,
    totalLabels: Object.keys(labelStats).length,
    averageLabelsPerPR: (prs.reduce((sum, pr) => sum + pr.labels.length, 0) / prs.length).toFixed(2),
    linkedIssueStats
  },
  labelStats: sortedLabels,
  labelCategories: Object.entries(labelCategories).map(([category, config]) => ({
    category,
    uniquePRs: config.prs.size,
    labelCount: config.labels.length,
    labels: config.labels.slice(0, 10)
  })),
  concerningLabels,
  labelCombinations: sortedCombos.slice(0, 20)
};

fs.writeFileSync('forms-library-label-analysis.json', JSON.stringify(analysis, null, 2));
console.log('✅ Saved label analysis to: forms-library-label-analysis.json\n');

// Create CSV of labels
const csvHeader = 'Label,Total PRs,Merged,Merge Rate,Category\n';
const csvRows = sortedLabels.map(item => {
  let category = 'Other';
  for (const [cat, config] of Object.entries(labelCategories)) {
    if (config.labels.some(l => l.label === item.label)) {
      category = cat;
      break;
    }
  }
  return `"${item.label}",${item.count},${item.merged},${item.mergeRate}%,${category}`;
}).join('\n');

fs.writeFileSync('forms-library-labels.csv', csvHeader + csvRows);
console.log('✅ Saved labels CSV to: forms-library-labels.csv\n');

// Generate detailed report by label category
console.log('📋 GENERATING DETAILED REPORT BY CATEGORY\n');

let report = '# Forms Library PR Analysis by Label\n\n';
report += `**Total PRs:** ${prs.length}\n`;
report += `**Total Unique Labels:** ${Object.keys(labelStats).length}\n`;
report += `**Average Labels per PR:** ${analysis.summary.averageLabelsPerPR}\n\n`;
report += '---\n\n';

Object.entries(labelCategories)
  .filter(([_, config]) => config.labels.length > 0)
  .sort((a, b) => b[1].prs.size - a[1].prs.size)
  .forEach(([category, config]) => {
    report += `## ${category}\n\n`;
    report += `**Unique PRs:** ${config.prs.size}\n`;
    report += `**Labels in Category:** ${config.labels.length}\n\n`;

    report += '| Label | PRs | Merged | Merge Rate |\n';
    report += '|-------|-----|--------|------------|\n';

    config.labels.slice(0, 15).forEach(item => {
      report += `| ${item.label} | ${item.count} | ${item.merged} | ${item.mergeRate}% |\n`;
    });

    report += '\n';
  });

fs.writeFileSync('forms-library-label-report.md', report);
console.log('✅ Saved label report to: forms-library-label-report.md\n');
