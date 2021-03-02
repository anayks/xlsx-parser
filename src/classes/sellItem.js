module.exports = class SellItem {
  constructor(obj) { 
    this.name = obj.name;
    this.price = Math.ceil(obj.price);
    this.sale = Math.ceil(obj.sale);
    this.price_opt = Math.ceil(this.price / 100 * (100 - this.sale));
    const newDate = new Date();
    this.create_at = newDate.getTime();
    this.update_at = newDate.getTime();
    return this;
  }
}