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
        app: __dirname + '/../../apps/app-debug.apk' // download local to run faster and save 
      }
    : process.env.APPIUM_OS === 'ios'
    ? {
        platformName: 'iOS',
        platformVersion: '14.4',
        deviceName: 'iPhone 12 Pro Max',
        noReset: true,
        app: __dirname + '/../../apps/ios-sim-debug.zip' // download local to run faster and save bandwith
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

  console.log('Initial app testing')
  const driver = await wdio.remote(opts);
  assert.strictEqual(await driver.execute('flutter:checkHealth'), 'ok');
  
  await driver.execute('flutter:clearTimeline');
  await driver.execute('flutter:forceGC');

  let validName = "Aziz Utku"; 
  let invalidName = "xxxx1" ;

  let validDate = "12/12/1998";
  let invalidDate = "12/12/2052";

  let validCity = "Ankara";
  let incalidCity = "/{123"

  let validVaccine = "Viral vector"
  /*
  const nameKey = Key('textFieldName');
  const nameText = find.byValueKey('textFieldName');
  const birthdayText = find.byValueKey('textFieldBirthday');
  const cityText = find.byValueKey('textFieldCity');
  const vaccineText = find.byValueKey('textFieldVaccineType');
  const sideEffectText = find.byValueKey('textFieldSideEffects');


  const radioFemale = find.byValueKey('radioFemale');
  const radioMale = find.byValueKey('radioMale');
  const radioOther = find.byValueKey('radioOther');
  
  const checkBox = find.byType('CheckboxListTile')
*/
  driver.deleteSession();


})();


