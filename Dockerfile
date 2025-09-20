# ---------------------------------
# Stage 1: Builder
# ---------------------------------
# Use Node.js 20 slim as the base image
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm

# Set the working directory for the application
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy all source code
# (Unnecessary files are excluded by .dockerignore)
COPY . .

# Build the application
# Run the "build": "next build" script from package.json
RUN pnpm build

# ---------------------------------
# Stage 2: Production
# ---------------------------------
# Use the same base image as the build stage
FROM node:20-slim AS production

WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production
# Disable Next.js telemetry (optional)
ENV NEXT_TELEMETRY_DISABLED 1

# Create and use a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy standalone output from builder stage
# 'standalone' folder (including server.js and node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# 'static' folder (built assets)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose default port 3000
EXPOSE 3000

# Start the Next.js server
CMD ["node", "server.js"]