import { NgClientPage } from './app.po';

describe('ng-client App', () => {
  let page: NgClientPage;

  beforeEach(() => {
    page = new NgClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
