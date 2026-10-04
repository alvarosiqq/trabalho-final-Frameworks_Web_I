import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle, Container } from './styles';
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';

const Footer = styled.footer`
  border-top: 1px solid #d5dacd;
  margin-top: 56px;
  padding: 24px 0;
  color: #54635a;
  font-size: 0.85rem;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container as="main" id="conteudo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personagem/:id" element={<Details />} />
          <Route path="*" element={<section><h1>Página não encontrada</h1><Link to="/">Voltar ao catálogo</Link></section>} />
        </Routes>
      </Container>
      <Footer><Container>Arquivo de Hogwarts · Projeto acadêmico · Dados da HP-API</Container></Footer>
    </>
  );
}
