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

  p:first-of-type {
    margin-right: 1em;
  }
`;

@inject('exchangeRatesStore')
@observer
class ExchangeRatesList extends Component {
  get store() {
    return this.props.exchangeRatesStore;
  }

  get rates() {
    return this.store.toPairs;
  }

  render() {
    if (this.store.inProgress) {
      return <div>Loading...</div>;
    }

    return (
      <ExchangeRatesContainer>
        <div>
          {take(this.rates, SLICE_BOUNDARY).map(([currencyName, rate]) => (
            <ExchangeRate key={currencyName}>
              <p>{currencyName}:</p>
              <p>{rate}</p>
            </ExchangeRate>
          ))}
        </div>

        <div>
          {drop(this.rates, SLICE_BOUNDARY).map(([currencyName, rate]) => (
            <ExchangeRate key={currencyName}>
              <p>{currencyName}:</p>
              <p>{rate}</p>
            </ExchangeRate>
          ))}
        </div>
      </ExchangeRatesContainer>
    );
  }
}

export default ExchangeRatesList;
