<h2><strong>Getting Started With Jasmine and CrossBrowserTesting</strong></h2>
<p><em>For this document, we provide example tests located in our <a href="https://github.com/crossbrowsertesting/selenium-jasmine">Jasmine Github Repository</a>.</em></p>
<p><a href="https://jasmine.github.io/">Jasmine</a> is a behavior-driven development framework. It is non-dependent on other Javascript frameworks and makes writing tests easy. In this guide we will use Jasmine  for testing using the <a href="https://www.seleniumhq.org/">Selenium Webdriver</a> and the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Javascript</a> programming language.</p>
<h3>Setting Up Jasmine</h3>
<ol>
<li>To get started, install Selenium bindings for Javascript using the command:
<pre>npm install selenium-webdriver</pre>
</li>
<li>Install Jasmine for Javascript using:
<pre>npm install --save-dev jasmine</pre>
</li>
<li>Initialize a new Jasmine project:
<pre>node_modules/jasmine/bin/jasmine init</pre>
</li>
</ol>
<h3>Running Test</h3>
<p>Create file spec/test.js containing the following:</p>
<pre><code>selenium = require('selenium-webdriver');
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

}); </code></pre>
<p>To run your test, use the command:</p>
<pre>node_modules/jasmine/bin/jasmine spec/test.js</pre>
<p>Congratulations! You have successfully configured an automated test using Jasmine. Now you are ready to see your test start to run in the <a href="https://app.crossbrowsertesting.com/selenium/results">Crossbrowsertesting app</a>.</p>
<h3>Conclusions</h3>
<p>By following the steps outlined in this guide, you are now able to seamlessly integrate Jasmine and CrossBrowserTesting. If you have any questions or concerns, please feel free to reach out to our <a href="mailto:support@crossbrowsertesting.com">support team</a>.</p>
