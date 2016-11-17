import Request from 'request-promise'

export const getLatest = (uri, query) => {
  const requestOpts = {
    uri: `${uri}/latest`,
    json: true
  }
  if (query) {
    requestOpts.qs = { base: query }
  }
  return Request(requestOpts)
}
