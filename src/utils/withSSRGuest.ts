import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P = unknown>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    if (cookies['estabelecimentos.token']) {
      return {
        redirect: {
          destination: '/home',
          permanent: false,
        }
      }
    }
    return await fn(context)
  }
}

