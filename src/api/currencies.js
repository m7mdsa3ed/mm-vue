import { route, caller } from '../helpers'

export const updateCurrency = async (fd) => {
  const r = route('currencies.update', {
    id: fd.get('id')
  });

  caller(r.method(), r.url(), fd)
}