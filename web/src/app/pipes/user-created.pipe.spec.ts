import { UserCreatedPipe } from './user-created.pipe';

describe('UserCreatedPipe', () => {
  it('create an instance', () => {
    const pipe = new UserCreatedPipe();
    expect(pipe).toBeTruthy();
  });
});
