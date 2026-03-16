# Prefill Pattern

The Prefill Pattern enables VA.gov forms to automatically populate user information from VA Profile and other data sources, reducing form completion time and improving data accuracy.

## Table of Contents
- [Prefill Pattern](#prefill-pattern)
  - [Table of Contents](#table-of-contents)
  - [Architecture Overview](#architecture-overview)
  - [Data Flow](#data-flow)
  - [Available Prefill Approaches](#available-prefill-approaches)
    - [1. ContactInfo Component (Recommended)](#1-contactinfo-component-recommended)
    - [2. PersonalInformation Component (Recommended)](#2-personalinformation-component-recommended)
    - [3. prefillTransformer Function (Use for Complex Cases)](#3-prefilltransformer-function-use-for-complex-cases)
    - [4. PrefillMessage Component](#4-prefillmessage-component)
    - [5. profileContactInfo Pattern (Consider)](#5-profilecontactinfo-pattern-consider)
    - [6. Direct formData Prepopulation (Deprecated)](#6-direct-formdata-prepopulation-deprecated)
  - [Decision Matrix](#decision-matrix)
  - [How to Implement](#how-to-implement)
    - [Option A: Using ContactInfo Component](#option-a-using-contactinfo-component)
    - [Option B: Using prefillTransformer](#option-b-using-prefilltransformer)
    - [Option C: Using profileContactInfo Pattern](#option-c-using-profilecontactinfo-pattern)
  - [Best Practices](#best-practices)
  - [Migration Guide](#migration-guide)
  - [Common Issues](#common-issues)
  - [Statistics](#statistics)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PREFILL ARCHITECTURE                           │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   Data Sources   │
└──────────────────┘
        │
        ├─── VA Profile API (/v0/profile/)
        │    • Contact info (phone, email, address)
        │    • Personal info (name, DOB, gender)
        │
        ├─── MVI (Master Veteran Index)
        │    • Service history
        │    • Disability ratings
        │
        └─── Other APIs
             • /health_care_applications/rating_info
             • Form-specific endpoints

                    ▼ API Calls (on form load)

┌─────────────────────────────────────────────────────────────────────────┐
│                          BACKEND (vets-api)                              │
│                                                                           │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │  Prefill Service                                               │     │
│  │  • Fetches user data from multiple sources                     │     │
│  │  • Combines and normalizes data                                │     │
│  │  • Returns as JSON                                             │     │
│  └───────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘

                    ▼ JSON Response

┌─────────────────────────────────────────────────────────────────────────┐
│                      FRONTEND (vets-website)                             │
│                                                                           │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │  Redux Store                                                   │     │
│  │  • Stores prefill data in state                                │     │
│  │  • form.data.prefill                                           │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                              │                                           │
│                              ▼                                           │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │  Prefill Processing Layer                                      │     │
│  │                                                                 │     │
│  │  ┌─────────────────────────────────────────────────────────┐  │     │
│  │  │ prefillTransformer (if configured)                      │  │     │
│  │  │ • Custom transformation per form                        │  │     │
│  │  │ • Maps prefill data to form schema                      │  │     │
│  │  │ • Returns transformed formData                          │  │     │
│  │  └─────────────────────────────────────────────────────────┘  │     │
│  │                                                                 │     │
│  │  ┌─────────────────────────────────────────────────────────┐  │     │
│  │  │ Platform Components (if used)                           │  │     │
│  │  │ • ContactInfo / PersonalInformation                     │  │     │
│  │  │ • Automatic VA Profile integration                      │  │     │
│  │  └─────────────────────────────────────────────────────────┘  │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                              │                                           │
│                              ▼                                           │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │  Form Pages                                                    │     │
│  │  • Display prefilled values in form fields                     │     │
│  │  • User can edit/update                                        │     │
│  │  • Validation on submit                                        │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                              │                                           │
│                              ▼                                           │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │  Review & Submit Page                                          │     │
│  │  • ContactInfo component (displays with edit capability)       │     │
│  │  • PersonalInformation component (read-only display)           │     │
│  └───────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘

                    ▼ Form Submission

┌─────────────────────────────────────────────────────────────────────────┐
│                          BACKEND (vets-api)                              │
│  • JSON Schema validation                                                │
│  • Save to database                                                      │
│  • Submit to downstream systems                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User loads form
      │
      ▼
GET /v0/in_progress_forms/{form_id}
      │
      ├─ Check prefillEnabled in config
      │  └─ If true, fetch prefill data
      │
      ▼
Prefill data loaded into Redux
      │
      ├─ If prefillTransformer exists
      │  └─ Transform data to match form schema
      │
      ▼
Form fields populated with prefilled values
      │
      ▼
User sees:
  • PrefillMessage (optional alert)
  • Form fields with prefilled data
  • Edit capability on review page
      │
      ▼
User completes/edits form
      │
      ▼
Form submitted with final values
```

## Available Prefill Approaches

### 1. ContactInfo Component (Recommended)

**Status:** Recommended
**Lines of Code:** 824
**Adoption:** 25 applications (17% of forms)
**Complexity:** Medium
**Build Time:** Initial: 2-3 weeks | Per-Form: None (reuse)

Review page component that displays contact information with edit capability.

**Use When:**
- You need to display contact info (phone, email, address) on review page
- You want built-in edit capability
- You want consistent UX across forms

**Example:**
```jsx
import ContactInfo from 'platform/forms-system/src/js/components/ContactInfo';

<ContactInfo
  formContext={formContext}
  data={formData}
  page={page}
/>
```

**Pros:**
- Consistent UX across forms
- Built-in validation
- No custom code needed
- Automatic VA Profile integration

**Cons:**
- Limited customization
- Requires specific schema structure
- May not fit all form designs

---

### 2. PersonalInformation Component (Recommended)

**Status:** Recommended
**Lines of Code:** 530
**Adoption:** 12 applications (8% of forms)
**Complexity:** Low-medium
**Build Time:** Initial: 1-2 weeks | Per-Form: None (reuse)

Review page component for displaying personal information (name, DOB, SSN, gender).

**Use When:**
- You need to display personal info on review page
- Read-only display is acceptable
- You want consistent formatting

**Example:**
```jsx
import PersonalInformation from 'platform/forms-system/src/js/components/PersonalInformation';

<PersonalInformation
  formData={formData}
  showMask={true}
/>
```

**Pros:**
- Simple to use
- Consistent display
- No custom code needed
- Secure SSN masking

**Cons:**
- Read-only (no edit capability)
- Limited to personal info only

---

### 3. prefillTransformer Function (Use for Complex Cases)

**Status:** Use for complex cases
**Lines of Code:** 1,906 (across 36 files)
**Adoption:** 19 applications (13% of forms)
**Complexity:** High (varies)
**Build Time:** Per-Form: 1-5 days

Custom transformation functions in each form's config that map data from VA Profile/MVI to the form's data structure.

**Use When:**
- ContactInfo doesn't fit your use case
- You need custom data transformations
- You have complex nested data structures
- You need conditional logic
- You combine multiple data sources

**Example:**
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
        veteranDateOfBirth: formData.dateOfBirth,
        contactInfo: {
          email: formData.email,
          phone: formData.homePhone?.phoneNumber,
        },
      },
      metadata
    };
  }
};
```

**Pros:**
- Maximum flexibility
- Form-specific customization
- Can handle complex data structures
- No platform changes needed

**Cons:**
- Requires custom code per form
- No code reuse
- Maintenance burden
- Inconsistent implementations
- Testing overhead

---

### 4. PrefillMessage Component

**Status:** Recommended (for user communication)
**Lines of Code:** 23
**Adoption:** 6 applications (4% of forms)
**Complexity:** Low
**Build Time:** Initial: 1-2 days | Per-Form: None (reuse)

Alert message component shown at the start of a form to inform users that some information has been prefilled.

**Use When:**
- You want to inform users about prefilled data
- You need standard messaging
- You want to link to VA Profile

**Example:**
```jsx
import PrefillMessage from 'platform/forms/save-in-progress/PrefillMessage';

<PrefillMessage formContext={formContext}>
  Some of your information has been prefilled from your VA Profile.
</PrefillMessage>
```

**Pros:**
- Very simple
- Clear communication
- Customizable content

**Cons:**
- Just a message (no functionality)
- Often custom-implemented instead

---

### 5. profileContactInfo Pattern (Consider)

**Status:** Consider
**Lines of Code:** 258
**Adoption:** 5 applications (3% of forms)
**Complexity:** Medium-high
**Build Time:** Initial: 1-2 weeks | Per-Form: None (reuse)

Form definition pattern that provides prefill schemas and UI schemas for contact information fields.

**Use When:**
- You want declarative approach
- You're building a new form
- You don't need heavy customization

**Example:**
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

**Pros:**
- No custom transformation code
- Consistent implementation
- Platform-maintained
- Easy to use

**Cons:**
- Low adoption (only 5 forms)
- May not fit all use cases
- Limited customization

---

### 6. Direct formData Prepopulation (Deprecated)

**Status:** Deprecated (Do not use)
**Lines of Code:** 0 (pattern only)
**Adoption:** 18 applications (12% of forms)
**Complexity:** Low

Pattern where forms directly set `initialData` or `defaultFormData` in the Redux store on form load.

**Do NOT use this approach.** Migrate to ContactInfo, PersonalInformation, or prefillTransformer instead.

---

## Decision Matrix

| Scenario | Recommended Approach |
|----------|---------------------|
| Contact info on review page | **ContactInfo Component** |
| Personal info on review page | **PersonalInformation Component** |
| Complex custom mapping | **prefillTransformer** |
| Simple declarative contact fields | **profileContactInfo Pattern** |
| Inform users about prefill | **PrefillMessage Component** |
| Direct Redux manipulation | ❌ **DO NOT USE** (deprecated) |

## How to Implement

### Option A: Using ContactInfo Component

**Step 1:** Enable prefill in your form config

```javascript
// config/form.js
export default {
  prefillEnabled: true,
  // ... rest of config
};
```

**Step 2:** Add ContactInfo to your review page

```javascript
// In your review page config
import ContactInfo from 'platform/forms-system/src/js/components/ContactInfo';

const reviewPage = {
  uiSchema: {
    'ui:reviewField': ContactInfo,
  },
  schema: {
    type: 'object',
    properties: {},
  },
};
```

**Step 3:** (Optional) Add PrefillMessage to introduction page

```javascript
import PrefillMessage from 'platform/forms/save-in-progress/PrefillMessage';

<PrefillMessage formContext={formContext}>
  We've prefilled some information from your VA Profile.
</PrefillMessage>
```

---

### Option B: Using prefillTransformer

**Step 1:** Create a prefill transformer function

```javascript
// prefillTransformer.js
export default function prefillTransformer(pages, formData, metadata, state) {
  return {
    pages,
    formData: {
      // Map prefill data to your form schema
      veteranFullName: {
        first: formData.firstName,
        last: formData.lastName,
      },
      veteranDateOfBirth: formData.dateOfBirth,
      contactInfo: {
        email: formData.email,
        homePhone: formData.homePhone?.phoneNumber,
      },
    },
    metadata,
  };
}
```

**Step 2:** Add to your form config

```javascript
// config/form.js
import prefillTransformer from './prefillTransformer';

export default {
  prefillEnabled: true,
  prefillTransformer,
  // ... rest of config
};
```

---

### Option C: Using profileContactInfo Pattern

```javascript
import { profileContactInfo } from 'platform/forms-system/src/js/definitions/profileContactInfo';

const formConfig = {
  prefillEnabled: true,
  chapters: {
    contactInfo: {
      title: 'Contact Information',
      pages: {
        contactInfoPage: {
          ...profileContactInfo({
            required: ['email', 'phone'],
            label: 'Your contact information',
          }),
        },
      },
    },
  },
};
```

---

## Best Practices

1. **Always enable prefill for forms collecting user information**
   ```javascript
   prefillEnabled: true
   ```

2. **Use ContactInfo component for contact info on review pages**
   - Most mature and widely adopted
   - Provides consistent UX

3. **Use PrefillMessage to inform users**
   - Let users know data is prefilled
   - Explain they can edit if needed

4. **Only use prefillTransformer when necessary**
   - Adds maintenance burden
   - Use platform components when possible

5. **Never use direct formData prepopulation**
   - This pattern is deprecated
   - Migrate to supported approaches

6. **Test prefill data transformations thoroughly**
   - Test with missing data
   - Test with partial data
   - Test with invalid data formats

7. **Handle errors gracefully**
   - Don't fail if prefill data unavailable
   - Allow users to enter data manually

---

## Migration Guide

### Migrating from Direct formData Prepopulation

**Before:**
```javascript
const initialData = {
  veteranFullName: {
    first: user.profile.firstName,
    last: user.profile.lastName,
  },
};
dispatch(setData(initialData));
```

**After (using prefillTransformer):**
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
      },
      metadata,
    };
  },
};
```

**After (using ContactInfo component):**
```javascript
// Just enable prefill - component handles the rest
export default {
  prefillEnabled: true,
};

// In review page:
import ContactInfo from 'platform/forms-system/src/js/components/ContactInfo';
```

---

## Common Issues

### Issue: Prefill data not appearing

**Cause:** `prefillEnabled: false` or missing in config

**Solution:** Set `prefillEnabled: true` in your form config

---

### Issue: Data structure mismatch

**Cause:** Prefill data doesn't match form schema

**Solution:** Use `prefillTransformer` to map data correctly

---

### Issue: User can't edit prefilled data

**Cause:** Using PersonalInformation component (read-only)

**Solution:** Use ContactInfo component for editable fields

---

## Statistics

| Approach | LOC | Apps | Adoption | Status |
|----------|-----|------|----------|--------|
| ContactInfo Component | 824 | 25 | 17% | ✅ Recommended |
| prefillTransformer | 1,906 | 19 | 13% | ⚠️ Complex cases |
| Direct formData | 0 | 18 | 12% | ❌ Deprecated |
| PersonalInformation | 530 | 12 | 8% | ✅ Recommended |
| PrefillMessage | 23 | 6 | 4% | ✅ Recommended |
| profileContactInfo | 258 | 5 | 3% | 🤔 Consider |

**Total Investment:**
- Platform codebase: 3,541 lines
- Development time: ~16-20 weeks cumulative
- Forms using prefill: 25+ applications
- Forms not using prefill: 122 (migration opportunity)

---

**Last Updated:** March 15, 2026
**Maintainer:** Platform Team
**Repository:** vets-website
