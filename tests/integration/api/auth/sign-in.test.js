const request = require('supertest')(process.env.API_URL);

describe('Sign-in', () => {
  describe('given valid credentials', () => {
    describe('given non existing user', () => {
      test('should return AuthError', async () => {
        const invalidData = { email: 'foo@gmail.com', password: 'barbar' };
        const res = await request.post('/auth/sign-in').send(invalidData);
        expect(res.status).toBe(401);
        expect(res.body.errorType).toBe('AuthError');
      });
    });

    describe('given existing user', () => {
      test('should return user and token', async () => {
        const data = {
          email: process.env.USER_EMAIL,
          password: process.env.USER_PASSWORD,
        };
        const res = await request.post('/auth/sign-in').send(data);

        expect(res.status).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            token: expect.any(String),
          })
        );
      });
    });
  });
});
