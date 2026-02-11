# Sistema de Gerenciamento de Alunos

Sistema web desenvolvido em React para gerenciamento e acompanhamento de desempenho acadêmico de alunos, permitindo cadastro, edição, exclusão e visualização de relatórios com métricas de aproveitamento.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instruções para Executar](#-instruções-para-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Detalhamento das Telas](#-detalhamento-das-telas)
- [Premissas Assumidas](#-premissas-assumidas)
- [Decisões de Projeto](#-decisões-de-projeto)
- [API Backend](#-api-backend)

## 🚀 Funcionalidades

- ✅ Cadastro de alunos com nome, 5 notas e frequência
- ✏️ Edição de dados de alunos cadastrados
- 🗑️ Exclusão de alunos com confirmação
- 📊 Visualização de lista de alunos com ordenação por média
- 📈 Cálculo automático de média geral do aluno
- 📉 Relatório de média da turma por disciplina
- 🎯 Listagem de alunos acima da média da turma
- ⚠️ Alerta de alunos com frequência abaixo de 75%
- 🎨 Interface responsiva e intuitiva

## 🛠 Tecnologias Utilizadas

- **React** 19.2.4 - Biblioteca JavaScript para construção da interface
- **React Scripts** 5.0.1 - Configuração e scripts do Create React App
- **CSS3** - Estilização customizada
- **Fetch API** - Comunicação com backend REST
- **JavaScript ES6+** - Linguagem de programação

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Backend da aplicação** rodando em `http://localhost:8080`

## ▶️ Instruções para Executar

### 1. Clonar o repositório (se aplicável)

```bash
git clone <url-do-repositorio>
cd frontend
```

### 2. Instalar dependências

```bash
npm install
```

ou

```bash
yarn install
```

### 3. Configurar o Backend

Certifique-se de que o backend está rodando em `http://localhost:8080`. O frontend espera os seguintes endpoints:

- `GET /alunos` - Listar todos os alunos
- `POST /alunos` - Cadastrar novo aluno
- `PUT /alunos/{id}` - Atualizar aluno
- `DELETE /alunos/{id}` - Excluir aluno
- `GET /alunos/media-turma` - Obter média da turma
- `GET /alunos/acima-media` - Listar alunos acima da média
- `GET /alunos/frequenciaBaixa` - Listar alunos com frequência baixa

### 4. Executar o projeto

```bash
npm start
```

ou

```bash
yarn start
```

A aplicação será aberta automaticamente no navegador em `http://localhost:3000`.

### 5. Executar testes (opcional)

```bash
npm test
```

### 6. Gerar build de produção (opcional)

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   ├── index.html           # Página HTML principal
│   ├── manifest.json        # Manifesto PWA
│   └── robots.txt           # Arquivo de configuração para crawlers
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Alunos.jsx       # Tabela de listagem de alunos
│   │   ├── CadastroAluno.jsx # Formulário de cadastro/edição
│   │   ├── AcimaMedia.jsx   # Lista de alunos acima da média
│   │   ├── MediaTurma.jsx   # Média da turma por disciplina
│   │   └── FrequenciaBaixa.jsx # Alunos com frequência < 75%
│   ├── pages/
│   │   └── Relatorio.jsx    # Página principal (dashboard)
│   ├── services/
│   │   └── alunoService.js  # Funções de comunicação com API
│   ├── styles/
│   │   └── global.css       # Estilos globais da aplicação
│   ├── App.js               # Componente raiz
│   └── index.js             # Ponto de entrada da aplicação
├── package.json             # Dependências e scripts
└── README.md               # Este arquivo
```

## 🖥️ Detalhamento das Telas

### 1. **Tela de Cadastro de Aluno** (`CadastroAluno.jsx`)

**Descrição:** Formulário para cadastrar ou editar informações de um aluno.

**Campos:**

- Nome do aluno (somente letras)
- 5 notas (valores de 0 a 10, aceita decimais)
- Frequência em porcentagem (0 a 100%)

**Funcionalidades:**

- Validação de entrada: nome aceita apenas letras
- Validação numérica para notas (0-10) e frequência (0-100%)
- Modo de edição: ao clicar em "Editar" na lista, o formulário é preenchido com os dados do aluno
- Feedback visual: mensagens de sucesso ou erro após operações
- Botão "Cancelar" para limpar o formulário ou sair do modo de edição
- Loading state durante o envio dos dados

**Validações:**

- Todos os campos são obrigatórios
- Nome: apenas letras e espaços
- Notas: número entre 0 e 10 com uma casa decimal
- Frequência: número inteiro entre 0 e 100

---

### 2. **Tabela de Alunos** (`Alunos.jsx`)

**Descrição:** Lista todos os alunos cadastrados em formato de tabela.

**Colunas exibidas:**

- Nome do aluno
- Média geral (calculada automaticamente)
- Frequência (%)
- Ações (Editar e Excluir)

**Funcionalidades:**

- Ordenação por média (crescente ou decrescente) via botão toggle
- Indicadores visuais de performance:
  - **Verde**: média ≥ 7.0 ou frequência ≥ 75%
  - **Vermelho**: média < 7.0 ou frequência < 75%
- Botão "Editar": carrega dados no formulário de cadastro
- Botão "Excluir": solicita confirmação antes de deletar
- Estado de loading durante carregamento dos dados
- Mensagem quando não há alunos cadastrados

**Regras de negócio:**

- A média é calculada automaticamente pela soma das 5 disciplinas dividido por 5
- A exclusão requer confirmação do usuário

---

### 3. **Média da Turma** (`MediaTurma.jsx`)

**Descrição:** Exibe a média geral da turma para cada disciplina.

**Informações exibidas:**

- Média da Disciplina 1
- Média da Disciplina 2
- Média da Disciplina 3
- Média da Disciplina 4
- Média da Disciplina 5

**Funcionalidades:**

- Atualização automática quando alunos são adicionados/editados/removidos
- Cálculo realizado no backend
- Exibição em lista formatada

---

### 4. **Alunos Acima da Média** (`AcimaMedia.jsx`)

**Descrição:** Lista os nomes dos alunos que possuem média geral acima da média da turma.

**Funcionalidades:**

- Identificação automática de alunos destacados
- Lista em ordem de retorno da API
- Indicador visual verde para cada aluno
- Atualização dinâmica quando há mudanças nos dados

**Regra de negócio:**

- Compara a média individual de cada aluno com a média geral da turma
- Apenas alunos com média estritamente maior que a média da turma são listados

---

### 5. **Alunos com Frequência Baixa** (`FrequenciaBaixa.jsx`)

**Descrição:** Lista os nomes dos alunos com frequência inferior a 75%.

**Funcionalidades:**

- Identificação automática de alunos em risco de reprovação por frequência
- Lista em ordem de retorno da API
- Indicador visual vermelho para alertar sobre a situação
- Atualização dinâmica quando há mudanças nos dados

**Regra de negócio:**

- Frequência mínima para não aparecer nesta lista: 75%
- Critério de alerta educacional para acompanhamento de alunos

---

### 6. **Página de Relatório** (`Relatorio.jsx`)

**Descrição:** Dashboard principal que integra todos os componentes em uma única visualização.

**Layout:**

1. Título "Relatório da Turma"
2. Formulário de Cadastro/Edição
3. Tabela de Alunos
4. Média da Turma por Disciplina
5. Alunos Acima da Média
6. Alunos com Frequência Baixa

**Funcionalidades:**

- Gerenciamento de estado centralizado
- Controle de refresh para atualizar todos os componentes
- Gerenciamento do aluno em edição
- Confirmação antes de excluir
- Comunicação entre componentes via props e callbacks

## 🧩 Premissas Assumidas

1. **Backend em java 17,Spring Boot Disponível:** O sistema assume que existe um backend REST rodando em `http://localhost:8080` com todos os endpoints necessários.

2. **Formato de Dados:** Os dados de aluno seguem o seguinte formato JSON:

```json
{
  "id": 1,
  "nome": "João Silva",
  "mediaDisciplina1": 8.5,
  "mediaDisciplina2": 7.0,
  "mediaDisciplina3": 9.0,
  "mediaDisciplina4": 6.5,
  "mediaDisciplina5": 8.0,
  "frequencia": 85,
  "media": 7.8
}
```

3. **Cálculo de Média:** A média geral do aluno é calculada pelo backend como a média aritmética simples das 5 disciplinas.

4. **Número Fixo de Disciplinas:** O sistema trabalha com exatamente 5 disciplinas por aluno.

5. **Critérios de Aprovação:**
   - Média mínima para consideração "boa": 7.0
   - Frequência mínima aceitável: 75%

6. **Validações:** Validações de negócio (como unicidade de nome, limites, etc.) são realizadas pelo backend. O frontend apenas valida formato de entrada.

7. **Sem Autenticação:** O sistema não implementa controle de acesso ou autenticação de usuários.

8. **CORS Configurado:** O backend permite requisições do frontend em `localhost:3000`.

## 💡 Decisões de Projeto

### Arquitetura

1. **Componentização:** Cada funcionalidade foi separada em componentes independentes para facilitar manutenção e reutilização.

2. **Service Layer:** Todas as chamadas à API foram centralizadas em `alunoService.js` para facilitar manutenção e possíveis mudanças de endpoint.

3. **Estado Local:** Utilização de hooks (`useState`, `useEffect`, `useMemo`) do React para gerenciamento de estado, evitando complexidade desnecessária com Redux ou Context API para um projeto deste porte.

### UX/UI

4. **Feedback Visual Imediato:**
   - Cores verde/vermelho para indicar status de aprovação
   - Mensagens de sucesso/erro após operações
   - Estados de loading durante operações assíncronas

5. **Confirmação de Exclusão:** Implementado `window.confirm()` para evitar exclusões acidentais.

6. **Formulário Inteligente:** O mesmo formulário serve para cadastro e edição, reduzindo duplicação de código.

7. **Ordenação Flexível:** Botão toggle permite alternar entre ordenação crescente e decrescente por média.

### Performance

8. **Memoização:** Uso de `useMemo` para otimizar a ordenação da lista de alunos, evitando recálculos desnecessários.

9. **Keys Dinâmicas:** Uso de prop `key` com refresh para forçar re-renderização apenas quando necessário.

### Validações

10. **Validação no Frontend:**
    - Nome aceita apenas letras (regex)
    - Notas limitadas entre 0-10
    - Frequência limitada entre 0-100%
    - Todos os campos obrigatórios

### Código Limpo

11. **ESLint:** Configuração do Create React App com regras do React para manter qualidade de código.

12. **Nomenclatura Descritiva:** Nomes de variáveis, funções e componentes descrevem claramente sua função.

13. **Separação de Responsabilidades:** Cada componente tem uma única responsabilidade bem definida.

## 🔌 API Backend

### Estrutura de Endpoints Esperados

```
Base URL: http://localhost:8080

GET    /alunos              - Retorna array de todos os alunos
POST   /alunos              - Cria novo aluno (body: dados do aluno)
PUT    /alunos/{id}         - Atualiza aluno existente (body: dados do aluno)
DELETE /alunos/{id}         - Remove aluno por ID
GET    /alunos/media-turma  - Retorna objeto com médias por disciplina
GET    /alunos/acima-media  - Retorna array de nomes (strings)
GET    /alunos/frequenciaBaixa - Retorna array de nomes (strings)
```

### Exemplo de Resposta - GET /alunos

```json
[
  {
    "id": 1,
    "nome": "Maria Santos",
    "mediaDisciplina1": 8.5,
    "mediaDisciplina2": 9.0,
    "mediaDisciplina3": 7.5,
    "mediaDisciplina4": 8.0,
    "mediaDisciplina5": 9.5,
    "frequencia": 90,
    "media": 8.5
  }
]
```

### Exemplo de Resposta - GET /alunos/media-turma

```json
{
  "mediaDisciplina1": 7.5,
  "mediaDisciplina2": 8.0,
  "mediaDisciplina3": 7.2,
  "mediaDisciplina4": 8.5,
  "mediaDisciplina5": 7.8
}
```

## 📝 Observações Importantes

- **Refresh Manual:** Após operações de cadastro, edição ou exclusão, os componentes são atualizados via sistema de refresh usando alteração de estado.

- **Responsividade:** Os estilos em [global.css](src/styles/global.css) incluem responsividade básica para diferentes tamanhos de tela.

- **Tratamento de Erros:** Erros de rede são capturados e exibidos ao usuário via mensagens no formulário.

- **Sem Persistência Local:** Todos os dados são gerenciados pelo backend; não há uso de localStorage ou sessionStorage.
# gestao-escolar-front
