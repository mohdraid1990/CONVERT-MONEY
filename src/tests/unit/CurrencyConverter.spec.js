import { shallowMount } from "@vue/test-utils";
import CurrencyConverter from "../../components/CurrencyConverter.vue";

describe("CurrencyConverter.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(CurrencyConverter);
    expect(wrapper.find(".currency-converter").exists()).toBe(true);
  });
  it("correctly calculates conversion", async () => {
    const wrapper = shallowMount(CurrencyConverter);
    wrapper.setData({ amount: 100, fromCurrency: "USD", toCurrency: "EUR" });
    await wrapper.vm.convertCurrency();
    expect(wrapper.vm.result).not.toBeNull();
  });
});
