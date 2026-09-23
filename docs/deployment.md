# Deployment

This document describes the deployment model without including credentials, secrets, or account-specific infrastructure identifiers.

## Deployment identity

Use AWS CLI authentication through AWS Sign-In, which provides temporary credentials. Do not configure or store long-lived IAM access keys for this workflow.

Routine portfolio deployment uses the deployment identity. Its permissions are scoped to the project's defined deployment responsibilities, including the actions needed to deploy site content and manage the relevant CloudFront delivery configuration. Administrative tasks such as IAM, DNS, and ACM management belong to the administrative identity.

This is least privilege within the intended responsibility and project deployment scope: the deployment identity should have the permissions required to perform its assigned work, without unrelated account-administration access.

## Deployment sequence

1. Make and review site changes locally.
2. Authenticate the intended CLI identity using AWS Sign-In and confirm the active identity before making AWS changes.
3. Publish the updated static site objects to the configured private S3 origin using the established project deployment procedure.
4. If the deployment requires immediate replacement of cached content, invalidate the relevant CloudFront paths using the established procedure.
5. Open the site through its HTTPS hostname and confirm the expected content is served.
6. Review the deployment result and current AWS cost status.

The exact upload and invalidation commands depend on the project's existing site build and deployment setup. Confirm those values from the local project configuration before running commands; do not copy commands from another AWS account or project.

## Recovery considerations

S3 versioning is disabled intentionally. Git/GitHub retains source history, so recovery means checking out a known-good source revision and deploying it again. Git history does not restore S3 objects automatically.

## Administrative changes

Use the administrative identity for IAM, Route 53, and ACM work. Changes to DNS or certificate configuration should be reviewed separately from routine site publishing. No infrastructure changes are required for a normal content deployment.
