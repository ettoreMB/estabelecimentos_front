import * as React from 'react';
import Head from 'next/head'
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from 'react-query';
import NumberFormat from 'react-number-format';

import LoadingButton from '@mui/lab/LoadingButton';
import {  Box, Button, Container, Snackbar, TextField } from '@mui/material';
import { PageLayout } from '../../components/PageLayout';
import { useSnackbar } from 'notistack';
import { api } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';
import { InputCnpj } from '../../components/Form/InputCnpj';

type SearchCNPJFormData = {
  cnpj: string;
}



export default function Home()   {

  const searchCnpjSchema = yup.object().shape({
    cnpj: yup.number().required('CNPJ Obrigatório').typeError('Deve ser um número').transform((o, v) => parseInt(v.replace(/,/g, '')))
  })

  const { enqueueSnackbar } = useSnackbar();

  const searchCnpj = useMutation(
    async (cnpj: SearchCNPJFormData) => {
        const {data: response} = await api.post("/estabelecimentos/search", cnpj)
        return response.data 
    },
    {
      onError: () => {
        enqueueSnackbar('Erro ao pesquisar CNPJ', {variant: 'error', autoHideDuration: 3000});
      },
      onSuccess: () => {
        enqueueSnackbar('CNPJ Econtrado', {variant: 'success',});
        queryClient.invalidateQueries('estabelecimentos')
      },
    }
  )

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: yupResolver(searchCnpjSchema)
  })

  const handleSearchCNPJ: SubmitHandler<SearchCNPJFormData> = async(value) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(value)
    // await searchCnpj.mutateAsync(checkedValue)
  }

  return (
    <>
      <Head>
        <title>Pesquisa de estabelecimentos</title>
      </Head>
      
      <PageLayout>
        <Container maxWidth='lg' >
        
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
            component="form" 
            onSubmit={handleSubmit(handleSearchCNPJ)}>

            <InputCnpj 
              sx={{
                marginRight: '10px'
              }}
              required
              fullWidth
              type='text'
              mask='cnpj' 
              name="nome" 
              label='label' 
              {...register("cnpj")}  
              err={errors.cnpj}
              inputProps={{ maxLength: 17 }}
            />
    
          {isSubmitting ? (
          <LoadingButton 
            loading variant="outlined"
          >
              Submit
          </LoadingButton>) : 
          (<Button
            type="submit"
            variant="contained"
          >
            Pesquisar
          </Button>)}
          
        </Box>
        
        </Container>
      </PageLayout>
    </>
  )
  }