import toCamelCase from '@/app/utils/toCamelCase';

describe('toCamelCase', () => {
  it('should convert keys of an object to camelCase', () => {
    const input = {
      snake_case_key: 'value',
      'kebab-case-key': 'value',
      mixed_snake_and_kebab: 'value',
    };
    const expectedOutput = {
      snakeCaseKey: 'value',
      kebabCaseKey: 'value',
      mixedSnakeAndKebab: 'value',
    };

    expect(toCamelCase(input)).toEqual(expectedOutput);
  });

  it('should convert keys of nested objects to camelCase', () => {
    const input = {
      nested_object: {
        snake_case_key: 'value',
        'kebab-case-key': 'value',
      },
    };
    const expectedOutput = {
      nestedObject: {
        snakeCaseKey: 'value',
        kebabCaseKey: 'value',
      },
    };

    expect(toCamelCase(input)).toEqual(expectedOutput);
  });

  it('should convert keys of objects in arrays to camelCase', () => {
    const input = [
      {
        snake_case_key: 'value',
        'kebab-case-key': 'value',
      },
    ];
    const expectedOutput = [
      {
        snakeCaseKey: 'value',
        kebabCaseKey: 'value',
      },
    ];

    expect(toCamelCase(input)).toEqual(expectedOutput);
  });

  it('should handle arrays of non-objects', () => {
    const input = ['snake_case_value', 'kebab-case-value'];
    const expectedOutput = ['snake_case_value', 'kebab-case-value'];

    expect(toCamelCase(input)).toEqual(expectedOutput);
  });

  it('should handle mixed objects and arrays', () => {
    const input = {
      array_with_objects: [
        {
          snake_case_key: 'value',
        },
      ],
      nested_object: {
        another_array: [
          {
            'kebab-case-key': 'value',
          },
        ],
      },
    };
    const expectedOutput = {
      arrayWithObjects: [
        {
          snakeCaseKey: 'value',
        },
      ],
      nestedObject: {
        anotherArray: [
          {
            kebabCaseKey: 'value',
          },
        ],
      },
    };

    expect(toCamelCase(input)).toEqual(expectedOutput);
  });
});
