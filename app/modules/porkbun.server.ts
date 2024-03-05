import axios from 'axios';
import {PORKBUN_API_KEY, PORKBUN_SECRET_API_KEY} from "~/modules/constants.server";

export async function addSubdomain(subdomain: string,ip: string): Promise<any> {
  const response = await axios.post<{ status: string }>('https://porkbun.com/api/json/v3/dns/create/ebrouwer.dev', {
    apikey: PORKBUN_API_KEY,
    secretapikey: PORKBUN_SECRET_API_KEY,
    name: subdomain,
    type: 'A',
    content: ip,
    ttl: 60,
  });

  return response.data;
}

export async function deleteSubdomain(subdomain: string): Promise<any> {
  const response = await axios.post<{ status: string }>(`https://porkbun.com/api/json/v3/dns/deleteByNameType/ebrouwer.dev/A/${subdomain}`, {
    apikey: PORKBUN_API_KEY,
    secretapikey: PORKBUN_SECRET_API_KEY,
  });

  return response.data.status;
}