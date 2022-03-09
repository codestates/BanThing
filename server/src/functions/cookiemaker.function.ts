export function cookieSetting(maxAge: number) {
  return {
    domain: process.env.FRONTEND_ENDPOINT || 'localhost',
    maxAge,
  };
}
