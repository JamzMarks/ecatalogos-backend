export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "eCatalogos API v1",
    version: "1.0.0",
    description: "Documentação da API eCatalogos v1.",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
    },
  ],
  paths: {
    "/products": {
      get: {
        summary: "Listar produtos",
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
      post: {
        summary: "Criar produto",
        responses: {
          "201": {
            description: "Criado",
          },
        },
      },
    },
  },
};
