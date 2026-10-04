import styled from 'styled-components';
import { Button } from '../styles';

const Form = styled.div`
  display: grid; grid-template-columns: 2fr 1fr 1fr auto; align-items: end; gap: 16px;
  background: #fffdf7; padding: 22px; border: 1px solid #d5dacd; border-radius: 12px;
  label { display: grid; gap: 8px; font-size: .9rem; }
  input, select { width: 100%; min-width: 0; padding: 11px; border: 1px solid #adb7a9; border-radius: 6px; background: white; color: #182c29; }
  @media (max-width: 800px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

export default function Filters({ search, house, role, onChange, onClear }) {
  return (
    <Form>
      <label>Buscar personagem<input type="search" placeholder="Ex.: Harry, Hermione, Sirius..." value={search} onChange={e => onChange('search', e.target.value)} /></label>
      <label>Casa<select value={house} onChange={e => onChange('house', e.target.value)}>
        <option value="">Todas as casas</option>
        {['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'].map(h => <option key={h}>{h}</option>)}
        <option value="none">Sem casa informada</option>
      </select></label>
      <label>Vínculo<select value={role} onChange={e => onChange('role', e.target.value)}>
        <option value="">Todos os vínculos</option><option value="student">Estudantes</option><option value="staff">Funcionários</option><option value="other">Outros</option>
      </select></label>
      <Button onClick={onClear}>Limpar filtros</Button>
    </Form>
  );
}
