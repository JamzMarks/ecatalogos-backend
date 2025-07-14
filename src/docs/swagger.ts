export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "eCatalogos API v1",
    version: "1.0.0",
    description: "Documentação da API eCatalogos v1.",
  },
  servers: [
    {
      url: "http://localhost:4000/api/v1",
    },
  ],
  paths: {
    "/products": {
      get: {
        summary: "Listar produtos",
        parameters: [
          {
            name: "brand_id",
            in: "query",
            schema: { type: "integer" },
            description: "ID da marca para filtro",
          },
          {
            name: "types",
            in: "query",
            schema: { type: "integer" },
            description: "Tipo de produto (Nacional ou Importado)",
          },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
          "404": {
            description: "Produtos não encontrados",
          },
        },
      },
      post: {
        summary: "Criar produto",
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { id: { type: "integer" } },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
          },
        },
      },
    },
    "/products/:id": {
      get: {
        summary: "Buscar produto por id",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "ID inválido",
          },
          "404": {
            description: "Produto não encontrado",
          },
        },
      },
      patch: {
        summary: "Patch produto por id",
        responses: {
          "200": {
            description: "OK",
          },
          "400": {
            description: "ID inválido",
          },
          "404": {
            description: "Produto não encontrado",
          },
        },
      },
      delete: {
        summary: "Soft Delete de produto por id",
        responses: {
          "200": {
            description: "OK",
          },
          "400": {
            description: "ID inválido",
          },
          "404": {
            description: "Produto não encontrado",
          },
        },
      },
    },
    "/products/filters": {
      get: {
        summary: "Retorna todos os filtros disponiveis",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { id: { type: "integer" } },
                },
              },
            },
          },
        },
      },
    },
    "/products/count": {
      get: {
        summary:
          "Retorna quantidade de produtos encontrado por query de filtros",
        responses: {
          "200": {
            description: "OK",
            parameters: [
              {
                name: "brand_id",
                in: "query",
                schema: { type: "integer" },
                description: "ID da marca para filtro",
              },
            ],
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { id: { type: "integer" } },
                },
              },
            },
          },
        },
      },
    },
    "/products/deleted": {
      get: {
        summary: "Listar produtos deletados - soft deleted",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "404": {
            description: "Produtos deletados não encontrados",
          },
        },
      },
    },
    "/products/deleted/:id": {
      get: {
        summary: "Buscar produto deletado - soft deleted - por id",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
          "400": {
            description: "ID inválido",
          },
          "404": {
            description: "Produto deletado não encontrado",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          brand_id: { type: "integer" },
          category_id: { type: "integer" },
          subcategory_id: { type: "integer" },
          brands: { $ref: "#/components/schemas/Brand" },
          categories: { $ref: "#/components/schemas/Category" },
          subcategories: { $ref: "#/components/schemas/Subcategory" },
          variants: {
            type: "array",
            items: { $ref: "#/components/schemas/Variant" },
          },
        },
      },
      Brand: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
      },
      Subcategory: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
      },
      Variant: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          hex_code: { type: "string" },
          skus: {
            type: "array",
            items: { $ref: "#/components/schemas/Sku" },
          },
        },
      },
      Sku: {
        type: "object",
        properties: {
          id: { type: "integer" },
          size: { type: "string" },
          stock: { type: "integer" },
          price: { type: "number" },
        },
      },
    },
  },
};
