import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Capston app automation Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
browser.manage().window().maximize();
  it('should Check application launch', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/');
  });

  it('should display Login message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Login to Angular Stream');
  });

  it('should login and display welcome message', () => {

    element(by.name('username')).sendKeys('durai');
    element(by.name('password')).sendKeys('durai@123');
    element(by.buttonText('Login')).click();
    browser.sleep(1000);
    var headEle = element(by.xpath('//app-dashboard/div/h1'));
    expect(headEle.getText()).toContain('Welcome to Angular dashboard!');
  });

  it('should verify user, mesage and circle headings', () => {
    var usrEle =  element(by.css('app-user p'));    
    expect(usrEle.getText()).toEqual('Users!');

    var msgEle =  element(by.css('app-message p'));    
    expect(msgEle.getText()).toEqual('Messages!');

    var crlEle =  element(by.css('app-circle p'));    
    expect(crlEle.getText()).toEqual('Circles!');
    browser.sleep(1000);
  });

  it('should check search user feature', ()=>{
    element(by.id('searchInput')).sendKeys('raj');
    var srchResult = element(by.xpath('//app-user/div/div/ul/li/div'));
    expect(srchResult.getText()).toEqual('rajbawa');
  });

  it('should validate send message to user feature', ()=>{
    
    var srchResult = element(by.xpath('//app-user/div/div/ul/li/div'));
    srchResult.click();
    element(by.xpath('//input[@placeholder=\"@message\"]')).sendKeys('Hi Raj');
    element(by.buttonText('Send')).click();
    browser.sleep(1000);
    expect(element(by.xpath('//app-message//following::ul')).getText()).toContain('Hi Raj');
  });

  it('should validate send message to circle feature', ()=>{
    
    element(by.xpath('//app-circle/div[2]/ul/li[1]')).click();
    element(by.xpath('//input[@placeholder=\"@message\"]')).sendKeys('Hi Everyone');
    element(by.buttonText('Send')).click();
    browser.sleep(1000);
    expect(element(by.xpath('//app-message//following::ul')).getText()).toContain('Hi Everyone');
  });

  it('should validate create circle feature', ()=>{
    
    element(by.xpath('//input[@placeholder=\"@circleName\"]')).sendKeys('New Circle');
    element(by.buttonText('Create')).click();
    browser.refresh();
    browser.sleep(3000);
    expect(element(by.xpath('//app-circle//ul')).getText()).toContain('New Circle');
  });
  
  it('should validate add user to circle feature', ()=>{
    element(by.xpath('//app-circle/div[2]/ul/li[1]')).click();
    element(by.xpath('//input[@placeholder=\"add user\"]')).sendKeys('bagga');
    element(by.buttonText('Add')).click();
    var alart = browser.switchTo().alert();
    browser.sleep(3000);
    var alertText =alart.getText();
    alart.accept();
    browser.switchTo().defaultContent();
    expect(alertText).toContain('\"bagga\" user successfully added');    
  });

  it('should validate logout feature', () => {
    var logOfEle =  element(by.css('a'));    
    expect(logOfEle.getText()).toContain('Logout');
    logOfEle.click();
    browser.sleep(1000);
    expect(element(by.css('app-root h1')).getText()).toEqual('Login to Angular Stream');
  });
});