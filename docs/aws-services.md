# AWS services

This page describes the AWS services used in the portfolio and the role each one plays.

| Service | Role in this project | Configuration and rationale |
|---|---|---|
| Amazon S3 | Stores static site files | Private bucket; S3 Block Public Access enabled; SSE-S3 encryption; versioning intentionally disabled to manage cost. |
| Amazon CloudFront | Public content delivery and HTTPS entry point | Routes viewer traffic to the S3 origin, with OAC used to authenticate CloudFront's origin requests; redirects HTTP to HTTPS; supports TLS 1.3 for viewer connections. |
| CloudFront Origin Access Control (OAC) | Restricts origin access to CloudFront requests | Controls authenticated CloudFront-to-S3 origin access using signed requests. |
| Amazon Route 53 | Authoritative public DNS hosting | Apex and `www` alias records target the CloudFront distribution. Afrihost remains the registrar and delegates nameservers to Route 53. |
| AWS Certificate Manager (ACM) | Issues and manages the CloudFront viewer TLS certificate | Certificate is in `us-east-1`, validated through DNS, and covers the apex and `www` hostnames. |
| AWS Identity and Access Management (IAM) | Defines deployment and administrative identities and permissions | Separates deployment and administrative responsibilities. Deployment permissions are managed through IAM groups and policies, with users receiving group permissions through membership. MFA is enabled on both identities. |
| AWS Sign-In | Provides AWS CLI authentication | Uses temporary credentials for the CLI workflow rather than relying on long-lived access keys. |
| AWS Budgets | Cost governance and monitoring | A monthly US$1 cost budget is configured with a notification to alert when spending exceeds the threshold. The notification supports cost monitoring but does not automatically stop services or cap spending. |

## Services deliberately not enabled

- **AWS WAF:** Not added because a small static portfolio does not currently justify the additional configuration and ongoing rule management.
- **AWS Shield Advanced:** Not added because its advanced DDoS protection and associated cost are beyond this project's current needs. The project does not claim to have Shield Advanced protection.
- **CloudFront Origin Shield:** Not added because the current single-site S3 origin and traffic profile do not justify its extra layer and cost.

These are project-specific scope decisions, not general recommendations against these services. Reassess them if requirements, traffic, exposure, or risk change.
