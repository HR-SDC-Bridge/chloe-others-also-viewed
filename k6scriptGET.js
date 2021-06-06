import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
  },
};

const url = 'http://localhost:5500/similar-products-by-views/9999999';

export default function () {
  http.get(url);
  sleep(1);
}