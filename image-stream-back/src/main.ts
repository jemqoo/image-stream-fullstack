import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
    const PORT = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule);
    const sequelize = app.get<Sequelize>(Sequelize);

    app.enableCors();

    await sequelize.sync();

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
