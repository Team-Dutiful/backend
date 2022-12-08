import { CalendarDate } from "@db/models/calendar-date";
import { Work } from "@db/models/work";
import { Group } from "@db/models/group";
import { GroupMember } from "@db/models/group-member";
import { User } from "@db/models/user";
import { WorkType, getWorkType } from "@type/workType";

interface IMember {
  member_id: number;
  name: string;
}

interface IMemberLeader {
  leader_id: number;
  members: Array<IMember>;
}

interface IGroup {
  group_id: number;
  name: string;
  color: string;
  leader_id: number;
  members: Array<IMember>;
}

interface IWork {
  work_id: number;
  name: string;
  color: string;
  start_time: Date;
  end_time: Date;
  work_type: WorkType;
}

interface ICalendarDate {
  calendar_date_id: number;
  year: number;
  month: number;
  day: number;
  work: IWork;
}

interface IGroupMember {
  member_id: number;
  name: string;
  calendar_dates: Array<ICalendarDate>;
}

// 그룹 생성
export async function createGroup(userId: number, name: string, color: string) {
  try {
    const newGroup = await Group.create(
      {
        name: name,
        color: color,
        leader_id: userId,
      },
      {
        include: [
          {
            model: User,
          },
        ],
      }
    );

    await GroupMember.create({
      group_id: newGroup.group_id,
      user_id: userId,
    });

    return { group_id: newGroup.group_id };
  } catch (error) {
    throw error;
  }
}

// 그룹 가져오기
export async function getGroup(userId: number) {
  try {
    const result: IGroup[] = [];

    const groups = await GroupMember.findAll({ where: { user_id: userId } });

    for (const group of groups) {
      const findGroup = await Group.findOne({
        where: { group_id: group.group_id },
      });
      const findGroupMembers = await GroupMember.findAll({
        where: { group_id: findGroup.group_id },
      });

      const members: Array<IMember> = [];
      for (const groupMember of findGroupMembers) {
        const findUser = await User.findOne({
          where: { user_id: groupMember.user_id },
        });
        members.push({
          member_id: findUser.user_id,
          name: findUser.name,
        });
      }
      result.push({
        group_id: findGroup.group_id,
        name: findGroup.name,
        color: findGroup.color,
        leader_id: findGroup.leader_id,
        members: members,
      });
    }
    return { groups: result };
  } catch (error) {
    throw error;
  }
}

// 그룹 수정
export async function updateGroup(
  userId: number,
  groupId: number,
  name: string,
  color: string
) {
  try {
    const group = await Group.findOne({ where: { group_id: groupId } });

    if (group.leader_id !== userId) {
      throw new Error("그룹 권한이 없습니다.");
    }

    group.name = name;
    group.color = color;
    group.save();
  } catch (error) {
    throw error;
  }
}

// 그룹 삭제
export async function deleteGroup(userId: number, groupId: number) {
  try {
    const group = await Group.findOne({ where: { group_id: groupId } });

    if (group.leader_id !== userId) {
      throw new Error("그룹 권한이 없습니다.");
    }

    const groupMembers = await GroupMember.findAll({
      where: { group_id: groupId },
    });
    groupMembers.forEach((groupMember) => groupMember.destroy);

    group.destroy();
  } catch (error) {
    throw error;
  }
}

// 그룹 강퇴
export async function banGroup(
  groupId: number,
  leaderId: number,
  userId: number
) {
  try {
    const group = await Group.findOne({ where: { group_id: groupId } });

    if (group.leader_id != leaderId) {
      throw new Error("그룹 권한이 없습니다.");
    }

    await GroupMember.destroy({
      where: { user_id: userId, group_id: groupId },
    });
  } catch (error) {
    throw error;
  }
}

// 그룹 탈퇴
export async function exitGroup(groupId: number, userId: number) {
  try {
    await GroupMember.destroy({
      where: { user_id: userId, group_id: groupId },
    });
  } catch (error) {
    throw error;
  }
}

// 리더 변경
export async function changeLeader(
  groupId: number,
  leaderId: number,
  userId: number
) {
  try {
    // 리더 확인 로직 필요
    const group = await Group.findOne({ where: { group_id: groupId } });

    if (group.leader_id !== leaderId) {
      throw new Error("그룹 권한이 없습니다.");
    }

    group.leader_id = userId;
    group.save();
  } catch (error) {
    throw error;
  }
}

// 그룹 멤버 가져오기
export async function getGroupMembers(groupId: number) {
  try {
    const groupMembers = await GroupMember.findAll({
      where: { group_id: groupId },
    });
    const group = await Group.findOne({
      where: { group_id: groupId },
    });

    const members: Array<IMember> = [];
    for (const groupMember of groupMembers) {
      const member = await User.findOne({
        where: { user_id: groupMember.user_id },
      });
      members.push({
        member_id: member.user_id,
        name: member.name,
      });
    }

    const result = {
      leader_id: group.leader_id,
      members: members,
    };
    return { group_members: result };
  } catch (error) {
    throw error;
  }
}

// 그룹 멤버의 스케쥴 가져오기
export async function getScheduleByMembers(groupId: number) {
  try {
    const members: IGroupMember[] = [];
    const groupMembers = await GroupMember.findAll({
      where: { group_id: groupId },
    });
    for (const groupMember of groupMembers) {
      const dates = await CalendarDate.findAll({
        where: { user_id: groupMember.user_id },
      });
      const calendarDates: ICalendarDate[] = [];
      for (const date of dates) {
        const dateWork = await Work.findOne({
          where: { work_id: date.work_id },
        });
        const work = {
          work_id: dateWork.work_id,
          name: dateWork.name,
          color: dateWork.color,
          start_time: dateWork.start_time,
          end_time: dateWork.end_time,
          work_type: getWorkType(dateWork.work_type),
        };
        calendarDates.push({
          calendar_date_id: date.calendar_date_id,
          year: date.year,
          month: date.month,
          day: date.day,
          work: work,
        });
      }
      const user = await User.findOne({
        where: { user_id: groupMember.user_id },
      });
      members.push({
        member_id: user.user_id,
        name: user.name,
        calendar_dates: calendarDates,
      });
    }
    return members;
  } catch (error) {
    throw error;
  }
}
