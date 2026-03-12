# ──────────────────────────────────────────────────────────────────────────────
# Dockerfile — Health-Sync Telemedicine Portal Backend (Multi-Stage Build)
# ──────────────────────────────────────────────────────────────────────────────

# ─── Stage 1: Build Stage ────────────────────────────────────────────────────
# Use the official Node.js LTS Alpine image as the base for a lightweight build
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package manifests first to leverage Docker layer caching.
# If package.json hasn't changed, npm install won't re-run on rebuild.
COPY package*.json ./

# Install ALL dependencies (including devDependencies) needed for the build stage
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# ─── Stage 2: Production Stage ───────────────────────────────────────────────
# Start fresh from the same lightweight Node.js Alpine image
FROM node:20-alpine AS production

# Set NODE_ENV to production for optimized Express behaviour
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package manifests from the builder stage
COPY --from=builder /app/package*.json ./

# Install ONLY production dependencies — omit devDependencies to keep the image small
RUN npm install --omit=dev

# Copy the built application source from the builder stage
COPY --from=builder /app/server.js ./
COPY --from=builder /app/controllers ./controllers
COPY --from=builder /app/models ./models
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/middleware ./middleware

# Expose the port the server listens on (can be overridden by environment variable)
EXPOSE 5000

# Start the Node.js server
CMD ["node", "server.js"]
