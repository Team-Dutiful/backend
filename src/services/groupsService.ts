import { CalendarDate } from '@db/models/calendar-date';
import { Work } from '@db/models/work';
import { Builder } from 'builder-pattern';
import { group } from 'console';
import { Socket } from 'dgram';
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
            
            const newUser = await User.create(
                {
                    identification : "123",
                    password : "123",
                    name : "123",
                    email : "1234"
                }
            )

            const newGroup = await Group.create({
                name: name,
                color: color,
                leader_id : newUser.user_id // todo[dain] 유저 아이디 변경 필요
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
                        {
                            member_id: findUser.user_id,
                            name: findUser.name,
                        }
                    )
                }
                result.push(
                    {
                        group_id: findGroup.group_id,
                        name: findGroup.name,
                        color: findGroup.color,
                        leader_id: findGroup.leader_id,
                        members: members,
                    }
                );
            }
            return result;
        } catch (error) {
            throw error;
        }
    };    

    // 그룹 수정
    updateGroup = async (groupId : number, name: string, color: string) => {
        try {
            const group = await Group.findOne({ where: { group_id : groupId } })
            group.name = name;
            group.color = color;
            group.save();
        } catch (error) {
            throw error;
        }
    };  

    // 그룹 삭제
    deleteGroup = async (groupId : number) => {
        try {
            const groupMembers = await GroupMember.findAll({where : {group_id:groupId}})
            groupMembers.forEach(groupMember => groupMember.destroy)

            await Group.destroy(
                { where: { group_id : groupId } }
            )
        } catch (error) {
            throw error;
        }
    };  

    // 그룹 강퇴
    banGroup = async (groupId : number, userId : number) => {
        try {
            // todo[dain] 리더인지 확인 필요
            await GroupMember.destroy({where : {user_id : userId, group_id : groupId}})
        } catch (error) {
            throw error; 
        }
    };  

    // 그룹 탈퇴
    exitGroup = async (groupId : number, userId : number) => {
        try {
            await GroupMember.destroy({where : {user_id : userId, group_id : groupId}})
        } catch (error) {
            throw error;
        }
    };  

    // 리더 변경
    changeLeader = async (groupId : number, userId : number) => {
        try {
            // 리더 확인 로직 필요
            const user = await User.findOne({ where : {user_id : userId}});
            const list = {work:{}};
            const group = await Group.findOne({ where : {group_id : groupId}});
            group.leader_id = user.user_id;
            group.save();
        } catch (error) {
            throw error;
        }
    };  

    // 그룹 멤버 가져오기
    getGroupMembers = async (groupId : number) => {
        try {
            const groupMembers = await GroupMember.findAll({where : {group_id : groupId}})
            const members : Array<IMember> = [] 
            for (const groupMember of groupMembers) {
                const member = await User.findOne({where : { user_id : groupMember.user_id}})
                members.push(
                    {
                        member_id: member.user_id,
                        name: member.name,
                    }
                )
            }
            return members; 
        } catch (error) {
            throw error;
        }
    };  

    // 그룹 멤버의 스케쥴 가져오기
    getScheduleByMembers = async (groupId : number) => {
        try {
            const members: IGroupMember[] = [];
            const groupMembers = await GroupMember.findAll({where : {group_id : groupId}});
            for (const groupMember of groupMembers) {
                const dates = await CalendarDate.findAll({ where : { user_id : groupMember.user_id}});
                const calendarDates: ICalendarDate[] = [];
                for (const date of dates) {
                    const dateWork = await Work.findOne({ where : { work_id : date.work_id }})
                    const work = {
                        work_id : dateWork.work_id,
                        name : dateWork.name,
                        color : dateWork.color,
                        start_time : dateWork.start_time,
                        end_time : dateWork.end_time,
                        work_type : getWorkType(dateWork.work_type)
                    }
                    calendarDates.push(
                        {
                            calendar_date_id : date.calendar_date_id,
                            year : date.year,
                            month : date.month,
                            day : date.day,
                            work : work
                        }
                    )
                }
                const user = await User.findOne({ where : { user_id : groupMember.user_id }})
                members.push(
                    {
                        member_id : user.user_id,
                        name : user.name,
                        calendar_dates : calendarDates
                    }
                )
            }
            return members;
        } catch (error) {
            throw error;
        }
    };  

}

export default GroupService;

