import { FC } from "react";
import { Performance } from "../model";
import { formatDate } from "../utils/date";

type PerformancesProps = {
  performances: Performance[];
};

const Performances: FC<PerformancesProps> = ({ performances }) => {
  if (!performances || performances.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {performances.map((performance) => (
        <div key={performance.system.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-dark">
              Performance
            </h3>
          </div>
          <div className="text-right">
            {performance.elements.time_and_date?.value && (
              <div className="text-lg font-semibold text-gray-dark">
                {formatDate(performance.elements.time_and_date.value)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Performances;
