import { CalendarDate } from "../db/models/calendar-date";
import { Work } from "../db/models/work";
import { User } from "../db/models/user";

interface CalendarWorkProps {
  calendar_date_id?: number;
  year: number;
  month: number;
  day: number;
  work_id: number;
  type: string;
}

class ScheduleService {
  manageSchedule = async (calendarWork: CalendarWorkProps[]) => {
    try {
      for (let i = 0; i < calendarWork.length; i++) {
        switch (calendarWork[i].type) {
          case "add":
            const exUser = await User.create({
              identification: "hello",
              password: "1234",
              name: "hi",
              email: "tmax.com",
            });

            const exWork = await Work.create({
              user_id: exUser.user_id,
              name: "용우",
              color: "#fff",
              start_time: new Date(),
              end_time: new Date(),
              work_type: "야근",
              memo: "퇴근하고싶어요",
            });

            await CalendarDate.create(
              {
                year: calendarWork[i].year,
                month: calendarWork[i].month,
                day: calendarWork[i].day,
                user_id: exUser.user_id,
                work_id: exWork.work_id,
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

          case "update":
            const updateCalendar = await CalendarDate.findOne({
              where: {
                calendar_date_id: calendarWork[i].calendar_date_id,
              },
            });

            updateCalendar.work_id = calendarWork[i].work_id;
            updateCalendar.save();

          case "delete":
            const deleteCalendar = await CalendarDate.findOne({
              where: {
                calendar_date_id: calendarWork[i].calendar_date_id,
              },
            });

            deleteCalendar.destroy();
        }
      }
    } catch (error) {
      throw error;
    }
  };

  getSchedule = async () => {
    console.log("test");
  };
}

export default ScheduleService;
