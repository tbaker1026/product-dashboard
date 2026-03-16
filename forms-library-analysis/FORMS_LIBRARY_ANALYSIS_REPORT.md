# VA Forms Library PR Analysis & Metrics
## vets-website Repository - "forms-library" Label
## April 2025 - March 2026

**Analysis Date:** March 16, 2026
**Repository:** vets-website
**Filter:** PRs with "forms-library" label
**Total PRs Analyzed:** 422
**Date Range:** April 1, 2025 - March 31, 2026

---

## Executive Summary

Over the past 12 months, the Forms Library team (vets-website) merged **283 pull requests** with the "forms-library" label across 13 major themes. **Testing** (81%), **Routing & Navigation** (60%), and **Component Updates** (57%) dominated the work. The team averaged **35 PRs per month** with a **67.1% merge rate**.

### Key Highlights

- ✅ **67.1% merge rate** (283 merged / 422 total)
- 📈 **Average 35 PRs/month**
- 👥 **Top 2 contributors** accounting for 67% of PRs
- 📊 **13 distinct work themes** identified
- 📝 **23 different forms** actively worked on
- ⚠️ **Lower merge rate** than Component Library (67% vs 79%)

### Critical Concerns

- 🔴 **Low merge rate** - 67% is significantly below industry standard (80%+)
- 🔴 **March 2026 decline** - Only 40% merge rate (6 of 15 PRs)
- 🔴 **High PR rejection** - 125 PRs closed without merge (30%)
- 🔴 **April-June 2025 struggle** - Merge rates 47-55%

---

## Theme Analysis

### 1. Testing (81% of PRs)
**342 PRs | 229 Merged | 67% Merge Rate**

#### Description
Unit tests, integration tests, E2E tests using Cypress, Jest, and test infrastructure updates.

#### Why It Matters
Testing is the foundation of forms library reliability. Given that forms process veteran benefits, testing is critical for correctness.

#### Success Metrics
- **Test Coverage**: % of forms library code covered by tests
  - Target: >90% for critical paths, >80% overall
  - Measure: Jest coverage reports

- **E2E Test Coverage**: % of form flows with E2E tests
  - Target: 100% of form submission flows
  - Measure: Cypress test inventory

- **Test Pass Rate**: % of tests passing on first run
  - Target: >98%
  - Measure: CI/CD pipeline metrics

- **Flaky Test Rate**: % of tests with intermittent failures
  - Target: <2%
  - Measure: Test execution history

- **Test Execution Time**: Minutes to run full test suite
  - Target: <15 minutes
  - Measure: CI/CD duration

#### Current Performance
- **Volume**: 342 PRs (highest theme by far)
- **Merge Rate**: 67% (CONCERN - tests should have higher merge rate)
- **Key Insight**: High test PR volume suggests either comprehensive testing culture or lots of test fixes

---

### 2. Routing & Navigation (60% of PRs)
**253 PRs | 184 Merged | 73% Merge Rate**

#### Description
Form routing, page navigation, chapter flow, step progression, URL handling.

#### Why It Matters
Proper routing ensures veterans can navigate forms intuitively and resume where they left off.

#### Success Metrics
- **Navigation Errors**: Rate of navigation-related bugs
  - Target: <0.1% of form submissions
  - Measure: Sentry error tracking

- **Save in Progress Success**: % of successful SIP resume operations
  - Target: >99%
  - Measure: Analytics tracking

- **Deep Link Reliability**: % of direct URL navigations working correctly
  - Target: 100%
  - Measure: E2E tests

---

### 3. Component Updates (57% of PRs)
**239 PRs | 184 Merged | 77% Merge Rate**

#### Description
Updates to form components, fields, inputs, and form-specific UI elements.

#### Why It Matters
Form components must work correctly for veterans to submit applications successfully.

#### Success Metrics
- **Component Error Rate**: Errors per 1000 component renders
  - Target: <1 error/1000 renders
  - Measure: Sentry + analytics

- **Cross-Browser Compatibility**: % of components working across browsers
  - Target: 100% on supported browsers
  - Measure: BrowserStack test results

- **Mobile Responsiveness**: % of components working on mobile
  - Target: 100%
  - Measure: Mobile E2E tests

---

### 4. Bug Fixes (47% of PRs)
**199 PRs | 163 Merged | 82% Merge Rate**

#### Description
Fixes for defects in forms library functionality, incorrect behavior, data issues.

#### Why It Matters
Bugs in forms can prevent veterans from accessing benefits. High bug count suggests quality issues.

#### Success Metrics
- **Mean Time To Fix (MTTF)**: Days from bug report to fix in production
  - Target: <5 days for critical, <14 days for high
  - Current: Needs measurement

- **Bug Escape Rate**: % of bugs found in production vs caught in testing
  - Target: <10% escape to production
  - Measure: Bug source tracking

- **Recurrence Rate**: % of bugs that reoccur after fix
  - Target: <5%
  - Measure: Bug tracking history

- **Bug Backlog Age**: Average age of open bugs
  - Target: <30 days
  - Measure: Jira/GitHub issues

#### Current Performance
- **Volume**: 199 PRs (47% of all work)
- **Merge Rate**: 82% (best among major themes!)
- **Key Concern**: High volume suggests quality issues upstream

---

### 5. Review Page (47% of PRs)
**197 PRs | 165 Merged | 84% Merge Rate**

#### Description
Form review/summary pages where veterans confirm their information before submission.

#### Why It Matters
Review pages are the last chance to catch errors before submission. Critical for data accuracy.

#### Success Metrics
- **Review Page Completion Rate**: % of veterans who reach review page and submit
  - Target: >85%
  - Measure: Analytics funnel

- **Error Discovery Rate**: % of errors caught at review vs earlier
  - Target: <20% (most errors caught earlier)
  - Measure: Error tracking by page

- **Edit Success Rate**: % of successful edits made from review page
  - Target: >95%
  - Measure: Analytics tracking

---

### 6. Config & Setup (35% of PRs)
**149 PRs | 108 Merged | 72% Merge Rate**

#### Description
Form configuration, manifest files, form initialization, setup code.

#### Why It Matters
Configuration determines form behavior, validation rules, and submission handling.

#### Success Metrics
- **Configuration Errors**: Count of misconfiguration bugs
  - Target: 0 per quarter
  - Measure: Bug tracking

- **Form Initialization Time**: Milliseconds to load form config
  - Target: <500ms
  - Measure: Performance monitoring

---

### 7. Documentation (28% of PRs)
**116 PRs | 98 Merged | 84% Merge Rate**

#### Description
Forms library documentation, guides, examples, API docs.

#### Why It Matters
Documentation enables form developers to use the library correctly.

#### Success Metrics
- **Documentation Coverage**: % of forms library features documented
  - Target: 100%
  - Measure: Doc coverage audit

- **Doc Accuracy**: % of docs matching current implementation
  - Target: >95%
  - Measure: Quarterly audit

- **Developer Satisfaction**: NPS for forms library docs
  - Target: >40
  - Measure: Quarterly survey

---

### 8. Form Patterns (15% of PRs)
**63 PRs | 50 Merged | 79% Merge Rate**

#### Description
Reusable form patterns, templates, boilerplate code, scaffolding.

#### Why It Matters
Patterns accelerate form development and ensure consistency.

#### Success Metrics
- **Pattern Usage**: % of new forms using established patterns
  - Target: >80%
  - Measure: Form inventory audit

- **Pattern Adoption Time**: Days from pattern release to first use
  - Target: <30 days
  - Measure: Usage tracking

- **Time Savings**: Hours saved vs custom implementation
  - Target: 8 hours per form
  - Measure: Developer estimates

---

### 9. Web Components Migration (12% of PRs)
**52 PRs | 35 Merged | 67% Merge Rate**

#### Description
Migrating from legacy components to modern web components (va-* components).

#### Why It Matters
Web components provide better consistency, accessibility, and maintainability.

#### Success Metrics
- **Migration Progress**: % of forms using web components
  - Current: Needs measurement
  - Target: 100% by Q4 2026
  - Measure: Form inventory scan

- **Web Component Coverage**: % of form fields using web components
  - Target: >90%
  - Measure: Codebase analysis

- **Migration Velocity**: Forms migrated per quarter
  - Target: 5+ forms per quarter
  - Measure: Migration tracking

#### Current Performance
- **Merge Rate**: 67% (CONCERN - same as overall average)
- **Key Insight**: Migration work is challenging, reflected in merge rate

---

### 10. Validation (12% of PRs)
**51 PRs | 42 Merged | 82% Merge Rate**

#### Description
Form validation rules, error messages, schema validation, validation patterns.

#### Why It Matters
Validation prevents bad data submission and guides veterans to correct input.

#### Success Metrics
- **Validation Error Clarity**: % of error messages understood by veterans
  - Target: >90%
  - Measure: Usability testing

- **False Positive Rate**: % of valid inputs rejected
  - Target: <1%
  - Measure: Error analysis

- **Validation Coverage**: % of fields with validation
  - Target: 100% for required fields
  - Measure: Schema audit

---

### 11. Prefill & Save in Progress (7% of PRs)
**28 PRs | 24 Merged | 86% Merge Rate**

#### Description
Form prefilling from profile data, save in progress functionality, draft saving.

#### Why It Matters
Prefill and SIP reduce veteran burden and increase form completion rates.

#### Success Metrics
- **Prefill Success Rate**: % of successful prefill operations
  - Target: >99%
  - Measure: Analytics

- **SIP Usage Rate**: % of veterans using save in progress
  - Target: >30%
  - Measure: Analytics

- **SIP Resume Success**: % of successful form resumes from SIP
  - Target: >98%
  - Measure: Analytics

- **Data Freshness**: % of prefilled data that's current
  - Target: >95%
  - Measure: Data quality checks

---

### 12. Accessibility (2% of PRs)
**9 PRs | 6 Merged | 67% Merge Rate**

#### Description
WCAG compliance, ARIA attributes, keyboard navigation, screen reader support.

#### Why It Matters
Accessibility is legally required and ensures all veterans can access benefits.

#### Success Metrics
- **WCAG Compliance Rate**: % of forms meeting WCAG 2.1 AA
  - Target: 100%
  - Measure: Automated + manual audits

- **A11y Issues**: Count by severity
  - Target: 0 critical/high severity issues
  - Measure: Accessibility testing

- **Keyboard Navigation**: % of forms fully keyboard accessible
  - Target: 100%
  - Measure: Manual testing

#### Current Performance
- **Volume**: Only 9 PRs (2% - VERY LOW)
- **Merge Rate**: 67% (CONCERN)
- **Critical Gap**: Accessibility work is under-prioritized

---

### 13. Performance (0.5% of PRs)
**2 PRs | 1 Merged | 50% Merge Rate**

#### Description
Performance optimizations, speed improvements, bundle size reduction.

#### Why It Matters
Form performance affects completion rates, especially for veterans with slow connections.

#### Success Metrics
- **Page Load Time**: Time to interactive for form pages
  - Target: <3 seconds on 3G
  - Measure: Lighthouse, real user monitoring

- **Form Bundle Size**: KB for forms library code
  - Target: <200 KB
  - Measure: Bundle analysis

- **Time to First Input**: Milliseconds until form is interactive
  - Target: <2 seconds
  - Measure: Performance monitoring

#### Current Performance
- **Volume**: Only 2 PRs (CRITICAL GAP)
- **Merge Rate**: 50% (1 of 2 merged)
- **Critical Gap**: Performance work is severely under-prioritized

---

## Forms Analysis

### Top 10 Forms by PR Activity

| Rank | Form | Total PRs | Merged | Merge Rate | Top Type | Notes |
|------|------|-----------|--------|------------|----------|-------|
| 1 | 21-4140 | 16 | 13 | 81% | Other | Most active form |
| 2 | contact | 6 | 6 | 100% | Update | Contact form |
| 3 | pension | 6 | 2 | 33% | Other | ⚠️ Low merge rate |
| 4 | 21-4138 | 4 | 3 | 75% | Feature | Moderate activity |
| 5 | 21-4142 | 4 | 2 | 50% | Other | ⚠️ Low merge rate |
| 6 | disability | 3 | 3 | 100% | Bug Fix | High quality |
| 7-23 | Various | 1-2 | - | 100% | Mixed | Light activity |

### Key Insights
- **Form 21-4140** dominates with 16 PRs (4% of all forms-library PRs)
- **Pension form** has concerning 33% merge rate (2 of 6 PRs merged)
- **Most forms** have 1-2 PRs (sporadic maintenance)
- **23 different forms** worked on (broad coverage)

---

## Monthly Breakdown

| Month | Total PRs | Merged | Merge Rate | Status |
|-------|-----------|--------|------------|--------|
| **Apr 2025** | 30 | 14 | 47% | 🔴 Poor start |
| **May 2025** | 36 | 19 | 53% | 🔴 Still struggling |
| **Jun 2025** | 42 | 23 | 55% | 🔴 Below target |
| **Jul 2025** | 23 | 17 | 74% | 🟡 Improving |
| **Aug 2025** | 20 | 16 | 80% | ✅ Good |
| **Sep 2025** | 50 | 33 | 66% | 🟡 Moderate |
| **Oct 2025** | 57 | 44 | 77% | ✅ Good |
| **Nov 2025** | 46 | 35 | 76% | ✅ Good |
| **Dec 2025** | 38 | 25 | 66% | 🟡 Holiday impact |
| **Jan 2026** | 28 | 23 | 82% | ✅ Excellent |
| **Feb 2026** | 37 | 28 | 76% | ✅ Good |
| **Mar 2026** | 15 | 6 | 40% | 🔴 CRITICAL decline |

### Insights
- **Q2 2025 (Apr-Jun)**: Struggled with 47-55% merge rates
- **Q3 2025 (Jul-Sep)**: Improved to 66-80%
- **Q4 2025 (Oct-Dec)**: Solid 66-77%
- **Q1 2026 (Jan-Mar)**: Mixed - Jan excellent (82%), Mar critical (40%)
- **March 2026**: Partial month, but 40% is alarming

---

## Top Contributors

| Rank | Contributor | PRs | % of Total | Impact |
|------|-------------|-----|------------|--------|
| 1 | rhasselle-oddball | 171 | 40.5% | **Dominant contributor** - 40% of all PRs |
| 2 | it-harrison | 113 | 26.8% | Major contributor |
| 3 | cadibemma | 54 | 12.8% | Significant contributor |
| 4 | dustin-cintron | 32 | 7.6% | Regular contributor |
| 5 | dominicpadula1 | 21 | 5.0% | Contributor |
| 6 | ndsprinkle | 13 | 3.1% | Contributor |
| 7 | Mottie | 11 | 2.6% | Contributor |
| 8-10 | Various | 2-3 | <1% | Light contributors |

**Top 2 contributors account for 67.3% of all PRs** - High concentration risk

---

## PR Type Distribution

| Type | Count | % | Insight |
|------|-------|---|---------|
| **Other** | 169 | 40.0% | Need better commit message standards |
| **Feature** | 103 | 24.4% | Healthy innovation |
| **Update** | 94 | 22.3% | Maintenance work |
| **Bug Fix** | 26 | 6.2% | Lower than expected |
| **Testing** | 12 | 2.8% | Tests bundled with features |
| **Build/Deps** | 12 | 2.8% | Infrastructure work |
| **Documentation** | 3 | 0.7% | Low documentation PRs |
| **Accessibility** | 2 | 0.5% | Critically low |
| **Performance** | 1 | 0.2% | Critically low |

---

## Critical Issues & Recommendations

### 1. Address Low Merge Rate (CRITICAL)
**Priority: IMMEDIATE**

**Current**: 67.1% merge rate (vs 79.4% for Component Library, 86.6% for Design System Docs)

**Impact**: 
- 125 PRs closed without merge = wasted effort
- Indicates unclear requirements, incomplete work, or process issues

**Root Causes to Investigate**:
- Are PRs being opened too early (before ready)?
- Are requirements unclear?
- Are code reviews too strict?
- Are there technical blockers?

**Action Plan**:
1. **Immediate**: Review all 125 closed PRs to identify patterns
2. **Week 1**: Interview top contributors about PR rejection reasons
3. **Week 2**: Implement PR checklist and definition of "ready"
4. **Week 3**: Set merge rate target of 80%+ and track weekly
5. **Ongoing**: Weekly merge rate review in team meetings

---

### 2. Investigate March 2026 Decline (CRITICAL)
**Priority: IMMEDIATE**

**Current**: March 2026 had only 40% merge rate (6 of 15 PRs)

**Impact**:
- Dramatic drop from January's 82%
- May indicate systemic issue

**Action Plan**:
1. **Immediate**: Review all March 2026 PRs and closure reasons
2. **This Week**: Meet with team to understand what changed
3. **This Week**: Check for external factors (holidays, team changes, tooling issues)
4. **Monitor**: April 2026 merge rate closely

---

### 3. Reduce Contributor Concentration Risk (HIGH)
**Priority: HIGH**

**Current**: Top 2 contributors = 67% of PRs

**Risk**:
- Single points of failure
- Knowledge concentration
- Burnout risk

**Action Plan**:
1. **Q2 2026**: Cross-train 3 additional contributors on forms library
2. **Q2 2026**: Document tribal knowledge from top contributors
3. **Q3 2026**: Distribute PR authorship more evenly
4. **Ongoing**: Pair programming for knowledge transfer

---

### 4. Increase Accessibility Focus (HIGH)
**Priority: HIGH**

**Current**: Only 9 a11y PRs (2%) with 67% merge rate

**Impact**:
- Legal compliance risk
- Veterans with disabilities underserved

**Action Plan**:
1. **Q2 2026**: Conduct full accessibility audit of forms library
2. **Q2 2026**: Create accessibility improvement backlog
3. **Q3 2026**: Require a11y review for all form PRs
4. **Target**: 5% of PRs dedicated to accessibility
5. **Target**: 100% merge rate for a11y PRs

---

### 5. Address Performance Gap (HIGH)
**Priority: HIGH**

**Current**: Only 2 performance PRs (0.5%), 50% merge rate

**Impact**:
- Slow forms = lower completion rates
- Impacts veterans with slow connections

**Action Plan**:
1. **Q2 2026**: Establish performance baselines for all forms
2. **Q2 2026**: Set performance budgets (page load, bundle size)
3. **Q3 2026**: Performance testing in CI/CD
4. **Target**: 2% of PRs dedicated to performance
5. **Target**: Monthly performance review

---

### 6. Improve Testing Merge Rate (MEDIUM)
**Priority: MEDIUM**

**Current**: 342 test PRs (81% of all PRs) but only 67% merge rate

**Impact**:
- Tests should have higher merge rate than features
- Low merge rate suggests test quality issues

**Action Plan**:
1. **Q2 2026**: Review rejected test PRs for patterns
2. **Q2 2026**: Create test quality guidelines
3. **Q3 2026**: Target 85%+ merge rate for test PRs
4. **Ongoing**: Test PR review priority

---

### 7. Standardize Commit Messages (MEDIUM)
**Priority: MEDIUM**

**Current**: 40% of PRs categorized as "Other"

**Impact**:
- Harder to generate changelogs
- Difficult to analyze PR types
- Unclear PR intent

**Action Plan**:
1. **Q2 2026**: Adopt conventional commits (feat:, fix:, test:, docs:)
2. **Q2 2026**: Add PR template with type selection
3. **Q2 2026**: Set up commitlint for enforcement
4. **Target**: <10% "Other" category

---

## Success Metrics Framework

### Tier 1: Business Impact Metrics

1. **Form Completion Rate**
   - Current: Needs measurement per form
   - Target: >80% for simple forms, >60% for complex forms
   - Measure: Google Analytics funnel analysis

2. **Forms Library Adoption Rate**
   - Current: Track % of forms using forms library
   - Target: 100% of new forms
   - Measure: Form inventory audit

3. **Development Velocity**
   - Current: Average time to build a form
   - Target: 30% reduction from baseline
   - Measure: Project tracking data

4. **Cost Savings**
   - Current: Developer hours saved using forms library
   - Target: $1M annual savings
   - Measure: Hours saved × developer cost

### Tier 2: Product Quality Metrics

1. **Defect Density**
   - Current: Bugs per form
   - Target: <0.5 bugs/form/month
   - Measure: Bug tracking by form

2. **Test Coverage**
   - Current: Needs measurement
   - Target: >90% for critical paths, >80% overall
   - Measure: Jest coverage reports

3. **Accessibility Compliance**
   - Current: Needs audit
   - Target: 100% WCAG 2.1 AA
   - Measure: Automated + manual audits

4. **Performance**
   - Page Load Time: <3s on 3G (Target)
   - Bundle Size: <200 KB (Target)
   - Measure: Lighthouse + RUM

### Tier 3: Developer Experience Metrics

1. **Developer Satisfaction**
   - Current: Needs survey
   - Target: NPS > 40
   - Measure: Quarterly survey

2. **Time to First Form**
   - Current: Days for new developer to ship first form
   - Target: <5 days with forms library
   - Measure: Onboarding tracking

3. **Documentation Quality**
   - Current: Needs audit
   - Target: 100% of features documented
   - Measure: Doc coverage report

4. **Support Burden**
   - Current: Support questions per month
   - Target: <20 questions/month
   - Measure: Slack + tickets

### Tier 4: Operational Metrics

1. **PR Merge Rate**
   - Current: 67.1%
   - Target: >80%
   - Measure: GitHub analytics

2. **PR Velocity**
   - Current: 35 PRs/month
   - Target: Maintain 35+/month at >80% merge rate
   - Measure: GitHub analytics

3. **Review Time**
   - Current: Needs measurement
   - Target: <48 hours for standard PRs
   - Measure: GitHub metrics

4. **Build Health**
   - Current: Needs measurement
   - Target: >95% builds passing
   - Measure: CI/CD pipeline

---

## Recommended Dashboard KPIs

### Executive Dashboard (Monthly)
1. Forms library adoption rate (% of forms)
2. Form completion rate (average across all forms)
3. Cost savings delivered (vs manual form building)
4. Developer satisfaction (NPS)
5. WCAG compliance rate

### Product Dashboard (Weekly)
1. PRs merged this week
2. PR merge rate (rolling 4-week average)
3. Bugs opened vs closed
4. Test coverage %
5. Forms using web components (%)

### Engineering Dashboard (Daily)
1. Open PRs
2. PR review time (average)
3. Build success rate
4. Test pass rate
5. Deploy status

---

## Comparison with Other Repositories

| Metric | Forms Library | Component Library | Design System Docs |
|--------|---------------|-------------------|-------------------|
| **Total PRs** | 422 | 475 | 641 |
| **Merge Rate** | 67.1% ⚠️ | 79.4% | 86.6% |
| **Avg PRs/Month** | 35 | 40 | 53 |
| **Top Theme** | Testing (81%) | Components (89%) | Documentation (86%) |
| **Top Contributor %** | 40.5% ⚠️ | 18.1% | 26.4% |

### Key Insights
- **Forms Library has the lowest merge rate** - Needs immediate attention
- **Forms Library has highest contributor concentration** - Risk
- **Testing dominates** in Forms Library (81% vs 34% Component Library)

---

## Appendix: Files Generated

1. **forms-library-prs-2025-2026.json** - Raw PR data (422 PRs)
2. **forms-library-analysis.json** - Structured analysis
3. **forms-library-analysis.csv** - Forms spreadsheet
4. **FORMS_LIBRARY_ANALYSIS_REPORT.md** - This report

---

**Report Generated:** March 16, 2026
**Analyst:** Claude Code
**Data Source:** GitHub API - vets-website repository, forms-library label
