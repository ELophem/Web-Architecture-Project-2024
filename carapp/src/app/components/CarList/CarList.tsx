type Car = {
  id: number;
  manufacturer: string;
  model: string;
  pictures: string; 
  description: string;
  price: number;
  location: string;
};

type CarListProps = {
  cars: Car[];
};

const CarList = ({ cars }: CarListProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {cars.map((car) => (
        <div key={car.id} className="border p-4">
          <h2 className="text-xl font-bold">
            {car.manufacturer} {car.model}
          </h2>
          <p>{car.description}</p>
          <p>Price: ${car.price}</p>
          <p>Location: {car.location}</p>
          <img src={car.pictures} alt={`Picture of ${car.manufacturer} ${car.model}`} width={200} height={150} />
        </div>
      ))}
    </div>
  );
};

export default CarList;
