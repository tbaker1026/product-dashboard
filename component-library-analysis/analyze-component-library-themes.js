#!/usr/bin/env node

const fs = require('fs');

console.log('🎨 Analyzing Component Library PR Themes\n');
console.log('='.repeat(80) + '\n');

const prs = JSON.parse(fs.readFileSync('component-library-prs-2025-2026.json', 'utf8'));

// Theme categories based on common patterns for component library
const themes = {
  'Web Components': {
    keywords: ['web component', 'va-', 'custom element', 'shadow dom', 'web-component', 'v3', 'lit', 'stencil'],
    prs: []
  },
  'Component Updates': {
    keywords: ['component', 'update component', 'alert', 'modal', 'button', 'input', 'card', 'accordion', 'banner', 'breadcrumb', 'checkbox', 'radio', 'select', 'table', 'tag'],
    prs: []
  },
  'New Features': {
    keywords: ['add', 'new', 'feature', 'implement', 'introduce', 'create'],
    prs: []
  },
  'Bug Fixes': {
    keywords: ['fix', 'bug', 'issue', 'broken', 'error', 'resolve', 'patch'],
    prs: []
  },
  'Storybook': {
    keywords: ['storybook', 'story', 'stories', 'docs', 'canvas', 'controls'],
    prs: []
  },
  'Accessibility': {
    keywords: ['accessibility', 'a11y', 'aria', 'wcag', 'screen reader', 'keyboard', 'focus', 'axe'],
    prs: []
  },
  'Testing': {
    keywords: ['test', 'spec', 'cypress', 'jest', 'unit', 'integration', 'e2e', 'coverage'],
    prs: []
  },
  'Build & Infrastructure': {
    keywords: ['build', 'ci', 'workflow', 'dependencies', 'package', 'npm', 'upgrade', 'bump', 'webpack', 'rollup', 'vite'],
    prs: []
  },
  'Documentation': {
    keywords: ['docs', 'documentation', 'readme', 'guide', 'content', 'typo', 'clarify', 'instructions'],
    prs: []
  },
  'Design Tokens': {
    keywords: ['token', 'color', 'spacing', 'typography', 'font', 'css variable', 'design system'],
    prs: []
  },
  'React Integration': {
    keywords: ['react', 'jsx', 'wrapper', 'react component', 'binding'],
    prs: []
  },
  'Performance': {
    keywords: ['performance', 'optimize', 'bundle', 'size', 'lazy', 'load', 'cache'],
    prs: []
  },
  'Forms': {
    keywords: ['form', 'validation', 'input', 'field', 'error message', 'hint text'],
    prs: []
  },
  'Migration': {
    keywords: ['migrate', 'migration', 'upgrade', 'deprecate', 'legacy'],
    prs: []
  },
  'Styling': {
    keywords: ['style', 'css', 'scss', 'theme', 'appearance'],
    prs: []
  },
  'Release': {
    keywords: ['release', 'version', 'publish', 'changelog'],
    prs: []
  }
};

// Categorize each PR
prs.forEach(pr => {
  const textToSearch = `${pr.title.toLowerCase()} ${pr.body.toLowerCase()} ${pr.labels.join(' ').toLowerCase()}`;
  let categorized = false;

  // Try to match to themes
  for (const [theme, config] of Object.entries(themes)) {
    if (config.keywords.some(keyword => textToSearch.includes(keyword))) {
      config.prs.push(pr);
      categorized = true;
    }
  }

  // If no match, put in Other
  if (!categorized) {
    if (!themes['Other']) {
      themes['Other'] = { keywords: [], prs: [] };
    }
    themes['Other'].prs.push(pr);
  }
});

// Sort themes by number of PRs
const sortedThemes = Object.entries(themes)
  .map(([name, config]) => ({ name, ...config }))
  .filter(theme => theme.prs.length > 0)
  .sort((a, b) => b.prs.length - a.prs.length);

// Print summary
console.log('📊 THEMES SUMMARY\n');
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
  .slice(0, 10)
  .forEach(([author, count], index) => {
    const percentage = ((count / prs.length) * 100).toFixed(1);
    console.log(`${index + 1}. ${author}: ${count} PRs (${percentage}%)`);
  });

console.log('\n' + '='.repeat(80) + '\n');

// Save detailed analysis
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
    mergeRate: theme.prs.length > 0 ? ((theme.prs.filter(pr => pr.merged_at).length / theme.prs.length) * 100).toFixed(1) : 0,
    examples: theme.prs.slice(0, 5).map(pr => ({
      number: pr.number,
      title: pr.title,
      url: pr.url
    }))
  })),
  byMonth,
  topContributors: Object.entries(contributors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([author, count]) => ({
      author,
      count,
      percentage: ((count / prs.length) * 100).toFixed(1)
    }))
};

fs.writeFileSync('component-library-analysis.json', JSON.stringify(analysis, null, 2));
console.log('✅ Saved detailed analysis to: component-library-analysis.json\n');

// Export themes with PRs for further analysis
fs.writeFileSync('component-library-themes-detailed.json', JSON.stringify(sortedThemes, null, 2));
console.log('✅ Saved detailed themes to: component-library-themes-detailed.json\n');
