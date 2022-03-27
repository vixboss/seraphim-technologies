const port = 5000;
export const host = process.env.NODE_ENV === 'development' ? `http://localhost:${port}` : "https://seraphim-live.herokuapp.com";