const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

class Email {
  constructor(firstArg, url) {
    this.to = firstArg.email;
    this.firstName = firstArg.firstName;
    this.url = url;
    this.from = `RiraPay <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '52acecb7402fcd',
        pass: '680a66ed5297bf'
      }
    });
  }
  // Send the actual email

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the RiraPay Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'forgotPassEmail',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}

class OrderEmail {
  constructor(firstArg, url, product, cart) {
    this.to = firstArg.email;
    this.orderName = firstArg.name;
    this.orderNum = firstArg.orderNum;
    this.address = firstArg.address;
    this.state = firstArg.state;
    this.area = firstArg.area;
    this.orderPhone = firstArg.phone;
    this.altphone = firstArg.altPhone;
    this.productName = product.productName;
    this.price = product.price;
    this.discount = product.discount;
    this.total = cart.total;
    this.quantity = cart.qty;
    this.colour = cart.colour;
    this.size = cart.size;
    this.logisticName = firstArg.logisticName;
    this.logisticNum = firstArg.trackingNum;
    this.url = url;
    this.from = `RiraPay <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '52acecb7402fcd',
        pass: '680a66ed5297bf'
      }
    });
  }
  // Send the actual email

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      orderName: this.orderName,
      orderNum: this.orderNum,
      address: this.address,
      state: this.state,
      area: this.area,
      phone: this.orderPhone,
      price: this.price,
      discount: this.discount,
      total: this.total,
      quantity: this.quantity,
      colour: this.colour,
      size: this.size,
      altPhone: this.altphone,
      url: this.url,
      productName: this.productName,
      logisticName: this.logisticName,
      logisticNum: this.logisticNum,
      subject
    });
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendOrderEmail() {
    await this.send(
      'orderemail',
      `Your ${this.productName} Order has been created`
    );
  }

  async sendPayEmail() {
    await this.send(
      'payemail',
      `Payment for OrderId ${this.orderNum} has been confirmed`
    );
  }

  async sendShipEmail() {
    await this.send(
      'shipemail',
      `Your order ${this.orderNum} has been Shipped`
    );
  }

  async sendDeliveryEmail() {
    await this.send(
      'deliveryemail',
      `DELIVERED: Your order ${this.orderNum} has been marked as delivered`
    );
  }
}

module.exports = {
  Email: Email,
  OrderEmail: OrderEmail
};
