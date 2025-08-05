# 🛍️ Ecatalogos Backend

## 📄 Descrição  
API REST construída com **Node.js** e **Express** para gerenciamento de catálogo de produtos.

## 🧩 Funcionalidades  
- CRUD de produtos, categorias, subcategorias, marcas, carrinho e usuários  
- Paginação, busca e filtros por endpoint  

## 🚀 Tecnologias  
- Node.js  
- Express.js  
- Banco de dados: **MySQL**  
- ORM: **Prisma**  
- Dotenv para variáveis de ambiente  
- Nodemon, ESLint, Prettier  

## 📁 Estrutura de Pastas  
```text
/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   └── config/
├── tests/            # (se aplicável)
├── .env.example
├── package.json
└── README.md

# 1. Clone o repositório
git clone https://github.com/JamzMarks/ecatalogos-backend.git
cd ecatalogos-backend

# 2. Instale as dependências
npm install

# 3. Copie o .env de exemplo
cp .env.example .env

# 4. Configure o banco de dados e variáveis no .env

# 5. Rode as migrations do Prisma
npx prisma migrate dev

# 6. Inicie o servidor em ambiente de desenvolvimento
npm run dev

📚 Endpoints Principais
🔐 Autenticação
POST /auth/login – login → retorna token JWT

POST /auth/register – cria nova conta

👤 Usuários
GET /users – lista usuários (admin)

GET /users/:id – detalhe do usuário

PUT /users/:id – atualizar dados

DELETE /users/:id – remover usuário

📦 Produtos & Categorias
GET /categories

POST /categories

PUT /categories/:id

DELETE /categories/:id

GET /products – com filtros ?search=&limit=&offset=

GET /products/:id

POST /products

PUT /products/:id

DELETE /products/:id

🛒 Carrinho / Checkout
GET /cart

POST /cart/:productId

PUT /cart/:productId

DELETE /cart/:productId

POST /cart/checkout
