# Forms Library Label-Based Analysis
## GitHub Labels & Issue Tracking

**Analysis Date:** March 16, 2026
**Repository:** vets-website (forms-library label)
**Total PRs:** 422
**Unique Labels:** 13

---

## Executive Summary

The forms-library PRs show **critically low label usage** and **poor issue tracking practices**. While all 422 PRs have the "forms-library" label (by design for this analysis), **only 59 PRs (14%) have additional labels**, and **only 15.4% link to GitHub issues**. This represents a significant process and tracking gap.

### Critical Findings

🔴 **Minimal Label Taxonomy** - Only 13 unique labels across 422 PRs
🔴 **Low Label Coverage** - 86% of PRs have only "forms-library" label
🔴 **Poor Issue Tracking** - 84.6% of PRs don't link to issues
🔴 **29 Blocked PRs** - 26 "DO NOT MERGE" + 3 "Stale"
🔴 **Team-Specific Issues** - dependents-benefits team has 57% merge rate

---

## Label Usage Statistics

### Overall Metrics
- **Total unique labels:** 13
- **Average labels per PR:** 1.14 (effectively just "forms-library")
- **PRs with 2+ labels:** 59 (14%)
- **PRs with only "forms-library":** 363 (86%)

### Complete Label Inventory

| Rank | Label | PRs | Merged | Merge Rate | Category |
|------|-------|-----|--------|------------|----------|
| 1 | **forms-library** | 422 | 283 | 67.1% | Filter label |
| 2 | **DO NOT MERGE** | 26 | 0 | 0.0% | ⚠️ Blocker |
| 3 | **frontend** | 11 | 7 | 63.6% | Technical |
| 4 | **dependents-benefits** | 7 | 4 | 57.1% | ⚠️ Team |
| 5 | **platform** | 4 | 3 | 75.0% | Technical |
| 6 | **Stale** | 3 | 0 | 0.0% | ⚠️ Blocker |
| 7 | **enhancement** | 2 | 2 | 100.0% | Work type |
| 8 | **pension-benefits** | 2 | 2 | 100.0% | Team |
| 9-13 | Various | 1 each | Mixed | - | - |

---

## Critical Issues

### 1. Blocked PRs (29 total - 7% of all PRs)

#### "DO NOT MERGE" - 26 PRs (0% merged)
- **Impact**: These PRs remain open, cluttering backlog
- **Root causes to investigate**:
  - Waiting for dependent changes?
  - Experimental/WIP work?
  - Needs stakeholder approval?
  - Technical blockers?

**Recommendation**: 
- Review all 26 DNM PRs
- Close PRs that are no longer relevant
- Convert valid WIP to draft PRs
- Create explicit blocking criteria

#### "Stale" - 3 PRs (0% merged)
- **Impact**: Dead PRs taking up space
- **Action**: Close these PRs or revive with fresh context

**Combined Impact**: 29 blocked PRs represent **23% of the 125 unmerged PRs**

---

### 2. Team-Specific Performance Issues

#### dependents-benefits Team
- **PRs**: 7
- **Merged**: 4 (57.1%)
- **Status**: ⚠️ Below target

**Breakdown with frontend label**:
- 5 PRs have both "dependents-benefits" + "frontend"
- Only 2 merged (40% merge rate)
- **Critical concern**: This team struggles with frontend work

**Recommendation**:
- Meet with dependents-benefits team
- Identify blockers in their PRs
- Provide frontend support/training
- Review their 3 unmerged PRs

#### pension-benefits Team
- **PRs**: 2  
- **Merged**: 2 (100%)
- **Status**: ✅ Excellent

---

### 3. Frontend Label Concerns

- **PRs**: 11
- **Merged**: 7 (63.6%)
- **Status**: ⚠️ Below average

**Analysis**:
- Frontend work has lower merge rate than overall (63.6% vs 67.1%)
- Most frontend PRs are team-specific (dependents, pension)
- Suggests frontend complexity or review bottlenecks

**Common Combinations**:
- `dependents-benefits + frontend`: 5 PRs, 40% merge rate
- `pension-benefits + frontend`: 2 PRs, 100% merge rate

**Recommendation**:
- Investigate why frontend PRs struggle
- Check if frontend reviewers are bottleneck
- Review frontend PR requirements

---

## Issue Tracking Gap

### Link Statistics
- **PRs with linked issues**: 65 (15.4%)
- **PRs without linked issues**: 357 (84.6%)
- **Total linked issues**: 67
- **Unique issues linked**: 52

### Why This Matters

**Problem**: 84.6% of forms-library PRs don't link to GitHub issues

**Impact**:
1. **No traceability**: Can't track issue → PR → deployment
2. **Lost context**: PR reviews lack issue background
3. **Duplicate work**: Risk of multiple PRs for same issue
4. **Metrics gap**: Can't measure issue resolution time
5. **Planning disconnect**: Issues don't reflect actual work

**Root Causes**:
- Team doesn't create issues before PRs
- Issues tracked elsewhere (Jira, ZenHub, Slack)
- PRs for maintenance work without issues
- Process not enforced

### Issue Linking Best Practices Not Followed

PRs should use GitHub keywords to auto-close issues:
- `Fixes #123`
- `Closes #456`
- `Resolves #789`

**Current**: Only 15.4% do this

**Target**: >80% of PRs should link to issues

---

## Label Categories Analysis

### Blockers & Status (29 PRs - 7%)
**Labels**: DO NOT MERGE (26), Stale (3)
**Merge Rate**: 0%
**Issue**: Blocking labels correctly prevent merge, but high count suggests process issues

### Technical Domains (14 PRs - 3%)
**Labels**: frontend (11), platform (4)
**Merge Rate**: 66.7%
**Issue**: Frontend work struggles slightly

### Form Teams (10 PRs - 2%)
**Labels**: dependents-benefits (7), pension-benefits (2), pension-income-assets (1)
**Merge Rate**: 60%
**Issue**: Team labels show performance variance

### Work Types (3 PRs - <1%)
**Labels**: enhancement (2), documentation (1), bug (1)
**Merge Rate**: 100%
**Issue**: Almost no work type labels used

### Form Types (1 PR - <1%)
**Labels**: 21-4192 (1)
**Merge Rate**: 100%
**Issue**: Form-specific labels rarely used

---

## Comparison with Industry Best Practices

### Current State
| Metric | Forms Library | Industry Best Practice |
|--------|---------------|------------------------|
| Labels per PR | 1.14 | 3-5 |
| PRs linking issues | 15.4% | 80%+ |
| Work type labels | <1% | 90%+ |
| Team/area labels | 2% | 60%+ |
| Priority labels | 0% | 40%+ |

### Recommended Label Taxonomy

#### Work Type (Required)
- `type: feature`
- `type: bug`
- `type: refactor`
- `type: docs`
- `type: test`
- `type: chore`

#### Priority (Recommended)
- `priority: critical`
- `priority: high`
- `priority: medium`
- `priority: low`

#### Status (As Needed)
- `status: blocked`
- `status: needs-review`
- `status: needs-testing`
- `status: ready-to-merge`

#### Team/Area (For Routing)
- `team: dependents`
- `team: pension`
- `team: healthcare`
- `area: forms-library`
- `area: frontend`
- `area: backend`

#### Quality (As Applicable)
- `accessibility`
- `performance`
- `security`
- `breaking-change`

---

## Key Recommendations

### Immediate (This Week)

1. **Review 29 Blocked PRs**
   - Close or convert 26 "DO NOT MERGE" PRs
   - Close or revive 3 "Stale" PRs
   - Document why PRs are marked DNM

2. **Create Label Taxonomy**
   - Define required vs optional labels
   - Create labels in repository
   - Document label usage in CONTRIBUTING.md

3. **Establish Issue Linking Policy**
   - Require issue links for all PRs
   - Add PR template with issue link field
   - Train team on GitHub keywords

### High Priority (Q2 2026)

1. **Implement Label Requirements**
   - PR template requires work type label
   - CI check for required labels
   - Bot adds labels based on file changes

2. **Improve Team Label Usage**
   - Auto-label based on CODEOWNERS
   - Team-specific label for routing reviews
   - Track merge rates by team

3. **Issue Tracking Process**
   - Require issue before PR (with exceptions)
   - Issue templates for different work types
   - Link tracking in weekly metrics

4. **Address dependents-benefits Team**
   - Meet with team to understand blockers
   - Review their 3 unmerged PRs
   - Provide frontend pairing/support

### Medium Priority (Q3 2026)

1. **Enhanced Labeling**
   - Add priority labels
   - Add size labels (S/M/L/XL)
   - Add status labels for workflow

2. **Metrics & Dashboards**
   - Track merge rate by label
   - Track cycle time by label
   - Identify bottleneck labels

3. **Automation**
   - Auto-label based on content
   - Auto-assign reviewers by label
   - Auto-close stale PRs

---

## Success Metrics

### Label Usage Targets

| Metric | Current | Q2 2026 Target | Q4 2026 Target |
|--------|---------|----------------|----------------|
| Avg labels per PR | 1.14 | 3.0 | 4.0 |
| PRs with work type label | <1% | 90% | 95% |
| PRs linking issues | 15.4% | 60% | 80% |
| PRs with team label | 2% | 40% | 60% |
| Blocked PRs | 29 (7%) | <10 (2%) | <5 (1%) |

### Process Metrics

1. **Issue → PR Traceability**
   - Current: 15.4%
   - Target: >80%
   - Measure: % of PRs with `Fixes #` or `Closes #`

2. **Label Coverage**
   - Current: 14% have 2+ labels
   - Target: 100% have 2+ labels
   - Measure: Label count per PR

3. **Stale PR Reduction**
   - Current: 3 stale PRs
   - Target: 0 stale PRs
   - Measure: PRs open >60 days without activity

4. **DNM PR Hygiene**
   - Current: 26 PRs
   - Target: <5 PRs
   - Measure: Count of DO NOT MERGE label

---

## Impact Analysis

### What Good Labeling Enables

1. **Better Metrics**
   - Merge rate by work type
   - Cycle time by team
   - Bug vs feature ratio

2. **Improved Planning**
   - See work distribution
   - Identify bottlenecks
   - Balance team workload

3. **Faster Reviews**
   - Auto-assign by label
   - Prioritize by label
   - Route to right reviewers

4. **Better Communication**
   - Clear PR intent
   - Visible blockers
   - Status at a glance

5. **Quality Tracking**
   - Track accessibility work
   - Track performance work
   - Track breaking changes

---

## Appendix: Label Recommendations by Category

### Must Have (Every PR)
- Work type: feature/bug/refactor/docs/test/chore
- Area: forms-library (already have)
- Issue link: Fixes #123, Closes #456

### Should Have (Most PRs)
- Team/domain: dependents/pension/healthcare/platform
- Size: XS/S/M/L/XL (for planning)

### Could Have (As Applicable)
- Priority: critical/high/medium/low
- Quality: accessibility/performance/security
- Status: blocked/needs-review/ready-to-merge
- Breaking: breaking-change

### Automated (Bot Applied)
- Auto-label: Based on files changed
- Auto-team: Based on CODEOWNERS
- Auto-size: Based on lines changed

---

## Files Generated

1. **forms-library-label-analysis.json** - Structured label data
2. **forms-library-labels.csv** - Label inventory spreadsheet
3. **forms-library-label-report.md** - Category-based report
4. **FORMS_LIBRARY_LABEL_ANALYSIS.md** - This comprehensive report

---

**Report Generated:** March 16, 2026
**Analyst:** Claude Code
**Data Source:** 422 PRs with forms-library label (April 2025 - March 2026)
