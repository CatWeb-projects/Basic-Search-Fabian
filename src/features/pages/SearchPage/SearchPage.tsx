import React from 'react';
import { useRequest } from 'estafette';
import { useHistory } from 'estafette-router';
import { css } from '@emotion/css';
import { SearchContext } from 'contexts/Context';
import { Search } from 'ui/organims';
import { Dataset, dataset } from 'libs/http/api';

export const SearchPage = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [names, setNames] = React.useState<Dataset[]>([]);
  //Estafette
  const { request, data } = useRequest<Dataset[]>();
  const { request: requestName, data: name } = useRequest<Dataset[]>();
  const { push } = useHistory();

  //Call of API with estafette
  React.useEffect(() => {
    onFetch();
    onFetchName();

    return () => {
      dataset.names.cancel();
      dataset.name.cancel();
    };
    // eslint-disable-next-line
  }, [searchValue]);

  const onFetch = () => request(dataset.names.action());
  const onFetchName = () => requestName(dataset.name.action(searchValue));

  //Params based on searchValue and filtered from server
  React.useEffect(() => {
    if (searchValue) {
      push('SearchPage', { link: `query=${searchValue}` });
      setNames(name);
    }
    if (searchValue === '') {
      push('SearchPage', { link: `query=` });
      setNames(data);
    }
    // eslint-disable-next-line
  }, [searchValue, data, name]);

  //Local Storage
  React.useEffect(() => {
    const data = localStorage.getItem('names');
    if (data) {
      return setNames(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('names', JSON.stringify(name));
  }, [name]);

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 50px;
      `}
    >
      <div>
        <Search />

        {searchValue && names?.length > 0 && (
          <div
            className={css`
              top: 48px;
              width: 100%;
              height: auto;
              background-color: rgba(0, 0, 0, 0.5);
              backdrop-filter: blur(16px);
              z-index: 100;
              padding: 8px 16px;
              border-radius: 0 0 8px 8px;
              color: #fff;
            `}
          >
            {names &&
              names
                .filter((_, key) => key < 10)
                .map((finded, key) => (
                  <div key={key} className="finded-product">
                    <div>{finded}</div>
                  </div>
                ))}
          </div>
        )}
      </div>
      {!searchValue && (
        <h1
          className={css`
            margin-top: 50px;
          `}
        >
          Max 90 names are displayed
        </h1>
      )}

      {names?.length > 0 && (
        <div
          style={searchValue ? { marginTop: '50px' } : {}}
          className={css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 1fr;
            grid-gap: rem(20px);
            width: 100%;
            background-color: #d652d6;
          `}
        >
          {names &&
            names
              .filter((_, key) => key < 90)
              .map((finded, key) => (
                <div
                  key={key}
                  className={css`
                    display: flex;
                    justify-content: center;
                    color: #fff;
                    padding: 8px 0;
                  `}
                >
                  <div>{finded}</div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};
