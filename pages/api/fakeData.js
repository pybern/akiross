import { faker } from "@faker-js/faker/locale/en_AU";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// directly accessing request body without json parser in nextjs
// if error from html request

export default (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=86400");
  const limit = JSON.parse(req.body).limit ?? 10;
  const customers = [...new Array(limit)].map((_, index) => {

    const statusChance = Math.random();
    return {
      index,
      order: faker.random.numeric(5),
      toCity: faker.address.city(),
      fromCity: faker.address.city(),
      date: faker.date.recent(10),
      comment: faker.hacker.phrase(),
      status:
        statusChance > 0.66
          ? "Open"
          : statusChance > 0.33
          ? "Closed"
          : "Pending",
    };
  });

  res.status(200).json(customers);
};
