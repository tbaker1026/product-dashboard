# VA Forms Library PR Analysis

Comprehensive analysis of 422 pull requests labeled "forms-library" from the vets-website repository, including label-based analysis and GitHub issue tracking assessment.

## 🎯 Key Findings

- **422 PRs analyzed** across April 2025 - March 2026
- **67.1% merge rate** (283 merged) - ⚠️ CONCERN: Lower than other repos
- **13 themes** identified (content-based)
- **Only 13 unique labels** (minimal taxonomy)
- **86% of PRs** have only "forms-library" label
- **84.6% of PRs** don't link to GitHub issues
- **23 different forms** actively worked on
- **40.5% of PRs from single contributor** - High concentration risk

## 🔴 Critical Findings from Label Analysis

### 1. Minimal Label Usage
- **Only 13 unique labels** across 422 PRs
- **1.14 average labels per PR** (industry standard: 3-5)
- **86% of PRs** have only the "forms-library" label
- **<1% have work type labels** (feature/bug/etc.)

### 2. Poor Issue Tracking
- **Only 15.4%** of PRs link to GitHub issues
- **84.6% have no issue link** (target: <20%)
- **No traceability** from issue → PR → deployment
- **Lost context** in PR reviews

### 3. Blocked PRs Problem
- **29 PRs blocked** (7% of all PRs):
  - 26 with "DO NOT MERGE" (0% merged)
  - 3 with "Stale" (0% merged)
- **23% of unmerged PRs** are explicitly blocked
- Suggests process/communication issues

### 4. Team-Specific Performance
- **dependents-benefits**: 7 PRs, 57% merge rate ⚠️
  - With frontend: 5 PRs, 40% merge rate (critical)
- **pension-benefits**: 2 PRs, 100% merge rate ✅
- **frontend label**: 11 PRs, 64% merge rate ⚠️

## 📊 Analysis Results

### Overall Metrics
- **Total PRs:** 422
- **Merged:** 283 (67.1%)
- **Open:** 14
- **Closed without merge:** 125 (29.6% rejection rate)
- **Average PRs/month:** 35
- **Unique labels:** 13 (critically low)
- **PRs linking issues:** 65 (15.4%)

### Label Inventory (All 13 Labels)

| Rank | Label | PRs | Merge Rate | Category |
|------|-------|-----|------------|----------|
| 1 | forms-library | 422 | 67.1% | Filter label |
| 2 | DO NOT MERGE | 26 | 0.0% | ⚠️ Blocker |
| 3 | frontend | 11 | 63.6% | Technical |
| 4 | dependents-benefits | 7 | 57.1% | Team |
| 5 | platform | 4 | 75.0% | Technical |
| 6 | Stale | 3 | 0.0% | ⚠️ Blocker |
| 7 | enhancement | 2 | 100.0% | Work type |
| 8 | pension-benefits | 2 | 100.0% | Team |
| 9-13 | Various | 1 each | Mixed | - |

### Top 5 Themes (Content-Based Analysis)
1. **Testing** - 342 PRs (81%)
2. **Routing & Navigation** - 253 PRs (60%)
3. **Component Updates** - 239 PRs (57%)
4. **Bug Fixes** - 199 PRs (47%)
5. **Review Page** - 197 PRs (47%)

### Most Active Forms
1. **21-4140** - 16 PRs (81% merge rate)
2. **contact** - 6 PRs (100% merge rate)
3. **pension** - 6 PRs (33% merge rate - ⚠️ concern)

### Top Contributors
1. **rhasselle-oddball** - 171 PRs (40.5%)
2. **it-harrison** - 113 PRs (26.8%)
3. **cadibemma** - 54 PRs (12.8%)

## 📈 Monthly Trend

| Month | PRs | Merged | Rate | Status |
|-------|-----|--------|------|--------|
| Apr 2025 | 30 | 14 | 47% | 🔴 Poor |
| May 2025 | 36 | 19 | 53% | 🔴 Poor |
| Jun 2025 | 42 | 23 | 55% | 🔴 Below target |
| Jul 2025 | 23 | 17 | 74% | 🟡 Improving |
| Aug 2025 | 20 | 16 | 80% | ✅ Good |
| Sep 2025 | 50 | 33 | 66% | 🟡 Moderate |
| Oct 2025 | 57 | 44 | 77% | ✅ Good |
| Nov 2025 | 46 | 35 | 76% | ✅ Good |
| Dec 2025 | 38 | 25 | 66% | 🟡 Holiday |
| Jan 2026 | 28 | 23 | 82% | ✅ Excellent |
| Feb 2026 | 37 | 28 | 76% | ✅ Good |
| Mar 2026 | 15 | 6 | 40% | 🔴 CRITICAL |

## 💡 Key Recommendations

### Immediate Actions (This Week)

1. **Review 29 Blocked PRs**
   - Close or convert 26 "DO NOT MERGE" PRs
   - Close or revive 3 "Stale" PRs
   - Document why PRs are marked DNM

2. **Create Label Taxonomy**
   - Define required vs optional labels
   - Create labels in repository
   - Document label usage in CONTRIBUTING.md

3. **Establish Issue Linking Policy**
   - Require issue links for all PRs (80% target)
   - Add PR template with issue link field
   - Train team on GitHub keywords (Fixes #, Closes #)

### High Priority (Q2 2026)

1. **Address low merge rate**
   - Implement PR checklist and "definition of ready"
   - Interview contributors about rejection reasons
   - Weekly merge rate review in team meetings
   - Target: 80%+ merge rate

2. **Implement Label Requirements**
   - PR template requires work type label
   - CI check for required labels
   - Bot adds labels based on file changes
   - Target: 3+ labels per PR

3. **Improve Issue Tracking**
   - Require issue before PR (with exceptions)
   - Issue templates for different work types
   - Link tracking in weekly metrics
   - Target: 80% PRs link to issues

4. **Reduce contributor concentration**
   - Cross-train 3 additional contributors
   - Document tribal knowledge from top contributors
   - Implement pair programming
   - Target: Top 2 < 50% of PRs

5. **Support dependents-benefits Team**
   - Meet with team to understand blockers
   - Review their 3 unmerged PRs
   - Provide frontend pairing/support
   - Target: 80%+ merge rate for this team

6. **Increase accessibility focus**
   - Full a11y audit of forms library
   - Create improvement backlog
   - Require a11y review for all form PRs
   - Target: 5% of PRs dedicated to accessibility

7. **Address performance gap**
   - Establish performance baselines
   - Set performance budgets
   - Add performance testing to CI/CD
   - Target: 2% of PRs dedicated to performance

### Medium Priority (Q3 2026)
1. **Enhanced Labeling** - Add priority, size, status labels
2. **Improve documentation** - 100% feature coverage
3. **Web component migration** - Target 100% by Q4 2026
4. **Metrics & Dashboards** - Track by label, identify bottlenecks
5. **Automation** - Auto-label, auto-assign, auto-close stale

## 📋 Files

### Original Analysis
- `FORMS_LIBRARY_ANALYSIS_REPORT.md` - Comprehensive PR analysis
- `forms-library-analysis.json` - Structured data with metrics
- `forms-library-analysis.csv` - Spreadsheet of forms
- `forms-library-prs-2025-2026.json` - Raw PR data (422 PRs)
- `fetch-forms-library-prs-search.js` - GitHub API fetcher
- `analyze-forms-library.js` - Analysis script

### Label-Based Analysis (NEW!)
- `FORMS_LIBRARY_LABEL_ANALYSIS.md` - Label & issue tracking analysis
- `forms-library-label-analysis.json` - Structured label data
- `forms-library-labels.csv` - Label inventory spreadsheet
- `forms-library-label-report.md` - Category-based report
- `analyze-forms-library-by-labels.js` - Label analysis script

## 🎯 Success Metrics Framework

### Label & Process Metrics (NEW!)

#### Label Usage Targets
| Metric | Current | Q2 2026 | Q4 2026 |
|--------|---------|---------|---------|
| Avg labels per PR | 1.14 | 3.0 | 4.0 |
| PRs with work type label | <1% | 90% | 95% |
| PRs linking issues | 15.4% | 60% | 80% |
| PRs with team label | 2% | 40% | 60% |
| Blocked PRs | 29 (7%) | <10 (2%) | <5 (1%) |

#### Process Metrics
1. **Issue → PR Traceability**: Current 15.4% → Target 80%
2. **Label Coverage**: Current 14% have 2+ labels → Target 100%
3. **Stale PR Reduction**: Current 3 → Target 0
4. **DNM PR Hygiene**: Current 26 → Target <5

### Original Metrics

#### Tier 1: Business Impact
- Form Completion Rate (Target: >80% simple, >60% complex)
- Forms Library Adoption (Target: 100% new forms)
- Development Velocity (Target: 30% reduction)
- Cost Savings (Target: $1M annual)

#### Tier 2: Product Quality
- Defect Density (Target: <0.5 bugs/form/month)
- Test Coverage (Target: >90% critical, >80% overall)
- Accessibility (Target: 100% WCAG 2.1 AA)
- Performance (Target: <3s load on 3G, <200 KB bundle)

#### Tier 3: Developer Experience
- Developer Satisfaction (Target: NPS > 40)
- Time to First Form (Target: <5 days)
- Documentation Quality (Target: 100% coverage)
- Support Burden (Target: <20 questions/month)

#### Tier 4: Operational
- **PR Merge Rate** (Target: >80%, Current: 67.1%)
- PR Velocity (Target: 35+/month at >80% merge)
- Review Time (Target: <48 hours)
- Build Health (Target: >95% passing)

## 🔍 Comparison with Other Repositories

| Metric | Forms Library | Component Library | Design System Docs |
|--------|---------------|-------------------|-------------------|
| Merge Rate | **67.1%** ⚠️ | 79.4% | 86.6% |
| Top Contributor % | **40.5%** ⚠️ | 18.1% | 26.4% |
| Testing Focus | **81%** | 34% | 17% |
| Unique Labels | **13** ⚠️ | - | - |
| Avg Labels/PR | **1.14** ⚠️ | - | - |
| PRs Link Issues | **15.4%** ⚠️ | - | - |

## 📚 Recommended Label Taxonomy

### Must Have (Every PR)
- **Work type**: feature/bug/refactor/docs/test/chore
- **Area**: forms-library (already have)
- **Issue link**: Fixes #123, Closes #456

### Should Have (Most PRs)
- **Team/domain**: dependents/pension/healthcare/platform
- **Size**: XS/S/M/L/XL (for planning)

### Could Have (As Applicable)
- **Priority**: critical/high/medium/low
- **Quality**: accessibility/performance/security
- **Status**: blocked/needs-review/ready-to-merge
- **Breaking**: breaking-change

### Automated (Bot Applied)
- **Auto-label**: Based on files changed
- **Auto-team**: Based on CODEOWNERS
- **Auto-size**: Based on lines changed

## Analysis Date

**Generated:** March 16, 2026
**Repository:** vets-website (forms-library label only)
**Date Range:** April 1, 2025 - March 31, 2026

---

**Related Analysis:**
- [Component Library Analysis](../component-library-analysis/) - 475 PRs, 59 components, component focus
- [Design System Docs Analysis](../pr-analysis/) - 641 PRs, documentation focus
- [File Input Comparison](../file-input-comparison/) - FileField vs va-file-input-multiple
- [Prefill Pattern Analysis](../prefill-pattern-analysis/) - 6 prefill variations
