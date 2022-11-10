import { CalendarDate } from "../../models/calendar-date";

console.log("===============Create CalendarDate Table===============");

const create_table_calendar_date = async () => {
  await CalendarDate.sync({ force: true })
    .then(() => {
      console.log("✅Success Create CalendarDate Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create CalendarDate Table : ", err);
    });
};

create_table_calendar_date();
