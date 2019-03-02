import React, { Component } from 'react';
import { Provider, inject, observer } from 'mobx-react';

import Select from 'react-select';
import head from 'lodash/head';

import styled from '@emotion/styled';

import ExchangeRatesStore from 'stores/ExchangeRates';

import FetchOperation from 'operations/FetchExchangeRates';

const PageContent = styled.div`
  padding: 20px;
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

@inject('exchangeRatesStore')
@observer
class App extends Component {
  componentDidMount() {
    new FetchOperation(this.store).run();
  }

  get store() {
    return this.props.exchangeRatesStore;
  }

  get options() {
    return this.store.toSelectFormat;
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
        <div>content goes here</div>
      </PageContent>
    );
  }
}

export default () => (
  <Provider exchangeRatesStore={ExchangeRatesStore}>
    <App />
  </Provider>
);
