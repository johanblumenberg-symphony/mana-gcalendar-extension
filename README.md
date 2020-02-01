# Google Calendar extension

## Production

### Build

To build the extension, run:

```bash
$ npm install
$ npm run build
```

The result will be a `.tgz` file that can be deployed

### Deployment

The resulting `.tgz` file contains an `install-extension.sh` script that should be used to deploy the extension
to an AWS S3 bucket.

## Development

### Start extension

The webpack dev server is used to rebuild the extension when any file changes, and to serve the extension over HTTPS.

To start the dev server, run:

```bash
$ npm install
$ npm run watch
```

This will start a web server that listens on port `9030`, on the domain `local-dev.symphony.com`.
