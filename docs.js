export const swaggerDocument = {
  swagger: "2.0",
  info: {
    description:
      "Projeto da atividade prática do modulo 01, do bootcamp FullStack Developer, que lista as marcas de carros (brand) e seus modelos (models).",
    version: "1.0.0",
    title: "Swagger Lista de Carros",
    contact: {
      email: "luancta@gmail.com",
    },
  },
  host: "localhost:3000",
  basePath: "/",
  tags: [
    {
      name: "marcas",
      description: "Marcas de carros seus modelos",
    },
  ],
  schemes: ["http"],
  paths: {
    "/marcas/menosModelos": {
      get: {
        tags: ["marcas"],
        summary:
          "1 - Função que retorne o nome da marca que mais possui modelos",
        description:
          "em caso de empate em número de modelos, retornar uma lista com o nome das marcas que empataram. Exemplo de retorno em caso de empate: [“Marca 1”, “Marca 2”]. Exemplo de retorno caso não tenha empate: “Marca 1”.",
        operationId: "menosModelos",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Operacao realizada com sucesso",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/carro",
              },
            },
          },
          500: {
            description: "Erro no servidor",
          },
        },
      },
    },
    "/marcas/maisModelos": {
      get: {
        tags: ["marcas"],
        summary:
          "2. Criar uma função que retorne o nome da marca que menos possui modelos.",
        description:
          "em caso de empate em número de modelos, retornar uma lista com o nome das marcas que empataram. Exemplo de retorno em caso de empate: [“Marca 1”, “Marca 2”]. Exemplo de retorno caso não tenha empate: “Marca 1”.",
        operationId: "maisModelos",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Operacao realizada com sucesso",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/carro",
              },
            },
          },
          500: {
            description: "Erro no servidor",
          },
        },
      },
    },
    "/marcas/listaMaisModelos/{x}": {
      get: {
        tags: ["marcas"],
        summary:
          "3. Função que receba como parâmetro um número X e retorne as X marcas que mais possuem modelos, seguidos da quantidade, em ordem decrescente.",
        description:
          "Em caso de empate, você deve considerar a ordem alfabética do nome das marcas como critério de desempate. Exemplo, caso as marcas “Audi” e “Renault” empatem, a marca “Audi” viria na frente da “Renault”, pois ao ordená-los em ordem alfabética, ela é retornada primeiro.",
        operationId: "listaMaisModelos",
        produces: ["application/json"],
        parameters: [
          {
            name: "x",
            in: "path",
            required: true,
            description: "Quantidade de marcas a serem retornadas",
            type: "integer",
          },
        ],
        responses: {
          200: {
            description: "Operacao realizada com sucesso",
            schema: {
              $ref: "#/definitions/carro",
            },
          },
          500: {
            description: "Erro no servidor",
          },
        },
      },
    },
    "/marcas/listaMenosModelos/{x}": {
      get: {
        tags: ["marcas"],
        summary:
          "4. Função que receba como parâmetro um número X, retorne as X marcas que menos possuem modelos, seguidos da quantidade, em ordem crescente..",
        description:
          "Em caso de empate, você deve considerar a ordem alfabética do nome das marcas como critério de desempate. Exemplo, caso as marcas “Audi” e “Renault” empatem, a marca “Audi” viria na frente da “Renault”, pois ao ordená-los em ordem alfabética, ela é retornada primeiro.",
        operationId: "listaMenosModelos",
        produces: ["application/json"],
        parameters: [
          {
            name: "x",
            in: "path",
            required: true,
            description: "Quantidade de marcas a serem retornadas",
            type: "integer",
          },
        ],
        responses: {
          200: {
            description: "Operacao realizada com sucesso",
            schema: {
              $ref: "#/definitions/carro",
            },
          },
          500: {
            description: "Erro no servidor",
          },
        },
      },
    },
    "/marcas/listaModelos": {
      post: {
        tags: ["marcas"],
        summary: "Exibe os modelos da marca passada por parâmetro",
        description: "",
        operationId: "listaModelos",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Dados da busca",
            required: true,
            schema: {
              $ref: "#/definitions/buscaListaModelos",
            },
          },
        ],
        responses: {
          200: {
            description: "Operacao realizada com sucesso",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/carro",
              },
            },
          },
          404: {
            description: "Não encontrado",
          },
          405: {
            description: "Parâmetros de busca inválidos",
          },
        },
      },
    },
  },
  definitions: {
    buscaListaModelos: {
      type: "object",
      properties: {
        nomeMarca: {
          type: "string",
          description: "Nome da Marca do carro",
        },
      },
      xml: {
        name: "buscaListaModelos",
      },
    },
    carro: {
      type: "object",
      properties: {
        brand: {
          type: "string",
          description: "Marca do Carro",
        },
        models: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
  },
  externalDocs: {
    description: "Find out more about Swagger",
    url: "http://swagger.io",
  },
};
