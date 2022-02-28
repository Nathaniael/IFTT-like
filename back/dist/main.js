"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: 'http://localhost:8081', credentials: true, allowedHeaders: 'Set-Cookie, content-type' });
    app.use(cookieParser());
    await app.listen(8080);
    app.use(cookieParser());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'Set-Cookie');
        next();
    });
}
bootstrap();
//# sourceMappingURL=main.js.map