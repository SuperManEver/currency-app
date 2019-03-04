import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';

import take from 'lodash/take';
import drop from 'lodash/drop';

const SLICE_BOUNDARY = 16;

const ExchangeRatesContainer = styled.div`
  display: flex;

  & > div {
    flex: 1;
  }
`;

const ExchangeRate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  .header__toggle-link {
    margin-right: 12px;
  }

  p:first-of-type {
    margin-right: 1em;
  }
`;

@inject('exchangeRatesStore')
@observer
class ExchangeRatesList extends Component {
  favoriteToggleCreator = currency => {
    return evt => {
      evt.preventDefault();
      currency.toggleFavorite();
    };
  };

  get store() {
    return this.props.exchangeRatesStore;
  }

  get rates() {
    return this.store.rates;
  }

  render() {
    if (this.store.inProgress) {
      return <div>Loading...</div>;
    }

    return (
      <ExchangeRatesContainer>
        <div>
          {take(this.rates, SLICE_BOUNDARY).map(currency => (
            <ExchangeRate key={currency.name}>
              <button
                className="header__toggle-link"
                onClick={this.favoriteToggleCreator(currency)}
              >
                {currency.favorite ? 'Favorite' : 'Make Favorite'}
              </button>
              <p>{currency.name}:</p>
              <p>{currency.value}</p>
            </ExchangeRate>
          ))}
        </div>

        <div>
          {drop(this.rates, SLICE_BOUNDARY).map(currency => (
            <ExchangeRate key={currency.name}>
              <button
                className="header__toggle-link"
                onClick={this.favoriteToggleCreator(currency)}
              >
                {currency.favorite ? 'Favorite' : 'Make Favorite'}
              </button>
              <p>{currency.name}:</p>
              <p>{currency.value}</p>
            </ExchangeRate>
          ))}
        </div>
      </ExchangeRatesContainer>
    );
  }
}

export default ExchangeRatesList;
