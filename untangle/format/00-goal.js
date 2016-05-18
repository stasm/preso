{{{ // the goal


  const print = require('./print');
  const format = require('./');

  const [result] = format(
    "It's {date | toWeekDay | toUpper} " +
    "and we're in {city}.",
    { date: new Date(), city: 'Warsaw' }
  );

  print(result);



}}}
