import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const userRepo = dataSource.getRepository(User);

  const existing = await userRepo.findOneBy({ username: 'admin' });
  if (!existing) {
    const password = await bcrypt.hash('password', 10);
    const user = userRepo.create({ username: 'admin', password });
    await userRepo.save(user);
    console.log('Default user created: admin / password');
  } else {
    console.log('Admin user already exists');
  }

  await app.close();
}

bootstrap();
