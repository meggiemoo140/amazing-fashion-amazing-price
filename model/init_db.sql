
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
    `collection_list` ADD CONSTRAINT `collection_list_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ;
ALTER TABLE
    `collection_list` ADD CONSTRAINT `collection_list_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;

-- Insert some sample data

INSERT INTO users (firstname, lastname, email, password)
VALUES
    ('Bono', 'Juan', 'hhhhh2@gmail.com', '231hfsu&'),
    ('Bjork', 'Jose',  'ttttt2@gmail.com', '745fds&');



INSERT INTO products (itemId, name, price, img, link, sales_price )
VALUES
    (   
        '2111785',
        'TOP PUNTO FLECOS',
        22.95,
        'https://static.zara.net/photos///2022/I/0/1/p/4938/111/800/2/w/496/4938111800_2_3_1.jpg?ts=1666960081819',
        'https://www.zara.com/es/es/top-punto-flecos-p04938111.html?v1=201963805&v2=2111785',
        0
    ),

    (
        '06605722',
        'VESTIDO LENCERO BAJO ABERTURA',
        89.95,
        'https://static.massimodutti.net/3/photos//2022/I/0/1/p/6605/722/726/6605722726_2_6_16.jpg?t=1662547412145&impolicy=massimodutti-itxmediumhigh&imwidth=600&imformat=chrome',
        'https://www.massimodutti.com/es/vestido-lencero-bajo-abertura-l06605722',
        49.95
    ),

    (
        '06022672',
        'AMERICANA TRAJE CON LANA',
        149.00,
        'https://static.massimodutti.net/3/photos//2022/I/0/1/p/6022/672/306/6022672306_2_5_16.jpg?t=1661867920982&impolicy=massimodutti-itxmediumhigh&imwidth=500&imformat=chrome',
        'https://www.massimodutti.com/es/americana-traje-con-lana-l06022672',
        95.95
    ),

    (
        '37007732',
        'Blusa textura volantes', 
        35.99,  
        'https://st.mngbcn.com/rcs/pics/static/T3/fotos/outfit/S20/37007732_99-99999999_01.jpg?ts=1661501729390&imwidth=450&imdensity=2',
        'https://shop.mango.com/es/mujer/camisas-camisas/blusa-textura-volantes_37007732.html',
        0
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
        49.99
    );


INSERT INTO collection_list (user_id, product_id)
VALUES
    (1, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (2, 5),
    (2, 6);