-- Insert data into users
INSERT INTO users (username, password_hash, email)
VALUES (
        'john_doe',
        'hashedpassword1',
        'john@example.com'
    ),
    (
        'jane_doe',
        'hashedpassword2',
        'jane@example.com'
    ),
    (
        'alice_smith',
        'hashedpassword3',
        'alice@example.com'
    ),
    (
        'bob_jones',
        'hashedpassword4',
        'bob@example.com'
    ),
    (
        'carol_white',
        'hashedpassword5',
        'carol@example.com'
    ),
    (
        'dave_brown',
        'hashedpassword6',
        'dave@example.com'
    ),
    (
        'eve_black',
        'hashedpassword7',
        'eve@example.com'
    ),
    (
        'frank_gray',
        'hashedpassword8',
        'frank@example.com'
    ),
    (
        'grace_hall',
        'hashedpassword9',
        'grace@example.com'
    ),
    (
        'hank_lopez',
        'hashedpassword10',
        'hank@example.com'
    );
-- Insert data into recipes
INSERT INTO recipes (
        title,
        instructions,
        preparation_time,
        serving_size,
        image_url,
        user_id
    )
VALUES (
        'Chocolate Cake',
        'Preheat oven to 350°F (175°C). Grease and flour two nine-inch round pans. In a large bowl, stir together the sugar, flour, cocoa, baking powder, baking soda, and salt. Add the eggs, milk, oil, and vanilla, mix for 2 minutes on medium speed of mixer. Stir in the boiling water last. Batter will be thin. Pour evenly into the prepared pans. Bake 30 to 35 minutes in the preheated oven, until the cake tests done with a toothpick. Cool in the pans for 10 minutes, then remove to a wire rack to cool completely.',
        60,
        8,
        'https://t3.ftcdn.net/jpg/02/10/14/94/360_F_210149442_uQtMQbKDZNDoqia6j4tNzkyPOBpXEyjz.jpg',
        1
    ),
    (
        'Pasta Carbonara',
        'In a large pot of boiling salted water, cook pasta according to package instructions; reserve 1 cup water and drain well. In a small bowl, whisk together eggs and Parmesan; set aside. Heat a large skillet over medium high heat. Add bacon and cook until brown and crispy, about 6-8 minutes; reserve excess fat. Stir in garlic until fragrant, about 1 minute. Reduce heat to low. Working quickly, stir in pasta and egg mixture, and gently toss to combine; season with salt and pepper, to taste. Add reserved pasta water, one tablespoon at a time, until desired consistency is reached. Serve immediately, garnished with parsley, if desired.',
        20,
        4,
        'https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg',
        2
    ),
    (
        'Chicken Curry',
        'Heat oil in a large skillet over medium heat. Add onion and cook until soft and translucent, about 5 minutes. Stir in garlic, curry powder, cumin, turmeric, coriander, and cayenne and cook for another minute. Add chicken pieces and cook until lightly browned. Stir in tomato sauce and yogurt. Reduce heat to low and simmer for 20 minutes. Garnish with fresh cilantro before serving.',
        40,
        4,
        'https://t4.ftcdn.net/jpg/04/08/06/83/360_F_408068349_i5frJjLX8cNA6h9BFg1Ci6uVvgp9sNDQ.jpg',
        3
    ),
    (
        'Beef Stew',
        'In a large pot or Dutch oven, cook beef over medium heat until browned. Add onions, garlic, and cook until translucent. Stir in carrots, potatoes, beef broth, tomato paste, Worcestershire sauce, thyme, and bay leaf. Bring to a boil, reduce heat, and simmer until beef is tender and vegetables are cooked through, about 1.5 hours. Remove bay leaf and season with salt and pepper before serving.',
        120,
        6,
        'https://www.allrecipes.com/thmb/XkapTqFUR4U_fMMZQwgikkuoL-Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/RM-281995-ClassicHeartyBeefStew-ddmfs-3x4-6957-660344f4e4c8417fa6d1cf3175e0202c.jpg',
        4
    ),
    (
        'Vegetable Stir Fry',
        'In a large wok or skillet, heat oil over medium-high heat. Add garlic and ginger and cook until fragrant. Add vegetables and stir-fry until tender-crisp, about 5-7 minutes. Stir in soy sauce and sesame oil. Serve over rice or noodles.',
        30,
        4,
        'https://plantbasedonabudget.com/wp-content/uploads/2023/06/Stir-Fry-Veggies-17-500x500.jpg',
        5
    ),
    (
        'Grilled Cheese Sandwich',
        'Butter one side of each bread slice. Place one slice, butter-side down, in a skillet over medium heat. Top with cheese slices and another slice of bread, butter-side up. Cook until golden brown, then flip and cook until the other side is golden brown and cheese is melted.',
        10,
        1,
        'https://www.allrecipes.com/thmb/ICeU6n3kGzoTxOV4ONB0q_TpgYk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/125434-GrilledCheeseoftheGods-mfs-3x2-067-267097af4d0b446ab646bba044445147.jpg',
        6
    ),
    (
        'Caesar Salad',
        'In a large bowl, combine lettuce, croutons, and Parmesan cheese. In a small bowl, whisk together lemon juice, garlic, anchovy paste, Worcestershire sauce, Dijon mustard, and olive oil. Pour dressing over salad and toss to coat.',
        15,
        4,
        'https://www.thespruceeats.com/thmb/DRaBINVopeoHOpjJn66Yh7pMBSc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-caesar-salad-recipe-996054-Hero_01-33c94cc8b8e841ee8f2a815816a0af95.jpg',
        7
    ),
    (
        'Blueberry Muffins',
        'Preheat oven to 400°F (200°C). Grease and flour a 12-cup muffin tin. In a large bowl, combine flour, sugar, salt, and baking powder. In a small bowl, combine vegetable oil, egg, and milk. Mix this with flour mixture. Fold in blueberries. Fill muffin cups right to the top, and sprinkle with crumb topping mixture. To make crumb topping: Mix together sugar, flour, butter, and cinnamon. Mix with fork, and sprinkle over muffins before baking. Bake for 20 to 25 minutes.',
        35,
        12,
        'https://www.culinaryhill.com/wp-content/uploads/2022/08/Blueberry-Muffins-Culinary-Hill-1200x800-1.jpg',
        8
    ),
    (
        'Lemonade',
        'In a small saucepan, combine sugar and 1 cup water. Bring to a boil and stir to dissolve sugar. Allow to cool to room temperature, then cover and refrigerate until chilled. Remove seeds from lemon juice, but leave pulp. In a pitcher, stir together chilled syrup, lemon juice, and remaining 7 cups water.',
        10,
        6,
        'https://st2.depositphotos.com/16122460/43973/i/450/depositphotos_439730134-stock-photo-natural-lemonade-mint-fresh-fruits.jpg',
        9
    ),
    (
        'Lasagna',
        'Preheat oven to 375°F (190°C). In a large pot, cook noodles in boiling water for 8 to 10 minutes. Drain noodles, and rinse with cold water. In a mixing bowl, combine ricotta cheese with egg, remaining parsley, and 1/2 teaspoon salt. In a large skillet, cook and stir ground beef and sausage over medium heat until brown. Add garlic and cook for 2 minutes. Stir in crushed tomatoes, tomato paste, tomato sauce, and water. Season with sugar, basil, fennel seeds, Italian seasoning, 1 tablespoon salt, pepper, and 2 tablespoons parsley. Simmer, covered, for about 1 1/2 hours, stirring occasionally. To assemble, spread 1 1/2 cups meat sauce in the bottom of a 9x13 inch baking dish. Arrange 6 noodles lengthwise over meat sauce. Spread with one half of the ricotta cheese mixture. Top with a third of mozzarella cheese slices. Spoon 1 1/2 cups meat sauce over mozzarella, and sprinkle with 1/4 cup Parmesan cheese. Repeat layers, and top with remaining mozzarella and Parmesan cheese. Cover with foil: to prevent sticking, either spray foil with cooking spray, or make sure the foil does not touch the cheese. Bake in preheated oven for 25 minutes. Remove foil, and bake an additional 25 minutes. Cool for 15 minutes before serving.',
        120,
        12,
        'http://example.com/lasagna.jpg',
        10
    );
-- Insert additional 20 recipes
INSERT INTO recipes (
        title,
        instructions,
        preparation_time,
        serving_size,
        image_url,
        user_id
    )
VALUES (
        'Pancakes',
        'In a large bowl, sift together the flour, baking powder, salt, and sugar. Make a well in the center and pour in the milk, egg, and melted butter; mix until smooth. Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.',
        20,
        4,
        'http://example.com/pancakes.jpg',
        1
    ),
    (
        'Spaghetti Bolognese',
        'Heat oil in a large skillet over medium heat. Add onion, celery, and carrot. Cook until soft, about 5 minutes. Add garlic and cook for 1 minute more. Add beef and cook until browned. Stir in tomato paste and cook for 1 minute. Add wine and cook until reduced by half. Add tomatoes and simmer for 30 minutes. Season with salt and pepper. Serve over cooked spaghetti.',
        60,
        6,
        'http://example.com/spaghetti_bolognese.jpg',
        2
    ),
    (
        'Chicken Alfredo',
        'Cook pasta according to package instructions. In a large skillet, heat butter over medium heat. Add chicken and cook until golden brown. Remove chicken from skillet. In the same skillet, add garlic and cook until fragrant. Stir in cream and simmer until thickened. Add Parmesan cheese and cook until melted. Return chicken to skillet and toss with sauce. Serve over pasta.',
        30,
        4,
        'http://example.com/chicken_alfredo.jpg',
        3
    ),
    (
        'Greek Salad',
        'In a large bowl, combine cucumbers, tomatoes, bell pepper, red onion, olives, and feta cheese. In a small bowl, whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper. Pour dressing over salad and toss to coat.',
        15,
        4,
        'http://example.com/greek_salad.jpg',
        4
    ),
    (
        'French Toast',
        'In a large mixing bowl, whisk together eggs, milk, sugar, vanilla, and cinnamon. Heat a lightly oiled griddle or skillet over medium-high heat. Soak bread slices in egg mixture for 20 seconds on each side. Cook bread on the griddle until golden brown on both sides. Serve hot.',
        20,
        4,
        'http://example.com/french_toast.jpg',
        5
    ),
    (
        'BBQ Ribs',
        'Preheat oven to 300°F (150°C). Season ribs with salt and pepper. Wrap ribs in foil and bake for 2.5 hours. Preheat an outdoor grill to medium-high heat. Remove ribs from foil and place on the grill. Baste with BBQ sauce and grill for 5-10 minutes per side, until sauce is caramelized.',
        180,
        4,
        'http://example.com/bbq_ribs.jpg',
        6
    ),
    (
        'Apple Pie',
        'Preheat oven to 425°F (220°C). In a large bowl, combine sliced apples, sugar, flour, cinnamon, nutmeg, and lemon juice. Roll out half of the dough and place in a 9-inch pie plate. Fill with apple mixture. Roll out remaining dough and place over filling. Trim and crimp edges. Cut slits in top crust to allow steam to escape. Bake for 45-50 minutes, until crust is golden brown.',
        90,
        8,
        'http://example.com/apple_pie.jpg',
        7
    ),
    (
        'Shrimp Scampi',
        'In a large skillet, melt butter over medium heat. Add garlic and cook until fragrant. Stir in shrimp and cook until pink. Add white wine and lemon juice. Cook until wine is reduced by half. Stir in parsley and season with salt and pepper. Serve over pasta or with crusty bread.',
        20,
        4,
        'http://example.com/shrimp_scampi.jpg',
        8
    ),
    (
        'Chocolate Chip Cookies',
        'Preheat oven to 350°F (175°C). In a large bowl, cream together butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in vanilla. Dissolve baking soda in hot water. Add to batter along with salt. Stir in flour, chocolate chips, and nuts. Drop by large spoonfuls onto ungreased pans. Bake for about 10 minutes, or until edges are nicely browned.',
        25,
        24,
        'http://example.com/chocolate_chip_cookies.jpg',
        9
    ),
    (
        'Tacos',
        'In a large skillet, cook ground beef over medium heat until browned. Stir in taco seasoning and water. Simmer until thickened. Spoon meat mixture into taco shells. Top with lettuce, cheese, tomatoes, and sour cream.',
        20,
        4,
        'http://example.com/tacos.jpg',
        10
    ),
    (
        'Baked Salmon',
        'Preheat oven to 375°F (190°C). Place salmon fillets on a lined baking sheet. Drizzle with olive oil and lemon juice. Season with salt, pepper, and dill. Bake for 15-20 minutes, until salmon flakes easily with a fork.',
        25,
        4,
        'http://example.com/baked_salmon.jpg',
        1
    ),
    (
        'Quiche',
        'Preheat oven to 350°F (175°C). In a medium bowl, whisk together eggs, cream, salt, and pepper. Stir in cheese, ham, and green onions. Pour into prepared pie crust. Bake for 45 minutes, until the center is set and top is golden brown.',
        60,
        6,
        'http://example.com/quiche.jpg',
        2
    ),
    (
        'Fried Rice',
        'In a large skillet or wok, heat oil over medium-high heat. Add garlic and cook until fragrant. Stir in cooked rice, soy sauce, and oyster sauce. Cook until heated through. Stir in scrambled eggs and green onions.',
        20,
        4,
        'http://example.com/fried_rice.jpg',
        3
    ),
    (
        'Clam Chowder',
        'In a large pot, cook bacon over medium heat until crisp. Remove bacon and set aside. Add onions and celery to the pot and cook until tender. Stir in potatoes, clam juice, and water. Bring to a boil, then reduce heat and simmer until potatoes are tender. Stir in clams, cream, and cooked bacon. Season with salt and pepper. Cook until heated through.',
        45,
        6,
        'http://example.com/clam_chowder.jpg',
        4
    ),
    (
        'Stuffed Peppers',
        'Preheat oven to 375°F (190°C). In a large skillet, cook ground beef over medium heat until browned. Stir in cooked rice, tomato sauce, and seasonings. Spoon mixture into bell peppers. Place peppers in a baking dish and top with cheese. Bake for 25-30 minutes, until peppers are tender and cheese is melted.',
        60,
        4,
        'http://example.com/stuffed_peppers.jpg',
        5
    ),
    (
        'Banana Bread',
        'Preheat oven to 350°F (175°C). In a large bowl, combine mashed bananas, melted butter, sugar, egg, and vanilla. In another bowl, combine flour, baking soda, and salt. Stir into banana mixture. Pour batter into a greased loaf pan. Bake for 60-65 minutes, until a toothpick inserted into the center comes out clean.',
        75,
        8,
        'http://example.com/banana_bread.jpg',
        6
    ),
    (
        'Chicken Tacos',
        'In a large skillet, cook chicken over medium heat until browned. Stir in taco seasoning and water. Simmer until thickened. Spoon chicken mixture into taco shells. Top with lettuce, cheese, tomatoes, and sour cream.',
        20,
        4,
        'http://example.com/chicken_tacos.jpg',
        7
    ),
    (
        'Macaroni and Cheese',
        'Cook macaroni according to package instructions. In a large saucepan, melt butter over medium heat. Stir in flour and cook for 1 minute. Gradually whisk in milk and cook until thickened. Stir in cheese until melted. Combine cheese sauce with cooked macaroni and serve.',
        30,
        6,
        'http://example.com/macaroni_and_cheese.jpg',
        8
    ),
    (
        'Chili',
        'In a large pot, cook ground beef over medium heat until browned. Add onions, bell pepper, and garlic and cook until tender. Stir in tomatoes, beans, chili powder, cumin, and oregano. Bring to a boil, then reduce heat and simmer for 30 minutes. Season with salt and pepper.',
        60,
        8,
        'http://example.com/chili.jpg',
        9
    ),
    (
        'Chicken Soup',
        'In a large pot, combine chicken, onions, carrots, celery, and garlic. Add chicken broth and bring to a boil. Reduce heat and simmer until chicken is cooked through. Remove chicken and shred. Return chicken to pot and stir in noodles. Cook until noodles are tender. Season with salt and pepper.',
        60,
        6,
        'http://example.com/chicken_soup.jpg',
        10
    ),
    (
        'Pumpkin Pie',
        'Preheat oven to 425°F (220°C). In a large bowl, combine pumpkin puree, sugar, cinnamon, ginger, and cloves. Stir in eggs and evaporated milk. Pour mixture into pie crust. Bake for 15 minutes. Reduce heat to 350°F (175°C) and bake for 40-50 minutes, until a knife inserted into the center comes out clean.',
        70,
        8,
        'http://example.com/pumpkin_pie.jpg',
        1
    ),
    (
        'Burgers',
        'In a large bowl, combine ground beef, onion, garlic, salt, and pepper. Form into patties. Preheat grill to medium-high heat. Grill patties for 5-7 minutes per side, until cooked to desired doneness. Serve on buns with lettuce, tomato, cheese, and condiments.',
        20,
        4,
        'http://example.com/burgers.jpg',
        2
    ),
    (
        'Mashed Potatoes',
        'In a large pot, cover potatoes with water and bring to a boil. Reduce heat and simmer until potatoes are tender. Drain and return potatoes to pot. Mash with butter, milk, salt, and pepper until smooth and creamy.',
        30,
        6,
        'http://example.com/mashed_potatoes.jpg',
        3
    ),
    (
        'Brownies',
        'Preheat oven to 350°F (175°C). In a large bowl, combine melted butter, sugar, eggs, and vanilla. Stir in cocoa powder, flour, baking powder, and salt. Spread batter in a greased baking pan. Bake for 20-25 minutes, until a toothpick inserted into the center comes out clean.',
        35,
        16,
        'http://example.com/brownies.jpg',
        4
    ),
    (
        'Fajitas',
        'In a large skillet, heat oil over medium-high heat. Add chicken, onions, and bell peppers. Cook until chicken is cooked through and vegetables are tender. Stir in fajita seasoning and water. Cook until thickened. Serve with tortillas, cheese, and sour cream.',
        30,
        4,
        'http://example.com/fajitas.jpg',
        5
    ),
    (
        'Bruschetta',
        'Preheat oven to 400°F (200°C). In a large bowl, combine tomatoes, basil, garlic, olive oil, balsamic vinegar, salt, and pepper. Spread baguette slices on a baking sheet and toast in the oven until golden brown. Top with tomato mixture and serve.',
        15,
        6,
        'http://example.com/bruschetta.jpg',
        6
    ),
    (
        'Chicken Pot Pie',
        'Preheat oven to 425°F (220°C). In a large pot, cook chicken, carrots, peas, and celery in broth until tender. In a large skillet, melt butter and stir in flour, salt, and pepper. Gradually stir in milk and cook until thickened. Stir in chicken mixture. Pour into pie crust and top with second crust. Bake for 30-35 minutes, until crust is golden brown.',
        90,
        8,
        'http://example.com/chicken_pot_pie.jpg',
        7
    ),
    (
        'Cheesecake',
        'Preheat oven to 325°F (165°C). In a large bowl, mix cream cheese with sugar until smooth. Blend in milk, and then mix in eggs one at a time. Stir in sour cream, vanilla, and flour until smooth. Pour filling into crust. Bake for 1 hour. Turn off the oven, and let cheesecake cool in oven with the door closed for 5 to 6 hours to prevent cracking. Chill in refrigerator until serving.',
        420,
        12,
        'http://example.com/cheesecake.jpg',
        8
    ),
    (
        'Garlic Bread',
        'Preheat oven to 350°F (175°C). In a small bowl, combine butter, garlic, and parsley. Spread mixture over bread slices. Arrange slices on a baking sheet and bake for 10-12 minutes, until golden brown.',
        15,
        4,
        'http://example.com/garlic_bread.jpg',
        9
    ),
    (
        'Deviled Eggs',
        'Place eggs in a saucepan and cover with cold water. Bring water to a boil and immediately remove from heat. Cover and let eggs stand in hot water for 10-12 minutes. Remove eggs from hot water, cool under cold running water, and peel. Cut eggs in half lengthwise and remove yolks. In a small bowl, mash yolks with mayonnaise, mustard, vinegar, salt, and pepper. Fill egg whites with yolk mixture and garnish with paprika.',
        30,
        12,
        'http://example.com/deviled_eggs.jpg',
        10
    );
-- Insert data into ingredients
INSERT INTO ingredients (name, category)
VALUES ('Flour', 'Baking'),
    ('Sugar', 'Baking'),
    ('Salt', 'Seasoning'),
    ('Butter', 'Dairy'),
    ('Eggs', 'Dairy'),
    ('Milk', 'Dairy'),
    ('Baking Powder', 'Baking'),
    ('Baking Soda', 'Baking'),
    ('Vanilla Extract', 'Flavoring'),
    ('Olive Oil', 'Oil'),
    ('Garlic', 'Vegetable'),
    ('Onion', 'Vegetable'),
    ('Tomato', 'Vegetable'),
    ('Chicken', 'Meat'),
    ('Beef', 'Meat'),
    ('Pork', 'Meat'),
    ('Lettuce', 'Vegetable'),
    ('Cheese', 'Dairy'),
    ('Pasta', 'Grain'),
    ('Rice', 'Grain'),
    ('Potato', 'Vegetable'),
    ('Carrot', 'Vegetable'),
    ('Celery', 'Vegetable'),
    ('Cucumber', 'Vegetable'),
    ('Bell Pepper', 'Vegetable'),
    ('Lemon', 'Fruit'),
    ('Cilantro', 'Herb'),
    ('Basil', 'Herb'),
    ('Parsley', 'Herb'),
    ('Feta Cheese', 'Dairy');
-- Insert data into recipe_ingredients
-- Chocolate Cake
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (1, 1, '2 cups'),
    (1, 2, '2 cups'),
    (1, 3, '1 tsp'),
    (1, 4, '1/2 cup'),
    (1, 5, '2 large'),
    (1, 6, '1 cup'),
    (1, 7, '1 1/2 tsp'),
    (1, 8, '1 1/2 tsp'),
    (1, 9, '1 tsp');
-- Pasta Carbonara
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (2, 20, '12 oz'),
    (2, 4, '1 tbsp'),
    (2, 5, '2 large'),
    (2, 18, '1/2 cup'),
    (2, 15, '8 oz'),
    (2, 11, '2 cloves');
-- Chicken Curry
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (3, 10, '2 tbsp'),
    (3, 11, '1 large'),
    (3, 14, '1 lb'),
    (3, 12, '2 cloves'),
    (3, 13, '1 can'),
    (3, 22, '2 large');
-- Beef Stew
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (4, 15, '2 lbs'),
    (4, 11, '1 large'),
    (4, 12, '2 cloves'),
    (4, 21, '2 cups'),
    (4, 22, '3 large'),
    (4, 23, '3 ribs'),
    (4, 24, '1/4 cup'),
    (4, 2, '2 tbsp');
-- Vegetable Stir Fry
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (5, 10, '2 tbsp'),
    (5, 11, '1 large'),
    (5, 24, '1 large'),
    (5, 25, '1 large'),
    (5, 26, '1 large'),
    (5, 27, '2 tbsp');
-- Grilled Cheese Sandwich
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (6, 4, '2 tbsp'),
    (6, 18, '4 slices');
-- Caesar Salad
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (7, 17, '1 head'),
    (7, 18, '1/2 cup'),
    (7, 25, '1/4 cup'),
    (7, 10, '2 tbsp'),
    (7, 12, '2 cloves');
-- Blueberry Muffins
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (8, 1, '2 cups'),
    (8, 2, '1 cup'),
    (8, 3, '1 tsp'),
    (8, 4, '1/2 cup'),
    (8, 5, '1 large'),
    (8, 6, '1 cup'),
    (8, 7, '1 1/2 tsp');
-- Lemonade
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (9, 2, '1 cup'),
    (9, 26, '1 cup');
-- Lasagna
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
VALUES (10, 14, '1 lb'),
    (10, 15, '1 lb'),
    (10, 11, '1 large'),
    (10, 12, '2 cloves'),
    (10, 20, '12 oz'),
    (10, 18, '2 cups');
-- Insert data into saved_recipes
INSERT INTO saved_recipes (user_id, recipe_id)
VALUES (1, 2),
    (2, 1),
    (3, 4),
    (4, 3),
    (5, 6),
    (6, 5),
    (7, 8),
    (8, 7),
    (9, 10),
    (10, 9);