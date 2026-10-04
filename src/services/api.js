import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hp-api.onrender.com/api',
  timeout: 30000,
});

export async function getCharacters(signal) {
  const { data } = await api.get('/characters', { signal });
  if (!Array.isArray(data)) throw new Error('Resposta inválida da API.');
  return data;
}

export async function getCharacter(id, signal) {
  const { data } = await api.get(`/character/${encodeURIComponent(id)}`, { signal });
  if (!Array.isArray(data)) throw new Error('Resposta inválida da API.');
  return data[0] ?? null;
}
