import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Select from 'react-select';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;

  & > div {
    margin-right: 24px;
  }
`;

@inject('exchangeRatesStore')
@observer
class CurrencyConverter extends Component {
  state = {
    counterCurrency: {
      value: 'RUB',
      label: 'RUB',
    },
    baseCurrencyValue: '',
    counterCurrencyValue: '',
  };

  handleCurrencyChange = option => {
    this.setState({
      counterCurrency: option,
    });
  };

  handleValueUpdate = evt => {
    const { name, value } = evt.target;

    this.setState({
      [name]: parseInt(value),
    });
  };

  get store() {
    return this.props.exchangeRatesStore;
  }

  get options() {
    return this.store.exchangeRates.map(currency => ({
      value: currency.name,
      label: currency.name,
    }));
  }

  get counterCurrencyValue() {
    const {
      baseCurrencyValue,
      counterCurrency: { label },
    } = this.state;

    const ratio = this.store.getRatioForCurrency(label);

    if (ratio) {
      return ratio.value * parseFloat(baseCurrencyValue || 0);
    }

    return baseCurrencyValue;
  }

  render() {
    const { counterCurrency, baseCurrencyValue } = this.state;
    const { baseCurrency } = this.store;

    return (
      <Container>
        <div>
          <p>{baseCurrency}</p>
          <input
            type="text"
            name="baseCurrencyValue"
            value={baseCurrencyValue}
            onChange={this.handleValueUpdate}
          />
        </div>
        <div>
          <Select
            value={counterCurrency}
            options={this.options}
            onChange={this.handleCurrencyChange}
          />
          <input
            type="text"
            name="counterCurrencyValue"
            value={this.counterCurrencyValue}
            onChange={this.handleValueUpdate}
          />
        </div>
      </Container>
    );
  }
}

export default CurrencyConverter;
