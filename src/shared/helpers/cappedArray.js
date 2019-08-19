class CappedArray {
  constructor(size) {
    this.size = size;
    this.data = [];
  }

  push = (newData) => {
    const { data, size } = this;
    data.push(newData);
    
    if (data.length > size) {
      data.shift();
    }
  }

  clear = () => {
    this.data = [];
  }

  get = () => {
    return this.data;
  }

  getLatest = () => {
    return this.data[this.data.length - 1];
  }
}

export default CappedArray;
