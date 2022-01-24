import Head from 'next/head'
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from 'react-query';

import { Alert, Box, Button, Container, Input, Snackbar, TextField } from '@mui/material';
import { PageLayout } from '../../components/PageLayout';
import {  useState } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/apiClient';




type SearchCNPJFormData = {
  cnpj: string;
}

const searchCnpjSchema = yup.object().shape({
  cnpj: yup.string().required('CNPJ Obrigatório')
})

export default function Home()   {

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
      },
    }
  )

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: yupResolver(searchCnpjSchema)
  })

  const handleSearchCNPJ: SubmitHandler<SearchCNPJFormData> = async(value) => {
      const cnpj = value;
      await searchCnpj.mutateAsync(cnpj);
  }

  return (
    <>
      <Head>
        <title>Pesquisa de estabelecimentos</title>
      </Head>
      
      <PageLayout>
        <Container maxWidth='lg' >
        
          <Box component="form" onSubmit={handleSubmit(handleSearchCNPJ)}>
          <TextField
            margin="normal"
            variant="standard"
            required
            fullWidth
            id="cnpj"
            label="CNPJ"
            autoFocus
            {...register('cnpj')}
            error={errors.cnpj}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              height: '44px'
            }}
          >
            Pesquisar
          </Button>
        </Box>
        
        </Container>
      </PageLayout>
    </>
  )
}

