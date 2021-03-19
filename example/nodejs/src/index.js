const wdio = require('webdriverio');
const assert = require('assert');
const find = require('appium-flutter-finder');


const osSpecificOps =
  process.env.APPIUM_OS === 'android'
    ? {
        platformName: 'Android',
        deviceName: 'Pixel XL API 24',
        app: __dirname + '/../../apps/app-debug.apk'  
      }
    : process.env.APPIUM_OS === 'ios'
    ? {
        platformName: 'iOS',
        platformVersion: '14.4',
        deviceName: 'iPhone 11 Pro',
        noReset: true,
        app: __dirname + '/../../apps/runner.zip' 
      }
    : {};

const opts = {
  port: 4723,
  capabilities: {
    ...osSpecificOps,
    automationName: 'Flutter',
    retryBackoffTime: 30,
    maxRetryCount: 2
  }
};


(async () => {

  console.log('Initial app testing');
  const driver = await wdio.remote(opts);

  assert.strictEqual(await driver.execute('flutter:checkHealth'), 'ok');
  await driver.execute('flutter:clearTimeline');
  await driver.execute('flutter:forceGC');


  let validName = "Aziz Utku"; 
  let invalidName = "xxxx1" ;

  let validCity = "Ankara";
  let invalidCity = "/{123";

  let validVaccine = "Viral vector";
  let validSideEffect = "Nothing";
  
  const nameText = find.byValueKey('textFieldName');
  const birthdayText = find.byValueKey('textFieldBirthday');
  const cityText = find.byValueKey('textFieldCity');
  const vaccineText = find.byValueKey('textFieldVaccineType');
  const sideEffectText = find.byValueKey('textFieldSideEffects');

  const radioFemale = find.byValueKey('radioFemale');
  const radioMale = find.byValueKey('radioMale');
  const radioOther = find.byValueKey('radioOther');
  
  const checkBox = find.byType('CheckboxListTile');



  // Test Case 1 -- Checking whether all the fields are field with correct data whether button appears or not
  console.log("1st Test Case -- ")

  await driver.execute('flutter:waitFor', find.byValueKey('textFieldName'));
  await driver.elementSendKeys(nameText, validName);

  await enterBirthday(driver, '12');
  await driver.elementSendKeys(cityText, validCity);
  await driver.elementSendKeys(vaccineText, validVaccine);
  await driver.elementClick(radioFemale);
  await driver.elementClick(checkBox);
  await driver.execute('flutter:waitFor', sideEffectText); 
  await driver.elementSendKeys(sideEffectText, validSideEffect);

  try {
    await driver.execute('flutter:waitFor', find.byValueKey('buttonSend'));
    console.log('First test case passed.');
  } catch(exception) {
    console.log('First test case not passed.');
    return exception;
  }

  await driver.elementClick(find.byValueKey('buttonSend'));

  await driver.execute('flutter:waitFor', find.byText('Okay') );
  
  await driver.elementClick(find.byText('Okay'));

  // Test Case 2 -- Checking the application with invalid data ( whether we will be able to see send button)
  console.log("2nd Test Case -- ")

  await driver.execute('flutter:waitFor', find.byValueKey('textFieldName'));
  await driver.elementSendKeys(nameText, invalidName);

  await driver.elementSendKeys(cityText, invalidCity);
  await driver.elementSendKeys(vaccineText, validVaccine);

  try {
    await driver.execute(find.byValueKey('buttonSend'));
    console.log('Second test case not passed.');

  } catch(exception) {
    console.log("Second Test case passed!");
  }



  // Test Case 3 -- Checking whether survey fields get cleared after the send button is clicked
  console.log("3rd Test Case -- ")

  await driver.execute('flutter:waitFor', find.byValueKey('textFieldName'));
  await driver.elementSendKeys(nameText, validName);

  await enterBirthday(driver, '7');

  await driver.elementSendKeys(cityText, validCity);
  await driver.elementSendKeys(vaccineText, validVaccine);
  await driver.elementClick(radioFemale);
  await driver.elementClick(checkBox);
  await driver.elementSendKeys(sideEffectText, validSideEffect);
  await driver.execute('flutter:waitFor', find.byValueKey('buttonSend'));
  await driver.elementClick(find.byValueKey('buttonSend'));
  await driver.execute('flutter:waitFor', find.byText('Okay') );
  await driver.elementClick(find.byText('Okay'));
  try {
    assert.strictEqual(await driver.getElementText(nameText), '');
    assert.strictEqual(await driver.getElementText(birthdayText), '');
    assert.strictEqual(await driver.getElementText(cityText),'');
    assert.strictEqual(await driver.getElementText(vaccineText),'');
    console.log('Third test case not passed.')
  }catch (e) {
    console.log('Third test case not passed.');
    return (e);
  }



  // Test Case 4 -- Check if a text field appears when checking the “yes” checkbox button for side effects.
  console.log("4th Test Case -- ")

  await driver.elementClick(checkBox);
  await driver.execute('flutter:waitFor', sideEffectText); 
  try {
    assert.strictEqual(await driver.getElementText(sideEffectText), '');
    console.log('Fourt test case passed.')
  }catch (e) {
    console.log('Fourt test case not passed.')
  }
  
  // Test Case 5 -- Check if a text appears after a successful submission informing the end-user that the given data is saved successfully.
  console.log("5th Test Case -- ")
  await driver.execute('flutter:waitFor', nameText);
  await driver.elementSendKeys(nameText, validName);
  await driver.elementSendKeys(cityText, validCity);

  await enterBirthday(driver, '1');

  await driver.elementSendKeys(vaccineText, validVaccine);
  await driver.elementClick(radioFemale);
  await driver.execute('flutter:waitFor', sideEffectText); 
  await driver.elementSendKeys(sideEffectText, validSideEffect);
  await driver.execute('flutter:waitFor', find.byValueKey('buttonSend'));
  await driver.elementClick(find.byValueKey('buttonSend'));
  await driver.execute('flutter:waitFor', find.byText('Okay') );

  try {
    await driver.elementClick(find.byText('Okay'));
    console.log('Fifth test case passed.');
  }catch (e) {
    console.log('Fifth test case not passed.');
  }


  driver.deleteSession();


})();

const enterBirthday = async (driver, day) => {
  const birthdayText = find.byValueKey('textFieldBirthday');

  await driver.execute('flutter:waitFor', birthdayText );

  await driver.elementClick(birthdayText);
  await driver.elementClick(find.byText(day));
  await driver.elementClick(find.byText('OK'));
};

