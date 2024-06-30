import { AxiosInstanceBuilder } from '@dile/crud/lib/AxiosInstanceBuilder';

let configuration = {
  //baseURL: 'https://timer.escuelait.com',
  baseURL: 'http://localhost',
}

new AxiosInstanceBuilder(configuration);
