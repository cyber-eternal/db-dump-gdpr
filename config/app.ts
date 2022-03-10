export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT || 3000,
  gatewayApiKey: process.env.DBDUMP_GATEWAY_API_KEY || 'f06c88b8-bc58-11eb-8529-0242ac130003',
  swaggerHost: process.env.SWAGGER_HOST || `http://localhost:3000/`
};
