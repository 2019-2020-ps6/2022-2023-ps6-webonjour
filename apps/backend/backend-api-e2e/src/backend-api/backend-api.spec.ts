import axios from 'axios';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

describe('GET /health', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/health`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'OK' });
  });
});

describe('unknown route', () => {
  it('should return a 404', async () => {
    try {
      await axios.get(`/unknown`);
    } catch (e) {
      expect(e.response.status).toBe(404);
      expect(e.response.data).toEqual({
        status: 'error',
        message: 'Route /unknown not found',
      });
    }
  });
});
