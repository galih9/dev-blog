import { ClassNameToTextPipe } from './class-name-to-text.pipe';

describe('ClassNameToTextPipe', () => {
  const pipe = new ClassNameToTextPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform camelCase to normal text', () => {
    // "myVariableName" -> "My Variable Name"
    expect(pipe.transform('myVariableName', 'camelCase', 'normal')).toBe('My Variable Name');
  });

  it('should transform kebab-case to normal text', () => {
    // "my-variable-name" -> "my variable name"
    expect(pipe.transform('my-variable-name', 'kebabCase', 'normal')).toBe('my variable name');
  });

  it('should transform camelCase to camelCase', () => {
    // "helloWorld" -> "helloWorld"
    expect(pipe.transform('helloWorld', 'camelCase', 'camelCase')).toBe('helloWorld');
  });

  it('should transform kebab-case to camelCase', () => {
    // "hello-world" -> "helloWorld"
    expect(pipe.transform('hello-world', 'kebabCase', 'camelCase')).toBe('helloWorld');
  });

  it('should return empty string if input is empty', () => {
    expect(pipe.transform('', 'camelCase', 'normal')).toBe('');
  });
});
