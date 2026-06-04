# QICN canonical release reproducibility container
# Governance boundary: this image supports repository-local verification only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, human mathematical review, or empirical validation.
FROM node:20-bookworm-slim

LABEL org.opencontainers.image.title="QICN canonical release verification"
LABEL org.opencontainers.image.description="Runs repository-local QICN canonical release and framework release gates."
LABEL qicn.governance_boundary="internal verification only; no external empirical or human-review certification"

WORKDIR /workspace/qicn

COPY rigid-identity-framework/package.json ./rigid-identity-framework/package.json
WORKDIR /workspace/qicn/rigid-identity-framework
RUN npm install --omit=dev --no-audit --no-fund || true

WORKDIR /workspace/qicn
COPY . .

WORKDIR /workspace/qicn/rigid-identity-framework
ENV QICN_GOVERNANCE_BLINDED=true
ENV QICN_CONTAINER_REPLICATION=true

CMD ["sh", "-lc", "cd /workspace/qicn && node scripts/verify-canonical-integrity.cjs && node scripts/verify-claim-registry.cjs && node scripts/verify-canonical-release.cjs && node scripts/audit-public-release-reproducibility.cjs && cd rigid-identity-framework && npm run verify:release"]
