class Api {
  private static _data: any[] = [];

  static save(value: any) {
    if (this._data?.length > 0) {
      this._data = [...this._data, value];

      console.log('DATA: ', this._data);
      return;
    }

    this._data = [value];

    console.log('DATA: ', this._data);
  }

  static findAll() {
    return this._data;
  }
}

export default Api;
