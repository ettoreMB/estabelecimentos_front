import { Paper,  Grid, Skeleton, Button } from "@mui/material";
import { GetServerSideProps } from "next";
import { useQuery, dehydrate } from "react-query";
import { PageLayout } from "../../components/PageLayout";
import { ViewTextField } from "../../components/TextFiledEstabelecimentos";
import { getEstabelecimento } from "../../services/hooks/estabeleciementos";
import { useRouter } from "next/router";
import { queryClient } from "../../services/queryClient";


export default function ViewEstabelecimento() {
  const router = useRouter();

  const cnpj = typeof router.query?.cnpj === "string" ? router.query.cnpj : "";

  const {data, isLoading} = useQuery(['estabelecimento'], () => getEstabelecimento(cnpj))

  return (
    <>
     <PageLayout>
       {isLoading ? (
         <Skeleton variant="rectangular" width={'100%'} height={'100%'}/>
       ) : (
         <Paper  sx={{  flexGrow: 1, padding: 2}}>
         <Grid container spacing={2}>
            <ViewTextField 
              labelName={"CNPJ"} 
              text={data?.cnpj}  
              fullWidth
              size={5}
            />
            <ViewTextField 
              labelName={"DATA DA ABERTURA"} 
              text={data?.dataFundacao}  
              fullWidth
              size={5}
            />
            <ViewTextField 
              labelName={"MATRIZ"} 
              text={data?.matrizFilial}  
              fullWidth
              size={2}
            />
              
            <ViewTextField 
              labelName={"NOME EMPRESARIAL"} 
              text={data.razaoSocial}
              fullWidth
              size={6}
            />
            <ViewTextField 
              labelName={"NOME FANTASIA"} 
              text={data.nomeFantasia}  
              fullWidth
              size={6}
            />
            <ViewTextField 
              labelName={"CODIGO"} 
              text={data.codigoAtividadeEconomica}  
              fullWidth
              size={2}
            />
            <ViewTextField 
              labelName={"ATIVIDADE ECONOMICA DESCRIÇÃO"} 
              text={data.codigoAtividadeEconomicaDescricao}  
              fullWidth
              size={10}
            />
            <ViewTextField 
              labelName={"COD NATUREZA JURIDICA"} 
              text={data.codigoNaturezaJuridica}  
              fullWidth
              size={2}
            />
            <ViewTextField 
              labelName={"NATUREZA JURIDICA DESCRIÇÃO"} 
              text={data.codigoNaturezaJuridicaDescricao}  
              fullWidth
              size={10}
            />
            <ViewTextField 
              labelName={"LOGRADOURO"} 
              text={data.logradouro}  
              fullWidth
              size={5}
            />
            <ViewTextField 
              labelName={"NUMERO"} 
              text={data.logradouro_numero}  
              fullWidth
              size={2}
            />
            <ViewTextField 
              labelName={"COMPLEMENTO"} 
              text={data?.logradouro_complemento}  
              fullWidth
              size={5}
            />
            <ViewTextField 
              labelName={"CEP"} 
              text={data.logradouro_cep}  
              fullWidth
              size={3}
            />
           
           <ViewTextField 
              labelName={"BAIRRO"} 
              text={data.logradouro_bairro}  
              fullWidth
              size={3}
            />

            <ViewTextField 
              labelName={"MUNICIPIO"} 
              text={data.logradouro_cidade}  
              fullWidth
              size={2}
            />
            <ViewTextField 
              labelName={"UF"} 
              text={data.logradouro_estado}  
              fullWidth
              size={1}
            />
            <ViewTextField 
              labelName={"SITUACAO CADASTRAL"} 
              text={data.sitacaoRFB}  
              fullWidth
              size={6}
            />
            <ViewTextField 
              labelName={"DATA DA SITUAÇÃO CADASTRAL"} 
              text={data.dataSituacaoRFB}  
              fullWidth
              size={6}
            />
           
         </Grid>
       </Paper>
       ) }
       <Button onClick={() => router.back()}>voltar</Button>
       
     </PageLayout>
    </>
  )
}

export async function getServerSideProps({query}) {
  const cnpj = query.cnpj as string

  await queryClient.prefetchQuery(["getEstabelecimento", cnpj], () => getEstabelecimento(cnpj));

  return {props: { dehydratateState: dehydrate(queryClient)}}
}