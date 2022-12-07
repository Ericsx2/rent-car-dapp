// SPDX-License-Identifier: GLP-3.0

pragma solidity >=0.8.7;

struct Car {
  string model;
  string brand;
  uint year;
}

uint constant dayInSeconds = 60;

contract RentCar {
  address payable public owner;
  address payable public renter;
  bool public available;
  uint public pricePerDay;
  Car public car;
  uint public startDate;
  uint public endDate;

  constructor() {
    owner = payable(msg.sender);
  }

  function setCar(string memory _model, string memory _brand, uint _pricePerDay, uint _year) public onlyOwner { 
    Car memory newCar;
    newCar.model = _model;
    newCar.brand = _brand;
    newCar.year = _year;
    available = true;
    pricePerDay = _pricePerDay;
    car = newCar;
  }

  function getCarInfo() public view returns (Car memory _car){
    return car;
  }

  function getRentPrice(uint _days) public view returns (uint _price) {
    return pricePerDay * _days * 0.00001 ether;
  }

  function getPricePerDay() public view returns (uint _pricePerDay){
    return pricePerDay;
  }

  function timeRemaining() public view returns (uint _time) {
    return (endDate - block.timestamp) / 60;
  }

  function showCar() public view returns (Car memory _car){
    return car;
  }

  function rentCar(uint _days) public payable carIsAvaliable {
    require((pricePerDay * _days) * (0.00001 ether) == msg.value);
    available = false;
    startDate = block.timestamp;
    endDate = (dayInSeconds * _days) + startDate;
    renter = payable(msg.sender);
  }

  function renoveRent(uint _days) public payable onlyRenter {
    require(pricePerDay * _days * (0.00001 ether) == msg.value);
    endDate = endDate + (dayInSeconds * _days);
  }

  function finishRent() public onlyOwner rentOver {
    renter = payable(0);
    available = true;
  }

  function getAmount() public onlyOwner {
    payable(owner).transfer(address(this).balance);
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier onlyRenter() {
    require(msg.sender == renter);
    _;
  }

  modifier rentOver() {
    require(block.timestamp >= endDate);
    _;
  }

  modifier carIsAvaliable(){
    require(available, "Car is Rented");
    _;
  }
}
