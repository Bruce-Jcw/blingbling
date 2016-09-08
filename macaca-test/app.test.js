var wd = require('macaca-wd');

var remoteConfig = {
  host: 'localhost',
  port: 3456
};

describe('macaca mobile sample', function() {
  this.timeout(5 * 60 * 1000);


  var remoteConfig = {
    host: 'localhost',
    port: 3456
  };

  var driver = wd.promiseChainRemote(remoteConfig);

  before(function() {
    return driver.init({
      platformVersion: '9.3',
      deviceName: 'iPhone 6s',
      platformName: 'iOS',
      //bundleId: 'xudafeng.ios-app-bootstrap',
      app: 'ios/build/Build/Products/Debug-iphonesimulator/blingbling.app'
    });
  });

  after(function() {
    return driver
      .sleep(1000)
      .quit();
  });

  it('#1 should display firstscreen', function() {
    return driver
      .sleep(2000)
      .saveScreenshot('.tmp/screenshot/firstscreen.png')
      .sleep(1000)
  });

  it('#1 should navigate to detail', function() {
    let viewXpath = "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeScrollView[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]"
    return driver
      .elementByXPath(viewXpath)
      .tap()
      .sleep(2000)
      // .native()
      .hasElementByXPath('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeStaticText[1]')
      .then(result => {
        result.should.be.true()
      })
      .saveScreenshot('.tmp/screenshot/detail.png')
      .sleep(1000)
  });
})
