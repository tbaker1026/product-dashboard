# Architecture Decision Record: Prefill Pattern for VA.gov Forms

## Status

**Proposed** - March 15, 2026

This ADR documents the current state of prefill implementations across VA.gov forms and proposes standardization on recommended approaches.

## Context

### Problem Statement

VA.gov has 147 forms, and users are often required to enter the same information repeatedly across different forms. This creates friction, increases form abandonment, and introduces data entry errors. To address this, we need a consistent pattern for automatically prepopulating form data from VA Profile and other authoritative data sources.

### Current State Analysis

As of March 2026, we have **6 different prefill variations** in production:

| Variation | LOC | Applications | Adoption | Status |
|-----------|-----|--------------|----------|--------|
| ContactInfo Component | 824 | 25 | 17% | Active |
| prefillTransformer | 1,906 | 19 | 13% | Active |
| Direct formData | 0 | 18 | 12% | Deprecated |
| PersonalInformation | 530 | 12 | 8% | Active |
| PrefillMessage | 23 | 6 | 4% | Active |
| profileContactInfo | 258 | 5 | 3% | Active |

**Key Issues:**
1. **Inconsistent implementations** - 6 variations create confusion for developers
2. **High maintenance burden** - 1,906 lines of custom transformer code across 36 files
3. **Technical debt** - 18 forms still using deprecated direct formData pattern
4. **No clear guidance** - Developers don't know which approach to use
5. **Code duplication** - Similar transformations implemented differently
6. **Low adoption** - 122 forms (83%) don't use any modern prefill pattern

### Requirements

1. **User Experience:**
   - Reduce time to complete forms
   - Minimize duplicate data entry
   - Allow users to edit prefilled data
   - Clearly communicate what data is prefilled

2. **Developer Experience:**
   - Simple API for common use cases
   - Flexible for complex scenarios
   - Reusable components
   - Clear documentation

3. **Data Accuracy:**
   - Use authoritative data sources (VA Profile, MVI)
   - Validate prefilled data
   - Handle missing/partial data gracefully

4. **Maintainability:**
   - Minimize custom code per form
   - Centralize common transformations
   - Consistent patterns across forms

## Decision

We propose standardizing on **three complementary prefill approaches** based on use case:

### 1. ContactInfo Component (Primary - Contact Information)

**When to use:** Displaying contact information (phone, email, address) on review pages

**Rationale:**
- Most widely adopted (25 applications)
- Proven UX pattern
- Built-in edit capability
- Consistent across forms
- No custom code required

**Example:**
```jsx
import ContactInfo from 'platform/forms-system/src/js/components/ContactInfo';

<ContactInfo
  formContext={formContext}
  data={formData}
  page={page}
/>
```

### 2. PersonalInformation Component (Primary - Personal Data)

**When to use:** Displaying personal information (name, DOB, SSN) on review pages

**Rationale:**
- Standard read-only display
- Secure SSN masking
- Consistent formatting
- No custom code required

**Example:**
```jsx
import PersonalInformation from 'platform/forms-system/src/js/components/PersonalInformation';

<PersonalInformation
  formData={formData}
  showMask={true}
/>
```

### 3. prefillTransformer (Secondary - Complex Cases Only)

**When to use:**
- Custom data transformations needed
- Complex nested data structures
- Conditional logic required
- Multiple data sources combined
- ContactInfo/PersonalInformation don't fit

**Rationale:**
- Maximum flexibility
- Handles edge cases
- Form-specific customization
- No platform changes needed

**Example:**
```javascript
export default {
  prefillEnabled: true,
  prefillTransformer: (pages, formData, metadata, state) => {
    return {
      pages,
      formData: {
        veteranFullName: {
          first: formData.firstName,
          last: formData.lastName,
        },
        serviceHistory: transformServiceHistory(formData.militaryServiceEpisodes),
      },
      metadata,
    };
  },
};
```

### Supporting Components

**PrefillMessage Component** - Use for all forms with prefill to inform users

```jsx
import PrefillMessage from 'platform/forms/save-in-progress/PrefillMessage';

<PrefillMessage formContext={formContext}>
  We've prefilled some information from your VA Profile.
</PrefillMessage>
```

### Deprecations

1. **Direct formData Prepopulation** - Migrate to recommended approaches
2. **profileContactInfo Pattern** - Recommend ContactInfo component instead (higher adoption, better support)

## Consequences

### Positive Consequences

1. **Reduced Complexity**
   - From 6 variations to 3 recommended approaches
   - Clear decision tree for developers
   - Less cognitive overhead

2. **Improved Developer Experience**
   - Know which approach to use for each scenario
   - Reuse components for 80% of use cases
   - Only write custom code when truly needed

3. **Better Maintainability**
   - Centralized component updates benefit all forms
   - Reduced custom code (1,906 lines across 36 files)
   - Consistent implementations

4. **Enhanced User Experience**
   - Consistent prefill behavior across forms
   - Standard edit flows
   - Clear messaging about prefilled data

5. **Migration Path**
   - 18 forms using deprecated pattern have clear upgrade path
   - 122 forms without prefill can adopt standard components

### Negative Consequences

1. **Migration Effort**
   - 18 forms need migration from deprecated pattern
   - Some forms using prefillTransformer could be simplified but would require refactoring
   - Platform team needs to provide migration support

2. **Custom Code Still Needed**
   - 19 forms (13%) still need prefillTransformer for complex cases
   - Can't eliminate all custom transformation code

3. **Component Limitations**
   - ContactInfo/PersonalInformation may not fit all designs
   - Some forms will still need workarounds

4. **Learning Curve**
   - Developers need to learn when to use which approach
   - Documentation and training required

### Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Resistance to migration | Medium | Medium | Provide migration scripts, clear benefits |
| Breaking changes | Low | High | Maintain backward compatibility during transition |
| Component doesn't fit all forms | Medium | Medium | Keep prefillTransformer as escape hatch |
| Documentation out of date | High | Medium | Centralize docs, automate examples |

## Alternatives Considered

### Alternative 1: Consolidate to Single Approach

**Considered:** Force all forms to use ContactInfo/PersonalInformation components only

**Rejected because:**
- Too restrictive for complex forms
- Some forms have unique requirements
- Would require significant platform changes

### Alternative 2: Create New Universal Prefill Component

**Considered:** Build one component to handle all prefill scenarios

**Rejected because:**
- High upfront development cost
- Likely to be overly complex
- Existing components work well for their use cases
- Diminishing returns

### Alternative 3: Keep Current State (No Standardization)

**Considered:** Continue with 6 variations, no changes

**Rejected because:**
- Technical debt continues to grow
- Developer confusion persists
- Maintenance burden increases
- Inconsistent user experience

### Alternative 4: Deprecate All Platform Components, Use prefillTransformer Only

**Considered:** Remove ContactInfo/PersonalInformation, make all forms implement custom transformers

**Rejected because:**
- Increases maintenance burden significantly
- Loses consistency across forms
- Code duplication increases
- Poor developer experience

## Implementation Plan

### Phase 1: Documentation (Weeks 1-2)
- ✅ Create comprehensive prefill pattern README
- ✅ Document architecture and data flow
- ✅ Provide decision matrix and examples
- Create migration guides for deprecated patterns

### Phase 2: Deprecation Warnings (Weeks 3-4)
- Add console warnings for Direct formData pattern
- Update linting rules to catch deprecated usage
- Communicate deprecation timeline to teams

### Phase 3: Migration Support (Weeks 5-12)
- Provide migration scripts where possible
- Support teams migrating from deprecated patterns
- Create example pull requests
- Office hours for teams with questions

### Phase 4: Standardization (Weeks 13-20)
- Migrate 18 forms from deprecated pattern
- Consider simplifying complex prefillTransformer implementations
- Update all documentation references
- Add pattern to forms library

### Phase 5: Monitoring and Iteration (Ongoing)
- Track adoption of recommended patterns
- Collect feedback from developers
- Iterate on components based on real-world usage
- Measure impact on form completion rates

## Success Metrics

1. **Adoption Rate**
   - Target: 90% of forms with prefill use recommended patterns
   - Current: 54% (37 of 69 forms with prefill)

2. **Custom Code Reduction**
   - Target: Reduce prefillTransformer usage by 30%
   - Current: 19 forms, 1,906 lines

3. **Deprecated Pattern Elimination**
   - Target: 0 forms using Direct formData
   - Current: 18 forms (12% of all forms)

4. **Developer Satisfaction**
   - Target: 80% developer satisfaction with prefill pattern
   - Measure: Post-implementation survey

5. **User Impact**
   - Target: 15% reduction in form completion time for forms with prefill
   - Measure: Analytics on form completion duration

## Related Decisions

- **Forms System Architecture** - This pattern is part of the broader forms-system platform
- **VA Profile API Integration** - Data source for prefill information
- **Review Page Patterns** - ContactInfo/PersonalInformation used on review pages
- **Save in Progress** - Prefill works with SiP to restore partial form data

## References

- [Prefill Variations Complete Analysis](/Users/tricia/shai-hulud-detect/PREFILL_VARIATIONS_COMPLETE_ANALYSIS.md)
- [ContactInfo Component](src/platform/forms-system/src/js/components/ContactInfo.jsx)
- [PersonalInformation Component](src/platform/forms-system/src/js/components/PersonalInformation/PersonalInformation.jsx)
- [VA Profile API Documentation](https://developer.va.gov/explore/api/va-profile)
- [Forms System Documentation](https://depo-platform-documentation.scrollhelp.site/developer-docs/va-forms-library-overview)

## Decision Makers

- **Platform Team** - Owns forms-system and prefill infrastructure
- **VFS Teams** - Implement prefill in their forms
- **Design System Team** - Contact/Personal information component design

## Approval

This ADR requires approval from:
- [ ] Platform Team Lead
- [ ] Forms System Architect
- [ ] VFS Team Representatives (sample of teams using prefill)
- [ ] Accessibility Specialist

## Revision History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2026-03-15 | 1.0 | Claude Code | Initial ADR based on comprehensive prefill analysis |

---

## Appendix A: Data Flow Diagram

```
User Authentication
        │
        ▼
Form Load → GET /v0/in_progress_forms/{form_id}
        │
        ├─ prefillEnabled: true?
        │  └─ YES → Fetch prefill data
        │            │
        │            ├─ VA Profile API (/v0/profile/)
        │            ├─ MVI (Master Veteran Index)
        │            └─ Form-specific endpoints
        │
        ▼
Prefill data in Redux Store
        │
        ├─ prefillTransformer exists?
        │  └─ YES → Transform data
        │  └─ NO → Use as-is
        │
        ▼
Form pages rendered with prefilled values
        │
        ├─ PrefillMessage displays (optional)
        ├─ Form fields populated
        └─ Edit capability on review page
        │
        ▼
User completes/edits form
        │
        ▼
Review & Submit Page
        │
        ├─ ContactInfo component (editable contact info)
        └─ PersonalInformation component (read-only personal data)
        │
        ▼
Form Submission → POST /v0/form/{form_id}/submit
        │
        ├─ JSON Schema validation
        ├─ Save to database
        └─ Submit to downstream systems
```

## Appendix B: Component Comparison

| Feature | ContactInfo | PersonalInformation | prefillTransformer | profileContactInfo |
|---------|-------------|---------------------|--------------------|--------------------|
| **LOC** | 824 | 530 | 1,906 (total) | 258 |
| **Adoption** | 25 apps | 12 apps | 19 apps | 5 apps |
| **Edit Capability** | ✅ Yes | ❌ No | Custom | Custom |
| **Validation** | ✅ Built-in | ✅ Built-in | Custom | ✅ Built-in |
| **VA Profile Integration** | ✅ Automatic | ✅ Automatic | Manual | ✅ Automatic |
| **Custom Code Required** | ❌ No | ❌ No | ✅ Yes | ❌ No |
| **Flexibility** | Low | Low | High | Medium |
| **Maintenance** | Platform | Platform | Per-form | Platform |
| **Complexity** | Medium | Low-medium | High (varies) | Medium-high |
| **Recommendation** | ✅ Use | ✅ Use | ⚠️ Complex only | 🤔 Consider alternatives |

## Appendix C: Migration Examples

### Migrating from Direct formData to ContactInfo

**Before:**
```javascript
// In form component
useEffect(() => {
  const initialData = {
    email: user.profile.email,
    phone: user.profile.phone,
  };
  dispatch(setData(initialData));
}, []);
```

**After:**
```javascript
// In config/form.js
export default {
  prefillEnabled: true,
  // No other changes needed
};

// In review page config
import ContactInfo from 'platform/forms-system/src/js/components/ContactInfo';

const reviewPage = {
  uiSchema: {
    'ui:reviewField': ContactInfo,
  },
  schema: { type: 'object', properties: {} },
};
```

**Benefits:**
- 30+ lines of custom code removed
- Automatic VA Profile integration
- Built-in edit capability
- Consistent UX

### Simplifying Complex prefillTransformer

**Before:**
```javascript
// 150 lines of custom transformation
prefillTransformer: (pages, formData, metadata, state) => {
  return {
    pages,
    formData: {
      email: formData.email,
      phone: formData.homePhone?.phoneNumber,
      address: {
        street: formData.mailingAddress?.addressLine1,
        city: formData.mailingAddress?.city,
        state: formData.mailingAddress?.stateCode,
        zip: formData.mailingAddress?.zipCode,
      },
      // ... 140 more lines
    },
    metadata,
  };
};
```

**After:**
```javascript
// Use ContactInfo component for standard contact info
// Only transform non-standard data
prefillTransformer: (pages, formData, metadata, state) => {
  return {
    pages,
    formData: {
      // Only custom fields that ContactInfo doesn't handle
      customServiceHistory: transformServiceHistory(formData.serviceEpisodes),
    },
    metadata,
  };
};

// Use ContactInfo for standard contact fields
// In review page: <ContactInfo formContext={formContext} />
```

**Benefits:**
- Reduced custom code by 80%
- Leverages platform components
- Easier to maintain
- More consistent

---

**Document Status:** Draft for Review
**Next Review Date:** 2026-04-15
**Feedback:** Submit issues to [vets-website GitHub](https://github.com/department-of-veterans-affairs/vets-website)
