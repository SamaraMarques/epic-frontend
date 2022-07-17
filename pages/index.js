import * as React from 'react';
import About from '../src/modules/views/About';
import AppAppBar from '../src/modules/views/AppAppBar';
import AppFooter from '../src/modules/views/AppFooter';
import Contact from '../src/modules/views/Contact';
import ProductHero from '../src/modules/views/ProductHero';
import withRoot from '../src/modules/withRoot';

function Index() {
  const { pathname, hash, key } = {};
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
