import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCharacter } from '../services/api';
import { Panel } from '../styles';
import CharacterImage from '../components/CharacterImage';
import Feedback from '../components/Feedback';

const Back = styled(Link)`display: inline-block; margin: 30px 0;`;
const Layout = styled.div`
  display: grid; grid-template-columns: minmax(0, 320px) minmax(0, 1fr); gap: 30px;
  > div { border-radius: 12px; overflow: hidden; }
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;
const Facts = styled.dl`
  display: grid; grid-template-columns: 1fr 1fr; gap: 22px;
  div { min-width: 0; }
  dt { color: #54635a; font-size: .85rem; margin-bottom: 8px; }
  dd { margin: 0; overflow-wrap: anywhere; }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;
const value = text => text || 'Não informado';

export default function Details() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setCharacter(null);
    getCharacter(id, controller.signal)
      .then(data => { if (!controller.signal.aborted) setCharacter(data); })
      .catch(() => { if (!controller.signal.aborted) setError('Não foi possível carregar os detalhes. Tente novamente.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id, attempt]);

  const facts = character ? [
    ['Casa', value(character.house)],
    ['Espécie', ({human: 'Humano', ghost: 'Fantasma', werewolf: 'Lobisomem', 'half-giant': 'Meio-gigante'})[character.species] || value(character.species)],
    ['Nascimento', value(character.dateOfBirth)],
    ['Intérprete', value(character.actor)],
    ['Patrono', value(character.patronus)],
    ['Vínculo', character.hogwartsStudent ? 'Estudante' : character.hogwartsStaff ? 'Funcionário' : 'Outro'],
    ['Bruxo(a)', character.wizard ? 'Sim' : 'Não'],
    ['Situação', character.alive ? 'Vivo(a)' : 'Falecido(a)'],
    ['Madeira da varinha', value(character.wand?.wood)],
    ['Núcleo da varinha', value(character.wand?.core)],
    ['Comprimento da varinha', character.wand?.length ? `${character.wand.length} polegadas` : 'Não informado'],
    ['Nomes alternativos', character.alternate_names?.join(', ') || 'Não informado'],
  ] : [];

  return <>
    <Back to="/">← Voltar ao catálogo</Back>
    {loading ? <Feedback loading message="Carregando detalhes..." />
      : error ? <Feedback message={error} onRetry={() => setAttempt(v => v + 1)} />
      : !character ? <Feedback message="Personagem não encontrado. Volte ao catálogo para escolher outro." />
      : <Layout><CharacterImage character={character} large /><Panel><h1>{character.name}</h1><Facts>{facts.map(([label, content]) => <div key={label}><dt>{label}</dt><dd>{content}</dd></div>)}</Facts></Panel></Layout>}
  </>;
}
