import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const res = http.get('http://localhost:3000/api/membres');

  check(res, {
    'status 200': (r) => r.status === 200,
    'body non vide': (r) => r.body.length > 0,
  });

  sleep(1);
}
