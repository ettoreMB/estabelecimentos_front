import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import {setCookie, parseCookies, destroyCookie} from 'nookies';
import { api } from "../services/apiClient";

type SigninCredentials = {
  email: string;
  password: string;
}
type User = {
  username?: string;
  email?: string;
}

type AuthContextData = {
  signIn(credentials: SigninCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User ;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);


export function signOut() {
  destroyCookie(undefined, 'estabelecimentos.token' )
  destroyCookie(undefined, 'estabelecimentos.refreshToken' )

  Router.push('/')
}

export function AuthProvider({ children }:AuthProviderProps) {
  
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
 

  useEffect(() => {
    const { 'estabelecimentos.token': token} = parseCookies()

      if(token) {
        api.get('/users/profile').then(response => {
          const {email, username} = response.data
          setUser({email, username})
        })
        .catch(() => {
        signOut()
        })
      }
    },[])

   async function signIn({email, password}: SigninCredentials) {
     try {
      const response = await api.post('/authenticate/sessions', {
        email,
        password
       })
 
       const {token, refresh_token} = response.data;

       setCookie(undefined, 'estabelecimentos.token', token, { 
         maxAge: 60 * 60 * 24 * 30, // 30 days
         path: '/'
        });
       setCookie(undefined, 'estabelecimentos.refreshToken', refresh_token, { 
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
       } );

       api.defaults.headers.common['Authorization'] = `Bearer ${token}`

       Router.push('/home')
     } catch (error) {
       console.log(error)
     }
   }

  return (
    <AuthContext.Provider value={{isAuthenticated,user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}


