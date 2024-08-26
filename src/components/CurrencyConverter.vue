<template>
  <div class="currency-converter">
    <div class="input-container">
      <input
        type="number"
        v-model="amount"
        @input="convertCurrency"
        placeholder="Enter amount"
      />
    </div>
    <div class="select-container">
      <select v-model="fromCurrency" @change="convertCurrency">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
      <span>to</span>
      <select v-model="toCurrency" @change="convertCurrency">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>
    <div class="result-container">
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      amount: 1,
      fromCurrency: "USD",
      toCurrency: "EUR",
      currencies: ["USD", "EUR", "GBP", "JPY", "RUB"],
      result: null,
    };
  },
  created() {
    this.convertCurrency();
  },
  methods: {
    async convertCurrency() {
      if (this.amount && this.fromCurrency && this.toCurrency) {
        try {
          const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${this.fromCurrency}`
          );
          const rate = response.data.rates[this.toCurrency];
          this.result = (this.amount * rate).toFixed(2);
        } catch (error) {
          console.error("Failed to fetch currency rates:", error);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
$primary-gradient: linear-gradient(145deg, #ff4d7e, #ff77a9);
$border-radius: 10px;
$shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
$input-width: 200px;

.currency-converter {
  background: $primary-gradient;
  padding: 20px;
  border-radius: $border-radius;
  max-width: 400px;
  margin: 50px auto;
  box-shadow: $shadow;
  animation: fadeIn 0.3s ease-in-out;

  .input-container {
    input {
      width: $input-width;
      padding: 10px;
      border-radius: 5px;
      border: none;
      margin-bottom: 10px;
      font-size: 18px;
      transition: border 0.3s ease;

      &:focus {
        outline: none;
      }
    }
  }

  .select-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    select {
      padding: 10px;
      border-radius: 5px;
      border: none;
      width: 45%;
      font-size: 16px;
      transition: background-color 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: rgba(156, 168, 140, 0.2);
      }
    }
  }

  .result-container {
    p {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
