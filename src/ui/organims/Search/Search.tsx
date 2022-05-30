import React from 'react';
import { css } from '@emotion/css';
import { SearchContext } from 'contexts/Context';

export const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  const onSearchChange = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  return (
    <div
      className={css`
        width: 600px;
      `}
    >
      <input
        type="text"
        style={searchValue ? { borderRadius: '8px 8px 0 0' } : {}}
        placeholder="Enter the name"
        value={searchValue}
        onChange={onSearchChange}
        className={css`
          width: 100%;
          height: 48px;
          border-width: 0;
          outline: 0;
          background: #262626;
          border-radius: 8px;
          white-space: nowrap;
          color: #fff;
          font-size: 18px;
          padding-left: 20px;
          padding-right: 12px;
        `}
      />
    </div>
  );
};
