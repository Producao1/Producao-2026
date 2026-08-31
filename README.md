# SoleMente — Calçados Premium

Site de e-commerce premium para uma loja de calçados femininos sofisticados e elegantes com:
- Catálogo de sapatos com múltiplas categorias
- Sistema de filtros por tipo de produto
- Carrinho de compras funcional
- Checkout com múltiplas formas de pagamento (Pix, cartão de crédito e débito)
- Design premium e responsivo
- Pronto para hospedagem em Vercel

## Características

- **Design Sofisticado**: Interface elegante com paleta de cores premium
- **Catálogo Diverso**: 9 modelos diferentes com descrições detalhadas
- **Sistema de Filtros**: Organização por categoria (Running, Casual, Street, Premium, Esportivo)
- **Carrinho Completo**: Adicionar, remover e gerenciar quantidade
- **Checkout Seguro**: Múltiplas opções de pagamento com validação
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## Como rodar localmente

No terminal, na pasta do projeto:

```bash
python3 -m http.server 3000
```

Acesse:

```text
http://localhost:3000
```

## Como publicar no Vercel

1. Acesse https://vercel.com
2. Clique em "New Project"
3. Import o repositório deste projeto
4. Mantenha as configurações padrão
5. Clique em "Deploy"

O projeto é estático, então o Vercel apenas hospeda os arquivos HTML, CSS e JS. Não é necessário backend para esta etapa.

## Observação

A parte de recebimento Pix/Cartão ainda está em fluxo de simulação front-end para demonstrar a experiência do usuário. Quando quiser, a próxima etapa pode ser integrar com gateway real ou painel de recebimento.

