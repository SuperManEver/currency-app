import React, { Component } from 'react';
import { Provider, inject, observer } from 'mobx-react';

import Select from 'react-select';
import head from 'lodash/head';
import take from 'lodash/take';
import drop from 'lodash/drop';

import styled from '@emotion/styled';

import ExchangeRatesStore, { onBaseCurrencyChange } from 'stores/ExchangeRates';

import FetchOperation from 'operations/FetchExchangeRates';

const PageContent = styled.div`
  padding: 20px;
  max-width: 1024px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;

  p {
    margin-right: 16px;
  }
`;

const CurrencySelect = styled(Select)`
  flex: 0 1 30%;
`;

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

const SLICE_BOUNDARY = 16;

@inject('exchangeRatesStore')
@observer
class App extends Component {
  componentDidMount() {
    new FetchOperation(this.store).run();
  }

  componentWillUnmount() {
    onBaseCurrencyChange();
  }

  handleChange = option => {
    const { value } = option;

    this.store.updateBaseCurrency(value);
  };

  get store() {
    return this.props.exchangeRatesStore;
  }

  get options() {
    return this.store.toSelectFormat;
  }

  get rates() {
    return this.store.toPairs;
  }

  render() {
    const { options } = this;

    return (
      <PageContent>
        <Header>
          <p>Base Currency</p>

          <CurrencySelect
            value={head(options)}
            onChange={this.handleChange}
            options={options}
          />
        </Header>

        {this.store.inProgress ? (
          <div>Loading...</div>
        ) : (
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
        )}
      </PageContent>
    );
  }
}

export default () => (
  <Provider exchangeRatesStore={ExchangeRatesStore}>
    <App />
  </Provider>
);
