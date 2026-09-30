# Security

## Public delivery and origin protection

- Amazon S3 Block Public Access is enabled on the site bucket.
- The S3 bucket remains private and uses server-side encryption with Amazon S3 managed keys (SSE-S3) by default.
- Amazon CloudFront is the public entry point and uses Origin Access Control (OAC) to access the S3 origin.
- CloudFront redirects HTTP viewer requests to HTTPS and supports TLS 1.3 for viewer connections.
- AWS Certificate Manager (ACM) provides the CloudFront viewer certificate in `us-east-1`. DNS validation is complete for both the apex and `www` hostnames.
- Amazon Route 53 apex and `www` alias records point to CloudFront.

## Identity and access management

The project separates access according to operational responsibility, using distinct IAM identities for deployment and administration.

- **Deployment access:** Routine deployment tasks are scoped to the permissions required to publish and maintain the portfolio.
- **Administrative access:** Account-level administration, including IAM, Route 53, and ACM responsibilities, is kept separate from routine deployment activity.

Deployment permissions are managed through IAM groups and policies, rather than assigning broad permissions to individual users. This provides a consistent way to apply and review access according to the deployment role. Administrative permissions remain separate and are used only for tasks that require them.

Permissions are designed around the principle of least privilege: each identity should have only the access needed for its defined responsibilities and project scope. This separation helps reduce unnecessary access while keeping routine deployment practical.

AWS CLI access uses AWS Sign-In temporary credentials rather than long-lived access keys. Multi-factor authentication (MFA) is enabled for both IAM identities as an additional authentication control.

## Cost and resilience decisions

S3 versioning is intentionally disabled to manage storage costs. Git and GitHub preserve source history; restoring deployed content requires redeployment.

The project has a monthly US$1 AWS Budget with a notification configured to alert when spending exceeds the threshold. The notification supports early investigation of unexpected costs without automatically interrupting service availability. As a lightweight, static professional portfolio, maintaining continuous public access is preferred over automatic service shutdown. The budget is a monitoring and alerting mechanism, not a spending cap.

AWS WAF, AWS Shield Advanced, and CloudFront Origin Shield are not enabled because their cost and operational overhead are not currently justified by this small portfolio's requirements. These decisions should be reassessed if the site's exposure, traffic, availability needs, or risk profile changes.

## Information handling

Repository documentation must not contain AWS account IDs, certificate ARNs, MFA device serial numbers, access keys, session tokens, OAuth authorization data, or other secrets.

Public DNS names and architecture descriptions may be included where they are appropriate for a public portfolio. Configuration details should be reviewed before publication to ensure they do not expose sensitive information or unnecessarily increase the project's attack surface.
