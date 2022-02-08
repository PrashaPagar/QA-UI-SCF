FROM cypress/browsers:latest
RUN mkdir -p /e2e/cypress /e2e/node_modules
COPY . /e2e

#RUN /e2e/node_modules/.bin/cypress install
RUN cd /e2e && npm install
RUN cd /e2e && npm install cypress
WORKDIR /e2e

RUN npm install -g mocha@6.0.0 mocha-parallel-tests mochawesome mochawesome-report-generator jasmine-data-provider log4js 
RUN npm install nodemailer mailgen express typescript  @azure/storage-blob @cypress/webpack-preprocessor
 
COPY runner.sh .

ENTRYPOINT ["/bin/bash", "/e2e/runner.sh"]
#RUN $(npm bin)/cypress run --browser chrome

