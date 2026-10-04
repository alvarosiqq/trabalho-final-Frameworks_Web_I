import styled from 'styled-components';
import { Button } from '../styles';
const Nav = styled.nav`
  display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 30px; flex-wrap: wrap;
`;
export default function Pagination({ page, totalPages, onChange }) {
  return <Nav aria-label="Paginação"><Button disabled={page <= 1} onClick={() => onChange(page - 1)}>Anterior</Button><span aria-live="polite">Página {page} de {totalPages}</span><Button disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Próxima</Button></Nav>;
}
