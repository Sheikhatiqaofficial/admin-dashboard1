export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-03'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
"sk1xGR9bIlAdBYx3HSz56PqUcmHjMTY8PmHH0a1WFn2bNW6W3FPGEFy3msWzljBxyWZg55Odkc1xDyF36x0XQQVlcMnRU95FxkoCQiCbqkzIAZ7Xgy55mBfkj1cNF0hm7e4NTk1yKFmpNL3RWpxh4AGX3hb7afQJHCUBEaKCw653x3lP9jtY",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
