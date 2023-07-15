import styles from "@/styles/Home.module.css";
import { useScheduledMealContext } from "@/providers/ScheduledMealContext";
import { MealType, mealTypes } from "@/types/MealType";
import { ScheduledMeal } from "@/types/ScheduledMealType";
import ScheduledMealZone from "./ScheduledMealZone";
import { formatDate } from "@/utils/FormatDate";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface DayProps {
  date: string;
  loading?: boolean;
}

const Day: React.FC<DayProps> = ({ date, loading }) => {
  const { scheduledMeals } = useScheduledMealContext();

  const mealsOfTheDay = scheduledMeals.filter(
    (scheduledMeal: ScheduledMeal) => scheduledMeal.date === date,
  );
  const formattedDate = formatDate(date);

  const renderScheduledMeal = (mealType: MealType) => {
    const meal =
      mealsOfTheDay.find((meal: any) => meal.mealType === mealType) || null;

    return (
      <ScheduledMealZone
        loading={loading}
        key={`${date}${mealType}`}
        meal={meal}
        mealType={mealType}
        day={new Date(date).toISOString().slice(0, 10)}
      />
    );
  };
  return (
    <SkeletonTheme baseColor="#4C9283" highlightColor="#B4A28A">
      <div>
        <div className={styles.date}>
          {loading ? (
            <Skeleton
              containerClassName={styles.flexSkeleton}
              width={"50%"}
              height={"70%"}
            />
          ) : (
            formattedDate
          )}
        </div>
        <div className={styles.day}>{mealTypes.map(renderScheduledMeal)}</div>
      </div>
    </SkeletonTheme>
  );
};

export default Day;
