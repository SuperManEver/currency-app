import React, { Component } from 'react';
import { Provider, inject, observer } from 'mobx-react';
import { Router, Link } from '@reach/router';

import Select from 'react-select';
import head from 'lodash/head';

import styled from '@emotion/styled';

import ExchangeRatesStore, { onBaseCurrencyChange } from 'stores/ExchangeRates';

import FetchOperation from 'operations/FetchExchangeRates';

import { ExchangeRatesList, CurrencyConverter, NavLink } from 'components';

const PageContent = styled.div`
  padding: 20px;
  max-width: 1024px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  .header__nav-bar {
    a:first-of-type {
      margin-right: 16px;
    }
  }

  .header__base-currency-wrapper {
    flex: 0 1 40%;
    display: flex;
    align-items: center;

    p {
      flex: 0 1 26%;
      margin-right: 16px;
    }

    & > div {
      flex: 1;
    }
  }
`;

const CurrencySelect = styled(Select)`
  width: 100%;
`;

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
          <nav className="header__nav-bar">
            <NavLink to="/exchange-rates">Exchange rates</NavLink>
            <NavLink to="/converter">Converter</NavLink>
          </nav>

          <div className="header__base-currency-wrapper">
            <p>Base Currency</p>

            <CurrencySelect
              value={head(options)}
              onChange={this.handleChange}
              options={options}
            />
          </div>
        </Header>

        <Router>
          <ExchangeRatesList default path="/exchange-rates" />
          <CurrencyConverter path="/converter" />
        </Router>
      </PageContent>
    );
  }
}

export default () => (
  <Provider exchangeRatesStore={ExchangeRatesStore}>
    <App />
  </Provider>
);
