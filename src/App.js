import * as React from 'react';
import Contact from './modules/views/Contact';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import About from './modules/views/About';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import { useLocation } from 'react-router-dom';

function Index() {
  const { pathname, hash, key } = useLocation();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')) || null);
    }
    if (pathname === '/' && hash !== '') {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key, user, setUser]);

  return (
    <React.Fragment>
      <AppAppBar user={user} />
      <ProductHero />
      <About />
      <Contact />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
