const Card = ({ title, value, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-md text-white`}>
      <h3 className="text-lg font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
};

export default Card;