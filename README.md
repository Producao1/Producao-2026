# VANTA - Loja de Tênis Masculinos

Site estático para uma loja de tênis masculinos com:
- catálogo de produtos
- carrinho de compras
- checkout com pagamento por Pix, cartão de crédito e débito
- visual premium e responsivo
- pronto para hospedagem em Vercel

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

