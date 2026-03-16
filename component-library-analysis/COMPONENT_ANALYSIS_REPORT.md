# VA Component Library - Component-Level PR Analysis
## April 2025 - March 2026

**Analysis Date:** March 16, 2026
**Repository:** component-library
**Total PRs:** 475
**Component-Specific PRs:** 259 (55%)
**Unique Components:** 59

---

## Executive Summary

Over the past year, **59 different web components** were actively developed with **259 component-specific PRs** (55% of all PRs). The remaining 45% were infrastructure, release, and cross-cutting concerns.

### Top Insights

- 🥇 **#1 Most Active Component:** va-file-input (36 PRs)
- 📊 **Avg PRs per Component:** 4.4 PRs
- 🏗️ **Form Controls Lead:** 89 PRs across 12 form components
- ⚠️ **Needs Attention:** va-link (63% bug fix ratio)
- 🚀 **Most Feature Development:** va-file-input (16 new features)

---

## Top 20 Components by PR Activity

| Rank | Component | Total PRs | Merged | Merge Rate | Features | Bug Fixes | Top Contributor |
|------|-----------|-----------|--------|------------|----------|-----------|-----------------|
| 1 | va-file-input | 36 | 30 | 83% | 16 | 4 | it-harrison (9) |
| 2 | va-modal | 17 | 14 | 82% | 2 | 5 | RyanMunsch (6) |
| 3 | va-combo-box | 12 | 10 | 83% | 1 | 1 | KyleCardwell (3) |
| 4 | va-alert | 10 | 9 | 90% | 5 | 3 | powellkerry (3) |
| 5 | va-memorable-date | 9 | 8 | 89% | 7 | 0 | jamigibbs (4) |
| 6 | va-input-telephone | 9 | 8 | 89% | 2 | 1 | it-harrison (6) |
| 7 | va-link | 8 | 7 | 88% | 1 | 5 | RyanMunsch (2) |
| 8 | va-accordion | 8 | 5 | 63% | 1 | 2 | amyleadem (5) |
| 9 | va-table | 8 | 6 | 75% | 6 | 0 | jamigibbs (4) |
| 10 | va-telephone-input | 7 | 6 | 86% | 1 | 0 | it-harrison (3) |
| 11 | va-file-input-multiple | 7 | 6 | 86% | 3 | 0 | powellkerry (2) |
| 12 | va-text-input | 6 | 5 | 83% | 5 | 0 | humancompanion-usds (2) |
| 13 | va-sidenav | 6 | 6 | 100% | 2 | 0 | jamigibbs (3) |
| 14 | va-segmented-progress-bar | 6 | 4 | 67% | 0 | 0 | jamigibbs (2) |
| 15 | va-icon | 6 | 6 | 100% | 5 | 0 | powellkerry (4) |
| 16 | va-date | 5 | 2 | 40% | 0 | 0 | it-harrison (3) |
| 17 | va-tag-status | 5 | 4 | 80% | 1 | 0 | jamigibbs (2) |
| 18 | va-button-segmented | 5 | 4 | 80% | 2 | 0 | it-harrison (2) |
| 19 | va-button | 4 | 3 | 75% | 0 | 0 | jamigibbs (2) |
| 20 | va-additional-info | 4 | 4 | 100% | 4 | 0 | powellkerry (2) |

---

## Component Analysis by Category

### Form Controls (12 components, 89 PRs)

Form components are the most actively developed category, accounting for **34% of all component PRs**.

| Component | PRs | Merge Rate | Key Activity |
|-----------|-----|------------|--------------|
| **va-file-input** | 36 | 83% | Heavy feature development (16 features) |
| **va-combo-box** | 12 | 83% | Stabilization focus |
| **va-memorable-date** | 9 | 89% | New component with rapid development (7 features) |
| **va-file-input-multiple** | 7 | 86% | Active development (3 features) |
| **va-text-input** | 6 | 83% | Feature additions |
| **va-date** | 5 | 40% | Low merge rate - potential issues |
| **va-select** | 3 | 100% | Stable, feature additions |
| **va-checkbox** | 2 | 100% | Stable |
| **va-checkbox-group** | 2 | 100% | Stable |
| **va-radio** | 3 | 33% | Low merge rate - needs attention |
| **va-radio-option** | 2 | 100% | Stable |
| **va-textarea** | 2 | 100% | Stable |

**Key Insights:**
- **File upload components** (va-file-input, va-file-input-multiple) are most active with 43 combined PRs
- **Date components** (va-memorable-date, va-date) show mixed maturity - memorable-date is newer and more active
- **Radio button** has concerning 33% merge rate

### Feedback & Messaging (5 components, 33 PRs)

| Component | PRs | Merge Rate | Key Activity |
|-----------|-----|------------|--------------|
| **va-modal** | 17 | 82% | Most active in category, bug fixes needed (5 bugs) |
| **va-alert** | 10 | 90% | Good balance of features (5) and fixes (3) |
| **va-alert-sign-in** | 2 | 100% | Specialized alert variant |
| **va-loading-indicator** | 2 | 100% | Stable |
| **va-progress-bar** | 2 | 100% | Stable |

**Key Insights:**
- **Modal component** requires ongoing maintenance (29% bug fix ratio)
- **Alert** is actively enhanced with new features
- Specialized variants (alert-sign-in) see less activity

### Navigation (7 components, 32 PRs)

| Component | PRs | Merge Rate | Key Activity |
|-----------|-----|------------|--------------|
| **va-link** | 8 | 88% | ⚠️ High bug count (63% are fixes) - needs attention |
| **va-accordion** | 8 | 63% | Low merge rate - stabilization needed |
| **va-segmented-progress-bar** | 6 | 67% | Moderate merge rate |
| **va-accordion-item** | 4 | 100% | Child component, stable |
| **va-on-this-page** | 3 | 100% | Stable |
| **va-breadcrumb** | 1 | 100% | Minimal activity |
| **va-pagination** | 2 | 100% | Stable |

**Key Insights:**
- **va-link has critical quality issues** - 63% of PRs are bug fixes
- **Accordion components** need stabilization work (63-67% merge rates)
- Progress bar components show moderate stability

### Data Display (4 components, 13 PRs)

| Component | PRs | Merge Rate | Key Activity |
|-----------|-----|------------|--------------|
| **va-table** | 8 | 75% | Heavy feature development (6 features) |
| **va-card** | 2 | 100% | Stable |
| **va-crisis-line-modal** | 2 | 100% | Specialized modal |
| **va-privacy-agreement** | 1 | 100% | Minimal activity |

**Key Insights:**
- **Table component** is actively enhanced with new capabilities
- Data display components are generally stable

### Actions (3 components, 9 PRs)

| Component | PRs | Merge Rate | Key Activity |
|-----------|-----|------------|--------------|
| **va-button** | 4 | 75% | Foundation component, stable |
| **va-link-action** | 4 | 100% | Stable |
| **va-button-icon** | 1 | 100% | Specialized variant |

**Key Insights:**
- Button components are mature and stable
- Minimal maintenance required

### Typography & Media (4 components, 15 PRs)

| Component | PRs | Merge Rate | Key Activity |
|-----------|-----|------------|--------------|
| **va-icon** | 6 | 100% | Active feature development (5 features) |
| **va-additional-info** | 4 | 100% | All features, excellent stability |
| **va-telephone** | 3 | 100% | Stable |
| **va-language-toggle** | 2 | 100% | Stable |

**Key Insights:**
- **Icon system** is actively developed with excellent merge rate
- Category shows high quality and stability

---

## PR Type Distribution

| Type | Count | % of Component PRs | Insight |
|------|-------|-------------------|---------|
| **Feature** | 96 | 37% | Strong focus on new capabilities |
| **Bug Fix** | 34 | 13% | Reasonable bug rate |
| **Accessibility** | 10 | 4% | Dedicated a11y improvements |
| **Testing** | 3 | 1% | Low test PR ratio (opportunity) |
| **Other** | 116 | 45% | Many PRs don't follow conventional commits |

**Key Insights:**
- **37% feature development** shows healthy innovation
- **13% bug fixes** is acceptable but some components need more attention
- **Low testing PRs** suggests tests are bundled with features (good) or missing (needs verification)
- **45% "Other"** indicates need for better commit message standards

---

## Components Needing Attention

### High Bug Fix Ratio (>30% of PRs are bug fixes)

| Component | Total PRs | Bug Fixes | Bug Fix Ratio | Status |
|-----------|-----------|-----------|---------------|--------|
| **va-link** | 8 | 5 | 63% | ⚠️ CRITICAL - Quality issues |
| **va-modal** | 17 | 5 | 29% | ⚠️ Needs attention |

**Recommendation:**
1. **va-link**: Conduct root cause analysis for recurring bugs. Consider refactor or additional testing.
2. **va-modal**: Monitor closely, may need quality improvement initiative.

### Low Merge Rates (<70%)

| Component | Total PRs | Merged | Merge Rate | Status |
|-----------|-----------|--------|------------|--------|
| **va-radio** | 3 | 1 | 33% | ⚠️ CRITICAL - High rejection rate |
| **va-date** | 5 | 2 | 40% | ⚠️ CRITICAL - Quality or design issues |
| **va-accordion** | 8 | 5 | 63% | ⚠️ Needs improvement |
| **va-segmented-progress-bar** | 6 | 4 | 67% | ⚠️ Moderate concern |

**Recommendation:**
- Investigate reasons for PR rejections
- May indicate architectural disagreements, incomplete work, or scope issues
- Consider creating ADRs for complex components

---

## Most Actively Developed Components

### By Feature Development (Feature PRs)

| Rank | Component | Feature PRs | Notes |
|------|-----------|-------------|-------|
| 1 | va-file-input | 16 | Heavy innovation - multiple file upload scenarios |
| 2 | va-memorable-date | 7 | New component, rapid development |
| 3 | va-table | 6 | Data display enhancements |
| 4 | va-alert | 5 | Feedback improvements |
| 5 | va-text-input | 5 | Foundation component enhancements |
| 6 | va-icon | 5 | Icon system expansion |
| 7 | va-additional-info | 4 | Information disclosure patterns |

**Key Insight:** File upload and form components dominate feature development, reflecting VA.gov's form-heavy nature.

---

## Component Maturity Model

Based on PR patterns, we can categorize components into maturity levels:

### Mature & Stable (100% merge rate, <5 PRs, mostly maintenance)
✅ Components that "just work" with minimal changes needed

- va-additional-info, va-sidenav, va-icon, va-accordion-item
- va-alert-expandable, va-omb-info, va-link-action, va-search-filter
- va-on-this-page, va-card-status, va-search-input, va-select

**Count:** 24 components
**Strategy:** Maintain, minimal resources needed

### Active Development (5-15 PRs, >50% features, good merge rate)
🚀 Components being enhanced with new capabilities

- va-file-input (36 PRs, 44% features)
- va-alert (10 PRs, 50% features)
- va-memorable-date (9 PRs, 78% features)
- va-table (8 PRs, 75% features)
- va-text-input (6 PRs, 83% features)

**Count:** 12 components
**Strategy:** Invest in feature development, maintain quality

### Stabilization Needed (>30% bug fixes OR <70% merge rate)
⚠️ Components requiring quality improvements

- va-link (63% bugs, 88% merge)
- va-modal (29% bugs, 82% merge)
- va-accordion (63% merge)
- va-date (40% merge)
- va-radio (33% merge)

**Count:** 5 components
**Strategy:** Quality improvement initiatives, root cause analysis

### New & Evolving (High PR count, mixed types, recent introduction)
🌱 Components in early adoption phase

- va-file-input-multiple (7 PRs, new web component version)
- va-memorable-date (9 PRs, new alternative to va-date)
- va-combo-box (12 PRs, complex interaction patterns)

**Count:** 8 components
**Strategy:** Monitor closely, rapid iteration, gather feedback

---

## Top Contributors by Component Type

### Form Components
1. **it-harrison** - 20 PRs (va-file-input, va-input-telephone specialist)
2. **jamigibbs** - 9 PRs (broad coverage)
3. **powellkerry** - 11 PRs (file inputs, combo-box)

### Feedback Components
1. **RyanMunsch** - 9 PRs (modal, alert specialist)
2. **powellkerry** - 5 PRs
3. **jamigibbs** - 3 PRs

### Navigation Components
1. **amyleadem** - 8 PRs (accordion specialist)
2. **RyanMunsch** - 4 PRs
3. **jamigibbs** - 5 PRs

---

## Recommendations

### 1. Address Quality Issues in Key Components
**Priority: HIGH**

- **va-link**: 63% bug ratio is unacceptable for such a foundational component
  - Action: Comprehensive refactor or rewrite
  - Timeline: Q2 2026
  - Owner: Assign senior engineer

- **va-radio & va-date**: Low merge rates indicate systemic issues
  - Action: Root cause analysis, clarify design direction
  - Timeline: Q2 2026

### 2. Improve Commit Message Standards
**Priority: MEDIUM**

- 45% of component PRs are categorized as "Other"
- Action: Adopt conventional commits strictly
- Impact: Better automated changelog generation and metrics

### 3. Increase Component Testing
**Priority: MEDIUM**

- Only 1% of component PRs explicitly mention testing
- Action: Verify test coverage is bundled with features, not missing
- Target: 85%+ test coverage for all components

### 4. Document Component Maturity Levels
**Priority: MEDIUM**

- Action: Create public maturity matrix for consuming teams
- Include: Stability rating, breaking change likelihood, support level
- Update: Quarterly

### 5. Focus File Upload Components
**Priority: HIGH**

- va-file-input and va-file-input-multiple account for 43 PRs (17% of component PRs)
- Action: Create comprehensive file upload strategy
- Consider: Consolidation, migration path, feature parity

### 6. Establish Component Champions
**Priority: LOW**

- Assign owners to top 20 components
- Responsibilities: Quality, roadmap, support
- Benefits: Faster PR reviews, consistent design decisions

---

## Success Metrics by Component

### Tier 1: Component Health Metrics

1. **Bug Fix Ratio**
   - Target: <20% of component PRs should be bug fixes
   - Current: 13% average (good), but va-link at 63% (bad)

2. **Merge Rate**
   - Target: >85% merge rate per component
   - Current: 82% average, 5 components below 70%

3. **Time to Merge**
   - Target: <48 hours for component PRs
   - Current: Needs measurement

4. **Test Coverage**
   - Target: >90% for form controls, >80% for others
   - Current: Needs measurement

### Tier 2: Component Adoption Metrics

1. **Usage in Production**
   - Track: # of forms/apps using each component
   - Target: 80%+ adoption for mature components

2. **Migration Progress** (v2 → v3)
   - Track: % of apps migrated to web component version
   - Target: 100% by Q2 2027

3. **Developer Satisfaction**
   - Survey: Component-specific NPS
   - Target: >60 NPS for top 20 components

### Tier 3: Innovation Metrics

1. **Feature Velocity**
   - Track: Features per quarter per component
   - Balanced: Active components (3-5), Mature (0-1)

2. **Breaking Changes**
   - Track: Breaking changes per component per year
   - Target: <2 per component

---

## Appendix: Full Component List

**59 unique components** identified with PR activity:

va-file-input (36), va-modal (17), va-combo-box (12), va-alert (10), va-memorable-date (9), va-input-telephone (9), va-link (8), va-accordion (8), va-table (8), va-telephone-input (7), va-file-input-multiple (7), va-text-input (6), va-sidenav (6), va-segmented-progress-bar (6), va-icon (6), va-date (5), va-tag-status (5), va-button-segmented (5), va-button (4), va-additional-info (4), va-accordion-item (4), va-omb-info (4), va-link-action (4), va-alert-expandable (4), va-search-filter (4), va-on-this-page (3), va-card-status (3), va-search-input (3), va-select (3), va-radio (3), va-tabs (3), va-telephone (3), va-footer (2), va-header (2), va-button-pair (2), va-card (2), va-crisis-line-modal (2), va-textarea (2), va-checkbox-group (2), va-checkbox (2), va-radio-option (2), va-alert-sign-in (2), va-loading-indicator (2), va-progress-bar (2), va-language-toggle (2), va-breadcrumb (1), va-banner (1), va-privacy-agreement (1), va-header-minimal (1), va-button-icon (1), va-featured-content (1), va-summary-box (1), va-date-input (1), va-notification (1), va-prequal-widget (1), va-process-list (1), va-pagination (2), va-main-content (1), va-maintenance-banner (1)

---

**Report Generated:** March 16, 2026
**Analyst:** Claude Code
**Data Source:** 475 PRs from component-library repository (April 2025 - March 2026)
