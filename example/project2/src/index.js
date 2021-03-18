// import * as wdio from 'webdriverio';
// import * as assert from 'assert';
const wdio = require('webdriverio');
const assert = require('assert');
const find = require('appium-flutter-finder');

const osSpecificOps =
  process.env.APPIUM_OS === 'android'
    ? {
        platformName: 'Android',
        deviceName: 'Pixel XL API 24',
        // @todo support non-unix style path
        app: __dirname + '/../../apps/android-real-debug.apk' // download local to run faster and save bandwith
        // app: 'https://github.com/truongsinh/appium-flutter-driver/releases/download/v0.0.4/android-real-debug.apk',
      }
    : process.env.APPIUM_OS === 'ios'
    ? {
        platformName: 'iOS',
        platformVersion: '14.4',
        deviceName: 'iPhone 12 Pro Max',
        noReset: true,
        app: __dirname + '/../../apps/ios-sim-debug.zip' // download local to run faster and save bandwith
        // app: 'https://github.com/truongsinh/appium-flutter-driver/releases/download/v0.0.4/ios-sim-debug.zip',
      }
    : {};

const opts = {
  port: 4723,
  capabilities: {
    ...osSpecificOps,
    automationName: 'Flutter'
  }
};


(async () => { 

    const buttonFinder = find.byValueKey('increment');

    const driver = await wdio.remote(opts);

    assert.strictEqual(await driver.getElementText(counterTextFinder), '0');


    await driver.elementClick(buttonFinder);
    await driver.touchAction({
      action: 'tap',
      element: { elementId: buttonFinder }
    });

    assert.strictEqual(await driver.getElementText(counterTextFinder), '2');


})();