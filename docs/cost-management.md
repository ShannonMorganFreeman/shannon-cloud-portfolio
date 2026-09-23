# Cost management

Cost control is part of the architecture. This project uses a small, static-site design and avoids services or storage settings whose cost is not justified by the current requirements.

## Budget

A monthly AWS cost budget is configured with a limit of **US$1.00**. At the time it was checked, actual spend was US$0.001 and the forecast was US$0.00; these are time-sensitive observations, not ongoing guarantees.

No budget notifications are configured. The budget is a cost-governance threshold and should not be described as an alerting system. Review current AWS billing and budget settings directly when operating the account.

## Storage and history

S3 versioning is intentionally disabled to avoid retaining prior object versions and increasing storage costs during repeated site deployments. This is a deliberate trade-off: accidental overwrites or deletions are not recoverable from S3 object versions.

Git and GitHub provide version history for the site's source and documentation. They do not restore deployed S3 objects by themselves; a known-good revision must be redeployed to restore site content.

## Scope choices

WAF, Shield Advanced, and Origin Shield were not added. For the portfolio's current scale and requirements, their cost and operational overhead were not warranted. This is a context-specific decision and should be revisited if the traffic profile, availability target, or threat model changes.

## Operating practice

- Check current AWS charges and budget status during project maintenance.
- Treat US$1 as a configured budget limit, not a promise that the project cannot incur charges above it.
- Before adding an AWS service or changing retention settings, review its expected cost and operational effect.
- Keep the static delivery architecture aligned to actual project needs.
