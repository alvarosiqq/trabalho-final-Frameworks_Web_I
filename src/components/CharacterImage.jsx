import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  height: ${({ $large }) => $large ? '400px' : '240px'};
  background: #e4e8dd; display: grid; place-items: center; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  span { font-family: Georgia, serif; font-size: 3.5rem; color: #4d6254; }
`;

export default function CharacterImage({ character, large = false }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [character.image]);
  return (
    <Frame $large={large}>
      {character.image && !failed
        ? <img src={character.image} alt={character.name} loading={large ? 'eager' : 'lazy'} onError={() => setFailed(true)} />
        : <span role="img" aria-label={`Sem foto de ${character.name}`}>{character.name.slice(0, 1)}</span>}
    </Frame>
  );
}
