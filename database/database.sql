
CREATE TABLE users
(
  id serial NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(150) NOT NULL,
  password varchar(150) NOT NULL,
  lastname varchar(150) NOT NULL,
  admin BOOLEAN DEFAULT '0',
  CONSTRAINT pk_users PRIMARY KEY (id),
  CONSTRAINT unique_key_users_email UNIQUE(email),
);

CREATE TABLE phones
(
  id serial,
  user_id INTEGER,
  phone VARCHAR(40) NOT NULL,
  CONSTRAINT pk_phones PRIMARY KEY(id),
  CONSTRAINT fk_phones_users FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE addresses
(
  id serial,
  user_id INTEGER,
  addres VARCHAR(150) NOT NULL,
  CONSTRAINT pk_addresses PRIMARY KEY(id),
  CONSTRAINT fk_phones_addresses FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE products
(
  id serial NOT NULL,
  code char(6) NOT NULL,
  name varchar(200) NOT NULL,
  description text NOT NULL,
  price real NOT NULL,
  image varchar(350),
  quantity integer,
  CONSTRAINT pk_products PRIMARY KEY (id),
  CONSTRAINT unique_key__code_products UNIQUE(code)
);


CREATE TABLE carts
(
  id serial,
  user_id INTEGER NOT NULL,
  CONSTRAINT pk_carts PRIMARY KEY (id),
  CONSTRAINT fk_carts_users FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cart_items
(
  id serial,
  cart_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  CONSTRAINT pk_cart_items PRIMARY KEY (id),
  CONSTRAINT fk_car_items_carts FOREIGN KEY (cart_id) REFERENCES carts(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_cart_items_products FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT cart_product_uk UNIQUE(cart_id, product_id)
);

CREATE TABLE orders
(
  id serial,
  cart_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  address varchar(150) NOT NULL,
  phone varchar(40) NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT pk_orders PRIMARY KEY (id),
  CONSTRAINT fk_orders_carts FOREIGN KEY(cart_id) REFERENCES carts(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_orders_users FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO products(code, name, description, price, image, quantity) values('GTR345', 'Zanahoria', 'La mejor Zanahoria', 3500, 'https://comefruta.es/wp-content/uploads/zanahorias.jpg', 26);
ALTER TABLE cart_items ADD CONSTRAINT cart_product_uk UNIQUE(cart_id, product_id);
