import axios, { Canceler } from 'axios';
import { baseUrl } from '../baseUrl';
import { Dataset } from './dataset.types';

const { CancelToken } = axios;

export const dataset = {
  names: {
    action: (): Promise<{ data: Dataset[] }> =>
      axios.get(`${baseUrl}/dataset`, {
        cancelToken: new CancelToken(
          (c: Canceler) => (dataset.names.cancel = c)
        )
      }),
    cancel: (() => null) as Canceler
  },
  name: {
    action: (name: string): Promise<{ data: Dataset[] }> =>
      axios.get(`${baseUrl}/dataset/${name}`, {
        cancelToken: new CancelToken((c: Canceler) => (dataset.name.cancel = c))
      }),
    cancel: (() => null) as Canceler
  }
};
