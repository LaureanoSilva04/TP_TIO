CREATE TABLE `producto`(
    `id_producto` int(11) NOT NULL,
    `nombre` varchar(50) NOT NULL,
    `descripcion` varchar(100)
);

ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);