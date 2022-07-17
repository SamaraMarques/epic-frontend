import '../src/index.css';
import useQuery from '../src/utils/useQuery';

function MyApp({ Component, pageProps }) {
  const query = useQuery();
  if (!query) return [];
  return <Component {...pageProps} />;
}

export default MyApp;
