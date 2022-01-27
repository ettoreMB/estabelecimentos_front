import React, { useState } from 'react';
import {  DataGrid, GridCallbackDetails, GridCellParams, GridColDef, GridRenderCellParams, GridToolbar, MuiEvent } from '@mui/x-data-grid';
import { useGetEstabelecimentos } from '../../services/hooks/estabeleciementos';
import { Box, IconButton } from '@mui/material';
import { PageLayout } from '../../components/PageLayout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Router from 'next/router'
import { withSSRAuth } from '../../utils/withSSRAuth';


type listValues = {
  id: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  matriz_filial: string;
  cod_atividade_economica: string;
  atividade_economica_desc: string;
  cod_natureza_juridica: string;
  situacao_rfb: string;
  data_situacao_rfb: Date;
  endereco_tipo: number;
  endereco: string;
  endereco_numero: string;
  endereco_complemento: string;
  endereco_bairro: string;
  endereco_cidade: string;
  endereco_estado: string;
  endereco_cep: string;
  endereco_data_atualização: string;
  natureza_juridica_desc: string;
  cod_ibge: string;
}

export default function Table() {
  const { data } = useGetEstabelecimentos();

  const [info, setInfo] = useState("")
  function handleLinkView(value) {
    setInfo(value)

    Router.push(`/view/${value}`)
  }
  const columns: GridColDef[] = [
    { field: 'cnpj',
      width: 224,
      renderCell: (params: GridRenderCellParams<() => {}>) => (
        <>
          <IconButton onClick={() => {handleLinkView(params.value)}}>
            <OpenInNewIcon />
          </IconButton>
          {params.value}
        </>
      ),
    },
    { field: 'Razao Social', flex: 1},
    { field: 'Nome Fantasia',flex: 1 },
    { field: 'matriz',  },
    { field: 'Codigo Atividade Economica',  },
    { field: 'Cidade', },
    { field: 'Estado', },
  ]
  
  const rows = data?.map((value:listValues) => {
    return {
      id: value.id,
      cnpj: value.cnpj,
      'Razao Social': value.razao_social,
      'Nome Fantasia': value.nome_fantasia,
      matriz: value.matriz_filial,
      Cidade: value.endereco_cidade,
      Estado: value.endereco_estado,

    }
  })
    
    
  return (
    <PageLayout>
    <Box
      flex={1}
      height={'100vh'}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        onCellClick={(params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {console.log(params.value)}}
      />
    </Box>
    </PageLayout>
  );
}

export const getServerSideProps = withSSRAuth(async(context) => {
  return {props: {}}
})