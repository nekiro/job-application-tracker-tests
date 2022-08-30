const request = require('supertest')(process.env.API_URL);

const getToken = async () => {
  try {
    const res = await request.post('/auth/sign-in').send({
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    });

    return res.body.token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getToken,
};
