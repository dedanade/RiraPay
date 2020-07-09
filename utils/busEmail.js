const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

class BusEmail {
  constructor(busUser, url) {
    this.to = busUser.businessEmail;
    this.businessName = busUser.businessName;
    this.url = url;
    this.from = `RiraPay for Business <${process.env.BUSEMAIL_FROM}>`;
  }

  newBusTransport() {
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
      businessName: this.businessName,
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
    await this.newBusTransport().sendMail(mailOptions);
  }

  async sendBusWelcome() {
    await this.send(
      'buswelcome',
      'Welcome to the RiraPay for Business Family!'
    );
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}

class BusOrderEmail {
  constructor(busUser, url, product, order, cart) {
    this.to = busUser.businessEmail;
    this.businessName = busUser.businessName;
    this.orderName = order.name;
    this.orderNum = order.orderNum;
    this.address = order.address;
    this.state = order.state;
    this.area = order.area;
    this.orderPhone = order.phone;
    this.altphone = order.altPhone;
    this.productName = product.productName;
    this.discount = product.discount;
    this.price = product.price;
    this.total = cart.total;
    this.quantity = cart.qty;
    this.url = url;
    this.from = `RiraPay for Business <${process.env.BUSEMAIL_FROM}>`;
  }

  newBusTransport() {
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
      businessName: this.businessName,
      orderName: this.orderName,
      orderNum: this.orderNum,
      address: this.address,
      state: this.state,
      area: this.area,
      phone: this.orderPhone,
      altPhone: this.altphone,
      url: this.url,
      productName: this.productName,
      discount: this.discount,
      price: this.price,
      total: this.total,
      quantity: this.quantity,
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
    await this.newBusTransport().sendMail(mailOptions);
  }

  async sendBusOrderEmail() {
    await this.send(
      'busorderemail',
      `You've recieved a new ${this.productName} Order`
    );
  }

  async sendBusPayEmail() {
    await this.send('buspayemail', `New payment for OrderId ${this.orderNum}`);
  }
}

module.exports = {
  BusEmail: BusEmail,
  BusOrderEmail: BusOrderEmail
};
