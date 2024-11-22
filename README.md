# Green Flow - Plataforma de Monitoramento e Consumo de Energia Sustentável

## Descrição do Projeto

A **Green Flow** é uma plataforma web interativa e moderna que visa promover a sustentabilidade através do monitoramento e acompanhamento do consumo de energia elétrica. Com funcionalidades avançadas e uma interface amigável, a plataforma ajuda os usuários a compreenderem seu impacto energético e a tomarem decisões informadas para economizar energia, reduzindo custos e contribuindo para um planeta mais sustentável.

---

## Funcionalidades Principais

- **Monitoramento Personalizado**
  - Acompanhamento detalhado do consumo de energia em nível estadual, nacional e do usuário.
  - Comparativos gráficos interativos utilizando **Recharts** para exibir métricas de consumo.

- **Dicas de Sustentabilidade**
  - Integração com uma API para exibição de dicas diárias e semanais sobre economia de energia e práticas sustentáveis.
  - Exibição dinâmica de dicas úteis, incentivando hábitos de consumo mais conscientes.

- **Impacto Ambiental**
  - Estatísticas sobre a economia de energia, água, redução de CO2 e árvores plantadas.
  - Dados extraídos de APIs que simulam os benefícios ambientais gerados pelos usuários da plataforma.

- **Sistema de Login e Cadastro**
  - Cadastro e autenticação segura para personalizar a experiência do usuário.
  - **Context** para gerenciamento de autenticação e dados do usuário.

- **Dashboard Interativo**
  - Visualização em tempo real de gráficos, tabelas e comparativos utilizando **Recharts**.
  - Representação de economias financeiras e energéticas ao longo do ano.

---

## Tecnologias Utilizadas

### Front-end

- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router**: Gerenciamento de rotas para navegação fluida entre as páginas da plataforma.
- **Tailwind CSS**: Framework de CSS utilitário para design responsivo e customizado.
- **React Icons**: Biblioteca de ícones para melhorar a usabilidade e a estética.
- **Recharts**: Biblioteca para construção de gráficos dinâmicos e interativos.

### Integrações

- **API Externa**: Dados de consumo de energia e dicas são integrados a partir de uma API para garantir informações precisas e atualizadas.
- **Context**: Gerenciamento eficiente do estado global para login, autenticação e personalização de experiência.

### Ferramentas de Desenvolvimento

- **Vite**: Ferramenta para inicialização rápida e otimizada do projeto React.
- **ESLint**: Garantia de qualidade do código e padronização.
- **PostCSS**: Otimização e processamento avançado de CSS.

---

## Estrutura do Projeto

### Arquitetura de Código

- **Public**: Arquivos estáticos, incluindo ícones e manifestos.
- **Assets**: Imagens, logos e outros recursos visuais utilizados na aplicação.
- **Components**: Componentes reutilizáveis, como gráficos, formulários, navbar e exibição de dicas.
- **Context**: Contextos de autenticação e dados do usuário.
- **Data**: Arquivos JSON com informações estáticas, como dicas de economia.
- **Pages**: Páginas principais da aplicação (Home, Dashboards, Dicas, Tracker).

---

## Como Configurar e Executar

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seuprojeto/greenflow.git
    ```
2. **Instale as Dependências**

    ```bash
    npm install
    ```
3. **Configure as Variáveis de Ambiente**

    - Configure a URL da API em um arquivo .env.local para garantir a comunicação correta com os serviços.

4. **Execute o Projeto**

    ```bash
    npm run dev
    ```
### Conclusão
A Green Flow combina tecnologia de ponta com sustentabilidade, criando uma plataforma que não só informa, mas inspira mudanças positivas nos hábitos de consumo de energia. Contribuímos para um futuro mais verde, promovendo uma comunidade engajada e responsável. 🚀

<article>
        <h2>Integrantes</h2>
                <h3><img src="https://avatars.githubusercontent.com/u/129889380?v=4" width="50px" alt="Pedro Guidotte Icon">  Pedro Guidotte | RM556630<a href="https://github.com/peguidotte" target="_blank" style="font-style: italic">  /GitHub <i class="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/pedro-guidotte/" target="_blank" style="font-style: italic">  /LinkedIn<i class="fab fa-linkedin"></i></a></h3>
                <h3><img src="https://avatars.githubusercontent.com/u/158540749?v=4)" width="50px" alt="Gabriel Vara Icon">  Gabriel Vara | RM555355<a href="https://github.com/gabrielvara" target="_blank" style="font-style: italic"> 
 /GitHub <i class="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/gabriel-vara" target="_blank" style="font-style: italic">  /LinkedIn <i class="fab fa-linkedin"></i></a></h3>
                <h3><img src="https://avatars.githubusercontent.com/u/158527393?v=4" width="50px" alt="Leonardo Correa Icon">  Leonardo Correa | RM555573<a href="https://github.com/leocorreamello" target="_blank" style="font-style: italic">  /GitHub <i class="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/leocorreamello/" target="_blank" style="font-style: italic">  /LinkedIn <i class="fab fa-linkedin"></i></a></h3>
</article>