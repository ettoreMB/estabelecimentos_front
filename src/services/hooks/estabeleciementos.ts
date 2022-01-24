import { useQuery } from "react-query";
import { api } from "../apiClient";


type IEstabeleciemtnos = {
  id: string;
  cnpj: string;
  dataFundacao: Date;
  razaoSocial: string;
  nomeFantasia: string;
  matrizFilial: string;
  codigoAtividadeEconomica: string;
  codigoAtividadeEconomicaDescricao: string;
  codigoNaturezaJuridica: string;
  sitacaoRFB: string;
  dataSituacaoRFB: string;
  logradouro_tipo: number;
  logradouro: string;
  logradouro_numero: string;
  logradouro_complemento?: string;
  logradouro_bairro: string;
  logradouro_cidade: string;
  logradouro_estado: string;
  logradouro_cep: string;
  logradouro_data_atualizacao: Date;
  codigoNaturezaJuridicaDescricao: string;
  codigo_ibge: string
}

export async function getEstabelecimentos(): Promise<any> {
  const { data } = await api.get("/estabelecimentos");

  const estabelecimentos = data.map((estabelecimentos: IEstabeleciemtnos) => {
    return {
      id: estabelecimentos.id,
      cnpj: estabelecimentos.cnpj,
      razao_social: estabelecimentos.razaoSocial,
      nome_fantasia: estabelecimentos.nomeFantasia,
      matriz_filial: estabelecimentos.matrizFilial,
      cod_atividade_economica: estabelecimentos.codigoAtividadeEconomica,
      atividade_economica_desc: estabelecimentos.codigoAtividadeEconomicaDescricao,
      cod_natureza_juridica: estabelecimentos.codigoNaturezaJuridica,
      situacao_rfb: estabelecimentos.sitacaoRFB,
      data_situacao_rfb: estabelecimentos.dataSituacaoRFB,
      endereco_tipo: estabelecimentos.logradouro_tipo,
      endereco: estabelecimentos.logradouro,
      endereco_numero: estabelecimentos.logradouro_numero,
      endereco_complemento: estabelecimentos.logradouro_complemento,
      endereco_bairro: estabelecimentos.logradouro_bairro,
      endereco_cidade: estabelecimentos.logradouro_cidade,
      endereco_estado: estabelecimentos.logradouro_estado,
      endereco_cep: estabelecimentos.logradouro_cep,
      endereco_data_atualização: estabelecimentos.logradouro_data_atualizacao,
      natureza_juridica_desc: estabelecimentos.codigoNaturezaJuridicaDescricao,
      cod_ibge: estabelecimentos.codigo_ibge,
    }
  })
  return estabelecimentos;
}


export const getEstabelecimento = async (value: string): Promise<IEstabeleciemtnos> => {
  const { data } = await api.get(`/estabelecimentos/${value}`);
  const estabelecimento = data
  return estabelecimento
}
// export async function getEstabeleciento(value: string): Promise<any> {
//   const { data } = await api.get(`/estabelecimentos/${value}`);

//   const estabalecimento = data;

//   return estabalecimento
// }


export function useGetEstabelecimentos() {
  return useQuery(["estabelecimentos"], () => getEstabelecimentos(), {
    staleTime: 1000 * 60 * 10,
  })
}

// export function useGetEstabelecimento(value) {
//   return useQuery(["estabelecimento"], () => getEstabeleciento(value), {
//     staleTime: 1000 * 60 * 10,
//   })
// }