#!/usr/bin/env node

const fs = require('fs');

console.log('🔍 Analyzing Component Library PRs by Component\n');
console.log('='.repeat(80) + '\n');

const prs = JSON.parse(fs.readFileSync('component-library-prs-2025-2026.json', 'utf8'));

// Extract component name from PR title
function extractComponent(title) {
  // Match va-* component names
  const match = title.match(/va-[a-z-]+/i);
  if (match) {
    return match[0].toLowerCase();
  }

  // Match @component-library/* package patterns
  const pkgMatch = title.match(/@component-library\/([a-z-]+)/i);
  if (pkgMatch) {
    return pkgMatch[1];
  }

  // Check for common component patterns without va- prefix
  const patterns = [
    /\b(accordion|alert|banner|breadcrumb|button|card|checkbox|combo-box|date|file-input|footer|header|icon|link|modal|pagination|radio|select|table|tag|text-input|textarea)\b/i
  ];

  for (const pattern of patterns) {
    const m = title.match(pattern);
    if (m) {
      return 'va-' + m[1].toLowerCase();
    }
  }

  return null;
}

// Determine PR type from title
function getPRType(title) {
  const lower = title.toLowerCase();

  if (lower.startsWith('feat(') || lower.startsWith('feat:') || lower.includes('add') || lower.includes('new')) {
    return 'Feature';
  }
  if (lower.startsWith('fix(') || lower.startsWith('fix:') || lower.includes('fix')) {
    return 'Bug Fix';
  }
  if (lower.startsWith('refactor(') || lower.startsWith('refactor:') || lower.includes('refactor')) {
    return 'Refactor';
  }
  if (lower.startsWith('docs(') || lower.startsWith('docs:') || lower.includes('document')) {
    return 'Documentation';
  }
  if (lower.startsWith('style(') || lower.startsWith('style:') || lower.includes('styling')) {
    return 'Styling';
  }
  if (lower.startsWith('test(') || lower.startsWith('test:') || lower.includes('test')) {
    return 'Testing';
  }
  if (lower.startsWith('build(') || lower.startsWith('chore(') || lower.includes('deps')) {
    return 'Build/Deps';
  }
  if (lower.includes('release') || lower.match(/v\d+\.\d+\.\d+/)) {
    return 'Release';
  }
  if (lower.startsWith('perf(') || lower.startsWith('perf:') || lower.includes('performance')) {
    return 'Performance';
  }
  if (lower.includes('accessibility') || lower.includes('a11y') || lower.includes('aria')) {
    return 'Accessibility';
  }

  return 'Other';
}

// Group PRs by component
const componentData = {};
const nonComponentPRs = [];

prs.forEach(pr => {
  const component = extractComponent(pr.title);

  if (component) {
    if (!componentData[component]) {
      componentData[component] = {
        name: component,
        totalPRs: 0,
        merged: 0,
        byType: {},
        byAuthor: {},
        prs: []
      };
    }

    const type = getPRType(pr.title);

    componentData[component].totalPRs++;
    if (pr.merged_at) componentData[component].merged++;

    componentData[component].byType[type] = (componentData[component].byType[type] || 0) + 1;
    componentData[component].byAuthor[pr.author] = (componentData[component].byAuthor[pr.author] || 0) + 1;
    componentData[component].prs.push(pr);
  } else {
    nonComponentPRs.push(pr);
  }
});

// Sort components by PR count
const sortedComponents = Object.values(componentData)
  .sort((a, b) => b.totalPRs - a.totalPRs);

// Print component summary
console.log('📊 TOP COMPONENTS BY PR ACTIVITY\n');
console.log('Rank | Component | Total PRs | Merged | Merge Rate | Top Type');
console.log('-'.repeat(80));

sortedComponents.slice(0, 30).forEach((comp, index) => {
  const mergeRate = ((comp.merged / comp.totalPRs) * 100).toFixed(0);
  const topType = Object.entries(comp.byType)
    .sort((a, b) => b[1] - a[1])[0];

  console.log(
    `${String(index + 1).padStart(2)} | ` +
    `${comp.name.padEnd(25)} | ` +
    `${String(comp.totalPRs).padStart(9)} | ` +
    `${String(comp.merged).padStart(6)} | ` +
    `${String(mergeRate + '%').padStart(10)} | ` +
    `${topType[0]} (${topType[1]})`
  );
});

console.log('\n' + '='.repeat(80) + '\n');

// Detailed breakdown for top 10 components
console.log('📋 DETAILED BREAKDOWN - TOP 10 COMPONENTS\n');

sortedComponents.slice(0, 10).forEach((comp, index) => {
  console.log(`\n${index + 1}. ${comp.name.toUpperCase()}`);
  console.log('   ' + '-'.repeat(70));
  console.log(`   Total PRs: ${comp.totalPRs} | Merged: ${comp.merged} (${((comp.merged / comp.totalPRs) * 100).toFixed(0)}%)`);

  console.log(`\n   By Type:`);
  Object.entries(comp.byType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      const pct = ((count / comp.totalPRs) * 100).toFixed(0);
      console.log(`      ${type.padEnd(20)}: ${String(count).padStart(3)} PRs (${pct}%)`);
    });

  console.log(`\n   Top Contributors:`);
  Object.entries(comp.byAuthor)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([author, count]) => {
      console.log(`      ${author.padEnd(25)}: ${count} PRs`);
    });
});

console.log('\n' + '='.repeat(80) + '\n');

// PR Type Distribution Across All Components
console.log('📈 PR TYPE DISTRIBUTION (ALL COMPONENT PRs)\n');
const allTypes = {};
sortedComponents.forEach(comp => {
  Object.entries(comp.byType).forEach(([type, count]) => {
    allTypes[type] = (allTypes[type] || 0) + count;
  });
});

Object.entries(allTypes)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => {
    const pct = ((count / prs.length) * 100).toFixed(1);
    console.log(`   ${type.padEnd(20)}: ${String(count).padStart(4)} PRs (${pct}%)`);
  });

console.log('\n' + '='.repeat(80) + '\n');

// Components by category
console.log('🏷️  COMPONENTS BY CATEGORY\n');

const categories = {
  'Form Controls': [
    'va-text-input', 'va-textarea', 'va-select', 'va-checkbox', 'va-checkbox-group',
    'va-radio', 'va-radio-option', 'va-combo-box', 'va-date', 'va-date-input',
    'va-file-input', 'va-file-input-multiple', 'va-memorable-date'
  ],
  'Feedback & Messaging': [
    'va-alert', 'va-alert-sign-in', 'va-banner', 'va-modal', 'va-loading-indicator',
    'va-notification', 'va-process-list', 'va-progress-bar'
  ],
  'Navigation': [
    'va-breadcrumb', 'va-link', 'va-pagination', 'va-on-this-page',
    'va-segmented-progress-bar', 'va-accordion', 'va-accordion-item'
  ],
  'Data Display': [
    'va-table', 'va-card', 'va-summary-box', 'va-featured-content',
    'va-crisis-line-modal', 'va-privacy-agreement'
  ],
  'Actions': [
    'va-button', 'va-button-icon', 'va-button-pair', 'va-link-action'
  ],
  'Layout & Structure': [
    'va-header', 'va-footer', 'va-header-minimal', 'va-main-content'
  ],
  'Typography & Media': [
    'va-icon', 'va-telephone', 'va-additional-info', 'va-language-toggle'
  ]
};

Object.entries(categories).forEach(([category, components]) => {
  const categoryPRs = components
    .filter(c => componentData[c])
    .reduce((sum, c) => sum + componentData[c].totalPRs, 0);

  const componentCount = components.filter(c => componentData[c]).length;

  if (componentCount > 0) {
    console.log(`\n   ${category}:`);
    console.log(`      Components: ${componentCount} | Total PRs: ${categoryPRs}`);

    components
      .filter(c => componentData[c])
      .sort((a, b) => (componentData[b]?.totalPRs || 0) - (componentData[a]?.totalPRs || 0))
      .slice(0, 5)
      .forEach(c => {
        const data = componentData[c];
        console.log(`      - ${c.padEnd(30)}: ${data.totalPRs} PRs`);
      });
  }
});

console.log('\n' + '='.repeat(80) + '\n');

// Components needing attention (high bug fix ratio)
console.log('⚠️  COMPONENTS NEEDING ATTENTION (High Bug Fix Ratio)\n');

const componentsWithBugs = sortedComponents
  .filter(comp => comp.totalPRs >= 5) // Only consider components with significant activity
  .map(comp => ({
    ...comp,
    bugFixRatio: (comp.byType['Bug Fix'] || 0) / comp.totalPRs
  }))
  .filter(comp => comp.bugFixRatio > 0.3)
  .sort((a, b) => b.bugFixRatio - a.bugFixRatio);

if (componentsWithBugs.length > 0) {
  componentsWithBugs.slice(0, 15).forEach(comp => {
    const bugCount = comp.byType['Bug Fix'] || 0;
    const pct = (comp.bugFixRatio * 100).toFixed(0);
    console.log(`   ${comp.name.padEnd(30)}: ${bugCount} bugs / ${comp.totalPRs} PRs (${pct}%)`);
  });
} else {
  console.log('   No components with high bug fix ratios found');
}

console.log('\n' + '='.repeat(80) + '\n');

// Most actively developed (excluding releases and deps)
console.log('🚀 MOST ACTIVELY DEVELOPED COMPONENTS (Feature + Refactor)\n');

const activeComponents = sortedComponents
  .map(comp => ({
    ...comp,
    developmentPRs: (comp.byType['Feature'] || 0) + (comp.byType['Refactor'] || 0)
  }))
  .filter(comp => comp.developmentPRs > 0)
  .sort((a, b) => b.developmentPRs - a.developmentPRs);

activeComponents.slice(0, 15).forEach(comp => {
  const feats = comp.byType['Feature'] || 0;
  const refactors = comp.byType['Refactor'] || 0;
  console.log(
    `   ${comp.name.padEnd(30)}: ${comp.developmentPRs} PRs ` +
    `(${feats} features, ${refactors} refactors)`
  );
});

console.log('\n' + '='.repeat(80) + '\n');

// Save detailed analysis
const analysis = {
  summary: {
    totalPRs: prs.length,
    componentPRs: prs.length - nonComponentPRs.length,
    nonComponentPRs: nonComponentPRs.length,
    uniqueComponents: sortedComponents.length,
    averagePRsPerComponent: (prs.length - nonComponentPRs.length) / sortedComponents.length
  },
  components: sortedComponents.map(comp => ({
    name: comp.name,
    totalPRs: comp.totalPRs,
    merged: comp.merged,
    mergeRate: ((comp.merged / comp.totalPRs) * 100).toFixed(1),
    byType: comp.byType,
    topContributors: Object.entries(comp.byAuthor)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([author, count]) => ({ author, count })),
    examplePRs: comp.prs.slice(0, 3).map(pr => ({
      number: pr.number,
      title: pr.title,
      url: pr.url
    }))
  })),
  typeDistribution: Object.entries(allTypes)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({
      type,
      count,
      percentage: ((count / prs.length) * 100).toFixed(1)
    })),
  categories: Object.entries(categories).map(([category, components]) => ({
    category,
    components: components.filter(c => componentData[c]).length,
    totalPRs: components
      .filter(c => componentData[c])
      .reduce((sum, c) => sum + componentData[c].totalPRs, 0)
  })),
  needsAttention: componentsWithBugs.slice(0, 20).map(comp => ({
    name: comp.name,
    totalPRs: comp.totalPRs,
    bugFixes: comp.byType['Bug Fix'] || 0,
    bugFixRatio: (comp.bugFixRatio * 100).toFixed(1) + '%'
  })),
  mostActive: activeComponents.slice(0, 20).map(comp => ({
    name: comp.name,
    developmentPRs: comp.developmentPRs,
    features: comp.byType['Feature'] || 0,
    refactors: comp.byType['Refactor'] || 0
  }))
};

fs.writeFileSync('component-analysis.json', JSON.stringify(analysis, null, 2));
console.log('✅ Saved detailed component analysis to: component-analysis.json\n');

// Save component list with PR counts
const componentList = sortedComponents.map(comp => ({
  component: comp.name,
  totalPRs: comp.totalPRs,
  merged: comp.merged,
  mergeRate: ((comp.merged / comp.totalPRs) * 100).toFixed(1) + '%',
  features: comp.byType['Feature'] || 0,
  bugFixes: comp.byType['Bug Fix'] || 0,
  refactors: comp.byType['Refactor'] || 0,
  topContributor: Object.entries(comp.byAuthor).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
}));

// Convert to CSV
const csvHeader = 'Component,Total PRs,Merged,Merge Rate,Features,Bug Fixes,Refactors,Top Contributor\n';
const csvRows = componentList.map(c =>
  `${c.component},${c.totalPRs},${c.merged},${c.mergeRate},${c.features},${c.bugFixes},${c.refactors},${c.topContributor}`
).join('\n');

fs.writeFileSync('component-analysis.csv', csvHeader + csvRows);
console.log('✅ Saved component CSV to: component-analysis.csv\n');
