import debounce from '@/app/utils/debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('should debounce the function calls', () => {
    const func = jest.fn();
    const wait = 500;
    const debouncedFunc = debounce(func, wait);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    // Fast forward time
    jest.advanceTimersByTime(wait);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the debounced function with the correct arguments', () => {
    const func = jest.fn();
    const wait = 500;
    const debouncedFunc = debounce(func, wait);

    debouncedFunc('arg1', 'arg2');

    // Fast forward time
    jest.advanceTimersByTime(wait);

    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should reset the timeout if called again within the wait period', () => {
    const func = jest.fn();
    const wait = 500;
    const debouncedFunc = debounce(func, wait);

    debouncedFunc();
    jest.advanceTimersByTime(wait / 2);
    debouncedFunc();
    jest.advanceTimersByTime(wait / 2);

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(wait / 2);

    expect(func).toHaveBeenCalledTimes(1);
  });
});
