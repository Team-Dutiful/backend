import { Work } from "@db/models/work";
import { User } from "@db/models/user";

class WorksService {
  getWork = async (work_id: number) => {
    try {
      const work = Work.findOne({ where: { work_id: work_id } });
      return work;
    } catch (error) {
      throw error;
    }
  };

  getWorkList = async () => {
    const user_id = 2;
    const workList = Work.findAll({ where: { user_id: user_id } });
    return workList;
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

  updateWork = async (
    work_id: number,
    name: string,
    color: string,
    start_time: Date,
    end_time: Date,
    work_type: string,
    memo: string
  ) => {
    try {
      const work = await Work.findOne({ where: { work_id: work_id } });
      work.name = name;
      work.color = color;
      work.start_time = start_time;
      work.end_time = end_time;
      work.work_type = work_type;
      work.memo = memo;
      work.save();
    } catch (error) {
      throw error;
    }
  };

  deleteWork = async (work_id: number) => {
    try {
      const work = await Work.findOne({ where: { work_id: work_id } });
      work.destroy();
    } catch (error) {
      throw error;
    }
  };
}

export default WorksService;
