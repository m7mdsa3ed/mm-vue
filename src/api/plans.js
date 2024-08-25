import { route, httpRequest } from '../helpers'

export const getPlans = async () => {
  return await httpRequest(route('plans.fetch'));
}

export const createPlan = async (data) => {
  return await httpRequest(route('plans.create'), {
    data: data
  });
}

export const updatePlan = async (id, data) => {
  return await httpRequest(route('plans.update'), {
    params: {
      id
    },
    data: data
  });
}

export const deletePlan = async (id) => {
  return await httpRequest(route('plans.delete', {
    params: {
      id
    }
  }));
}

export const newItem = async (id, newItemData) => {
  return await httpRequest(route('plans.new-item'), {
    params: {
      id
    }
  }, {
    data: newItemData
  });
}

export const linkTransactions = async (id, transactionIds) => {
  return await httpRequest(route('plans.link-transactions'), {
    params: {
      id
    }
  }, {
    data: transactionIds
  });
}