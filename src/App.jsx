import { useEffect, useState } from 'react';

import web3 from './web3';
import RentCar from './contract';

import './App.css';

function App() {
  const [owner, setOwner] = useState();
  const [renter, setRenter] = useState();
  const [car, setCar] = useState([]);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [isAvailable, setIsAvailable] = useState();
  const [days, setDays] = useState(0);
  const [message, setMessage] = useState('');
  const [account, setAccount] = useState();

  const [showCarForm, setShowCarForm] = useState(false);

  let rentalPrice = pricePerDay * days * 0.00001;
  const isOwner = account === owner;
  const isRenter = account === renter;

  const loadData = async () => {
    const _owner = await RentCar.methods.owner().call();
    const _renter = await RentCar.methods.renter().call();
    const _car = await RentCar.methods.getCarInfo().call();
    const _pricePerDay = await RentCar.methods.getPricePerDay().call();
    const _available = await RentCar.methods.available().call();
    const accounts = await web3.eth.getAccounts();

    setOwner(_owner);
    setRenter(_renter);
    setCar(_car);
    setPricePerDay(Number(_pricePerDay));
    setIsAvailable(_available);
    setAccount(accounts[0]);
    rentalPrice = 0;
  };

  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();

    setAccount(accounts[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    window.ethereum.on('accountsChanged', getAccount);

    return function cleanup() {
      window.ethereum.removeListener('accountsChanged', getAccount);
    };
  });

  async function setCarInfo(event) {
    event.preventDefault();
    try {
      setMessage('Awaiting to validate a transaction...');
      console.log(car);

      const accounts = await web3.eth.getAccounts();

      await RentCar.methods.setCar(car[0], car[1], pricePerDay, car[2]).send({
        from: accounts[0],
      });

      setMessage('Transaction Successfully');

      await loadData();

      setMessage('');
    } catch (error) {
      setMessage('Transaction break the contract rules');

      if (error.code === 4001) {
        setMessage('Transaction canceled');
      }
    } finally {
      setShowCarForm((prevState) => !prevState);
    }
  }

  async function rentCar(event) {
    event.preventDefault();
    try {
      setMessage('Awaiting to validate a transaction...');

      const accounts = await web3.eth.getAccounts();

      await RentCar.methods.rentCar(days).send({
        from: accounts[0],
        value: web3.utils.toWei(String(rentalPrice), 'ether'),
      });

      setMessage('Transaction Successfully');

      await loadData();

      setMessage('');
    } catch (error) {
      setMessage('Transaction break the contract rules');

      if (error.code === 4001) {
        setMessage('Transaction canceled');
      }
    }
  }

  async function renoveRent(event) {
    event.preventDefault();
    try {
      setMessage('Awaiting to validate a transaction...');

      const accounts = await web3.eth.getAccounts();

      await RentCar.methods.renoveRent(days).send({
        from: accounts[0],
        value: web3.utils.toWei(String(rentalPrice), 'ether'),
      });

      setMessage('Transaction Successfully');

      await loadData();

      setMessage('');
    } catch (error) {
      setMessage('Transaction break the contract rules');

      if (error.code === 4001) {
        setMessage('Transaction canceled');
      }
    }
  }

  async function finishRent() {
    try {
      setMessage('Awaiting to validate a transaction...');

      await RentCar.methods.finishRent().send({ from: account });

      setMessage('Transaction Successfully');

      await loadData();

      setMessage('');
    } catch (error) {
      setMessage('Transaction break the contract rules');
      if (error.code === 4001) {
        setMessage('Transaction canceled');
      }
    }
  }

  async function getBalance() {
    try {
      setMessage('Awaiting to validate a transaction...');

      await RentCar.methods.getAmount().send({
        from: account,
      });

      setMessage('Transaction Successfully');

      await loadData();

      setMessage('');
    } catch (error) {
      setMessage('Transaction break the contract rules');

      if (error.code === 4001) {
        setMessage('Transaction canceled');
      }
    }
  }

  return (
    <div className="App">
      <div className="page-container">
        <div className="page-header">
          <h2>This Contract is managed by {owner}</h2>
          <h3>The Rent {isAvailable ? 'is Available' : 'not Available'}</h3>
        </div>

        <div className="page-body">
          <div className="page-body-header">
            <div className="message-container">
              {message ? <span>{message}</span> : null}
            </div>
            {isOwner ? (
              <>
                <button
                  onClick={() => setShowCarForm((prevState) => !prevState)}
                >
                  Edit Car info
                </button>
                <button onClick={finishRent}>Finish rent</button>
                <button onClick={getBalance}>Get Balance</button>
              </>
            ) : null}
          </div>

          {showCarForm ? (
            <div className="edit-car-form">
              <form onSubmit={setCarInfo}>
                <label htmlFor="car_model">Model</label>
                <input
                  type="text"
                  id="car_model"
                  onChange={(e) => setCar({ ...car, [0]: e.target.value })}
                />
                <label htmlFor="car_brand">Brand</label>
                <input
                  type="text"
                  id="car_brand"
                  onChange={(e) => setCar({ ...car, 1: e.target.value })}
                />
                <label htmlFor="car_year">Year</label>
                <input
                  type="number"
                  id="car_year"
                  onChange={(e) =>
                    setCar({ ...car, 2: Number(e.target.value) })
                  }
                />
                <label htmlFor="price_per_day">
                  Price per day <span>(1 = 0.00001 ether)</span>
                </label>
                <input
                  type="number"
                  id="price_per_day"
                  onChange={(e) => setPricePerDay(Number(e.target.value))}
                />
                <div className="buttons-container">
                  <button>Save</button>
                  <button
                    onClick={() => {
                      loadData();
                      setShowCarForm((prevState) => !prevState);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {isAvailable && !showCarForm ? (
            <div className="rent-car-form">
              <h3>Car info</h3>
              <span>
                <strong>Model:</strong> {car[0] ?? null}
              </span>
              <span>
                <strong>Brand:</strong> {car[1] ?? null}
              </span>
              <span>
                <strong>Year:</strong> {car[2] ?? null}
              </span>
              <span>
                <strong>Price Per Day:</strong> {pricePerDay * 0.00001} ether
              </span>

              <div className="rent-car-input">
                <form onSubmit={rentCar}>
                  <label htmlFor="rent_days">
                    How many days do you want to rent?
                  </label>
                  <div>
                    <input
                      id="rent_days"
                      type="number"
                      onChange={(e) => setDays(Number(e.target.value))}
                    />
                    <span>Value: {rentalPrice} ether</span>
                  </div>

                  <button>Rent</button>
                </form>
              </div>
            </div>
          ) : null}

          {isRenter ? (
            <form className="renove-rent-form" onSubmit={renoveRent}>
              <label htmlFor="renove_rent">
                Do you want to renew the rent?
              </label>
              <div>
                <input type="number" id="renove_rent" />
                <span>Value: {rentalPrice} ether</span>
              </div>

              <button>Renew</button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
