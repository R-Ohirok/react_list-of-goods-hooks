import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortFields {
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
}

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function getPreparedGoods(
  goods: string[],
  reversed: boolean,
  sortField: SortFields | null = null,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      if (sortField === SortFields.Alphabetically) {
        return good1.localeCompare(good2);
      }

      if (sortField === SortFields.ByLength) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortFields | null>(null);
  const [reversed, setReversed] = useState(false);
  const sortedGoods = getPreparedGoods(goodsFromServer, reversed, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortFields.Alphabetically,
          })}
          onClick={() => setSortField(SortFields.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortFields.ByLength,
          })}
          onClick={() => setSortField(SortFields.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sortField || reversed,
            })}
            onClick={() => {
              setSortField(null);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
