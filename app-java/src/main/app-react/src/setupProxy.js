import { createProxyMiddleware } from 'http-proxy-middleware';
export default function (app) {
  app.use(
    ['/api', '/auth/google', '/auth/facebook', '/auth/github', '/auth/login'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
}
