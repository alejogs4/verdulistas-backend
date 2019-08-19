DROP DATABASE IF EXISTS verdulistas;

CREATE DATABASE verdulistas
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

-- ----------------------------------

CREATE TABLE public.usuarios
(
    nombre "char" NOT NULL,
    id serial NOT NULL,
    direccion "char",
    correo "char" NOT NULL,
    "contraseña" "char" NOT NULL,
    apellidos "char" NOT NULL,
    telefono "char",
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.usuarios
    OWNER to postgres;



CREATE TABLE public.productos
(
    nombre "char" NOT NULL,
    id "char" NOT NULL,
    descripcion "char" NOT NULL,
    precio real NOT NULL,
    "urlImagen" "char",
    inventario integer,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.productos
    OWNER to postgres;



CREATE TABLE public.carritos
(
    id serial NOT NULL,
    "idUsuario" integer NOT NULL,
    nombre "char",
    guardado boolean,
    PRIMARY KEY (id),
    CONSTRAINT "idFromUsuarios" FOREIGN KEY ("idUsuario")
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.carritos
    OWNER to postgres;




CREATE TABLE public.compras
(
    id serial NOT NULL,
    "idCarrito" integer NOT NULL,
    "idProducto" "char" NOT NULL,
    cantidad integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "idFromCarritos" FOREIGN KEY ("idCarrito")
        REFERENCES public.carritos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "idFromProductos" FOREIGN KEY ("idProducto")
        REFERENCES public.productos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.compras
    OWNER to postgres;



CREATE TABLE public.pedidos
(
    id serial NOT NULL,
    "idCarrito" integer NOT NULL,
    "idUsuario" integer NOT NULL,
    direccion "char",
    telefono "char",
    fecha timestamp with time zone,
    PRIMARY KEY (id),
    CONSTRAINT "idFromCarrito" FOREIGN KEY ("idCarrito")
        REFERENCES public.carritos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "idFromUsuario" FOREIGN KEY ("idUsuario")
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.pedidos
    OWNER to postgres;

-- --------------------------



