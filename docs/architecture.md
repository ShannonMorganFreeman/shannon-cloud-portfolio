# Architecture

## Overview

The portfolio is a static website stored in a private Amazon S3 bucket and delivered globally through Amazon CloudFront. DNS is hosted in a public Amazon Route 53 hosted zone, with domain nameservers delegated to Route 53 through the domain registrar, Afrihost.

The architecture separates public content delivery from the private storage origin. Visitors access the site through CloudFront, while Origin Access Control (OAC) allows CloudFront to retrieve content from S3 without making the bucket publicly accessible.

## Request and administration flows

### Website request path

1. A visitor requests the apex or `www` hostname.
2. The domain's nameserver configuration delegates DNS authority to the Route 53 public hosted zone.
3. Route 53 apex and `www` alias records direct requests to the CloudFront distribution.
4. CloudFront serves the site over HTTPS, redirects HTTP to HTTPS, and supports TLS 1.3 for viewer connections.
5. CloudFront sends signed origin requests using Origin Access Control. The S3 bucket policy permits object access through the specified CloudFront distribution.
6. S3 returns the requested static object to CloudFront, which delivers it to the visitor.

The browser-to-CloudFront connection uses the AWS Certificate Manager (ACM) viewer certificate. DNS validation has been completed for both the apex and `www` hostnames. The certificate is provisioned in `us-east-1`, as required for CloudFront viewer certificates.

### Deployment and administration

AWS CLI authentication uses AWS Sign-In and temporary credentials rather than long-lived access keys.

The deployment identity is assigned to an IAM group that has policies scoped to the portfolio's defined deployment requirements. This allows permissions to be managed consistently at group level, with users receiving the group's permissions through membership.

A separate administrative identity is reserved for account and infrastructure administration, including IAM, Route 53, and ACM responsibilities. This keeps routine deployment access distinct from administrative privileges.

Permissions follow the principle of least privilege, with access scoped to the responsibilities of each identity and the project.

## Architecture diagram

The GitHub-rendered Mermaid diagram and its design notes are maintained in [aws-architecture.md](../architecture/aws-architecture.md).

## Key security boundaries

- The S3 bucket is private, with Block Public Access enabled.
- CloudFront OAC is the intended delivery path to the S3 origin.
- S3 uses SSE-S3 default encryption.
- HTTP viewer requests are redirected to HTTPS.
- Administrative IAM, Route 53, and ACM responsibilities are kept separate from routine site deployment.
- IAM access is scoped to each identity's responsibilities and the project's deployment requirements.
- S3 versioning is intentionally disabled as a cost-control decision; Git and GitHub provide source history for the project.

## Explicitly out of scope

AWS WAF, Shield Advanced, and CloudFront Origin Shield are not part of this deployment. For a small static portfolio, their cost and operational overhead were not justified by the current requirements. These decisions should be revisited if the site's traffic, exposure, availability needs, or risk profile changes.
