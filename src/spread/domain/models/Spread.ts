class Spread {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

export default Spread;
