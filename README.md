# ⚡ Sistema EletroTec - Gestão de Documentos Profissionais

Este é um sistema web moderno, leve e intuitivo desenvolvido para facilitar a rotina de prestadores de serviços, especialmente na área de elétrica. O sistema centraliza a criação de **Orçamentos**, **Recibos** e **Faturas Comerciais** em uma única interface.

## 🎯 Objetivo

Eliminar a necessidade de editores de texto complexos ou planilhas manuais. Com o EletroTec, você preenche os dados de um lado e visualiza o documento pronto para impressão do outro, formatado exatamente como uma folha A4 profissional.

---

## 🚀 Funcionalidades Principais

- **Abas Dinâmicas (Estilo iOS):** Alterne entre Orçamento, Recibo e Fatura sem recarregar a página.
- **Preview em Tempo Real:** Veja as alterações no documento instantaneamente enquanto digita.
- **Cálculos Automáticos:** O sistema soma valores unitários, quantidades e diárias automaticamente.
- **Sincronização Inteligente:** Ao preencher o nome do cliente no orçamento, o sistema pré-preenche as abas de recibo e fatura para você.
- **Exportação para PDF:** Gere documentos profissionais prontos para enviar via WhatsApp ou E-mail com um clique.
- **Interface Responsiva:** Design adaptável para uso em Computadores, Tablets e Celulares.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web puras (Vanilla), garantindo velocidade e facilidade de manutenção:

*   [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) - Estrutura.
*   [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) - Design moderno, variáveis, e estilização de impressão.
*   [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Lógica de cálculo, manipulação de DOM e abas.
*   [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) - Biblioteca para conversão de HTML para PDF.
*   [Google Fonts](https://fonts.google.com/) - Fonte 'Inter' para legibilidade profissional.

---

## 📁 Estrutura de Arquivos

Para manter a organização do código, o projeto está dividido da seguinte forma:

```bash
/
├── index.html       # Estrutura principal e os templates dos documentos.
├── css/
│   └── style.css    # Toda a identidade visual e layout da folha A4.
└── js/
    └── script.js   # Inteligência do sistema (cálculos e geração de PDF).
