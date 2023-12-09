import Head from "next/head";

function Callback() {
  return (
    <>
      <Head>
        <title>Google Auth</title>
      </Head>
    </>
  );
}


// Handle Callback params
export const getServerSideProps = async context => {
  console.log(context.query);
  const { code } = context.query;
  const { error } = context.query;


  if (code) {
    return {
      redirect: {
        destination: `/google-auth?status=success&authCode=${code}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/google-auth?status=failed`,
        permanent: false,
      },
    };
  }
  if (error) {
    return {
      redirect: {
        destination: `/google-auth?status=failed`,
        permanent: false,
      },
    };
  }
};

export default Callback;