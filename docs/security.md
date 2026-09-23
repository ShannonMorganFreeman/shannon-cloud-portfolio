# Security

## Public delivery and origin protection

- Amazon S3 Block Public Access is enabled on the site bucket.
- The bucket remains private and uses SSE-S3 default encryption.
- Amazon CloudFront is the public entry point and uses Origin Access Control to access the S3 origin.
- CloudFront redirects HTTP viewer requests to HTTPS and supports TLS 1.3 for viewer connections.
- ACM provides the CloudFront viewer certificate from `us-east-1`; DNS validation is complete for both the apex and `www` hostnames.
- Route 53 apex and `www` alias records point to CloudFront.

## Identity and authentication

The project separates two IAM identities according to responsibility:

- **Deployment identity:** routine deployment work within the defined portfolio deployment scope.
- **Administrative identity:** administrative responsibilities, including IAM, Route 53, and ACM administration.

AWS CLI access uses AWS Sign-In temporary credentials rather than long-lived access keys. MFA is enabled on both IAM identities.

Permissions follow least privilege within each identity's responsibilities and project scope. The deployment identity is allowed to perform the deployment actions it is responsible for, while account administration remains with the administrative identity. This balances access reduction with a workable deployment process.

## Cost and resilience decisions

S3 versioning is intentionally disabled to manage storage cost. Git and GitHub preserve source history; restoring deployed content requires redeployment. The project also has a monthly US$1 AWS Budget, but no budget notifications are configured.

WAF, Shield Advanced, and Origin Shield were not enabled because their cost and operating overhead were not justified for this small portfolio's current requirements. Reassess this choice as the site's exposure, traffic, or availability requirements change.

## Information handling

Repository documentation must not contain AWS account IDs, certificate ARNs, MFA device serial numbers, access keys, session tokens, OAuth authorization data, or other secrets. Public DNS names and architecture descriptions should be included only when they are appropriate for a public portfolio.
