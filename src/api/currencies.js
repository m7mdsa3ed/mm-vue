import {route, httpRequest} from "../helpers";

export const getCurrencies = async () => {
  return await httpRequest(route("currencies.index"));
};

export const getUserCurrenciesWithRates = async () => {
  return await httpRequest(route("currencies.userCurrenciesWithRates"));
}

export const updateCurrency = async (data) => {
  const routeObject = route("currencies.update", {params: {id: data.id}});

  return await httpRequest(routeObject, {
    params: data,
  });
};

export const updateCurrencyRate = async (id, rate) => {
  const routeObject = route("currencies.updateRate", {params: {id}});

  return await httpRequest(routeObject, {
    data: {
      rate
    },
  });
};

export const saveUserCurrencyRate = async (rate, currencyRateId) => {
  const routeObject = route("currencies.saveUserCurrencyRate", {params: {currencyRateId}});

  return await httpRequest(routeObject, {
    data: {
      rate
    }
  });
}

export const resetUserCurrencyRate = async (id) => {
  const routeObject = route("currencies.resetUserCurrencyRate", {params: {id}});

  return await httpRequest(routeObject);
}
