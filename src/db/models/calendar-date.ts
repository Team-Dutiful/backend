import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user";
import { Work } from "./work";

interface CalendarAttributes {
  calendar_date_id: number;
  year: number;
  month: number;
  day: number;
}

export class CalendarDate extends Model<CalendarAttributes> {
  public calendar_date_id!: number;
  public year!: number;
  public month!: number;
  public day!: number;
}

CalendarDate.init(
  {
    calendar_date_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
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
