const request = require('supertest')(process.env.API_URL);
const { getToken } = require('../util/token');

let token;

beforeAll(async () => {
  token = `Bearer ${(await getToken())}`;
});

describe('Authorization', () => {
  describe('given valid token', () => {
    test('should return status code 200 OK', async () => {
      const res = await request.get('/users').set('Authorization', token);

      expect(res.statusCode).toBe(200);
    });
  });

  describe('given invalid token', () => {
    test('should return json error', async () => {
      const invalidToken = 'Bearer foo';
      const res = await request
        .get('/users')
        .set('Authorization', invalidToken);

      expect(res.status).toBe(401);
      expect(res.body.errorType).toBe('JsonWebTokenError');
    });
  });

  describe('given no token', () => {
    test('should return json error', async () => {
      const res = await request.get('/users');

      expect(res.status).toBe(401);
      expect(res.body.errorType).toBe('JsonWebTokenError');
      expect(res.body.error).toBe('Token is required');
    });
  });

  describe('given malformed token', () => {
    test('should return json error', async () => {
      const res = await request.get('/users').set('Authorization', `Bearer ${}`);

      expect(res.status).toBe(401);
      expect(res.body.errorType).toBe('JsonWebTokenError');
    });
  });
});
