# Deployment

This document describes the deployment model without including credentials, secrets, or account-specific infrastructure identifiers.

## Website source

The deployable website is maintained in the repository root:

- `index.html` — page structure and content
- `styles.css` — layout, visual design, and responsive styling
- `script.js` — client-side JavaScript
- `assets/` — website images and CV

These root-level files are the source used for deployment to the private Amazon S3 origin. The `site/` duplicate has been removed; make and review website changes in the root-level files.

## Deployment identity

AWS CLI authentication uses AWS Sign-In, which provides temporary credentials. Do not configure or store long-lived IAM access keys for this workflow.

Routine portfolio deployment uses the deployment identity. Its permissions are managed through IAM groups and policies and are scoped to the project's defined deployment responsibilities, including the actions needed to publish and maintain site content.

This follows the principle of least privilege within the intended responsibility and project scope: the deployment identity should have the permissions required to perform its assigned work, without unnecessary administrative access.

Use the separate administrative identity for account-level tasks that require broader permissions, including IAM, Route 53, and ACM administration.

## Deployment sequence

1. Make and review changes to the root-level website files locally.
2. Authenticate the intended CLI identity using AWS Sign-In and confirm the active identity before making AWS changes.
3. Publish the updated static site objects to the configured private S3 origin using the established project deployment procedure.
4. If the deployment requires immediate replacement of cached content, invalidate the relevant CloudFront paths using the established procedure.
5. Open the site through its HTTPS hostname and confirm the expected content is served.
6. Review the deployment result and current AWS cost status.

Deployment commands should use the project's verified configuration and the intended AWS CLI identity. Confirm the target bucket, distribution, paths, and profile before running commands. Do not copy infrastructure identifiers or credentials into public documentation.

## Recovery considerations

S3 versioning is intentionally disabled as a cost-control decision. Git and GitHub retain source history, so recovery means checking out a known-good source revision, reviewing it, and deploying it again.

Git history does not restore deployed S3 objects by itself. After redeployment, verify the site through its HTTPS hostname and invalidate relevant CloudFront paths if cached content needs to be replaced.

## Administrative changes

Use the administrative identity for IAM, Route 53, and ACM work. Changes to DNS or certificate configuration should be reviewed separately from routine site publishing.

Infrastructure changes should be planned and verified before they are applied. Keep administrative permissions separate from routine deployment permissions, and review AWS costs and site availability after changes where relevant.
