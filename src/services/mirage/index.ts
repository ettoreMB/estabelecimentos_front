import { ActiveModelSerializer, createServer, Factory, Model } from "miragejs";
import faker from "@faker-js/faker";

type Estabelecimento = {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },
    models: {
      estabelecimento: Model.extend<Partial<Estabelecimento>>({})
    },
    factories: {
      estabelecimento: Factory.extend({
        id(i) {
          return i + 1;
        },
        cnpj() {
          return faker.address.zipCode()
        },
        razao_social(i: number) {
          return `Estabeleciemto  ${i + 1}`
        },
        nome_fantasia(i: number) {
          return `Fantasia  ${i + 1}`
        },
      })

    },

    seeds(server) {
      server.createList('estabelecimento', 200)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      this.get('/estabelecimentos');

      this.namespace = '';
      this.passthrough();

    }
  })
  return server
}