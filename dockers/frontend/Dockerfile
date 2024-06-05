FROM node:20-alpine

WORKDIR /workspace
VOLUME ["/workspace"]

COPY script/start.sh /usr/local/bin/start.sh
RUN  chmod +x        /usr/local/bin/start.sh

# USER node

ENTRYPOINT ["/usr/local/bin/start.sh"]
