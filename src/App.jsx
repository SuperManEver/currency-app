import React, { Component } from 'react';
import Select from 'react-select';

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

class App extends Component {
  componentDidMount() {
    new FetchOperation(ExchangeRatesStore).run();
  }

  render() {
    return (
      <PageContent>
        <Header>
          <p>Base Currency</p>

          <CurrencySelect
            value={{ value: '', label: '' }}
            onChange={this.handleChange}
            options={[]}
          />
        </Header>
        <div>content goes here</div>
      </PageContent>
    );
  }
}

export default App;
