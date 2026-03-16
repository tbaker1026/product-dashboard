# VA Forms Library PR Analysis

Analysis of 422 pull requests labeled "forms-library" from the vets-website repository.

## 🎯 Key Findings

- **422 PRs analyzed** across April 2025 - March 2026
- **67.1% merge rate** (283 merged) - ⚠️ CONCERN: Lower than other repos
- **13 distinct themes** identified
- **23 different forms** actively worked on
- **40.5% of PRs from single contributor** - High concentration risk

## 📊 Analysis Results

### Overall Metrics
- **Total PRs:** 422
- **Merged:** 283 (67.1%)
- **Open:** 14
- **Closed without merge:** 125 (29.6% rejection rate)
- **Average PRs/month:** 35

### Top 5 Themes
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

## 🔴 Critical Concerns

### 1. Low Merge Rate (67.1%)
- Significantly below Component Library (79.4%) and Design System Docs (86.6%)
- 125 PRs closed without merge = wasted effort
- Indicates unclear requirements, incomplete work, or process issues

### 2. March 2026 Decline
- **Only 40% merge rate** (6 of 15 PRs)
- Dramatic drop from January's 82%
- Needs immediate investigation

### 3. Contributor Concentration Risk
- Top 2 contributors = 67% of all PRs
- Single points of failure
- Knowledge concentration
- Burnout risk

### 4. Under-Prioritized Areas
- **Accessibility:** Only 9 PRs (2%), 67% merge rate
- **Performance:** Only 2 PRs (0.5%), 50% merge rate
- **Documentation:** Only 3 explicit doc PRs

### 5. April-June 2025 Struggle
- Merge rates of 47-55% for three consecutive months
- Team struggled significantly in Q2 2025

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
1. **Investigate March 2026 decline** - Review all 15 PRs and closure reasons
2. **Review 125 rejected PRs** - Identify patterns in closures
3. **Set merge rate target** - Establish 80%+ target and track weekly

### High Priority (Q2 2026)
1. **Address low merge rate**
   - Implement PR checklist and "definition of ready"
   - Interview contributors about rejection reasons
   - Weekly merge rate review in team meetings

2. **Reduce contributor concentration**
   - Cross-train 3 additional contributors
   - Document tribal knowledge from top contributors
   - Implement pair programming

3. **Increase accessibility focus**
   - Full a11y audit of forms library
   - Create improvement backlog
   - Require a11y review for all form PRs
   - Target: 5% of PRs dedicated to accessibility

4. **Address performance gap**
   - Establish performance baselines
   - Set performance budgets
   - Add performance testing to CI/CD
   - Target: 2% of PRs dedicated to performance

5. **Improve testing merge rate**
   - Review rejected test PRs
   - Create test quality guidelines
   - Target: 85%+ merge rate for tests

### Medium Priority (Q3 2026)
1. **Standardize commit messages** - Adopt conventional commits
2. **Improve documentation** - 100% feature coverage
3. **Web component migration** - Target 100% by Q4 2026

## 📋 Files

- `FORMS_LIBRARY_ANALYSIS_REPORT.md` - Comprehensive analysis report
- `forms-library-analysis.json` - Structured data with metrics
- `forms-library-analysis.csv` - Spreadsheet of forms
- `forms-library-prs-2025-2026.json` - Raw PR data (422 PRs)
- `fetch-forms-library-prs-search.js` - GitHub API fetcher
- `analyze-forms-library.js` - Analysis script

## 🎯 Success Metrics Framework

### Tier 1: Business Impact
- Form Completion Rate (Target: >80% simple, >60% complex)
- Forms Library Adoption (Target: 100% new forms)
- Development Velocity (Target: 30% reduction)
- Cost Savings (Target: $1M annual)

### Tier 2: Product Quality
- Defect Density (Target: <0.5 bugs/form/month)
- Test Coverage (Target: >90% critical, >80% overall)
- Accessibility (Target: 100% WCAG 2.1 AA)
- Performance (Target: <3s load on 3G, <200 KB bundle)

### Tier 3: Developer Experience
- Developer Satisfaction (Target: NPS > 40)
- Time to First Form (Target: <5 days)
- Documentation Quality (Target: 100% coverage)
- Support Burden (Target: <20 questions/month)

### Tier 4: Operational
- PR Merge Rate (Target: >80%, Current: 67.1%)
- PR Velocity (Target: 35+/month at >80% merge)
- Review Time (Target: <48 hours)
- Build Health (Target: >95% passing)

## 🔍 Comparison with Other Repositories

| Metric | Forms Library | Component Library | Design System Docs |
|--------|---------------|-------------------|-------------------|
| Merge Rate | **67.1%** ⚠️ | 79.4% | 86.6% |
| Top Contributor % | **40.5%** ⚠️ | 18.1% | 26.4% |
| Testing Focus | **81%** | 34% | 17% |

## Analysis Date

**Generated:** March 16, 2026
**Repository:** vets-website (forms-library label only)
**Date Range:** April 1, 2025 - March 31, 2026

---

**Related Analysis:**
- [Component Library Analysis](../component-library-analysis/) - 475 PRs, component focus
- [Design System Docs Analysis](../pr-analysis/) - 641 PRs, documentation focus
- [File Input Comparison](../file-input-comparison/) - FileField vs va-file-input-multiple
- [Prefill Pattern Analysis](../prefill-pattern-analysis/) - 6 prefill variations
