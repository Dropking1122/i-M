---
name: Imported project artifact workflows not registered
description: Freshly imported projects may have valid artifact.toml files on disk that the workflow/artifact registry hasn't picked up yet.
---

On a freshly imported pnpm-workspace project, `artifacts/*/.replit-artifact/artifact.toml` can be valid on disk while `.replit`'s `[workflows]` section is still empty and `listArtifacts()` returns nothing — the registry needs an explicit re-sync, not just file presence.

**Why:** artifact/workflow registration is triggered by a validated TOML write, not by the file merely existing after import.

**How to apply:** if `WorkflowsRestart` reports a workflow "doesn't exist in config" for an artifact that clearly has a toml, force re-registration by re-saving that `artifact.toml` unchanged through the artifact tooling's validated-replace flow, then retry `listArtifacts()` / `WorkflowsRestart`.
