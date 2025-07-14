"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "borisov.saveliy@gmail.com",
          username: "fallen",
          password: "hashed_passwrd_1",
        },
        {
          email: "borisov.saveliy@gmail.ru",
          username: "fallen321",
          password: "hashed_passwrd_2",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          image: "",
          text: "Всем привет трололо",
          likeCount: 0,
        },
        {
          image: "",
          text: "The weather is rainy today",
          likeCount: 0,
        },
        {
          image: "",
          text: "Hello everyoune",
          likeCount: 0,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "Всем привет трололо",
          user_id: 1,
          post_id: 1,
        },
        {
          text: "Всем привет трололо",
          user_id: 2,
          post_id: 2,
        },
        {
          text: "Всем привет трололо",
          user_id: 1,
          post_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Posts", null, {});
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
