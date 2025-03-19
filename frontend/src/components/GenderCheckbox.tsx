const GenderCheckbox = ({
  selectedGender,
  onCheckboxChange,
}: {
  selectedGender: string;
  onCheckboxChange: (gender: "male" | "female") => void;
}) => {
  return (
    <div className="flex my-5 gap-10">
      <div className="form-control">
        <label className="label gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
            className="checkbox checked:bg-blue-600 border-slate-500"
          />
          <span className="label-text">Male</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
            className="checkbox checked:bg-blue-600 border-slate-500"
          />
          <span className="label-text">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
