CREATE TABLE `producto`(
    `id_producto` int(11) NOT NULL,
    `nombre` varchar(50) NOT NULL,
    `descripcion` varchar(100),
    `id_categoria` int(11) not null
);

ALTER TABLE `producto` ADD CONSTRAINT `pk_producto`
 PRIMARY KEY (`id_producto`);

CREATE TABLE `categoria`(
    `id_categoria` int(11) NOT NULL,
    `nombre_categoria` varchar(50) NOT NULL
);

ALTER TABLE `categoria` ADD CONSTRAINT `pk_categoria`
PRIMARY KEY (`id_categoria`);

ALTER TABLE `producto`
    ADD CONSTRAINT `fk_producto_categoriia`
    FOREING KEY (`id_categoria`) REFERENCES `categoria`
    PRIMARY KEY (`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nombre_apellido` varchar(50) NOT NULL,
  `e_mail` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL
);

ALTER TABLE `user` ADD CONSTRAINT `pk_user`
PRIMARY KEY (`is_user`);