const chai = require('chai');
const { expect } = chai;
const proxyquire = require('proxyquire');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

describe('weather', () => {
  let weather;
  const rp = sinon.stub();

  beforeEach(() => {
    rp.reset();
    weather = proxyquire('../src/weather', { 'request-promise-native': rp });
  });

  it('should fetch weather for a location', done => {
    const context = { request: { body: { location: 'Chennai, India' } } };
    const response = {
      query: {
        results: {
          channel: { item: { condition: { text: 'a', temp: '12' } } },
        },
      },
    };
    rp.resolves(JSON.stringify(response));
    expect(weather(context))
      .to.eventually.have.property('status', 200)
      .notify(done);
  });
});
