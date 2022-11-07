import { CalendarDate } from '@db/models/calendar-date';
import { Work } from '@db/models/work';
import { Builder } from 'builder-pattern';
import { Group } from '../db/models/group';
import { GroupMember } from '../db/models/group-member';
import { User } from '../db/models/user';
import { WorkType, getWorkType } from '../enum/workType';

interface IMember {
    member_id : number,
    name : string
}

interface IGroup {
    group_id : number,
    name : string,
    color : string,
    leader_id : number,
    members : Array<IMember>
}

interface IWork {
    work_id : number,
    name : string, 
    color : string,
    start_time : Date,
    end_time : Date,
    work_type : WorkType
}

interface ICalendarDate {
    calendar_date_id : number,
    year : number,
    month : number,
    day : number,
    work : IWork
}

interface IGroupMember {
    member_id : number,
    name : string,
    calendar_dates : Array<ICalendarDate>
}

class GroupService {
    
    // 그룹 생성
    createGroup = async (name: string, color: string) => {
        try {

            const newGroup = await Group.create({
                name: name,
                color: color,
                leader_id : 1 // todo[dain] 유저 아이디 변경 필요
            }, {
                include: [{
                    model: User
                }]
            })
            
            await GroupMember.create({
                group_id : newGroup.group_id,
                user_id : 1
            })

        } catch (error) {
            throw error;
        }
    };    

    // 그룹 가져오기
    getGroup = async () => {
        try {
            const result: IGroup[] = [];

            // todo[dain] user_id 변경 필요
            const groups = await GroupMember.findAll({ where: { user_id : 1} })

            for (const group of groups) {
                const findGroup = await Group.findOne({ where : {group_id : group.group_id}})
                const findGroupMembers = await GroupMember.findAll({ where: { group_id : findGroup.group_id }})

                const members : Array<IMember> = [] 
                for (const groupMember of findGroupMembers) {
                    const findUser = await User.findOne({ where: { user_id : groupMember.user_id}})
                    members.push(
                        Builder<IMember>()
                            .member_id(findUser.user_id)
                            .name(findUser.name)
                            .build()
                    )
                }
         
                result.push(
                    Builder<IGroup>()
                        .group_id(findGroup.group_id)
                        .name(findGroup.name)
                        .color(findGroup.color)
                        .leader_id(findGroup.leader_id)
                        .members(members)
                        .build()
                );
            }
            return result;
        } catch (error) {
            throw error;
        }
    };    

    // 그룹 수정
    updateGroup = async (id : string, name: string, color: string) => {
        try {
            const group = await Group.findOne(
                { where: { group_id : id } }
            )
            group.name = name;
            group.color = color;
            group.save();
        } catch (error) {
            throw error;
        }
    };  

    // 그룹 삭제
    deleteGroup = async (groupId : string) => {
        try {
            const groupMembers = await GroupMember.findAll({where : {group_id:groupId}})
            for (const groupMember of groupMembers) {
                groupMember.destroy();
            }
            await Group.destroy(
                { where: { group_id : groupId } }
            )
        } catch (error) {
            throw error;
        }
    };  

    // 그룹 강퇴
    banGroup = async (groupId : string, userId : number) => {
        try {
            // todo[dain] 리더인지 확인 필요
            await GroupMember.destroy({where : {user_id : userId, group_id : groupId}})
        } catch (error) {
            throw error;
        }
    };  


    // 그룹 탈퇴
    exitGroup = async (groupId : string, userId : number) => {
        try {
            await GroupMember.destroy({where : {user_id : userId, group_id : groupId}})
        } catch (error) {
            throw error;
        }
    };  

    // 리더 변경
    changeLeader = async (groupId : string, userId : number) => {
        try {
            const group = await Group.findOne({ where : {group_id : groupId}});
            group.leader_id = userId;
            group.save();
        } catch (error) {
            throw error;
        }
    };  

    // 그룹 멤버 가져오기
    getGroupMembers = async (groupId : string) => {
        try {
            const groupMembers = await GroupMember.findAll({where : {group_id : groupId}})
            const members : Array<IMember> = [] 
            for (const groupMember of groupMembers) {
                const member = await User.findOne({where : { user_id : groupMember.user_id}})
                members.push(
                    Builder<IMember>()
                        .member_id(member.user_id)
                        .name(member.name)
                        .build()
                )
            }
            return members; 
        } catch (error) {
            throw error;
        }
    };  

    // 그룹 멤버의 스케쥴 가져오기
    getScheduleByMembers = async (groupId : string) => {
        try {
            const members: IGroupMember[] = [];
            const groupMembers = await GroupMember.findAll({where : {group_id : groupId}});
            for (const groupMember of groupMembers) {
                const dates = await CalendarDate.findAll({ where : { user_id : groupMember.user_id}});
                const calendarDates: ICalendarDate[] = [];
                for (const date of dates) {
                    const dateWork = await Work.findOne({ where : { work_id : date.user_id }})
                    const work = Builder<IWork>()
                                    .work_id(dateWork.work_id)
                                    .name(dateWork.name)
                                    .color(dateWork.color)
                                    .start_time(dateWork.start_time)
                                    .end_time(dateWork.end_time)
                                    .work_type(getWorkType(dateWork.work_type))
                                    .build();
                    calendarDates.push(
                        Builder<ICalendarDate>()
                            .calendar_date_id(date.calendar_date_id)
                            .year(date.year)
                            .month(date.month)
                            .day(date.day)
                            .work(work)
                            .build()
                        )
                }
                const user = await User.findOne({ where : { user_id : groupMember.user_id }})
                members.push(
                    Builder<IGroupMember>()
                    .member_id(user.user_id)
                    .name(user.name)
                    .calendar_dates(calendarDates)
                    .build()
                )
            }
            return members;
        } catch (error) {
            throw error;
        }
    };  

}

export default GroupService;

