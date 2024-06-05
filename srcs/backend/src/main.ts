import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express_session from 'express-session';
import * as passport from 'passport';
import { TypeORMSession } from './typeorm/entities/session';
import { TypeormStore } from 'connect-typeorm';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { ChannelsService } from './chat/channel/channels.service';
import { AppDataSource } from './typeorm/data-source';

async function bootstrap() {
  dotenv.config();

  //https

  const httpsOptions = {
    key: fs.readFileSync('./secrets/key.pem'),
    cert: fs.readFileSync('./secrets/certificate.pem'),
  };

  const server = express();
  const nest_app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { httpsOptions },
  );

  AppDataSource.getRepository(TypeORMSession);

  nest_app.setGlobalPrefix('api');
  nest_app.use(
    express_session({
      cookie: {
        maxAge: 86400000,
      },
      secret: 'j7lSA4XYLLNBgGedfaDa',
      resave: false,
      saveUninitialized: false,
      //   store: new TypeormStore().connect(sessionRepo),
    }),
  );
  //validation pipe
  nest_app.useGlobalPipes(new ValidationPipe());

  //passport
  nest_app.use(passport.initialize());
  nest_app.use(passport.session());

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Transcendance API')
    .setVersion('0.9.13')
    .build();
  const document = SwaggerModule.createDocument(nest_app, config);
  SwaggerModule.setup('/documentation', nest_app, document);

  //CORS security
  nest_app.enableCors({
    credentials: true,
    origin: true,
  });

  // await nest_app.init();
  await nest_app.listen(3333);

  //general channel
  const channelsService = nest_app.get(ChannelsService);
  await channelsService.create({
    name: 'general',
    visibility: 'public',
    ownerId: -1,
  });
}

bootstrap();
