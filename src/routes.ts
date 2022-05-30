import { MainLayout, SearchPage } from 'features';

export interface Route {
  name: string;
  path: string;
  component: () => React.ReactNode;
  exact?: boolean;
  label?: string;
  parent?: string;
}

export const routes: Route[] =
  // prettier-ignore
  [
    { name: 'Main', path: '/', component: MainLayout },

    {name: 'SearchPage', path: '/:link', component: SearchPage},

  ];
