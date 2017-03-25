import { TodoAppPage } from './app.po';

describe('todo-app App', () => {
  let page: TodoAppPage;

  beforeEach(() => {
    page = new TodoAppPage();
  });

  it('should display message saying app works', () => {
    TodoAppPage.navigateTo();
    expect(TodoAppPage.getParagraphText()).toEqual('app works!');
  });
});
