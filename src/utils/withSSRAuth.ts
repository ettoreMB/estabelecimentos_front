import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth<P = unknown>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    if (!cookies['estabelecimentos.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
    try {
      return await fn(context)
    } catch (err) {
      destroyCookie(context, 'estabelecimentos.token')
      destroyCookie(context, 'estabelecimentos.token')

      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }
}

