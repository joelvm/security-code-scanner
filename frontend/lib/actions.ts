import type { VulnerabilityType } from "types/vulnerability-type";

export async function getVulnerabilityTypes(): Promise<VulnerabilityType[]> {

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const url = `${import.meta.env.VITE_APP_API_URL}/vulnerability-types`
    const x = await fetch(url, {
      method: 'GET', headers: headers,
      cache: 'no-store'
    }).then(response => {
      return response.json()
    })
    .catch(error => {
        return { error: { code: error.status, message: error.message }}
      });
    return x   
}

export async function getVulnerabilityType(id: string): Promise<VulnerabilityType[]> {

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const url = `${import.meta.env.VITE_APP_API_URL}/vulnerability-type/${id}`
  const x = await fetch(url, {
    method: 'GET', headers: headers,
    cache: 'no-store'
  }).then(response => {
    return response.json()
  })
  .catch(error => {
      return { error: { code: error.status, message: error.message }}
    });
    return x   
}

export async function deleteVulnerabilityTypes(id: string) {

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const url = `${import.meta.env.VITE_APP_API_URL}/vulnerability-types/${id}`
  const x = await fetch(url, {
    method: 'DELETE', headers: headers,
    cache: 'no-store'
  }).then(response => {
    return response.json()
  })
  .catch(error => {
      return { error: { code: error.status, message: error.message }}
    });
    return x   
}

export async function runScan(data: Object) {

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const url = `${import.meta.env.VITE_APP_API_URL}/run-scan`
  const x = await fetch(url, {
    method: 'POST', headers: headers,
    body: JSON.stringify(data),
    cache: 'no-store'
  }).then(response => {
    return response.json()
  })
  .catch(error => {
      return { error: { code: error.status, message: error.message }}
    });
    return x   
}