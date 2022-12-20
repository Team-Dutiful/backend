import { Work } from "@db/models/work";
import { User } from "@db/models/user";

class WorksService {
  createWork = async (
    user_id: number,
    name: string,
    color: string,
    start_time: string,
    end_time: string,
    work_type: string,
    memo: string
  ) => {
    try {
      await Work.create(
        {
          name: name,
          color: color,
          start_time: start_time,
          end_time: end_time,
          work_type: work_type,
          memo: memo,
          user_id: user_id,
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

  getWork = async (work_id: number) => {
    try {
      const work = Work.findOne({ where: { work_id: work_id } });
      return work;
    } catch (error) {
      throw error;
    }
  };

  getWorkList = async (user_id: number) => {
    const workList = Work.findAll({ where: { user_id: user_id } });
    return workList;
  };

  updateWork = async (
    work_id: number,
    name: string,
    color: string,
    start_time: string,
    end_time: string,
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

  createDefaultWork = async (user_id: number) => {
    try {
      await Work.create(
        {
          name: "DAY",
          color: "#FFD9D9",
          start_time: "09:00",
          end_time: "18:00",
          work_type: "DAY",
          memo: "",
          user_id: user_id,
        },
        {
          include: [
            {
              model: User,
            },
          ],
        }
      );

      await Work.create(
        {
          name: "NIGHT",
          color: "#D4FFB2",
          start_time: "09:00",
          end_time: "18:00",
          work_type: "NIGHT",
          memo: "",
          user_id: user_id,
        },
        {
          include: [
            {
              model: User,
            },
          ],
        }
      );

      await Work.create(
        {
          name: "EVENING",
          color: "#FFEEC4",
          start_time: "09:00",
          end_time: "18:00",
          work_type: "EVENING",
          memo: "",
          user_id: user_id,
        },
        {
          include: [
            {
              model: User,
            },
          ],
        }
      );

      await Work.create(
        {
          name: "OFF",
          color: "#BBE7FF",
          start_time: "09:00",
          end_time: "18:00",
          work_type: "OFF",
          memo: "",
          user_id: user_id,
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
