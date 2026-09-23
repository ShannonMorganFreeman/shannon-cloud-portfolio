# Architecture

## Overview

The portfolio is a static website stored in a private Amazon S3 bucket and delivered globally through Amazon CloudFront. DNS is hosted in a public Amazon Route 53 hosted zone, while Afrihost remains the domain registrar. CloudFront terminates viewer HTTPS using an ACM certificate issued in `us-east-1`.

## Request and administration flows

### Website request path

1. A visitor requests the apex or `www` hostname.
2. Afrihost delegates DNS authority to the Route 53 public hosted zone through nameserver configuration.
3. Route 53 apex and `www` alias records direct requests to the CloudFront distribution.
4. CloudFront serves the site over HTTPS, redirects HTTP to HTTPS, and supports TLS 1.3 for viewer connections.
5. CloudFront sends signed origin requests using Origin Access Control, and the S3 bucket policy permits object access from the specified CloudFront distribution.
6. S3 returns the requested static object to CloudFront, which delivers it to the visitor.

The browser-to-CloudFront connection uses the ACM viewer certificate. ACM DNS validation has been completed for both the apex and `www` names. The certificate is in `us-east-1`, as required for CloudFront viewer certificates.

### Deployment and administration

AWS CLI authentication uses AWS Sign-In and temporary credentials. The deployment identity performs the portfolio's defined deployment work; the administrative identity is reserved for responsibilities such as IAM, DNS, and certificate administration. MFA is enabled on both identities.

## Architecture diagram

The GitHub-rendered Mermaid diagram and its design notes are maintained in [aws-architecture.md](../architecture/aws-architecture.md).

## Key security boundaries

- The S3 bucket is private, with Block Public Access enabled.
- CloudFront OAC is the intended delivery path to the bucket.
- S3 uses SSE-S3 default encryption.
- HTTP viewer requests are redirected to HTTPS.
- Administrative IAM, Route 53, and ACM responsibilities are kept separate from routine site deployment.
- IAM access is scoped to each identity's responsibilities and the project deployment scope.
- S3 versioning is intentionally disabled as a cost-control decision; Git and GitHub provide source history for the project.

## Explicitly out of scope

WAF, Shield Advanced, and Origin Shield are not part of this deployment. For a small static portfolio, their cost and added operations were not justified by the current requirements. Revisit these choices if the site's threat model, availability needs, or traffic profile changes.
