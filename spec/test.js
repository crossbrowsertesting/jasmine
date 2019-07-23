var selenium = require('selenium-webdriver');
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
jasmine.getEnv().defaultTimeoutInterval = 60000; // in microseconds.
jasmine.DEFAULT_TIMEOUT_INTERVAL        = 60000;

describe('Selenium Tutorial', function() {

    beforeEach(function(done) {
        
        caps = {
            'name' : 'Jasmine Example',
            'platform' : 'Windows',
            'browserName' : 'Chrome',
            'version' : '75',
            'record_video' : 'true',
            'username' : 'YOUR_USERNAME',
            'password' : 'YOUR_AUTHKEY'
        };
            
        var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';
    
         this.driver = new selenium.Builder().
            usingServer(remoteHub).
            withCapabilities(caps).
            build();

        this.driver.get('http://crossbrowsertesting.github.io/login-form.html').then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    it('Should be on the home page', function(done) { 

        this.driver.findElement(selenium.By.id("username")).sendKeys("tester@crossbrowsertesting.com");
        this.driver.findElement(selenium.By.xpath("//*[@type=\"password\"]")).sendKeys("test123");
        this.driver.findElement(selenium.By.css("button[type=submit]")).click();
        var element = this.driver.wait(selenium.until.elementLocated(selenium.By.id("logged-in-message")), 10000);

        element.getAttribute('id').then(function(id) {
            expect(id).toBe('logged-in-message');
            console.log("The test was successful");
            done();
        });

    });

});
