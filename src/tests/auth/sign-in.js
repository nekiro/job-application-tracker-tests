const request = require('supertest')(process.env.API_URL);

describe('Auth - Sign-in', () => {
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
        const data = { email: 'admin@admin.pl', password: 'admin' };
        const res = await request.post('/auth/sign-in').send(data);

        expect(res.status).toBe(200);
        expect(typeof res.body.token).toBe('string');
        expect(res.body.user).toEqual(
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            id: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
          })
        );
      });
    });
  });
});
