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
}

export default CappedArray;
