
CREATE TABLE roles
(
  id serial,
  name varchar(100) NOT NULL,
  CONSTRAINT role_pk PRIMARY KEY(id),
  CONSTRAINT name_role_unique UNIQUE(name)
);

CREATE TABLE permissions
(
  id serial,
  name varchar(100) NOT NULL,
  CONSTRAINT permission_pk PRIMARY KEY(id),
  CONSTRAINT name_permission_unique UNIQUE(name)
);

CREATE TABLE users
(
  id serial NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(150) NOT NULL,
  password varchar(150) NOT NULL,
  lastname varchar(150) NOT NULL,
  role_id INTEGER,
  CONSTRAINT pk_users PRIMARY KEY (id),
  CONSTRAINT unique_key_users_email UNIQUE(email),
  CONSTRAINT fk_users_roles FOREIGN KEY(role_id) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE
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

CREATE TABLE purchases
(
  id serial,
  cart_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  CONSTRAINT pk_purchases PRIMARY KEY (id),
  CONSTRAINT fk_purchases_carts FOREIGN KEY (cart_id) REFERENCES carts(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_purchases_products FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
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

INSERT INTO roles(name) VALUES('ADMIN');
INSERT INTO roles(name) VALUES('USER');

ALTER TABLE users ALTER COLUMN role_id SET DEFAULT 2;
