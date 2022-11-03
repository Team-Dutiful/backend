import { Group } from '../db/models/group';
import { User } from '../db/models/user';

class GroupService {

    // 그룹 생성
    createGroup = async (name: string, color: string) => {
        try {

            const newUser = await User.create(
                {
                    identification : "hello",
                    password : "1234",
                    name : "hi",
                    email : "tmax.com"
                }
            )
            const newGroup = await Group.create({
                name: "name",
                color: "#12345",
                leader_id : newUser.user_id
            }, {
                include: [{
                    model: User
                }]
            })

        } catch (error) {
            return error;
        }
    };    

    getGroup = async () => {
        console.log("test")
    };    

}

export default GroupService;

