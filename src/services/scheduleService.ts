import { CalendarDate } from "@db/models/calendar-date";
import { Work } from "@db/models/work";
import { User } from "@db/models/user";

interface CalendarWorkProps {
  calendar_date_id?: number;
  year: string;
  month: string;
  day: string;
  work_id: number;
}

export async function manageSchedule(
  calendarWork: CalendarWorkProps[],
  user_id: number
) {
  try {
    const deleteCalendar = await CalendarDate.findAll({
      where: {
        user_id: user_id,
        year: calendarWork[0].year,
        month: calendarWork[0].month,
      },
    });

    deleteCalendar.forEach((item) => item.destroy());

    calendarWork.forEach(async (item) => {
      await CalendarDate.create(
        {
          year: item.year,
          month: item.month,
          day: item.day,
          user_id: user_id,
          work_id: item.work_id,
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
    });
  } catch (error) {
    throw error;
  }
}

export async function getSchedule(
  user_id: number,
  year: string,
  month: string
) {
  try {
    const schedules = [];

    const monthSchedule = await CalendarDate.findAll({
      where: {
        user_id: user_id,
        year: year,
        month: month,
      },
    });

    for (const schedule of monthSchedule) {
      const work = await Work.findOne({
        where: {
          user_id: user_id,
          work_id: schedule.work_id,
        },
      });

      schedules.push({
        calendar_date_id: schedule.calendar_date_id,
        year: schedule.year,
        month: schedule.month,
        day: schedule.day,
        work: {
          work_id: work.work_id,
          name: work.name,
          color: work.color,
          start_time: work.start_time,
          end_time: work.end_time,
          work_type: work.work_type,
          memo: work.memo,
        },
      });
    }

    return schedules;
  } catch (error) {
    throw error;
  }
}
