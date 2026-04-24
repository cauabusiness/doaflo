# 📦 DoaFlow - Gestão Inteligente para o Terceiro Setor

<p align="center">
  <img src="https://img.shields.io/badge/Status-MVP_Concluído-success?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Tecnologia-Vanilla_JS_|_HTML_|_CSS-blue?style=for-the-badge" alt="Tech Stack"/>
  <img src="https://img.shields.io/badge/Arquitetura-Monolito_Modular-purple?style=for-the-badge" alt="Arquitetura"/>
  <img src="https://img.shields.io/badge/Banco_de_Dados-Relacional_(SQL)-orange?style=for-the-badge" alt="DB"/>
</p>

> **Ajudando quem ajuda, um lote por vez.** O DoaFlow é um sistema proativo de controle de estoque de doações desenhado para resolver o desperdício de itens perecíveis e garantir total rastreabilidade no Terceiro Setor.

---

## 🎯 O Problema e a Solução

**A Dor:** Instituições recebem milhares de doações (alimentos, roupas, higiene), mas gerenciam tudo no papel, de memória ou em planilhas não integradas. O resultado? **Alimentos vencem nas prateleiras enquanto famílias passam fome**, e a ONG perde a capacidade de prestar contas precisas aos doadores.

**A Solução (DoaFlow):** Um sistema de gestão construído sob três pilares:
1. **Controle por Lotes (Batches):** Foco na data de validade para priorizar entregas (método FIFO).
2. **Motor Proativo (Alertas):** O sistema avisa automaticamente o que está vencendo.
3. **Transparência Absoluta:** Toda saída exige uma justificativa, gerando logs de auditoria inalteráveis.

---

## 🚀 Como testar o MVP na sua máquina

Para o Hackathon, construímos este MVP focado em velocidade e sem dependências pesadas.

```bash
git clone https://github.com/sua-equipe/doaflow-mvp.git
```

Abra a pasta do projeto e execute:
- Duplo clique em `index.html`
- Ou use **Live Server** no VS Code

---

## 📁 Estrutura do Projeto

```text
doaflow-mvp/
 ┣ 📂 css
 ┃ ┗ 📜 style.css
 ┣ 📂 js
 ┃ ┣ 📜 app.js
 ┃ ┗ 📜 data.js
 ┣ 📂 docs
 ┣ 📜 index.html
 ┗ 📜 README.md
```

---

## 🏛️ Arquitetura (Visão Geral)

```mermaid
graph TD
    classDef client fill:#3b82f6,color:#fff;
    classDef backend fill:#10b981,color:#fff;
    classDef database fill:#f59e0b,color:#fff;

    subgraph Frontend
        UI[Interface]:::client
    end

    subgraph Backend
        API[Node.js API]:::backend
        Worker[Scheduler]:::backend
    end

    subgraph DB
        PostgreSQL:::database
    end

    UI --> API
    API --> PostgreSQL
    Worker --> PostgreSQL
```

---

## 🗄️ Modelo de Dados

```mermaid
erDiagram
    NGO ||--o{ USER : possui
    NGO ||--o{ ITEM_BATCH : estoque
    ITEM_BATCH ||--o{ TRANSACTION : movimento

    NGO {
        uuid id
        string name
    }

    USER {
        uuid id
        string role
    }

    ITEM_BATCH {
        uuid id
        string name
        int quantity
        date expiration_date
    }

    TRANSACTION {
        uuid id
        string type
        int quantity
    }
```

---

## 🧠 Decisões Arquiteturais

- **FIFO por lote:** evita desperdício
- **Banco relacional:** garante consistência
- **Alertas automáticos:** via scheduler

---

## 🔒 Requisitos Não Funcionais

- Segurança multi-tenant
- Performance com índices
- Offline-first (PWA)

---

## 💻 MVP Funcional (HTML + JS)

```html
<!-- Cole aqui o HTML gerado anteriormente -->
```

---

## 👨‍💻 Equipe

- Cauã Freire (Programador)
- Guilherme Forte (Designer)
- Octacílio Neto (Gestor)

---