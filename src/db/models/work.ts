import { DataTypes, Model } from "sequelize";
import { CalendarDate } from "./calendar-date";
import { sequelize } from "./index";
import { User } from "./user";

interface WorkAttributes {
  work_id: number;
  name: string;
  color: string;
  start_time: Date;
  end_time: Date;
  work_type: string;
  memo: string;
  user_id : number;
  calendar_date_id : number;
}

export class Work extends Model<WorkAttributes> {
  public work_id: number;
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calendar_date_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

User.hasMany(Work, { sourceKey: "user_id", foreignKey: "user_id" });
CalendarDate.hasMany(Work, {
  sourceKey: "calendar_date_id",
  foreignKey: "calendar_date_id",
});
