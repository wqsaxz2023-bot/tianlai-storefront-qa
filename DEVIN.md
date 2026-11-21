# Devin Bot Setup — Tianlai Storefront QA

This repository configures automated cloud QA and regression triage for the Tianlai Toys B2B storefront (`https://www.tianlaitoys.com/products/t990/`).

## Scope

- Run desktop and mobile Playwright checks against the public English T-990 storefront page on every pull request and scheduled run.
- Verify reproducible build output consistency (preventing regressions such as duplicate blank lines around `hreflang` markup during localized SEO page generation).
- Keep quote/inquiry submission checks strictly isolated to staging with synthetic test payloads.

## Failure Triage Workflow (Devin Bot)

When a Playwright check fails in `.github/workflows/storefront-qa.yml`:

1. **Collect artifacts**: Inspect the uploaded Playwright trace (`trace.zip`), failure screenshot, and failing step log.
2. **Filter flakiness**: Rerun the failing spec once on the exact same commit (`npx playwright test <spec> --retries=0`).
   - If the failure does not reproduce or is caused by a staging/network outage, post the evidence summary as a PR comment and stop.
3. **Diagnose confirmed regressions**:
   - Locate the responsible component, SEO generator rule, or event handler.
   - Add a focused regression assertion covering the failure mode.
   - Open a **draft PR** with before-and-after Playwright trace/screenshot results.
4. **Human gate**: Never auto-merge. A human maintainer reviews the draft PR and merges after verification.
