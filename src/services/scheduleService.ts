import { CalendarDate } from "@db/models/calendar-date";
import { Work } from "@db/models/work";
import { User } from "@db/models/user";

interface CalendarWorkProps {
  calendar_date_id?: number;
  year: number;
  month: number;
  day: number;
  work_id: number;
  type: string;
}

export async function manageSchedule(calendarWork: CalendarWorkProps[], user_id: number) {
  try {
    for (let i = 0; i < calendarWork.length; i++) {
      switch (calendarWork[i].type) {
        case "add":
          await CalendarDate.create(
            {
              year: calendarWork[i].year,
              month: calendarWork[i].month,
              day: calendarWork[i].day,
              user_id: user_id,
              work_id: calendarWork[i].work_id,
            },
            {
              include: [
                {
                  model: User,
                },
                {
                  model: Work,
                },
              ],
            }
          );
          break;

        case "update":
          const updateCalendar = await CalendarDate.findOne({
            where: {
              calendar_date_id: calendarWork[i].calendar_date_id,
            },
          });

          updateCalendar.work_id = calendarWork[i].work_id;
          updateCalendar.save();
          break;

        case "delete":
          const deleteCalendar = await CalendarDate.findOne({
            where: {
              calendar_date_id: calendarWork[i].calendar_date_id,
            },
          });

          deleteCalendar.destroy();
          break;
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function getSchedule(year: number, month: number) {
  try {
    const monthSchedule = await CalendarDate.findAll({
      where: {
        year: year,
        month: month,
      },
    });
    return monthSchedule;
  } catch (error) {
    throw error;
  }
}
