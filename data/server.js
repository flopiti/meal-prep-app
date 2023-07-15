const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  setTimeout(next, 2000); // Adds a delay of 2000 milliseconds (2 seconds)
});
server.post("/scheduled-meals", (req, res) => {
  const mealId = req.body.mealId;

  const meals = router.db.get("meals");
  const meal = meals.find({ id: mealId }).value();

  if (meal) {
    const scheduledMeals = router.db.get("scheduled-meals");
    const highestId = Math.max(
      ...scheduledMeals.map((meal) => meal.id).value(),
      0,
    );

    const differentObject = {
      id: highestId + 1,
      mealName: meal.mealName,
      mealId: mealId,
      date: req.body.date,
      mealType: req.body.mealType,
    };
    scheduledMeals.insert(differentObject).write();
    res.status(201).jsonp(differentObject);
  } else {
    res.status(400).jsonp({
      message: "Meal not found",
    });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
