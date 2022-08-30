import http from 'k6/http';
import { check, sleep } from 'k6';

// given that 100 users average is our peak hour (during a day)
// we load test 100 users concurretly, to see if our api handles that kind of traffic
// requirements:
// 99% of requests should respond within 1500ms (1.5s)
// errors percentage should be less than 1%

//run: k6 run k6/load/auth/signIn.js

export const options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'https://api.jobtracker.pl';
const email = 'admin@admin.pl';
const password = 'admin';

export default () => {
  const res = http.post(`${BASE_URL}/auth/sign-in/`, {
    email,
    password,
  });

  check(res, {
    'logged in successfully': (res) => res.json('token') !== undefined,
  });

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${res.json('token')}`,
    },
  };

  const usersRes = http.get(`${BASE_URL}/users`, authHeaders);
  check(usersRes, { 'response code was 200': (res) => res.status === 200 });

  sleep(1);
};
