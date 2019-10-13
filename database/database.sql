-- DDL ------------------------------------

CREATE DATABASE verdulistas;

CREATE TABLE users
(
  id serial NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(150) NOT NULL,
  password varchar(150) NOT NULL,
  lastname varchar(150) NOT NULL,
  admin BOOLEAN DEFAULT '0',
  CONSTRAINT pk_users PRIMARY KEY (id),
  CONSTRAINT unique_key_users_email UNIQUE(email)
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

CREATE TABLE categories
(
  id serial NOT NULL,
  name varchar(50) NOT null,
  CONSTRAINT pk_categories PRIMARY KEY(id)
);

CREATE TABLE products
(
  id serial NOT NULL,
  code varchar(30) NOT NULL,
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

ALTER TABLE cart_items ADD CONSTRAINT cart_product_uk UNIQUE(cart_id, product_id);

-- DML ------------------------------------
INSERT INTO products(code, name, description, price, image, quantity) 
VALUES('CBLL_PIC_0001', 
       'Cebolla picada', 
       'Cebolla picada y empacada al vacío en presentación de 200g sin conservantes', 
       1500, 
       'https://2.bp.blogspot.com/-jELCCM-ypEM/Ws6aWTqKS-I/AAAAAAAAASc/Qr5gOY33xxAoWgjnXFnlLzvt21uR0LeawCLcBGAs/s1600/0f62bba76fadab14a6d8e922f6767a5e-0.jpg', 
       26);
       
INSERT INTO products(code, name, description, price, image, quantity) 
VALUES('HOG_0101', 
       'Hogao', 
       'Hogao preparado y cocinado, empacado en presentación de frasco de vidrio de 250g sin conservantes', 
       3500, 
       'https://4.bp.blogspot.com/-A9aUYJ1T9Qs/Ws6aSUPsKKI/AAAAAAAAASU/6Zw9HDdNrz8XP9eDUkrmuAT7nNeeH49DwCLcBGAs/s1600/0f62bba76fadab14a6d8e922f6767a5e-1.jpg', 
       15);
       
INSERT INTO products(code, name, description, price, image, quantity) 
VALUES('VERD_SOPA_0201', 
       'Verduras para sopa y ensalada', 
       'Verduras para sopa y ensalada, preparadas y listas empacadas al vacío en presentación de 150g sin conservantes; trae habichuelas, zanahoria y arveja desgranada', 
       1500, 
       'https://4.bp.blogspot.com/-A9aUYJ1T9Qs/Ws6aSUPsKKI/AAAAAAAAASU/6Zw9HDdNrz8XP9eDUkrmuAT7nNeeH49DwCLcBGAs/s1600/0f62bba76fadab14a6d8e922f6767a5e-1.jpg', 
       20);
       
ALTER TABLE cart_items ADD CONSTRAINT non_negative_quantities CHECK(quantity > 0);
ALTER TABLE orders ADD COLUMN order_total FLOAT NOT NULL;
-- -------------------------------------
INSERT INTO categories(name) values('Producto General');
ALTER TABLE products ADD COLUMN category_id int NOT NULL DEFAULT 1;
ALTER TABLE products ADD CONSTRAINT fk_products_categories FOREIGN KEY(category_id) REFERENCES categories(id);


