type TemperatureRangeBarProps = {
    temp_min: number;
    temp_max: number;
  };
  
  const TemperatureRangeBar: React.FC<TemperatureRangeBarProps> = ({
    temp_min,
    temp_max,
  }) => {
    const minC = Math.round(temp_min);
    const maxC = Math.round(temp_max);
  
    return (
      <div className="w-full">
        <div className="text-sm text-gray-600 mb-1">
          {minC}°C - {maxC}°C
        </div>
        <div className="w-full h-2 bg-gray-300 rounded">
          <div
            className="h-full bg-blue-500 rounded"
            style={{
              width: `${Math.max(5, Math.min(100, maxC - minC) * 5)}%`,
            }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default TemperatureRangeBar;