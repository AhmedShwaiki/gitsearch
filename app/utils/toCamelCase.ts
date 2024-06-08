export default function toCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(v => toCamelCase(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce((result, key) => {
        const newKey = key.replace(/([-_][a-z])/gi, (match) =>
          match.toUpperCase().replace('-', '').replace('_', '')
        );
        result[newKey] = toCamelCase(obj[key]);
        return result;
      }, {} as any);
    }
    return obj;
}
