import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { TypeORMSession } from './typeorm/entities/session';
import { TypeormStore } from 'connect-typeorm';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';

async function bootstrap() {
  dotenv.config();

  //https
  const httpsOptions = {
    key: fs.readFileSync('../../../secrets/key.pem'),
    cert: fs.readFileSync('../../../secrets/certificate.pem'),
  };

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );


  const sessionRepo = getRepository(TypeORMSession); 
  app.setGlobalPrefix('api');
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
        
      },
      secret: 'j7lSA4XYLLNBgGedfaDa',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo)
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

    //swagger
    const config = new DocumentBuilder().setTitle('Transcendance API').setDescription('http://ssh.billyboy.fr:3000/').setVersion('0.01').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/documentation', app, document);

    //CORS security
    app.enableCors({
      credentials: true,
      origin: true,
    });

    await app.init();
  
    http.createServer(server).listen(3000);
    https.createServer(httpsOptions, server).listen(3333);
}
bootstrap();
