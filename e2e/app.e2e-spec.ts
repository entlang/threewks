import { ThreewksPage } from './app.po';

describe('threewks App', function() {
  let page: ThreewksPage;

  beforeEach(() => {
    page = new ThreewksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
