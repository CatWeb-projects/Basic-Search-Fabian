import React from 'react';
import { Dataset } from 'libs/http/api';

interface ProviderProps {
  children: React.ReactNode;
}

interface Props {
  names: Dataset[];
  searchValue: string;
  setNames: React.Dispatch<React.SetStateAction<Dataset[]>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue = {
  names: [],
  searchValue: '',
  setNames: () => {},
  setSearchValue: () => {}
};

export const SearchContext = React.createContext<Props>(defaultValue);

export const ProviderContext = (props: ProviderProps) => {
  const [names, setNames] = React.useState<Dataset[]>([]);
  const [searchValue, setSearchValue] = React.useState('');

  const { children } = props;
  const values = { names, setNames, searchValue, setSearchValue };

  return (
    // eslint-disable-next-line
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};
