import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user";
import { Work } from "./work";

interface CalendarAttributes {
  calendar_date_id: number;
  user_id: number;
  work_id: number;
  year: string;
  month: string;
  day: string;
}

export class CalendarDate extends Model<CalendarAttributes> {
  public calendar_date_id!: number;
  public user_id: number;
  public work_id: number;
  public year!: string;
  public month!: string;
  public day!: string;
}

CalendarDate.init(
  {
    calendar_date_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    work_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
  },
  {
    modelName: "CalendarDate",
    tableName: "CalendarDate",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);

// User:CalendarDate = 1:N관계
User.hasMany(CalendarDate, { sourceKey: "user_id", foreignKey: "user_id" });
CalendarDate.belongsTo(User, { targetKey: "user_id", foreignKey: "user_id" });

// Work:CalenDardate = 1:1관계
Work.hasOne(CalendarDate, { sourceKey: "work_id", foreignKey: "work_id" });
CalendarDate.belongsTo(Work, { targetKey: "work_id", foreignKey: "work_id" });
