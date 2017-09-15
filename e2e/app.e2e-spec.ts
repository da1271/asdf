import { YcOrchestratorPage } from './app.po';

describe('yc-orchestrator App', () => {
  let page: YcOrchestratorPage;

  beforeEach(() => {
    page = new YcOrchestratorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
