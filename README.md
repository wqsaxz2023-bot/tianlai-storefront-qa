# Tianlai Toys storefront QA

[Public English T-990 product page](https://www.tianlaitoys.com/products/t990/)

The Tianlai Toys B2B storefront uses TypeScript and Vite. Its build runs a product translation audit and generates localized SEO pages before bundling.

## November 2026 build regression

Repeated builds revealed that the SEO generator added blank lines around hreflang markup on hand-maintained pages on every run. The build passed, but its HTML output differed across successive builds. After correcting the generation rule, two consecutive builds matched file for file and matched the isolated build output used for the release.

## Proposed Devin pilot

- Run the existing build and compare consecutive build outputs in a pull request check.
- Use Playwright on desktop and mobile to verify that the English T-990 page renders and its quote button opens the expected form.
- Exercise the submission flow in staging with synthetic data.
- Attach a trace, screenshot, and failing step when a check fails. Rerun the failing spec once on the same commit.
- When a maintainer requests triage, diagnose confirmed regressions and open a draft fix with before-and-after results for human review.

The Playwright and Devin workflow above is proposed. The build regression and its verification are from the November 2026 release record.
