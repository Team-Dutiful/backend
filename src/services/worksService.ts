import { Work } from "@db/models/work";
import { User } from "@db/models/user";
import { CalendarDate } from "@db/models/calendar-date";

class WorksService {
  getWork = async () => {
    console.log("test");
  };

  createWork = async (
    name: string,
    color: string,
    start_time: Date,
    end_time: Date,
    work_type: string,
    memo: string
  ) => {
    try {
      const newUser = await User.create({
        identification: "hello",
        password: "1234",
        name: "hi",
        email: "tmax.com",
      });
      const newWork = await Work.create(
        {
          name: "name",
          color: "#12345",
          start_time: new Date(),
          end_time: new Date(),
          work_type: "DAY",
          memo: "memo",
          user_id: newUser.user_id,
        },
        {
          include: [
            {
              model: User,
            },
          ],
        }
      );
    } catch (error) {
      throw error;
    }
  };
}

export default WorksService;
