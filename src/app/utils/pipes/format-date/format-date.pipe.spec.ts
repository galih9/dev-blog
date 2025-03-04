import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  const pipe = new FormatDatePipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform date string with given initial format to result format', () => {
    // "2023-10-05" with initial format "YYYY-MM-DD" -> "05 Oct 2023"
    expect(pipe.transform('2023-10-05', 'YYYY-MM-DD', 'DD MMM YYYY')).toBe('05 Oct 2023');
  });

  it('should transform date string without initial format to result format', () => {
    // "2023-10-05" without initial format -> "05 Oct 2023"
    expect(pipe.transform('2023-10-05', undefined, 'DD MMM YYYY')).toBe('05 Oct 2023');
  });

  it('should return "Invalid Date" for an invalid date string', () => {
    // "invalid-date" -> "Invalid Date"
    expect(pipe.transform('invalid-date', 'YYYY-MM-DD', 'DD MMM YYYY')).toBe('Invalid Date');
  });

  it('should return empty string if input is empty', () => {
    expect(pipe.transform('', 'YYYY-MM-DD', 'DD MMM YYYY')).toBe('');
  });
});
