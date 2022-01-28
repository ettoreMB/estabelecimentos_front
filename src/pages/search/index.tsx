import * as React from 'react';
import Head from 'next/head'
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from 'react-query';
import NumberFormat from 'react-number-format';

import LoadingButton from '@mui/lab/LoadingButton';
import {  Box, Button, Container, Input, Snackbar, TextField } from '@mui/material';
import { PageLayout } from '../../components/PageLayout';
import { useSnackbar } from 'notistack';
import { api } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';

type SearchCNPJFormData = {
  cnpj: string;
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <NumberFormat
    {...other}
    isNumericString
    type={`text`}
    format={'###.###.##/####-##'}
  />
  );
}

export default function Home()   {

  const [values, setValues] = React.useState({});

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };


  const searchCnpjSchema = yup.object().shape({
    cnpj: yup.string().required('CNPJ Obrigatório')
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
    await new Promise(resolve => setTimeout(resolve, 2000))
    await searchCnpj.mutateAsync(value)
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
          <TextField
          sx={{
            marginRight: '10px'
          }}

            variant="filled"
            placeholder='CNPJ'
            required
            fullWidth
            type={"text"}
            id="cnpj"
            autoFocus
            onChange={handleChange("textmask")}
            InputProps={{
              inputComponent: TextMaskCustom
            }}
            {...register('cnpj')}
            error={errors.cnpj}
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