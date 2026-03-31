# Metrics Undercounting Issues in `process-ds-components.js`

Source file: [`scripts/process-ds-components.js`](https://github.com/department-of-veterans-affairs/vets-design-system-documentation/blob/main/scripts/process-ds-components.js)

---

## Issue 1: `Map.set()` overwrites duplicate rows

**Location:** `parseDSComponentsCSV()` — `componentData.set(componentName, {...})`

**Severity:** High

If the same `component_name` appears more than once in the CSV, later rows silently overwrite earlier ones instead of summing. Any component with duplicate entries loses all but its last row.

**Example:**
```
date,component_name,app1,app2
2025-01,va-button,10,5   ← lost (15 uses discarded)
2025-01,va-button,20,8   ← kept
```

**Fix:** Use `componentData.get()` to check for an existing entry and accumulate counts rather than overwriting.

---

## Issue 2: `components_by_type` misses non-`va-`/`Va` components

**Location:** `processForDashboard()`

**Severity:** High

```javascript
const webComponents  = components.filter(c => c.name.startsWith('va-'));
const reactComponents = components.filter(c => c.name.startsWith('Va') && !c.name.startsWith('va-'));
```

Any component that doesn't start with `va-` or `Va` — including all `usa-*` components — is completely absent from:
- `components_by_type`
- `top_components_by_type`
- `summary_stats.components_by_type_count`

These components _do_ appear in `top_components_overall`, which creates a silent mismatch in summary stats:

> `webComponents.length + reactComponents.length ≠ total_components`

**Affected components:** Any `usa-*` component, or any component with a non-standard prefix.

**Fix:** Add a third type category (e.g. `uswds`) for `usa-*` components, and a catch-all for anything else.

---

## Issue 3: Sub-variants are never combined with their base component

**Location:** `combineComponentVariants()`

**Severity:** Medium — this is the same pattern as the international phone example

The normalization strips prefixes but keeps all hyphenated suffixes intact, so sub-variants are always treated as separate components and never roll up to their base:

| CSV name | Normalized to | Base component | Combined? |
|---|---|---|---|
| `va-telephone` | `Telephone` | `Telephone` | — |
| `va-telephone-international` | `TelephoneInternational` | `Telephone` | No |
| `va-alert` | `Alert` | `Alert` | — |
| `va-alert-expandable` | `AlertExpandable` | `Alert` | No |
| `va-button` | `Button` | `Button` | — |
| `va-button-icon` | `ButtonIcon` | `Button` | No |
| `va-button-pair` | `ButtonPair` | `Button` | No |
| `va-checkbox` | `Checkbox` | `Checkbox` | — |
| `va-checkbox-group` | `CheckboxGroup` | `Checkbox` | No |
| `va-file-input` | `FileInput` | `FileInput` | — |
| `va-file-input-multiple` | `FileInputMultiple` | `FileInput` | No |
| `va-modal` | `Modal` | `Modal` | — |
| `va-modal-force` | `ModalForce` | `Modal` | No |
| `va-radio` | `Radio` | `Radio` | — |
| `va-radio-option` | `RadioOption` | `Radio` | No |

Whether sub-variants _should_ roll up is a design decision, but the current behavior means they are counted separately in all views.

---

## Issue 4: `totalUsage > 0` silently drops zero-usage components

**Location:** `parseDSComponentsCSV()` — `if (totalUsage > 0)`

**Severity:** Low

Components with no recorded usage in any application are filtered out entirely with no warning or trace in the output. This is likely intentional, but a CSV parsing failure (e.g. all values coerced to `NaN → 0`) would cause rows to be silently dropped rather than surfacing an error.

---

## Summary

| # | Issue | Location | Severity | Impact |
|---|---|---|---|---|
| 1 | `Map.set()` overwrites duplicates | `parseDSComponentsCSV()` | High | Duplicate CSV rows lose all but the last |
| 2 | Non-`va-`/`Va` components excluded from type breakdown | `processForDashboard()` | High | `usa-*` and custom components missing from type stats |
| 3 | Sub-variants not combined with base (international phone pattern) | `combineComponentVariants()` | Medium | Sub-variants counted separately, never rolled up |
| 4 | Zero-usage components silently dropped | `parseDSComponentsCSV()` | Low | Parse errors could silently discard rows |
