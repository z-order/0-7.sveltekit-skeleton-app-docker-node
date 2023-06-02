// @ts-nocheck @ts-ignore
//
// Customer server that runs SvelteKit and also adds a route that lives separately from the SvelteKit app.
//
import { handler } from './build/handler.js';
import express from 'express';
import { config as dotenv } from 'dotenv';
dotenv({ path: './.env.production' }); // load .env file

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.HOST} port ${process.env.PORT}`);
});

function shutdownGracefully() {
  console.log();
  console.log('Gracefully shutting down. Please wait...');
  // anything you need to clean up manually goes in here
  // ...
  console.log();
  console.log('Gracefully shutting down. Please wait...Done');
  process.exit(0);
}

process.on('SIGINT', shutdownGracefully);
process.on('SIGTERM', shutdownGracefully);
process.on('exit', shutdownGracefully);
