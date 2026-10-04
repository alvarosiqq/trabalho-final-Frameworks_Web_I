import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CharacterImage from './CharacterImage';

const Card = styled.article`
  border: 1px solid #d5dacd; border-radius: 12px; overflow: hidden; background: #fffdf7;
  a { display: block; text-decoration: none; height: 100%; }
  &:hover { border-color: #8b9c86; }
`;
const Body = styled.div`
  padding: 18px;
  h2 { margin: 10px 0; font-size: 1.35rem; }
  p { margin: 0; font-size: .9rem; color: #54635a; }
  small { text-transform: uppercase; letter-spacing: .09em; font-size: .7rem; color: #685221; }
`;

export default function CharacterCard({ character }) {
  return (
    <Card>
      <Link to={`/personagem/${character.id}`} aria-label={`Ver detalhes de ${character.name}`}>
        <CharacterImage character={character} />
        <Body><small>{character.house || 'Sem casa informada'}</small><h2>{character.name}</h2><p>Ver detalhes →</p></Body>
      </Link>
    </Card>
  );
}
