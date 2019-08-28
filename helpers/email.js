const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_SERVER_PORT,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_EMAIL_PASSWORD,
  },
});

function sendMailForCreatedOrder({ user, cartItems, orderTotal, finalOrder, admin = false }) {
  const orderItems = cartItems.reduce((a, b) => (
    `${a} <li><strong>Producto: </strong>${b.name} <strong>Precio: </strong>${b.price} <strong>Cantidad: </strong>${b.quantity}</li>`
  ), '');

  return transport.sendMail({
    from: 'alejogs4@gmail.com',
    to: user.email,
    subject: `Order de compra creada para ${user.name} ${user.lastname}`,
    html: `
    <div style="background: #FAFDFF; text-align: center;">
      <img src="https://github.com/alejogs4/Verdulistas/blob/master/assets/img/logo_1.png?raw=true" style="width: 300px; height: auto;" />
      <div>
        <h2>${admin ? `<h2>El usuario ${user.name} ${user.lastname} ha realizado una nueva compra</h2>` : 'Has creado una nueva compra'}</h2>
        <p><strong>Valor:</strong> ${orderTotal}</p>
        <p><strong>ID de orden:</strong> ${finalOrder.id}</p>
        <p><strong>Direccion de orden:</strong> ${finalOrder.address}</p>
        <h3>Productos</h3>
        ${orderItems}
      </div>
    </div>
  `,
  });
}

module.exports = sendMailForCreatedOrder;
