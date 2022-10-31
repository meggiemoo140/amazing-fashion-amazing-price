
--
-- Drop Tables
--
SET foreign_key_checks = 0;  -- Turn off FK 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS collection_list;
SET foreign_key_checks = 1;  -- Turn on FK 

--
-- Create Tables
--

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY  AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `products`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY  AUTO_INCREMENT,
    `itemId` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(13, 2) NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `sales_price` DECIMAL(13, 2) default 0
);

CREATE TABLE `collection_list`(
    
    `user_id` INT UNSIGNED NOT NULL,
    `product_id` INT UNSIGNED NOT NULL
    -- PRIMARY KEY (`user_id`, `product_id`),
    -- FOREIGN KEY (`user_id`) REFERENCES users(id) ON DELETE CASCADE,
    -- FOREIGN KEY (`product_id`) REFERENCES products(id) ON DELETE CASCADE
);
ALTER TABLE
    `collection_list` ADD CONSTRAINT `collection_list_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `collection_list` ADD CONSTRAINT `collection_list_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`);

-- Insert some sample data

INSERT INTO users (firstname, lastname, email, password)
VALUES
    ('Bono', 'Juan', 'hhhhh2@gmail.com', '231hfsu&'),
    ('Bjork', 'Jose',  'ttttt2@gmail.com', '745fds&');



INSERT INTO products (itemId, name, price, img, link, sales_price )
VALUES
    (
        '37007732',
        'Blusa textura volantes', 
        35.99,  
        'https://st.mngbcn.com/rcs/pics/static/T3/fotos/outfit/S20/37007732_99-99999999_01.jpg?ts=1661501729390&imwidth=450&imdensity=2',
        'https://shop.mango.com/es/mujer/camisas-camisas/blusa-textura-volantes_37007732.html',
        5
    ),

    (
        '37057765',
        'Vestido punto espalda cruzada',
        49.99,
        'https://st.mngbcn.com/rcs/pics/static/T3/fotos/S20/37057765_88_D1.jpg?ts=1664967759971&imwidth=337&imdensity=2',
        'https://shop.mango.com/es/mujer/vestidos-y-monos-largos/vestido-punto-espalda-cruzada_37057765.html',
        0  
    ),

    (
        '37031301',
        'Americana traje estructurada',
        69.99,
        'https://st.mngbcn.com/rcs/pics/static/T3/fotos/S20/37031301_05.jpg?ts=1654782644650&imwidth=337&imdensity=2',
        'https://shop.mango.com/es/mujer/chaquetas-y-americanas-americanas/americana-traje-estructurada_37031301.html',
        0  
    );


INSERT INTO collection_list (user_id, product_id)
VALUES
    (1, 1),
    (2, 2),
    (2, 3);