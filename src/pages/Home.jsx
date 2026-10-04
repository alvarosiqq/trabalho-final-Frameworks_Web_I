import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Feedback from '../components/Feedback';

const Intro = styled.section`
  padding: 48px 0 30px;
  small { letter-spacing: .15em; text-transform: uppercase; color: #685221; }
  p { max-width: 600px; color: #54635a; }
`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px;
  @media (max-width: 1000px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (max-width: 750px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;
const Count = styled.p`color: #54635a; margin: 24px 0;`;
const PAGE_SIZE = 12;
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const house = params.get('house') || '';
  const role = params.get('role') || '';
  const requestedPage = Number(params.get('page')) || 1;

  // Cancela requisições quando a página é desmontada ou a tentativa muda.
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    getCharacters(controller.signal)
      .then(data => { if (!controller.signal.aborted) setCharacters(data); })
      .catch(() => { if (!controller.signal.aborted) setError('Não foi possível carregar os personagens. Confira sua conexão e tente novamente.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  // Todas as condições são aplicadas juntas antes de dividir os resultados em páginas.
  const filtered = characters.filter(character => {
    const matchName = normalize(character.name).includes(normalize(search.trim()));
    const matchHouse = !house || (house === 'none' ? !character.house : character.house === house);
    const matchRole = !role || (role === 'student' && character.hogwartsStudent)
      || (role === 'staff' && character.hogwartsStaff)
      || (role === 'other' && !character.hogwartsStudent && !character.hogwartsStaff);
    return matchName && matchHouse && matchRole;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Math.floor(requestedPage)), totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeFilter(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    next.delete('page'); // Uma busca nova sempre começa na primeira página.
    setParams(next, { replace: true });
  }

  function changePage(nextPage) {
    const next = new URLSearchParams(params);
    next.set('page', String(nextPage));
    setParams(next);
  }

  return (
    <>
      <Intro><small>Um catálogo do mundo bruxo</small><h1>Conheça quem faz<br />parte dessa história.</h1><p>Explore os personagens de Harry Potter. Busque por nome, combine os filtros e descubra os detalhes de cada personagem.</p></Intro>
      <Filters search={search} house={house} role={role} onChange={changeFilter} onClear={() => setParams({})} />
      {loading ? <Feedback loading message="Carregando personagens..." />
        : error ? <Feedback message={error} onRetry={() => setAttempt(value => value + 1)} />
        : <>
          <Count role="status">{filtered.length} personagem(ns) encontrado(s)</Count>
          {visible.length ? <Grid>{visible.map(character => <CharacterCard key={character.id} character={character} />)}</Grid>
            : <Feedback message="Nenhum personagem encontrado. Tente outro nome ou limpe os filtros." />}
          {filtered.length > PAGE_SIZE && <Pagination page={page} totalPages={totalPages} onChange={changePage} />}
        </>}
    </>
  );
}
