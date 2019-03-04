import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Select from 'react-select';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;

  & > div {
    header {
      margin-bottom: 12px;

      &.converter__base-currency-header {
        height: 35px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        border-radius: 4px;
        border: 1px solid hsl(0, 0%, 80%);
      }
    }

    input {
      padding: 8px 12px;
    }

    &:first-of-type {
      margin-right: 24px;
    }
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
      [name]: value,
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

    return 0;
  }

  get baseCurrencyValue() {
    const { baseCurrencyValue } = this.state;

    return baseCurrencyValue;
  }

  render() {
    const { counterCurrency } = this.state;
    const { baseCurrency } = this.store;

    return (
      <Container>
        <div>
          <header className="converter__base-currency-header">
            <p>{baseCurrency}</p>
          </header>
          <input
            type="text"
            name="baseCurrencyValue"
            value={this.baseCurrencyValue}
            onChange={this.handleValueUpdate}
          />
        </div>
        <div>
          <header>
            <Select
              value={counterCurrency}
              options={this.options}
              onChange={this.handleCurrencyChange}
            />
          </header>
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
