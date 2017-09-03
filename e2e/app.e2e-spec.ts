import { Angular2GlsPage } from './app.po';

describe('angular2-gls App', () => {
  let page: Angular2GlsPage;

  beforeEach(() => {
    page = new Angular2GlsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
