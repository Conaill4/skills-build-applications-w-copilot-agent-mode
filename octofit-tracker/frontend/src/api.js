const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getCollection(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[collectionName])) {
    return payload[collectionName]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.data?.[collectionName])) {
    return payload.data[collectionName]
  }

  return []
}

export async function fetchCollection(endpointOrCollection, collectionName = endpointOrCollection) {
  const endpoint = endpointOrCollection.startsWith('http')
    ? endpointOrCollection
    : `${apiBaseUrl}/${endpointOrCollection}/`
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return getCollection(payload, collectionName)
}