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
      const findWork = await Work.findOne({ where: { work_id: work_id } });
      const work = {
        work_id: findWork.work_id,
        work_type: findWork.work_type,
        name: findWork.name,
        color: findWork.color,
        start_time: findWork.start_time,
        end_time: findWork.end_time,
        memo: findWork.memo,
      };
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
          color: "#FF9F9F",
          start_time: "07:00",
          end_time: "15:00",
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
          name: "EVE",
          color: "#FFDF8D",
          start_time: "15:00",
          end_time: "23:00",
          work_type: "EVE",
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
          color: "#63E2BC",
          start_time: "23:00",
          end_time: "07:00",
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
          name: "OFF",
          color: "#9BC9FF",
          start_time: "24:00",
          end_time: "24:00",
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
