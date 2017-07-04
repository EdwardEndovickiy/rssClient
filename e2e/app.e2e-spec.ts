import { ProjectMaterialPage } from './app.po';

describe('project-material App', () => {
  let page: ProjectMaterialPage;

  beforeEach(() => {
    page = new ProjectMaterialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
