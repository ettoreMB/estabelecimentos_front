import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver} from  '@hookform/resolvers/yup'
import {
  Avatar,
  Button,
  TextField,
  Link,
  Container,
  Box,
  Grid,
  Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { withSSRGuest } from '../utils/withSSRGuest';

type SigninData = {
  email: string;
  password: string;
}

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email Invalido'),
  password: yup.string().required('Senha Obrigátoria')
})

export default function SignIn() {

  const {signIn} = useContext(AuthContext)

  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInSchema),
  })

  const {errors} = formState;

  const handleSignin: SubmitHandler<SigninData> = async(values) => {
    
    await signIn(values);
  }


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleSignin)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export const getServerSideProps= withSSRGuest(async(context) => {
  return {
    props: {}
  }
} ) 