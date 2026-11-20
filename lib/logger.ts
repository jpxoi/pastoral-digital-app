export type LogMetadata = Record<string, unknown>

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

function getGlobalMetadata(): LogMetadata {
  const isServer = typeof window === 'undefined'
  return {
    service: 'pastoral-digital-app',
    runtime: isServer ? 'server' : 'browser',
    environment:
      (isServer ? process.env.VERCEL_ENV : undefined) ??
      process.env.NODE_ENV ??
      'development',
    ...(isServer && process.env.VERCEL_DEPLOYMENT_ID
      ? { instanceId: process.env.VERCEL_DEPLOYMENT_ID }
      : {}),
    ...(isServer && process.env.VERCEL_REGION
      ? { region: process.env.VERCEL_REGION }
      : {}),
    ...(isServer && process.env.VERCEL_GIT_COMMIT_SHA
      ? { version: process.env.VERCEL_GIT_COMMIT_SHA }
      : {}),
  }
}

export function createLogger(context: LogMetadata = {}) {
  const baseMetadata = { ...context }

  function write(level: LogLevel, message: string, metadata?: LogMetadata) {
    const attributes = { ...baseMetadata, ...metadata, ...getGlobalMetadata() }
    console[level](message, attributes)
  }

  return {
    debug: (message: string, metadata?: LogMetadata) =>
      write('debug', message, metadata),
    info: (message: string, metadata?: LogMetadata) =>
      write('info', message, metadata),
    warn: (message: string, metadata?: LogMetadata) =>
      write('warn', message, metadata),
    error: (message: string, metadata?: LogMetadata) =>
      write('error', message, metadata),
    with: (metadata: LogMetadata) =>
      createLogger({ ...baseMetadata, ...metadata }),
  }
}

export const logger = createLogger()
