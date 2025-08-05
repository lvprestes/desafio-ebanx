// Middleware function to handle unexpected server errors
export const errorMiddleware = (err, req, res, next) => {
  console.error('Internal error: ', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}
