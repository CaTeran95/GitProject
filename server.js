const express = require("express");
const pino = require("pino");
const { pinoHttp } = require("pino-http");

const logger = pino({
	timestamp: pino.stdTimeFunctions.isoTime,
	transport: { target: "pino-pretty" },
});

const httpLogger = pinoHttp({
	logger: logger,
	serializers: {
		req(req) {
			return { url: req.url, method: req.method };
		},
		res(res) {
			return { status: res.statusCode };
		},
		err(err) {
			return { message: err.message };
		},
	},
});

const PORT = parseInt(process.argv[2]) || 8080;

const app = express();

app.use(httpLogger);

app.use(express.static("public"));

app
	.listen(PORT, () => logger.info(`Server up and running on port ${PORT}`))
	.on("error", (err) =>
		logger.error(`There was an error on server: ${err.message}`)
	);
