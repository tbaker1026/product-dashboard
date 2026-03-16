# Complete Analysis: All Prefill Variations on VA.gov

**Date:** March 11, 2026
**Total Variations Identified:** 6
**Total Lines of Code:** 3,541
**Total Forms Using Prefill:** 25+ applications

---

## Executive Summary

VA.gov uses **6 different prefill mechanisms** to prepopulate form data from VA Profile and other sources. The most widely adopted is **ContactInfo Component** (25 applications), while **prefillTransformer** has the largest codebase (1,906 lines across 36 files).

---

## 1. ContactInfo Component

### Description
Review page component that displays contact information with edit capability. Allows users to verify and update phone, email, and address on review pages.

### Lines of Code
- **ContactInfo.jsx:** 420 lines
- **ContactInfoReview.jsx:** 295 lines
- **EditContactInfo.jsx:** 109 lines
- **Total:** 824 lines

### Usage
- **Applications:** 25 (Most widely used!)
- **Files:** 90 files
- **Usage rate:** 17% of all VA.gov forms (25/147)

### Forms Using It
Major forms include:
- Healthcare applications (10-10EZ, EZR)
- Education benefits (multiple forms)
- Disability compensation (526-EZ)
- Appeals (995, 996, 10182)
- Benefits-optimization forms
- CHAMPVA applications
- Representative appointment
- Simple forms

### Time to Build (Estimated)
- **Initial build:** 2-3 weeks (3 components)
- **Maintenance:** Ongoing, 2-4 commits
- **Contributors:** 2 developers
- **Complexity:** Medium

### Features
✅ Displays prefilled contact info on review page
✅ Edit button opens modal/page for updates
✅ Integrates with VA Profile API
✅ Validates changes before saving
✅ Shows confirmation after updates
✅ Supports phone, email, address fields

### API Surface
```javascript
import ContactInfo from 'platform/forms-system/src/js/components/ContactInfo';

<ContactInfo
  formContext={formContext}
  data={formData}
  page={page}
/>
```

### Pros
✅ Consistent UX across forms
✅ Built-in validation
✅ No custom code needed
✅ Automatic VA Profile integration

### Cons
❌ Limited customization
❌ Requires specific schema structure
❌ May not fit all form designs

---

## 2. prefillTransformer

### Description
Custom transformation functions in each form's config that map data from VA Profile/MVI to the form's data structure. Most flexible but requires custom implementation per form.

### Lines of Code
- **Total:** 1,906 lines (Largest codebase!)
- **Files:** 36 custom transformer files
- **Average per transformer:** 53 lines
- **Range:** 10-200+ lines depending on complexity

### Usage
- **Applications:** 19
- **Files:** 36 transformer files
- **Usage rate:** 13% of all VA.gov forms

### Forms Using It
- Appeals (995, 996, 10182, testing/sc, testing/hlr)
- Benefits-optimization (21-4192, 21-2680, 21-0779, 21p-530a)
- Ask VA
- Healthcare supply reordering
- Healthcare application (10-10EZ)
- VRE 28-1900
- Income and asset statement
- Dependents (686c-674, verification)
- Disability benefits (all-claims)
- Education benefits (10203, 1995, 0994, 10297)
- Representative appointment
- Burials (EZ)
- IVC CHAMPVA (10-7959f-1, 10-7959f-2, 10-7959C, 10-10D, 10-10d-extended)
- EZR
- Dispute debt
- Simple forms (21p-0537, 21P-601, 26-4555, 20-10206, form-upload, 21-0966)

### Time to Build (Estimated)
- **Initial build per form:** 1-5 days
- **Simple transformer:** 1 day (basic mapping)
- **Complex transformer:** 3-5 days (conditional logic, nested data)
- **Total effort across all 36:** ~8-12 weeks

### Features
✅ Complete control over data mapping
✅ Can transform any structure
✅ Supports conditional logic
✅ Can combine multiple data sources
✅ Form-specific business logic

### API Surface
```javascript
// In config/form.js
export default {
  prefillEnabled: true,
  prefillTransformer: (pages, formData, metadata, state) => {
    return {
      pages,
      formData: {
        // Transform prefill data here
        veteranFullName: {
          first: formData.firstName,
          last: formData.lastName,
        },
        // ... more transformations
      },
      metadata
    };
  }
};
```

### Example Implementations

**Simple (Ask VA - 27 lines):**
```javascript
export default function prefillTransformer(pages, formData, metadata) {
  return {
    pages,
    formData: {
      ...formData,
      veteranDateOfBirth: formData.dateOfBirth,
    },
    metadata,
  };
}
```

**Complex (Disability Benefits 526 - ~200 lines):**
```javascript
export default function prefillTransformer(pages, formData, metadata, state) {
  // Complex logic for:
  // - Service history transformation
  // - Disability ratings mapping
  // - Contact info restructuring
  // - Conditional field population
  // - Data validation and cleanup
  // ... 200 lines of transformation logic
}
```

### Pros
✅ Maximum flexibility
✅ Form-specific customization
✅ Can handle complex data structures
✅ No platform changes needed

### Cons
❌ Requires custom code per form
❌ No code reuse
❌ Maintenance burden
❌ Inconsistent implementations
❌ Testing overhead

---

## 3. PersonalInformation Component

### Description
Review page component for displaying personal information (name, date of birth, SSN, gender). Read-only display with instructions for updating via VA Profile.

### Lines of Code
- **PersonalInformation.jsx:** 332 lines
- **PersonalInformationReview.jsx:** 198 lines
- **Total:** 530 lines

### Usage
- **Applications:** 12
- **Files:** 26 files
- **Usage rate:** 8% of all VA.gov forms

### Forms Using It
- Healthcare (10-10EZ, EZR)
- Education benefits
- Disability benefits
- Representative forms
- Simple forms
- Appeals

### Time to Build (Estimated)
- **Initial build:** 1-2 weeks
- **Maintenance:** 2-3 commits
- **Contributors:** 2 developers
- **Complexity:** Low-medium

### Features
✅ Displays name, DOB, SSN, gender
✅ Read-only (no editing on form)
✅ Instructions for VA Profile updates
✅ Consistent formatting
✅ Masked SSN display

### API Surface
```javascript
import PersonalInformation from 'platform/forms-system/src/js/components/PersonalInformation';

<PersonalInformation
  formData={formData}
  showMask={true}
/>
```

### Pros
✅ Simple to use
✅ Consistent display
✅ No custom code needed
✅ Secure SSN masking

### Cons
❌ Read-only (no edit capability)
❌ Limited to personal info only
❌ Less adopted than ContactInfo

---

## 4. profileContactInfo Pattern

### Description
Form definition pattern that provides prefill schemas and UI schemas for contact information fields. Works with form-system to automatically prefill from VA Profile.

### Lines of Code
- **profileContactInfo.js:** 258 lines

### Usage
- **Applications:** 5
- **Files:** 14 files
- **Usage rate:** 3% of all VA.gov forms (Least used!)

### Forms Using It
- Appeals forms
- Select newer forms adopting the pattern

### Time to Build (Estimated)
- **Initial build:** 1-2 weeks
- **Platform-level pattern**
- **Maintenance:** 2 commits
- **Contributors:** 2 developers
- **Complexity:** Medium-high

### Features
✅ Declarative approach (no custom code)
✅ Automatic VA Profile integration
✅ Built-in validation
✅ Consistent schemas
✅ Phone, email, address support

### API Surface
```javascript
import { profileContactInfo } from 'platform/forms-system/src/js/definitions/profileContactInfo';

const formConfig = {
  chapters: {
    contactInfo: {
      pages: {
        contact: {
          ...profileContactInfo({
            required: ['phone', 'email'],
            label: 'Contact information',
          }),
        },
      },
    },
  },
};
```

### Pros
✅ No custom transformation code
✅ Consistent implementation
✅ Platform-maintained
✅ Easy to use

### Cons
❌ Low adoption (only 5 forms)
❌ May not fit all use cases
❌ Limited customization
❌ Requires specific schema structure

---

## 5. PrefillMessage Component

### Description
Alert message component shown at the start of a form to inform users that some information has been prefilled from their VA Profile.

### Lines of Code
- **PrefillMessage.jsx:** 13 lines
- **MilitaryPrefillMessage.jsx:** 10 lines
- **Total:** 23 lines (Smallest!)

### Usage
- **Applications:** 6
- **Files:** 24 files
- **Usage rate:** 4% of all VA.gov forms

### Forms Using It
- Education benefits (10203)
- Burials
- Custom implementations in various forms

### Time to Build (Estimated)
- **Initial build:** 1-2 days (very simple)
- **Maintenance:** 2 commits
- **Contributors:** 1 developer
- **Complexity:** Low

### Features
✅ Informs user of prefilled data
✅ Standard messaging
✅ Links to VA Profile
✅ Can be customized

### API Surface
```javascript
import PrefillMessage from 'platform/forms/save-in-progress/PrefillMessage';

<PrefillMessage formContext={formContext}>
  Some of your information has been prefilled from your VA Profile.
</PrefillMessage>
```

### Pros
✅ Very simple
✅ Clear communication
✅ Customizable content

### Cons
❌ Just a message (no functionality)
❌ Often custom-implemented instead

---

## 6. Direct formData Prepopulation

### Description
Pattern where forms directly set `initialData` or `defaultFormData` in the Redux store on form load. No dedicated component, just direct state manipulation.

### Lines of Code
- **No central component** (pattern only)
- **0 lines in platform** (implemented per-form)

### Usage
- **Applications:** 18
- **Files:** 60 files using `initialData` or `defaultFormData`
- **Usage rate:** 12% of all VA.gov forms

### Forms Using It
- Various forms setting default values
- Forms with static prepopulation
- Legacy forms

### Time to Build (Estimated)
- **Per form:** 1-2 hours (very simple)
- **Total across 18 forms:** 2-3 days

### Features
⚠️ Direct Redux manipulation
⚠️ No platform support
⚠️ Form-specific implementation

### API Surface
```javascript
// In form initialization
const initialData = {
  veteranFullName: {
    first: user.profile.firstName,
    last: user.profile.lastName,
  },
  // ... more fields
};

// Dispatch to Redux
dispatch(setData(initialData));
```

### Pros
✅ Very simple
✅ Complete control
✅ No dependencies

### Cons
❌ No code reuse
❌ Inconsistent implementations
❌ Hard to maintain
❌ No validation
❌ Error-prone
❌ Deprecated pattern

---

## Comparative Analysis

### By Lines of Code

| Rank | Variation | LOC | Complexity |
|------|-----------|-----|------------|
| 1 | **prefillTransformer** | 1,906 | High (varies) |
| 2 | **ContactInfo Component** | 824 | Medium |
| 3 | **PersonalInformation Component** | 530 | Low-medium |
| 4 | **profileContactInfo pattern** | 258 | Medium-high |
| 5 | **PrefillMessage Component** | 23 | Low |
| 6 | **Direct formData** | 0 | N/A (pattern) |

### By Adoption (Most Used)

| Rank | Variation | Applications | % of Forms |
|------|-----------|--------------|------------|
| 1 | **ContactInfo Component** | 25 | 17% |
| 2 | **prefillTransformer** | 19 | 13% |
| 3 | **Direct formData** | 18 | 12% |
| 4 | **PersonalInformation Component** | 12 | 8% |
| 5 | **PrefillMessage Component** | 6 | 4% |
| 6 | **profileContactInfo pattern** | 5 | 3% |

### By Number of Files

| Rank | Variation | Files |
|------|-----------|-------|
| 1 | **ContactInfo Component** | 90 |
| 2 | **Direct formData** | 60 |
| 3 | **prefillTransformer** | 36 |
| 4 | **PersonalInformation Component** | 26 |
| 5 | **PrefillMessage Component** | 24 |
| 6 | **profileContactInfo pattern** | 14 |

### By Development Time (Estimated)

| Variation | Initial Build | Per-Form Effort | Total Effort |
|-----------|--------------|-----------------|--------------|
| **ContactInfo Component** | 2-3 weeks | None (reuse) | 3 weeks |
| **PersonalInformation** | 1-2 weeks | None (reuse) | 2 weeks |
| **profileContactInfo** | 1-2 weeks | None (reuse) | 2 weeks |
| **prefillTransformer** | N/A | 1-5 days each | 8-12 weeks total |
| **PrefillMessage** | 1-2 days | None (reuse) | 2 days |
| **Direct formData** | N/A | 1-2 hours each | 2-3 days total |

---

## Evolution Timeline (Estimated)

Based on pattern complexity and adoption:

### Phase 1: 2016-2017
- **Direct formData Prepopulation** - Earliest approach
- Simple Redux state manipulation
- Used by legacy forms

### Phase 2: 2017-2018
- **prefillTransformer** - Custom per-form approach
- **PrefillMessage Component** - User notification
- More structured approach

### Phase 3: 2018-2019
- **ContactInfo Component** - First reusable component
- Standardized contact info display/edit
- Became most widely adopted

### Phase 4: 2019-2020
- **PersonalInformation Component** - Personal data display
- Read-only approach for sensitive info

### Phase 5: 2020-2021
- **profileContactInfo pattern** - Declarative approach
- More sophisticated integration
- Lower adoption due to complexity

### Current State: 2026
- Multiple patterns coexist
- **ContactInfo** is standard for contact info
- **prefillTransformer** still widely used for custom needs
- **Direct formData** being phased out

---

## Recommendations

### ✅ Use These

**For Contact Information (phone, email, address):**
→ **ContactInfo Component**
- Most mature
- Widest adoption
- Best UX

**For Personal Information (name, DOB, SSN):**
→ **PersonalInformation Component**
- Standard approach
- Consistent display

**For Complex Custom Mapping:**
→ **prefillTransformer**
- When ContactInfo doesn't fit
- Complex data structures
- Custom business logic

**For User Communication:**
→ **PrefillMessage Component**
- Inform users about prefill
- Standard messaging

### ❌ Avoid These

**Direct formData Prepopulation:**
- Deprecated pattern
- Use ContactInfo or prefillTransformer instead

### 🤔 Consider These

**profileContactInfo pattern:**
- Good for new forms
- More declarative
- But low adoption = less community support

---

## Migration Opportunities

### Forms NOT Using Modern Prefill (122 forms)

**High-priority migrations:**
1. Forms manually displaying contact info → ContactInfo Component
2. Forms with custom contact edit → ContactInfo Component
3. Forms with complex Redux prepopulation → prefillTransformer
4. Forms without prefill messages → PrefillMessage Component

**Estimated effort:** 6-12 months for platform team to support migrations

---

## Total Investment

### Platform Codebase
- **Total LOC:** 3,541 lines
- **Components:** 6 variations
- **Files:** 3 platform components + 36 custom transformers

### Development Time (Estimated Cumulative)
- **Platform components:** ~8 weeks
- **Custom transformers:** ~8-12 weeks
- **Total:** ~16-20 weeks of development time

### Maintenance
- **Ongoing:** 10-15 commits/year across all prefill code
- **Contributors:** 5-10 developers
- **Support:** Platform team maintains core components

---

## Key Insights

### 🏆 Winner: ContactInfo Component
- **Most widely adopted** (25 forms)
- **Best developer experience**
- **Consistent UX**
- **Recommended for new forms**

### 📊 Largest Investment: prefillTransformer
- **1,906 lines across 36 files**
- **19 applications**
- **Necessary for complex cases**
- **High maintenance burden**

### 🎯 Opportunity: Consolidation
- 6 variations is too many
- Many overlapping use cases
- Could standardize on 2-3 patterns:
  1. **ContactInfo** for standard contact info
  2. **prefillTransformer** for custom needs
  3. **PrefillMessage** for communication

### ⚠️ Technical Debt
- **Direct formData** pattern still in 18 forms
- **profileContactInfo** underutilized (only 5 forms)
- Inconsistent implementations across forms
- Need migration plan

---

## Files Generated

📄 **PREFILL_VARIATIONS_COMPLETE_ANALYSIS.md** - This comprehensive analysis
📊 **prefill-variations-comprehensive.json** - Raw data in JSON
📋 **prefill-comprehensive-scan.log** - Scan output log
🔧 **scan-prefill-comprehensive.js** - Reusable scan script

All files in: `/Users/tricia/shai-hulud-detect/`

---

**Analysis Date:** March 11, 2026
**Analyst:** Claude Code
**Data Source:** Automated scan of vets-website repository
**Forms Analyzed:** 147 total VA.gov forms
