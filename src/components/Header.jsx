import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../styles';

const Bar = styled.header`
  border-bottom: 1px solid #d5dacd; padding: 23px 0;
  a { text-decoration: none; }
`;
const Content = styled(Container)`display: flex; align-items: center; justify-content: space-between; gap: 14px;`;
const Brand = styled(Link)`font-family: Georgia, serif; font-size: 1.2rem; font-weight: bold;`;

export default function Header() {
  return <Bar><Content><Brand to="/">✦ Arquivo de Hogwarts</Brand><Link to="/">Catálogo</Link></Content></Bar>;
}
