import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import About from '../src/modules/views/About';
import AppAppBar from '../src/modules/views/AppAppBar';
import AppFooter from '../src/modules/views/AppFooter';
import Contact from '../src/modules/views/Contact';
import ProductHero from '../src/modules/views/ProductHero';
import withRoot from '../src/modules/withRoot';

function Index() {
  const router = useRouter();
  const { pathname, asPath } = router;
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')) || null);
    }
    if (pathname === '/' && asPath !== '/') {
      setTimeout(() => {
        const id = asPath.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, asPath, user, setUser]);

  return (
    <React.Fragment>
      <Head>
        <title>EPIC - Home</title>
      </Head>
      <AppAppBar user={user} />
      <ProductHero />
      <About />
      <Contact />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
