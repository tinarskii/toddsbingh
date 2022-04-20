const knex = require("../database/connect");

module.exports = {
  name: "redeem",
  description: "Redeem coupon and get free coins!",
  args: ["coupon"],
  requireProfile: true,
  run: async (client, target, context, args) => {
    const [code] = args;
    const [coupon] = await knex("toddsbinCoupon")
      .where({
        code,
      });
    
    if (!coupon) {
      return client.say(target, "ไม่มีคูปองนี้!");
    } else if (Number(coupon.limit) <= 0) {
      return client.say(target, "คูปองถูกใช้หมดแล้ว!");
    }
    
    if (!coupon.redeem_by) {
      coupon.redeem_by = [];
    }
    
    if (coupon.redeem_by.includes(context.username)) {
      return client.say(target, "คุณได้ใช้คูปองนี้ไปแล้ว!");
    }
    
    knex("toddsbinUser")
      .where("username", context.username)
      .update({
        coins: knex.raw("coins + ?", Number(coupon.amount)),
        farmCooldown: Date.now()
      })
      .then(() => {
        client.say(
          target,
          `${context.username} ได้รับ ${Number(coupon.amount)} รอคอยน์!`
        );
        
        coupon.redeem_by.push(context.username);
        coupon.limit--;
        
        knex("toddsbinCoupon")
          .where({ code })
          .update({
            limit: coupon.limit,
            redeem_by: JSON.stringify(coupon.redeem_by)
          })
          .catch(console.error);
      })
      .catch(console.error);
  }
};
