import { createProxyMiddleware } from 'http-proxy-middleware';
export default function (app) {
  app.use(
    ['/api', '/api/perform_login'],
    createProxyMiddleware({
      target: 'http://localhost:8080',
    })
  );
}
