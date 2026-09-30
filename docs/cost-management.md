# Cost management

Cost control is part of the architecture. This project uses a small, static-site design and avoids services or storage settings whose cost is not justified by the current requirements.

## Budget

A monthly AWS cost budget is configured with a limit of **US$1.00** and a notification to alert when spending exceeds the threshold.

The budget provides visibility into costs and supports early investigation of unexpected charges. It is a monitoring and alerting mechanism, not a spending cap, and it does not automatically stop services. Actual charges may exceed the configured budget.

## Storage and history

S3 versioning is intentionally disabled to avoid retaining prior object versions and increasing storage costs during repeated site deployments. This is a deliberate trade-off: accidental overwrites or deletions cannot be recovered through S3 object version history.

Git and GitHub provide version history for the site's source and documentation. They do not restore deployed S3 objects by themselves; a known-good revision must be redeployed to restore site content.

## Scope choices

AWS WAF, AWS Shield Advanced, and CloudFront Origin Shield are not enabled. For the portfolio's current scale and requirements, their additional cost and operational overhead are not currently justified.

These are project-specific decisions, not general recommendations against these services. They should be reassessed if the site's traffic, exposure, availability requirements, or risk profile changes.

## Operating practice

- Check current AWS charges and budget status during project maintenance.
- Treat US$1 as a configured budget threshold, not a guarantee that charges cannot exceed it.
- Investigate budget notifications and unexpected changes in spending.
- Before adding an AWS service or changing retention settings, review its expected cost and operational effect.
- Keep the static delivery architecture aligned with actual project needs.
