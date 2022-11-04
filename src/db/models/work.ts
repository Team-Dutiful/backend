import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user";

interface WorkAttributes {
  work_id: number;
  user_id: number;
  name: string;
  color: string;
  start_time: Date;
  end_time: Date;
  work_type: string;
  memo: string;
}

export class Work extends Model<WorkAttributes> {
  public work_id: number;
  public user_id: number;
  public name: string;
  public color: string;
  public start_time: Date;
  public end_time: Date;
  public work_type: string;
  public memo: string;
}

Work.init(
  {
    work_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    work_type: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    memo: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    modelName: "Work",
    tableName: "Work",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);

// 1의 입장에서 hasMany 사용
// sourceKey : user의 primary key
// foreignKey : work의 foreign key
User.hasMany(Work, { sourceKey: "user_id", foreignKey: "user_id" });

// N의 입장에서 belongsTo 사용
// targetKey : user의 primary key
// foreignKey : work에서 생성될 foreign key
Work.belongsTo(User, { targetKey: "user_id", foreignKey: "user_id" });
