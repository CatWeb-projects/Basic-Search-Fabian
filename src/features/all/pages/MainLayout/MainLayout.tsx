import React from 'react';
import { useHistory, useParams } from 'estafette-router';

export const MainLayout = () => {
  const { push } = useHistory();
  const { link } = useParams<{ link: string }>();

  React.useEffect(() => {
    //Redirect to page with query
    if (!link) {
      push('SearchPage', { link: `query=` });
    }
    // eslint-disable-next-line
  }, [link]);

  return <div></div>;
};
