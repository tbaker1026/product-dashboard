#!/usr/bin/env node

const fs = require('fs');

console.log('🎨 Analyzing Forms Library PRs\n');
console.log('='.repeat(80) + '\n');

const prs = JSON.parse(fs.readFileSync('forms-library-prs-2025-2026.json', 'utf8'));

// Extract form number/name from PR title or body
function extractForm(title, body) {
  // Match form numbers like 21-526EZ, 10-10EZ, 21P-527EZ, etc.
  const formMatch = title.match(/\b(\d{2,3}[A-Z]?-\d{2,4}[A-Z]{0,2})\b/i);
  if (formMatch) {
    return formMatch[1].toUpperCase();
  }

  // Check body for form numbers
  const bodyMatch = body.match(/\b(\d{2,3}[A-Z]?-\d{2,4}[A-Z]{0,2})\b/i);
  if (bodyMatch) {
    return bodyMatch[1].toUpperCase();
  }

  // Check for common form names
  const formNames = [
    'disability', 'health-care', 'hca', 'pension', 'education', 'burial',
    'pre-need', 'feedback', 'contact', 'dependents', 'income-limits'
  ];

  for (const name of formNames) {
    if (title.toLowerCase().includes(name) || body.toLowerCase().includes(name)) {
      return name;
    }
  }

  return null;
}

// Determine PR type from title
function getPRType(title) {
  const lower = title.toLowerCase();

  if (lower.match(/\bfeat[:(]|feature|add|new|implement|introduce/)) {
    return 'Feature';
  }
  if (lower.match(/\bfix[:(]|bug|issue|broken|error|resolve|patch/)) {
    return 'Bug Fix';
  }
  if (lower.match(/\brefactor[:(]|restructure|reorganize/)) {
    return 'Refactor';
  }
  if (lower.match(/\bdocs?[:(]|document/)) {
    return 'Documentation';
  }
  if (lower.match(/\bstyle[:(]|styling|css/)) {
    return 'Styling';
  }
  if (lower.match(/\btest[:(]|testing|spec|cypress|jest/)) {
    return 'Testing';
  }
  if (lower.match(/\bchore[:(]|build[:(]|deps|dependencies|upgrade|bump/)) {
    return 'Build/Deps';
  }
  if (lower.match(/\bperf[:(]|performance|optimize/)) {
    return 'Performance';
  }
  if (lower.match(/\baccess|a11y|aria|wcag/)) {
    return 'Accessibility';
  }
  if (lower.match(/\bupdate|change|modify/)) {
    return 'Update';
  }

  return 'Other';
}

// Theme categories
const themes = {
  'Web Components Migration': {
    keywords: ['web component', 'va-', 'v3', 'migrate', 'migration', 'replace filefield'],
    prs: []
  },
  'Form Patterns': {
    keywords: ['pattern', 'template', 'boilerplate', 'starter', 'scaffold'],
    prs: []
  },
  'Validation': {
    keywords: ['validation', 'validate', 'error', 'validator', 'schema'],
    prs: []
  },
  'Prefill & Save in Progress': {
    keywords: ['prefill', 'save in progress', 'sip', 'auto-save', 'draft'],
    prs: []
  },
  'Component Updates': {
    keywords: ['component', 'field', 'input', 'select', 'checkbox', 'radio', 'date', 'file'],
    prs: []
  },
  'Routing & Navigation': {
    keywords: ['routing', 'navigate', 'page', 'chapter', 'step'],
    prs: []
  },
  'Review Page': {
    keywords: ['review', 'summary', 'confirm', 'confirmation'],
    prs: []
  },
  'Testing': {
    keywords: ['test', 'spec', 'cypress', 'jest', 'e2e', 'unit'],
    prs: []
  },
  'Accessibility': {
    keywords: ['accessibility', 'a11y', 'aria', 'wcag', 'screen reader', 'keyboard'],
    prs: []
  },
  'Documentation': {
    keywords: ['docs', 'documentation', 'readme', 'guide', 'example'],
    prs: []
  },
  'Config & Setup': {
    keywords: ['config', 'configuration', 'setup', 'manifest', 'init'],
    prs: []
  },
  'Bug Fixes': {
    keywords: ['fix', 'bug', 'issue', 'broken', 'error'],
    prs: []
  },
  'Performance': {
    keywords: ['performance', 'optimize', 'speed', 'slow', 'bundle'],
    prs: []
  }
};

// Categorize PRs
prs.forEach(pr => {
  const textToSearch = `${pr.title.toLowerCase()} ${pr.body.toLowerCase()}`;

  for (const [theme, config] of Object.entries(themes)) {
    if (config.keywords.some(keyword => textToSearch.includes(keyword))) {
      config.prs.push(pr);
    }
  }
});

// Sort themes by PR count
const sortedThemes = Object.entries(themes)
  .map(([name, config]) => ({ name, ...config }))
  .filter(theme => theme.prs.length > 0)
  .sort((a, b) => b.prs.length - a.prs.length);

// Print theme summary
console.log('📊 FORMS LIBRARY THEMES SUMMARY\n');
sortedThemes.forEach((theme, index) => {
  const merged = theme.prs.filter(pr => pr.merged_at).length;
  const percentage = ((theme.prs.length / prs.length) * 100).toFixed(1);
  const mergeRate = theme.prs.length > 0 ? ((merged / theme.prs.length) * 100).toFixed(0) : 0;
  console.log(`${index + 1}. ${theme.name}`);
  console.log(`   Total: ${theme.prs.length} PRs (${percentage}%)`);
  console.log(`   Merged: ${merged} (${mergeRate}% merge rate)`);
  console.log('');
});

console.log('='.repeat(80) + '\n');

// Extract forms
const formData = {};
prs.forEach(pr => {
  const form = extractForm(pr.title, pr.body);
  if (form) {
    if (!formData[form]) {
      formData[form] = {
        name: form,
        totalPRs: 0,
        merged: 0,
        byType: {},
        byAuthor: {},
        prs: []
      };
    }

    const type = getPRType(pr.title);

    formData[form].totalPRs++;
    if (pr.merged_at) formData[form].merged++;

    formData[form].byType[type] = (formData[form].byType[type] || 0) + 1;
    formData[form].byAuthor[pr.author] = (formData[form].byAuthor[pr.author] || 0) + 1;
    formData[form].prs.push(pr);
  }
});

// Sort forms by PR count
const sortedForms = Object.values(formData)
  .sort((a, b) => b.totalPRs - a.totalPRs);

console.log('📋 TOP FORMS BY PR ACTIVITY\n');
console.log('Rank | Form | Total PRs | Merged | Merge Rate | Top Type');
console.log('-'.repeat(80));

sortedForms.slice(0, 25).forEach((form, index) => {
  const mergeRate = ((form.merged / form.totalPRs) * 100).toFixed(0);
  const topType = Object.entries(form.byType)
    .sort((a, b) => b[1] - a[1])[0];

  console.log(
    `${String(index + 1).padStart(2)} | ` +
    `${form.name.padEnd(15)} | ` +
    `${String(form.totalPRs).padStart(9)} | ` +
    `${String(form.merged).padStart(6)} | ` +
    `${String(mergeRate + '%').padStart(10)} | ` +
    `${topType[0]} (${topType[1]})`
  );
});

console.log('\n' + '='.repeat(80) + '\n');

// Month-by-month breakdown
console.log('📅 MONTHLY BREAKDOWN\n');
const byMonth = {};
prs.forEach(pr => {
  const date = new Date(pr.created_at);
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  if (!byMonth[key]) byMonth[key] = [];
  byMonth[key].push(pr);
});

Object.keys(byMonth).sort().forEach(month => {
  const merged = byMonth[month].filter(pr => pr.merged_at).length;
  const mergeRate = ((merged / byMonth[month].length) * 100).toFixed(0);
  console.log(`${month}: ${byMonth[month].length} PRs (${merged} merged, ${mergeRate}% merge rate)`);
});

console.log('\n' + '='.repeat(80) + '\n');

// Top contributors
console.log('👥 TOP CONTRIBUTORS\n');
const contributors = {};
prs.forEach(pr => {
  contributors[pr.author] = (contributors[pr.author] || 0) + 1;
});

Object.entries(contributors)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([author, count], index) => {
    const percentage = ((count / prs.length) * 100).toFixed(1);
    console.log(`${index + 1}. ${author.padEnd(30)}: ${count} PRs (${percentage}%)`);
  });

console.log('\n' + '='.repeat(80) + '\n');

// PR Type Distribution
console.log('📈 PR TYPE DISTRIBUTION\n');
const allTypes = {};
prs.forEach(pr => {
  const type = getPRType(pr.title);
  allTypes[type] = (allTypes[type] || 0) + 1;
});

Object.entries(allTypes)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => {
    const pct = ((count / prs.length) * 100).toFixed(1);
    console.log(`   ${type.padEnd(20)}: ${String(count).padStart(4)} PRs (${pct}%)`);
  });

console.log('\n' + '='.repeat(80) + '\n');

// Save analysis
const analysis = {
  summary: {
    totalPRs: prs.length,
    merged: prs.filter(pr => pr.merged_at).length,
    open: prs.filter(pr => pr.state === 'open').length,
    closed: prs.filter(pr => pr.state === 'closed' && !pr.merged_at).length,
    mergeRate: ((prs.filter(pr => pr.merged_at).length / prs.length) * 100).toFixed(1),
    dateRange: {
      start: '2025-04-01',
      end: '2026-03-31'
    }
  },
  themes: sortedThemes.map(theme => ({
    name: theme.name,
    count: theme.prs.length,
    merged: theme.prs.filter(pr => pr.merged_at).length,
    percentage: ((theme.prs.length / prs.length) * 100).toFixed(1),
    mergeRate: theme.prs.length > 0 ? ((theme.prs.filter(pr => pr.merged_at).length / theme.prs.length) * 100).toFixed(1) : 0
  })),
  forms: sortedForms.map(form => ({
    name: form.name,
    totalPRs: form.totalPRs,
    merged: form.merged,
    mergeRate: ((form.merged / form.totalPRs) * 100).toFixed(1),
    byType: form.byType,
    topContributors: Object.entries(form.byAuthor)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([author, count]) => ({ author, count }))
  })),
  byMonth,
  topContributors: Object.entries(contributors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([author, count]) => ({
      author,
      count,
      percentage: ((count / prs.length) * 100).toFixed(1)
    })),
  typeDistribution: Object.entries(allTypes)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({
      type,
      count,
      percentage: ((count / prs.length) * 100).toFixed(1)
    }))
};

fs.writeFileSync('forms-library-analysis.json', JSON.stringify(analysis, null, 2));
console.log('✅ Saved detailed analysis to: forms-library-analysis.json\n');

// CSV for forms
const csvHeader = 'Form,Total PRs,Merged,Merge Rate,Features,Bug Fixes,Updates,Top Contributor\n';
const csvRows = sortedForms.map(f => {
  const features = f.byType['Feature'] || 0;
  const bugs = f.byType['Bug Fix'] || 0;
  const updates = f.byType['Update'] || 0;
  const topContrib = Object.entries(f.byAuthor).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  return `${f.name},${f.totalPRs},${f.merged},${((f.merged / f.totalPRs) * 100).toFixed(1)}%,${features},${bugs},${updates},${topContrib}`;
}).join('\n');

fs.writeFileSync('forms-library-analysis.csv', csvHeader + csvRows);
console.log('✅ Saved forms CSV to: forms-library-analysis.csv\n');
