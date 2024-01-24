export class TransformResponse {
  static get(response: any, attributes?: string[]) {
    const _default = [
      'created_by',
      'updated_by',
      'deleted_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const elements = attributes ?? _default;

    for (const prop in response) {
      for (const element of elements) {
        if (prop === element) {
          delete response[prop];
        } else if (typeof response[prop] === 'object') {
          TransformResponse.get(response[prop], elements);
        }
      }
    }
    return response;
  }
}
