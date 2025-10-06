const ResultCard = ({ result }) => {
  return (
    <div className="mt-6 p-4 bg-green-100 text-center rounded-xl shadow">
      <h3 className="text-xl font-semibold">
        Prediction Result: {result || "No result yet"}
      </h3>
    </div>
  );
};

export default ResultCard;
