# Workflows (switched off)

These are the upstream MoneyMatter GitHub Actions workflows. They are kept here, outside
`.github/workflows/`, so GitHub does not run them.

They were moved because the tool that pushed this branch is not allowed to create or change
workflow files. The files themselves are unchanged.

To switch them on, move them back from an account that may edit workflows:

```sh
git mv .github/workflows-disabled .github/workflows
git rm .github/workflows/README.md
git commit -m "Enable the GitHub Actions workflows"
```

Before doing that, check what each one needs:

- `check-source-code.yml` (lint, tests, builds) and `release-version-check.yml` use no repository
  secrets.
- `preview-deploy.yml`, `preview-teardown.yml`, `database-backup.yml`, `image-to-docker-hub.yml`,
  `docs.yml`, `crowdin-upload.yml` and `crowdin-download.yml` need repository secrets for the
  upstream project's servers and accounts (VPS, Docker Hub, storage, Crowdin, Sentry).
  `database-backup.yml` and `crowdin-download.yml` also run on a schedule.
- `cla.yml` asks contributors to sign the upstream project's contributor licence agreement.
