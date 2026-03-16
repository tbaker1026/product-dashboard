#!/usr/bin/env node

const fs = require('fs');

console.log('🔄 Cross-Repository Analysis\n');
console.log('='.repeat(80) + '\n');

// Load all three datasets
const componentLibraryPRs = JSON.parse(fs.readFileSync('component-library-prs-2025-2026.json', 'utf8'));
const designSystemPRs = JSON.parse(fs.readFileSync('prs-2025-2026.json', 'utf8'));
const formsLibraryPRs = JSON.parse(fs.readFileSync('forms-library-prs-2025-2026.json', 'utf8'));

const repositories = {
  'component-library': {
    name: 'Component Library',
    prs: componentLibraryPRs,
    repo: 'department-of-veterans-affairs/component-library',
    focus: 'Web components & React wrappers'
  },
  'design-system-docs': {
    name: 'Design System Docs',
    prs: designSystemPRs,
    repo: 'department-of-veterans-affairs/vets-design-system-documentation',
    focus: 'Documentation & guidance'
  },
  'forms-library': {
    name: 'Forms Library (vets-website)',
    prs: formsLibraryPRs,
    repo: 'department-of-veterans-affairs/vets-website',
    focus: 'Forms library & patterns'
  }
};

// Summary statistics
console.log('📊 REPOSITORY SUMMARY\n');
console.log('Repository                     | Total PRs | Merged | Merge Rate | Avg/Month');
console.log('-'.repeat(80));

let totalPRs = 0;
let totalMerged = 0;

Object.entries(repositories).forEach(([key, repo]) => {
  const merged = repo.prs.filter(pr => pr.merged_at).length;
  const mergeRate = ((merged / repo.prs.length) * 100).toFixed(1);
  const avgPerMonth = (repo.prs.length / 12).toFixed(1);

  console.log(
    `${repo.name.padEnd(30)} | ` +
    `${String(repo.prs.length).padStart(9)} | ` +
    `${String(merged).padStart(6)} | ` +
    `${String(mergeRate + '%').padStart(10)} | ` +
    `${String(avgPerMonth).padStart(9)}`
  );

  totalPRs += repo.prs.length;
  totalMerged += merged;
});

console.log('-'.repeat(80));
console.log(
  `${'TOTAL'.padEnd(30)} | ` +
  `${String(totalPRs).padStart(9)} | ` +
  `${String(totalMerged).padStart(6)} | ` +
  `${String(((totalMerged / totalPRs) * 100).toFixed(1) + '%').padStart(10)} | ` +
  `${String((totalPRs / 12).toFixed(1)).padStart(9)}`
);

console.log('\n' + '='.repeat(80) + '\n');

// Contributor analysis across repositories
console.log('👥 CONTRIBUTOR ANALYSIS ACROSS REPOSITORIES\n');

const contributorStats = {};

Object.entries(repositories).forEach(([repoKey, repo]) => {
  repo.prs.forEach(pr => {
    if (!contributorStats[pr.author]) {
      contributorStats[pr.author] = {
        total: 0,
        byRepo: {},
        merged: 0
      };
    }

    contributorStats[pr.author].total++;
    if (pr.merged_at) contributorStats[pr.author].merged++;

    if (!contributorStats[pr.author].byRepo[repoKey]) {
      contributorStats[pr.author].byRepo[repoKey] = {
        count: 0,
        merged: 0
      };
    }

    contributorStats[pr.author].byRepo[repoKey].count++;
    if (pr.merged_at) contributorStats[pr.author].byRepo[repoKey].merged++;
  });
});

// Sort by total contributions
const sortedContributors = Object.entries(contributorStats)
  .map(([author, stats]) => ({
    author,
    total: stats.total,
    merged: stats.merged,
    mergeRate: ((stats.merged / stats.total) * 100).toFixed(1),
    byRepo: stats.byRepo,
    repoCount: Object.keys(stats.byRepo).length
  }))
  .sort((a, b) => b.total - a.total);

console.log('Top 25 Contributors Across All Repositories:\n');
console.log('Rank | Contributor | Total | Merged | Rate | Repos | Distribution');
console.log('-'.repeat(95));

sortedContributors.slice(0, 25).forEach((contrib, index) => {
  const distribution = Object.entries(contrib.byRepo)
    .map(([repo, stats]) => `${repo.split('-')[0][0].toUpperCase()}:${stats.count}`)
    .join(' ');

  console.log(
    `${String(index + 1).padStart(2)} | ` +
    `${contrib.author.padEnd(25).substring(0, 25)} | ` +
    `${String(contrib.total).padStart(5)} | ` +
    `${String(contrib.merged).padStart(6)} | ` +
    `${String(contrib.mergeRate + '%').padStart(4)} | ` +
    `${String(contrib.repoCount).padStart(5)} | ` +
    distribution
  );
});

console.log('\n' + '='.repeat(80) + '\n');

// Multi-repository contributors
console.log('🌐 MULTI-REPOSITORY CONTRIBUTORS\n');

const multiRepoContributors = sortedContributors.filter(c => c.repoCount > 1);

console.log(`Contributors working across multiple repos: ${multiRepoContributors.length}\n`);

console.log('Contributor | Total PRs | Component Lib | Design Sys Docs | Forms Library');
console.log('-'.repeat(85));

multiRepoContributors.slice(0, 20).forEach(contrib => {
  const cl = contrib.byRepo['component-library']?.count || 0;
  const ds = contrib.byRepo['design-system-docs']?.count || 0;
  const fl = contrib.byRepo['forms-library']?.count || 0;

  console.log(
    `${contrib.author.padEnd(25).substring(0, 25)} | ` +
    `${String(contrib.total).padStart(9)} | ` +
    `${String(cl).padStart(13)} | ` +
    `${String(ds).padStart(15)} | ` +
    `${String(fl).padStart(13)}`
  );
});

console.log('\n' + '='.repeat(80) + '\n');

// Repository specialists (contributors who focus on one repo)
console.log('🎯 REPOSITORY SPECIALISTS (Single-repo focus)\n');

const specialists = sortedContributors
  .filter(c => c.repoCount === 1 && c.total >= 10);

['component-library', 'design-system-docs', 'forms-library'].forEach(repoKey => {
  const repoSpecialists = specialists.filter(c => c.byRepo[repoKey]);
  if (repoSpecialists.length > 0) {
    console.log(`\n${repositories[repoKey].name}:`);
    repoSpecialists.slice(0, 5).forEach(contrib => {
      console.log(`   ${contrib.author.padEnd(30)}: ${contrib.total} PRs (${contrib.mergeRate}% merged)`);
    });
  }
});

console.log('\n' + '='.repeat(80) + '\n');

// Monthly comparison across repositories
console.log('📅 MONTHLY PR ACTIVITY COMPARISON\n');

const monthlyData = {};

Object.entries(repositories).forEach(([repoKey, repo]) => {
  repo.prs.forEach(pr => {
    const date = new Date(pr.created_at);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        'component-library': { count: 0, merged: 0 },
        'design-system-docs': { count: 0, merged: 0 },
        'forms-library': { count: 0, merged: 0 }
      };
    }

    monthlyData[monthKey][repoKey].count++;
    if (pr.merged_at) monthlyData[monthKey][repoKey].merged++;
  });
});

console.log('Month    | Comp Lib | Design Docs | Forms Lib | TOTAL | Overall Merge Rate');
console.log('-'.repeat(80));

Object.keys(monthlyData).sort().forEach(month => {
  const data = monthlyData[month];
  const total = data['component-library'].count + data['design-system-docs'].count + data['forms-library'].count;
  const totalMerged = data['component-library'].merged + data['design-system-docs'].merged + data['forms-library'].merged;
  const overallRate = ((totalMerged / total) * 100).toFixed(0);

  console.log(
    `${month} | ` +
    `${String(data['component-library'].count).padStart(8)} | ` +
    `${String(data['design-system-docs'].count).padStart(11)} | ` +
    `${String(data['forms-library'].count).padStart(9)} | ` +
    `${String(total).padStart(5)} | ` +
    `${String(overallRate + '%').padStart(18)}`
  );
});

console.log('\n' + '='.repeat(80) + '\n');

// Collaboration patterns
console.log('🤝 COLLABORATION PATTERNS\n');

const collaborationScore = multiRepoContributors.length / sortedContributors.length;

console.log(`Total unique contributors: ${sortedContributors.length}`);
console.log(`Multi-repo contributors: ${multiRepoContributors.length} (${(collaborationScore * 100).toFixed(1)}%)`);
console.log(`Single-repo contributors: ${sortedContributors.length - multiRepoContributors.length} (${((1 - collaborationScore) * 100).toFixed(1)}%)`);

// Find contributors who contribute to all three
const tripleContributors = multiRepoContributors.filter(c => c.repoCount === 3);
console.log(`\nContributors across all 3 repos: ${tripleContributors.length}`);

if (tripleContributors.length > 0) {
  console.log('\nTop contributors across all 3 repositories:');
  tripleContributors.slice(0, 10).forEach((contrib, i) => {
    const cl = contrib.byRepo['component-library']?.count || 0;
    const ds = contrib.byRepo['design-system-docs']?.count || 0;
    const fl = contrib.byRepo['forms-library']?.count || 0;
    console.log(`   ${i + 1}. ${contrib.author.padEnd(30)}: CL:${cl} DS:${ds} FL:${fl} (${contrib.total} total)`);
  });
}

console.log('\n' + '='.repeat(80) + '\n');

// Repository health comparison
console.log('🏥 REPOSITORY HEALTH METRICS\n');

console.log('Metric                        | Comp Library | Design Docs | Forms Library');
console.log('-'.repeat(80));

// Calculate metrics
const metrics = {};
Object.entries(repositories).forEach(([key, repo]) => {
  const merged = repo.prs.filter(pr => pr.merged_at).length;
  const mergeRate = ((merged / repo.prs.length) * 100).toFixed(1);

  const contributors = {};
  repo.prs.forEach(pr => {
    contributors[pr.author] = (contributors[pr.author] || 0) + 1;
  });

  const topContrib = Object.values(contributors).sort((a, b) => b - a)[0] || 0;
  const concentration = ((topContrib / repo.prs.length) * 100).toFixed(1);

  metrics[key] = {
    mergeRate,
    uniqueContributors: Object.keys(contributors).length,
    avgPRsPerContributor: (repo.prs.length / Object.keys(contributors).length).toFixed(1),
    topContributorPct: concentration
  };
});

console.log(
  `${'Total PRs'.padEnd(29)} | ` +
  `${String(repositories['component-library'].prs.length).padStart(12)} | ` +
  `${String(repositories['design-system-docs'].prs.length).padStart(11)} | ` +
  `${String(repositories['forms-library'].prs.length).padStart(13)}`
);

console.log(
  `${'Merge Rate'.padEnd(29)} | ` +
  `${String(metrics['component-library'].mergeRate + '%').padStart(12)} | ` +
  `${String(metrics['design-system-docs'].mergeRate + '%').padStart(11)} | ` +
  `${String(metrics['forms-library'].mergeRate + '%').padStart(13)}`
);

console.log(
  `${'Unique Contributors'.padEnd(29)} | ` +
  `${String(metrics['component-library'].uniqueContributors).padStart(12)} | ` +
  `${String(metrics['design-system-docs'].uniqueContributors).padStart(11)} | ` +
  `${String(metrics['forms-library'].uniqueContributors).padStart(13)}`
);

console.log(
  `${'Avg PRs per Contributor'.padEnd(29)} | ` +
  `${String(metrics['component-library'].avgPRsPerContributor).padStart(12)} | ` +
  `${String(metrics['design-system-docs'].avgPRsPerContributor).padStart(11)} | ` +
  `${String(metrics['forms-library'].avgPRsPerContributor).padStart(13)}`
);

console.log(
  `${'Top Contributor %'.padEnd(29)} | ` +
  `${String(metrics['component-library'].topContributorPct + '%').padStart(12)} | ` +
  `${String(metrics['design-system-docs'].topContributorPct + '%').padStart(11)} | ` +
  `${String(metrics['forms-library'].topContributorPct + '%').padStart(13)}`
);

console.log('\n' + '='.repeat(80) + '\n');

// Key insights
console.log('💡 KEY INSIGHTS\n');

// Find highest and lowest performing repos
const reposByMergeRate = Object.entries(repositories)
  .map(([key, repo]) => ({
    key,
    name: repo.name,
    mergeRate: parseFloat(metrics[key].mergeRate)
  }))
  .sort((a, b) => b.mergeRate - a.mergeRate);

console.log(`1. Merge Rate Variance:`);
console.log(`   Highest: ${reposByMergeRate[0].name} (${reposByMergeRate[0].mergeRate}%)`);
console.log(`   Lowest: ${reposByMergeRate[2].name} (${reposByMergeRate[2].mergeRate}%)`);
console.log(`   Variance: ${(reposByMergeRate[0].mergeRate - reposByMergeRate[2].mergeRate).toFixed(1)}% difference\n`);

console.log(`2. Contributor Distribution:`);
console.log(`   Multi-repo contributors: ${multiRepoContributors.length} (${(collaborationScore * 100).toFixed(1)}%)`);
console.log(`   All 3 repos: ${tripleContributors.length} contributors`);
console.log(`   Single-repo specialists: ${sortedContributors.length - multiRepoContributors.length}\n`);

console.log(`3. Overall Activity:`);
console.log(`   Total PRs across all repos: ${totalPRs}`);
console.log(`   Total merged: ${totalMerged} (${((totalMerged / totalPRs) * 100).toFixed(1)}%)`);
console.log(`   Average per month: ${(totalPRs / 12).toFixed(0)} PRs`);
console.log(`   Average per week: ${(totalPRs / 52).toFixed(0)} PRs\n`);

// Save comprehensive analysis
const analysis = {
  summary: {
    totalPRs,
    totalMerged,
    overallMergeRate: ((totalMerged / totalPRs) * 100).toFixed(1),
    dateRange: '2025-04-01 to 2026-03-31',
    repositories: Object.keys(repositories).length,
    uniqueContributors: sortedContributors.length,
    multiRepoContributors: multiRepoContributors.length,
    tripleRepoContributors: tripleContributors.length
  },
  repositories: Object.entries(repositories).map(([key, repo]) => ({
    key,
    name: repo.name,
    repo: repo.repo,
    focus: repo.focus,
    totalPRs: repo.prs.length,
    merged: repo.prs.filter(pr => pr.merged_at).length,
    mergeRate: metrics[key].mergeRate + '%',
    uniqueContributors: metrics[key].uniqueContributors,
    topContributorPct: metrics[key].topContributorPct + '%'
  })),
  topContributors: sortedContributors.slice(0, 50).map(c => ({
    author: c.author,
    total: c.total,
    merged: c.merged,
    mergeRate: c.mergeRate + '%',
    repoCount: c.repoCount,
    byRepo: Object.entries(c.byRepo).map(([repo, stats]) => ({
      repo,
      count: stats.count,
      merged: stats.merged
    }))
  })),
  multiRepoContributors: multiRepoContributors.slice(0, 30).map(c => ({
    author: c.author,
    total: c.total,
    componentLibrary: c.byRepo['component-library']?.count || 0,
    designSystemDocs: c.byRepo['design-system-docs']?.count || 0,
    formsLibrary: c.byRepo['forms-library']?.count || 0
  })),
  tripleRepoContributors: tripleContributors.map(c => ({
    author: c.author,
    total: c.total,
    componentLibrary: c.byRepo['component-library']?.count || 0,
    designSystemDocs: c.byRepo['design-system-docs']?.count || 0,
    formsLibrary: c.byRepo['forms-library']?.count || 0
  })),
  monthlyData
};

fs.writeFileSync('cross-repo-analysis.json', JSON.stringify(analysis, null, 2));
console.log('✅ Saved cross-repository analysis to: cross-repo-analysis.json\n');

// Create CSV of contributors
const csvHeader = 'Contributor,Total PRs,Merge Rate,Repos,Component Library,Design System Docs,Forms Library\n';
const csvRows = sortedContributors.slice(0, 50).map(c => {
  const cl = c.byRepo['component-library']?.count || 0;
  const ds = c.byRepo['design-system-docs']?.count || 0;
  const fl = c.byRepo['forms-library']?.count || 0;
  return `${c.author},${c.total},${c.mergeRate}%,${c.repoCount},${cl},${ds},${fl}`;
}).join('\n');

fs.writeFileSync('cross-repo-contributors.csv', csvHeader + csvRows);
console.log('✅ Saved contributor CSV to: cross-repo-contributors.csv\n');
